/**
 * Composable Context Architecture (CCA) — Intermediate Pipe Buffer
 * Manages .cca/pipe.md to buffer intermediate block streams without polluting blackboard.md.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

export class PipeBuffer {
  private workspaceRoot: string;
  private pipeDir: string;
  private pipePath: string;

  constructor(workspaceRoot: string = process.cwd()) {
    this.workspaceRoot = workspaceRoot;
    this.pipeDir = path.join(workspaceRoot, '.cca');
    this.pipePath = path.join(this.pipeDir, 'pipe.md');
  }

  public getPipePath(): string {
    return this.pipePath;
  }

  public ensureInitialized(): void {
    if (!fs.existsSync(this.pipeDir)) {
      fs.mkdirSync(this.pipeDir, { recursive: true });
    }
    if (!fs.existsSync(this.pipePath)) {
      this.clear();
    }
  }

  /**
   * Writes intermediate block output into the stream buffer.
   */
  public write(content: string, append: boolean = false): void {
    this.ensureInitialized();
    if (append && fs.existsSync(this.pipePath)) {
      fs.appendFileSync(this.pipePath, `\n\n${content.trim()}`, 'utf-8');
    } else {
      const header = `# Intermediate Pipeline Stream Buffer (DO NOT EDIT MANUALLY)\n\n> *Updated: ${new Date().toISOString()}*\n\n`;
      fs.writeFileSync(this.pipePath, `${header}${content.trim()}\n`, 'utf-8');
    }
  }

  /**
   * Reads current stream buffer.
   */
  public read(): string {
    this.ensureInitialized();
    return fs.readFileSync(this.pipePath, 'utf-8');
  }

  /**
   * Clears the stream buffer.
   */
  public clear(): void {
    if (!fs.existsSync(this.pipeDir)) {
      fs.mkdirSync(this.pipeDir, { recursive: true });
    }
    const emptyTemplate = `# Intermediate Pipeline Stream Buffer (DO NOT EDIT MANUALLY)

<!--
  This buffer holds intermediate output streams between chained dynamic blocks.
  It prevents machine scratchpad text from polluting blackboard.md.
  Flushed or promoted only upon explicit human gate approval.
-->
`;
    fs.writeFileSync(this.pipePath, emptyTemplate, 'utf-8');
  }

  /**
   * Promotes the current pipe buffer yield into blackboard.md under Approved Discoveries.
   */
  public promoteToBlackboard(humanNote?: string): boolean {
    const pipeContent = this.read();
    if (!pipeContent || pipeContent.includes('<!--')) {
      return false;
    }

    const bbPath = path.join(this.workspaceRoot, 'blackboard.md');
    if (!fs.existsSync(bbPath)) {
      return false;
    }

    const bbRaw = fs.readFileSync(bbPath, 'utf-8');
    const noteText = humanNote ? `> *Note: ${humanNote}*\n\n` : '';
    const dateStr = new Date().toISOString().slice(0, 10);
    const addition = `\n\n### Discovery Milestone [${dateStr}]\n${noteText}${pipeContent.replace(/^#\s+[^\n]+\n+/, '').trim()}\n`;

    let updated = bbRaw;
    if (bbRaw.includes('## Approved Discoveries & Settled Decisions')) {
      updated = bbRaw.replace(
        '## Approved Discoveries & Settled Decisions',
        `## Approved Discoveries & Settled Decisions${addition}`
      );
    } else {
      updated = `${bbRaw}\n\n## Approved Discoveries & Settled Decisions${addition}`;
    }

    fs.writeFileSync(bbPath, updated, 'utf-8');
    this.clear();
    return true;
  }
}
