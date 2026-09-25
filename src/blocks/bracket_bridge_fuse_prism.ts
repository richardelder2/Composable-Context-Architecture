/**
 * Composable Context Architecture (CCA) — Blocks for /bracket, /bridge, /fuse, and /prism
 * Epistemic Disciplines: Structural Divergence, Latticework Isomorphism, Dialectical Synthesis, Steelmanning.
 */

import type { Block, BlockOutput } from '../core/types.js';

function estTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// -------------------------------------------------------------
// /bracket Blocks (Type: alpha - Divergence)
// Authority: Machine offers 3 structured options; human holds the red pen.
// -------------------------------------------------------------

export const bracketDivergeBlock: Block = {
  id: 'bracket:diverge',
  name: '3-Option Structural Fork',
  type: 'alpha',
  skillId: 'bracket',
  description: 'Generates 3 orthogonal approaches quarantined in brackets, reserving Option D for human direction.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [BRACKET: 3-Option Structural Divergence]

> *Authority Mode: Divergence. The machine proposes structural forks; the human holds the red pen.*

[Option A: The Conservative Path]
- Minimize state changes. Solve strictly within established boundaries and existing interfaces.
- *Tradeoff:* Lower risk, but accumulates technical / narrative debt.

[Option B: The Decoupled Inversion]
- Separate the mechanism from the policy. Introduce an asynchronous buffer or intermediate protocol.
- *Tradeoff:* Greater architectural cleanliness, higher initial scaffolding cost.

[Option C: The Radical Deletion]
- Eliminate the problematic requirement entirely. Shift responsibility to the caller / reader.
- *Tradeoff:* Simplifies the core, but requires redefining upstream expectations.

[Option D: Author's Custom Direction]
- Write in your own path or combine elements from above.
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

// -------------------------------------------------------------
// /bridge Blocks (Type: alpha - Latticework Isomorphism)
// -------------------------------------------------------------

export const bridgeCrossPollinateBlock: Block = {
  id: 'bridge:cross_pollinate',
  name: 'Cross-Domain Structural Isomorphism',
  type: 'alpha',
  skillId: 'bridge',
  description: 'Imports structural mechanisms from orthogonal disciplines (biology, economics, architecture).',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [BRIDGE: Cross-Domain Isomorphism]

Mapping the abstract topology of this challenge to distant disciplines:

[Isomorphism 1: Biological Immune System (Negative Selection)]
- How nature solves distributed consensus without a central database: T-cells are trained against self-antigens and destroyed if they attack the host.
- *Application:* Can we validate invariants using negative selection rather than active locks?

[Isomorphism 2: Urban Traffic Design (Roundabouts vs. Signals)]
- Traffic signals impose centralized state; roundabouts resolve contention through local velocity and right-of-way rules.
- *Application:* Can components negotiate state locally instead of consulting a centralized coordinator?

[Isomorphism 3: Double-Entry Bookkeeping (Invariable Audits)]
- You never erase or mutate state; you only append balancing credits and debits.
- *Application:* Event-sourcing / append-only history.
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

// -------------------------------------------------------------
// /fuse Blocks (Type: alpha - Dialectical Synthesis)
// -------------------------------------------------------------

export const fuseSynthesisBlock: Block = {
  id: 'fuse:synthesis',
  name: 'Dialectical Synthesis (Breaking False Binaries)',
  type: 'alpha',
  skillId: 'fuse',
  description: 'Synthesizes two opposing polar requirements into third-way architectures that transcend the paradox.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [FUSE: Dialectical Synthesis]

Examining the tension between opposing polar requirements:

- **Thesis:** Speed, fluidity, and immediate responsiveness.
- **Antithesis:** Rigorous consistency, safety, and auditability.

[Synthesis Pathway 1: Temporal Separation]
- Operate fluidly in the fast path (optimistic concurrency), reconcile asynchronously in the background.

[Synthesis Pathway 2: Boundary Layer Decoupling]
- Strict invariants at the core perimeter; completely unconstrained exploration inside the cell.

[Synthesis Pathway 3: Dual-Mode Architecture]
- Two explicit operating gears: Draft Mode (fluid/lenient) and Commit Mode (strict/gated).
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

// -------------------------------------------------------------
// /prism Blocks (Type: alpha - Steelmanning & Multi-Perspective)
// -------------------------------------------------------------

export const prismCastLensesBlock: Block = {
  id: 'prism:cast_lenses',
  name: 'Multi-Stakeholder Steelmanning Lenses',
  type: 'alpha',
  skillId: 'prism',
  description: 'Audits the proposal through 3-4 distinct archetypal lenses without deciding between them.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [PRISM: Multi-Perspective Steelmanning]

Evaluating the proposal through orthogonal archetypal lenses:

[Lens 1: The Harsh Skeptic]
- *"This looks elegant on a whiteboard, but in production the network partitions and human memory will break this within a week."*

[Lens 2: The First-Time User / Novice]
- *"I have no idea what these abbreviations mean. Where do I click? What happens if I make a mistake?"*

[Lens 3: The 3:00 AM Maintenance Engineer]
- *"When this breaks in the middle of the night, what log line tells me what went wrong? Is the state reproducible?"*

[Lens 4: The Adversarial Actor]
- *"How can I game these incentives or exploit this open loop to extract value without contributing?"*

[Author Judgment]
Which of these perspectives reveals a structural risk that must be addressed before proceeding?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};
