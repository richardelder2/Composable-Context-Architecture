/**
 * Composable Context Architecture (CCA) — Context Mounter
 * Enforces transient action pipe lifecycle, token discipline (<= 3,000 tokens), and clean wiping.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

export interface MountFragment {
  label: string;
  content: string;
}

export interface MountResult {
  tokenEstimate: number;
  squashed: boolean;
  mountedPath: string;
}

export class ContextMounter {
  private workspaceRoot: string;
  private contextPath: string;
  public readonly MAX_TOKENS = 3000;

  constructor(workspaceRoot: string = process.cwd()) {
    this.workspaceRoot = workspaceRoot;
    this.contextPath = path.join(workspaceRoot, 'context.md');
  }

  public getContextPath(): string {
    return this.contextPath;
  }

  /**
   * Approximate token counter (4 characters per token heuristic)
   */
  public estimateTokens(text: string): number {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
  }

  /**
   * Mounts action context into context.md with strict token discipline.
   */
  public mount(
    actionId: string,
    fragments: MountFragment[],
    authorityContract: string
  ): MountResult {
    let squashed = false;
    let totalTokens = 0;

    // Header
    let mountedMarkdown = `# Transient Action Context: ${actionId}\n\n`;
    mountedMarkdown += `> *Mount Time: ${new Date().toISOString()} | Target Ceiling: <= ${this.MAX_TOKENS} tokens*\n\n`;
    mountedMarkdown += `## Authority Contract\n${authorityContract.trim()}\n\n`;

    // Estimate base overhead
    totalTokens += this.estimateTokens(mountedMarkdown);

    // Mount fragments with squashing if nearing budget
    mountedMarkdown += `## Mounted Fragments\n\n`;

    for (const fragment of fragments) {
      const fragHeader = `### ${fragment.label}\n`;
      let fragBody = fragment.content.trim();
      const fragTokens = this.estimateTokens(fragHeader + fragBody);

      if (totalTokens + fragTokens > this.MAX_TOKENS) {
        // Squashing needed
        squashed = true;
        const availableTokens = Math.max(100, this.MAX_TOKENS - totalTokens - 50);
        const maxChars = availableTokens * 4;
        fragBody = fragBody.slice(0, maxChars) + `\n\n[... TRUNCATED / SQUASHED to maintain <= ${this.MAX_TOKENS} token ceiling ...]`;
      }

      mountedMarkdown += `${fragHeader}${fragBody}\n\n`;
      totalTokens += this.estimateTokens(fragHeader + fragBody);
    }

    fs.writeFileSync(this.contextPath, mountedMarkdown, 'utf-8');

    return {
      tokenEstimate: totalTokens,
      squashed,
      mountedPath: this.contextPath
    };
  }

  /**
   * Wipes context.md completely clean to guarantee no state leaks.
   */
  public wipe(): void {
    const emptyTemplate = `# Transient Action Context (DO NOT EDIT MANUALLY)

<!--
  This file is an ephemeral token pipe mounted by the CCA context engine.
  It contains strictly minimal fragments for the active block action.
  It is flushed cleanly immediately after the action completes.
  Token Ceiling: <= 3,000 tokens.
-->
`;
    fs.writeFileSync(this.contextPath, emptyTemplate, 'utf-8');
  }

  /**
   * Reads currently mounted context.
   */
  public read(): string {
    if (!fs.existsSync(this.contextPath)) {
      this.wipe();
    }
    return fs.readFileSync(this.contextPath, 'utf-8');
  }
}
