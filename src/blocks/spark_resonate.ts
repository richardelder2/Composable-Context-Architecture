/**
 * Composable Context Architecture (CCA) — Blocks for /spark and /resonate
 */

import type { Block, BlockOutput } from '../core/types.js';

function estTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// -------------------------------------------------------------
// /spark Blocks (Type: alpha - Generator)
// -------------------------------------------------------------

export const sparkStrawmanBlock: Block = {
  id: 'spark:strawman',
  name: 'Strawman Prototype Generator',
  type: 'alpha',
  skillId: 'spark',
  description: 'Generates a low-stakes, intentionally imperfect, concrete strawman prototype to react against.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [SPARK: Strawman Prototype]

> *This is an intentionally naive, fast prototype built from your raw intent. It is designed to be torn apart, critiqued, or revised.*

### Proposed Concrete Draft / Schema
\`\`\`markdown
${input.trim() || 'Core entity: [Component A] -> [Action] -> [Outcome]'}
\`\`\`

### Diagnostic Reaction Prompts
1. What is the single most offensive or incorrect assumption in this draft?
2. Which part, if any, accidentally points in the right direction?
3. Where does this proposal break in the real world?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

export const sparkSeedContrastBlock: Block = {
  id: 'spark:seed_contrast',
  name: 'Seed Contrast Generator',
  type: 'alpha',
  skillId: 'spark',
  description: 'Generates two polar, extreme caricatures of the solution to force clarity.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [SPARK: Polar Extremes Contrast]

To break the blank page, here are two extreme caricatures of the solution:

[Caricature 1: The Maximum Minimalist]
- Strip every feature down to bare bones. One endpoint, one rule, manual intervention for everything else.

[Caricature 2: The Infinite Enterprise]
- Over-engineer every edge case. Distributed consensus, multi-tenant RBAC, full audit ledgers.

[Author Reaction]
- Which extreme makes you more uncomfortable, and why?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

// -------------------------------------------------------------
// /resonate Blocks (Type: beta - Inquirer)
// -------------------------------------------------------------

export const resonateFeltSenseBlock: Block = {
  id: 'resonate:felt_sense',
  name: 'Sensemaking Mirror',
  type: 'beta',
  skillId: 'resonate',
  description: 'Verbalizes raw, ambiguous intuition into distinct conceptual interpretations.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [RESONATE: Sensemaking Mirror]

You expressed an intuitive, unformed direction. Here are three distinct conceptual verbalizations of what your intuition might be tracking:

[Interpretation A (Mechanical / Structural)]
- Is your intuition pointing to an architectural bottleneck or data-flow friction?

[Interpretation B (Human / Cognitive Experience)]
- Is it pointing to cognitive overload, emotional dissonance, or user friction?

[Interpretation C (Incentive / Systemic Dynamic)]
- Is it pointing to misaligned incentives or unstated structural politics?

[Human Anchor]
- Which of these labels resonates closest to the "itch" you are feeling?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};
