/**
 * Composable Context Architecture (CCA) — Person Layer Manager
 * Manages ~/.config/cca/me.md across platforms with auditable propose-stage-accept flow.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import type { PersonContext, ObservedPattern, ProposedPattern } from '../types.js';

export class MeManager {
  private configDir: string;
  private filePath: string;

  constructor(customPath?: string) {
    if (customPath) {
      this.filePath = customPath;
      this.configDir = path.dirname(customPath);
    } else {
      const homeDir = os.homedir();
      this.configDir = path.join(homeDir, '.config', 'cca');
      this.filePath = path.join(this.configDir, 'me.md');
    }
  }

  public getPath(): string {
    return this.filePath;
  }

  public exists(): boolean {
    return fs.existsSync(this.filePath);
  }

  /**
   * Initializes a default me.md if one does not exist
   */
  public ensureInitialized(): string {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true });
    }

    if (!fs.existsSync(this.filePath)) {
      const defaultContent = `# Personal Context & Operating Profile (\`me.md\`)

## 1. Voice & Working Style
- Direct, substantive, and allergic to corporate filler.
- Welcomes structural challenge, questions, and edge-case probing.
- Prefers options and Socratic inquiry before direct execution.

## 2. Standing Constraints
- Never perform silent or destructive edits.
- Never invent speculative facts or lore without anchoring to definitions.
- Always present choices in brackets [Option A | Option B].
- Enforce strict token discipline (<= 3,000 tokens per action).

## 3. Domain Fluency Map
- Expert: Software architecture, systems thinking, narrative craft, philosophy.
- Scaffolding Desired: Low-level kernel debugging, obscure legal schemas.

## 4. Harness & Tool Preferences
- Default Agent: Claude 3.7 Sonnet / Google Gemini 2.5 Pro
- Diagnostics: Local zero-dependency Node.js CLI

## 5. Observed Patterns
- Tends to start with exploratory divergence before converging on first-principles deconstruction.
  <!-- proposed: 2026-09-24, workspace: init, accepted -->

## Proposed
`;
      fs.writeFileSync(this.filePath, defaultContent, 'utf-8');
    }
    return this.filePath;
  }

  /**
   * Loads and parses me.md. If incognito (fresh) is true, returns an unconditioned empty context.
   */
  public load(options: { incognito?: boolean; workspaceRoot?: string } = {}): PersonContext {
    if (options.incognito) {
      return {
        filePath: this.filePath,
        voice: [],
        constraints: [],
        fluencyExpert: [],
        fluencyScaffolding: [],
        harnessPreferences: {},
        observedPatterns: [],
        proposedPatterns: []
      };
    }

    this.ensureInitialized();
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    const parsed = this.parseContent(raw);

    // Check for local workspace overrides (preferences.md)
    if (options.workspaceRoot) {
      const localPrefsPath = path.join(options.workspaceRoot, 'preferences.md');
      if (fs.existsSync(localPrefsPath)) {
        const localRaw = fs.readFileSync(localPrefsPath, 'utf-8');
        const localParsed = this.parseContent(localRaw);
        // Local constraints and voice take precedence
        parsed.constraints = [...localParsed.constraints, ...parsed.constraints];
        parsed.voice = [...localParsed.voice, ...parsed.voice];
      }
    }

    return parsed;
  }

  /**
   * Parses markdown text of me.md
   */
  public parseContent(content: string): PersonContext {
    const lines = content.split(/\r?\n/);
    const result: PersonContext = {
      filePath: this.filePath,
      voice: [],
      constraints: [],
      fluencyExpert: [],
      fluencyScaffolding: [],
      harnessPreferences: {},
      observedPatterns: [],
      proposedPatterns: []
    };

    let currentSection = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('## 1.') || line.toLowerCase().includes('voice')) {
        currentSection = 'voice';
        continue;
      } else if (line.startsWith('## 2.') || line.toLowerCase().includes('standing constraints')) {
        currentSection = 'constraints';
        continue;
      } else if (line.startsWith('## 3.') || line.toLowerCase().includes('domain fluency')) {
        currentSection = 'fluency';
        continue;
      } else if (line.startsWith('## 4.') || line.toLowerCase().includes('harness')) {
        currentSection = 'harness';
        continue;
      } else if (line.startsWith('## 5.') || line.toLowerCase().includes('observed patterns')) {
        currentSection = 'observed';
        continue;
      } else if (line.startsWith('## Proposed') || line.toLowerCase() === '## proposed') {
        currentSection = 'proposed';
        continue;
      } else if (line.startsWith('## ')) {
        currentSection = 'other';
        continue;
      }

      if (!line || line.startsWith('<!--')) continue;

      if (currentSection === 'voice' && line.startsWith('-')) {
        result.voice.push(line.replace(/^-\s*/, ''));
      } else if (currentSection === 'constraints' && line.startsWith('-')) {
        result.constraints.push(line.replace(/^-\s*/, ''));
      } else if (currentSection === 'fluency') {
        if (line.toLowerCase().includes('expert:')) {
          result.fluencyExpert.push(line.split(/expert:/i)[1].trim());
        } else if (line.toLowerCase().includes('scaffolding:')) {
          result.fluencyScaffolding.push(line.split(/scaffolding:/i)[1].trim());
        }
      } else if (currentSection === 'harness' && line.startsWith('-')) {
        const parts = line.replace(/^-\s*/, '').split(':');
        if (parts.length >= 2) {
          result.harnessPreferences[parts[0].trim()] = parts.slice(1).join(':').trim();
        }
      } else if (currentSection === 'observed' && line.startsWith('-')) {
        const fact = line.replace(/^-\s*/, '');
        // Check next line for provenance comment
        let provenance = '';
        if (i + 1 < lines.length && lines[i + 1].trim().startsWith('<!--')) {
          provenance = lines[i + 1].trim();
          i++;
        }

        const dateMatch = provenance.match(/proposed:\s*([0-9-]+)/);
        const wsMatch = provenance.match(/workspace:\s*([^,>]+)/);
        result.observedPatterns.push({
          fact,
          proposedDate: dateMatch ? dateMatch[1].trim() : 'unknown',
          workspace: wsMatch ? wsMatch[1].trim() : 'unknown',
          accepted: true
        });
      } else if (currentSection === 'proposed' && line.startsWith('-')) {
        const fact = line.replace(/^-\s*/, '');
        let provenance = '';
        if (i + 1 < lines.length && lines[i + 1].trim().startsWith('<!--')) {
          provenance = lines[i + 1].trim();
          i++;
        }

        const dateMatch = provenance.match(/proposed:\s*([0-9-]+)/);
        const wsMatch = provenance.match(/workspace:\s*([^,>]+)/);
        result.proposedPatterns.push({
          fact,
          proposedDate: dateMatch ? dateMatch[1].trim() : new Date().toISOString().slice(0, 10),
          workspace: wsMatch ? wsMatch[1].trim() : 'current'
        });
      }
    }

    return result;
  }

  /**
   * Stages a proposed pattern with inline provenance and checks for conflicts.
   */
  public stageProposal(fact: string, workspace: string): { staged: boolean; conflict?: string } {
    this.ensureInitialized();
    const ctx = this.load();

    // Check for obvious conflicts against accepted patterns
    const conflict = this.detectConflict(fact, ctx.observedPatterns);

    const dateStr = new Date().toISOString().slice(0, 10);
    const proposalBlock = `- ${fact}\n  <!-- proposed: ${dateStr}, workspace: ${workspace} -->\n`;

    const raw = fs.readFileSync(this.filePath, 'utf-8');
    if (raw.includes('## Proposed')) {
      const updated = raw.replace('## Proposed', `## Proposed\n${proposalBlock}`);
      fs.writeFileSync(this.filePath, updated, 'utf-8');
    } else {
      fs.writeFileSync(this.filePath, `${raw}\n\n## Proposed\n${proposalBlock}`, 'utf-8');
    }

    return { staged: true, conflict };
  }

  /**
   * Detects direct semantic/lexical contradictions between a new proposal and accepted patterns.
   */
  public detectConflict(proposal: string, existing: ObservedPattern[]): string | undefined {
    const propLower = proposal.toLowerCase();

    // Antonym pairs for basic conflict flagging
    const polarities: [string, string][] = [
      ['terse', 'detailed'],
      ['brief', 'exhaustive'],
      ['always', 'never'],
      ['socratic', 'direct execution'],
      ['options', 'single choice'],
      ['skip basics', 'explain basics']
    ];

    for (const pattern of existing) {
      const existLower = pattern.fact.toLowerCase();
      for (const [a, b] of polarities) {
        if (
          (propLower.includes(a) && existLower.includes(b)) ||
          (propLower.includes(b) && existLower.includes(a))
        ) {
          return `Conflict detected with accepted pattern: "${pattern.fact}" (tensions between '${a}' and '${b}')`;
        }
      }
    }
    return undefined;
  }

  /**
   * Promotes a staged proposal to Observed Patterns with accepted tag
   */
  public acceptProposal(factSubstring: string): boolean {
    this.ensureInitialized();
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    const lines = raw.split(/\r?\n/);
    let targetFact = '';
    let targetProv = '';
    let found = false;

    // Find in Proposed
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(factSubstring) && lines[i].trim().startsWith('-')) {
        targetFact = lines[i].trim();
        if (i + 1 < lines.length && lines[i + 1].trim().startsWith('<!--')) {
          targetProv = lines[i + 1].trim().replace('-->', ', accepted -->');
          lines.splice(i, 2);
        } else {
          const dateStr = new Date().toISOString().slice(0, 10);
          targetProv = `  <!-- proposed: ${dateStr}, workspace: manual, accepted -->`;
          lines.splice(i, 1);
        }
        found = true;
        break;
      }
    }

    if (!found) return false;

    // Insert into Observed Patterns
    const newContent = lines.join('\n');
    const updated = newContent.replace(
      '## 5. Observed Patterns',
      `## 5. Observed Patterns\n${targetFact}\n${targetProv}`
    );
    fs.writeFileSync(this.filePath, updated, 'utf-8');
    return true;
  }

  /**
   * Rejects and permanently strikes a staged proposal
   */
  public rejectProposal(factSubstring: string): boolean {
    this.ensureInitialized();
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    const lines = raw.split(/\r?\n/);
    let found = false;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(factSubstring) && lines[i].trim().startsWith('-')) {
        if (i + 1 < lines.length && lines[i + 1].trim().startsWith('<!--')) {
          lines.splice(i, 2);
        } else {
          lines.splice(i, 1);
        }
        found = true;
        break;
      }
    }

    if (found) {
      fs.writeFileSync(this.filePath, lines.join('\n'), 'utf-8');
    }
    return found;
  }
}
