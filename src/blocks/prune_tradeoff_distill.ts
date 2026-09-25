/**
 * Composable Context Architecture (CCA) — Blocks for /prune, /tradeoff, and /distill
 * Epistemic Disciplines: Ruthless Elimination, Tradeoff Realism, and Invariant Crystallization.
 */

import type { Block, BlockOutput } from '../core/types.js';

function estTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// -------------------------------------------------------------
// /prune Blocks (Type: gamma - Ruthless Elimination & Sieve)
// -------------------------------------------------------------

export const pruneConstraintSieveBlock: Block = {
  id: 'prune:constraint_sieve',
  name: 'Constraint Sieve (Ruthless Elimination)',
  type: 'gamma',
  skillId: 'prune',
  description: 'Applies hard negative constraints to ruthlessly kill non-viable options early.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [PRUNE: Constraint Sieve & Elimination]

> *"Strategy is about deciding what NOT to do."*

[Elimination Criteria]
1. Violates zero runtime dependencies? -> Kill immediately.
2. Exceeds the 3,000 token context budget? -> Kill immediately.
3. Requires silent unilateral rewrites? -> Kill immediately.

[Culling Proposal]
- Which of the candidate options clearly fails one of these non-negotiables?
- Let us eliminate them now to reduce cognitive burden.
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

// -------------------------------------------------------------
// /tradeoff Blocks (Type: gamma - Tradeoff Matrix)
// -------------------------------------------------------------

export const tradeoffMatrixBlock: Block = {
  id: 'tradeoff:matrix',
  name: 'Multi-Axis Tradeoff Matrix',
  type: 'gamma',
  skillId: 'tradeoff',
  description: 'Constructs an explicit multi-dimensional cost/benefit ledger across options.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [TRADEOFF: Multi-Axis Cost/Benefit Matrix]

> *"There are no solutions, only trade-offs." — Thomas Sowell*

| Dimension | Option A (Conservative) | Option B (Decoupled) | Option C (Minimalist) |
| :--- | :--- | :--- | :--- |
| **Cognitive Overhead** | Low (familiar patterns) | Medium (new mental model) | Very Low (fewer parts) |
| **Architectural Purity** | Low (tech debt) | High (isolated concerns) | High (zero cruft) |
| **Failure Blast Radius** | High (coupled components) | Low (firewalled buffer) | Low (isolated scope) |
| **Initial Build Cost** | Low (immediate fix) | Medium (protocol setup) | Zero (deletion) |

[Author Decision]
Which specific cost are you most willing to bear?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

// -------------------------------------------------------------
// /distill Blocks (Type: gamma - Invariant Crystallization)
// Authority: Machine extracts invariants; human validates.
// -------------------------------------------------------------

export const distillInvariantsBlock: Block = {
  id: 'distill:extract_invariants',
  name: 'Invariant Extraction & Crystallization',
  type: 'gamma',
  skillId: 'distill',
  description: 'Extracts irreducible axioms, state invariants, and non-negotiables from messy exploratory text.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [DISTILL: Irreducible Invariants]

> *Authority Mode: Synthesis. Machine extracts invariants; human validates.*

From the active exploration stream, here are the non-negotiable invariants:

1. **The Sovereignty Invariant:** Human holds the pen; machine amplifies capability without absorbing agency.
2. **The Glass Box Invariant:** Filesystem is the database; all state is cwd-relative plain text.
3. **The Token Discipline Invariant:** Transient action pipe is bounded strictly to <= 3,000 tokens.
4. **The Stream Buffer Invariant:** Intermediate machine yields stream through .cca/pipe.md without polluting blackboard.md.

[Human Verification]
Do these invariants capture the true bedrock of your intent?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

export const distillSummaryBlock: Block = {
  id: 'distill:executive_summary',
  name: 'Executive 1-Page Briefing',
  type: 'gamma',
  skillId: 'distill',
  description: 'Condenses the stabilized exploration into a dense 1-page briefing ready for blackboard promotion.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [DISTILL: Stabilized Discovery Briefing]

- **Core Problem:** Establishing the Composable Context Architecture reference implementation.
- **Settled Direction:** Zero-dependency, OS-agnostic cognitive engine with Google OKF native resolution.
- **Next Gated Action:** Ready to promote to blackboard.md or compile via 'cca compile --to=icm'.
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};
