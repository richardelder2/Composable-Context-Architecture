/**
 * Composable Context Architecture (CCA) — Google Open Knowledge Format (OKF) Resolver
 * Zero-dependency parser and bundle loader for standard OKF cards and bundles.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import type { OkfCard, OkfBundle } from '../types.js';

export class OkfResolver {
  /**
   * Token counter heuristic (4 characters per token)
   */
  public estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  /**
   * Parses a single Google OKF markdown card with YAML frontmatter.
   */
  public parseCard(filePath: string): OkfCard | null {
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf-8');
    const frontmatterMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

    const baseName = path.basename(filePath, path.extname(filePath));
    const tokenEst = this.estimateTokens(raw);

    if (!frontmatterMatch) {
      // Markdown card without frontmatter
      return {
        id: baseName,
        title: baseName,
        type: 'general',
        tags: [],
        content: raw.trim(),
        filePath,
        tokenEstimate: tokenEst
      };
    }

    const frontmatterText = frontmatterMatch[1];
    const bodyContent = frontmatterMatch[2].trim();
    const metadata = this.parseYamlFrontmatter(frontmatterText);

    let tags: string[] = [];
    if (metadata.tags) {
      if (Array.isArray(metadata.tags)) {
        tags = metadata.tags;
      } else if (typeof metadata.tags === 'string') {
        tags = metadata.tags
          .replace(/[\[\]]/g, '')
          .split(',')
          .map(t => t.trim().toLowerCase())
          .filter(Boolean);
      }
    }

    return {
      id: metadata.id || baseName,
      title: metadata.title || baseName,
      type: metadata.type || 'knowledge',
      tags,
      description: metadata.description,
      content: bodyContent,
      filePath,
      tokenEstimate: tokenEst,
      metadata
    };
  }

  /**
   * Minimal zero-dependency YAML frontmatter parser for OKF metadata
   */
  private parseYamlFrontmatter(yaml: string): Record<string, any> {
    const result: Record<string, any> = {};
    const lines = yaml.split(/\r?\n/);
    let currentKey = '';
    let isList = false;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;

      if (line.startsWith('- ') && currentKey && isList) {
        result[currentKey].push(line.replace(/^-\s*/, '').trim());
        continue;
      }

      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        currentKey = line.slice(0, colonIdx).trim();
        let value = line.slice(colonIdx + 1).trim();

        if (value === '') {
          isList = true;
          result[currentKey] = [];
        } else {
          isList = false;
          // Strip enclosing quotes
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          result[currentKey] = value;
        }
      }
    }

    return result;
  }

  /**
   * Loads an entire Google OKF knowledge bundle from a directory.
   */
  public loadBundle(bundleDir: string): OkfBundle {
    const bundleName = path.basename(bundleDir);
    const bundle: OkfBundle = {
      id: bundleName,
      name: bundleName,
      path: bundleDir,
      cards: []
    };

    if (!fs.existsSync(bundleDir)) {
      return bundle;
    }

    const files = fs.readdirSync(bundleDir, { recursive: true }) as string[];
    for (const file of files) {
      const fullPath = path.join(bundleDir, file);
      if (fs.statSync(fullPath).isFile() && (file.endsWith('.md') || file.endsWith('.markdown'))) {
        const card = this.parseCard(fullPath);
        if (card) {
          bundle.cards.push(card);
        }
      }
    }

    return bundle;
  }

  /**
   * Finds matching OKF cards by tag overlap or content keywords.
   */
  public findMatchingCards(bundle: OkfBundle, queryTerms: string[], limit: number = 2): OkfCard[] {
    const terms = queryTerms.map(t => t.toLowerCase());

    const scored = bundle.cards.map(card => {
      let score = 0;
      const cardTags = card.tags.map(t => t.toLowerCase());
      const cardTitle = card.title.toLowerCase();
      const cardType = card.type.toLowerCase();

      for (const term of terms) {
        if (cardTags.includes(term)) score += 5;
        if (cardTitle.includes(term)) score += 3;
        if (cardType.includes(term)) score += 2;
        if (card.description && card.description.toLowerCase().includes(term)) score += 1;
      }

      return { card, score };
    });

    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.card);
  }
}
