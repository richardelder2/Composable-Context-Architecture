/**
 * Composable Context Architecture (CCA) — Blocks for /dig, /unroll, and /zoom
 * Epistemic Disciplines: Socratic Humility, First Principles, and Altitude Agility.
 */

import type { Block, BlockOutput } from '../core/types.js';

function estTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// -------------------------------------------------------------
// /dig Blocks (Type: beta - Socratic Inquirer)
// Authority: Human supplies content; machine asks 1 question at a time.
// -------------------------------------------------------------

export const digProbeBlock: Block = {
  id: 'dig:probe',
  name: 'Socratic Single Probe',
  type: 'beta',
  skillId: 'dig',
  description: 'Asks one diagnostic question derived strictly from the human last token. Never proposes solutions.',
  run: async (input: string): Promise<BlockOutput> => {
    const lastPhrase = input.trim().split(/\r?\n/).filter(Boolean).pop() || 'the problem';
    const yieldText = `## [DIG: Socratic Probe]

> *Authority Mode: Socratic Discovery. The machine supplies zero content or solutions.*

Derived directly from your words: *" ... ${lastPhrase.slice(-100)}"*

**The Question:**
When you refer to this specific constraint, what is the exact non-negotiable outcome that would make everything else secondary?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

export const digReflectBlock: Block = {
  id: 'dig:reflect',
  name: 'Socratic Thesis Mirror',
  type: 'beta',
  skillId: 'dig',
  description: 'Reflects the core thesis back to the author verbatim, checking for alignment.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [DIG: Thesis Mirror]

Here is the irreducible premise stated in your own words:

> ${input.trim().slice(0, 300)}

Is this the exact bedrock problem, or is there an unstated layer underneath it?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

// -------------------------------------------------------------
// /unroll Blocks (Type: beta - First-Principles Deconstructor)
// -------------------------------------------------------------

export const unrollDependencyGraphBlock: Block = {
  id: 'unroll:dependency_graph',
  name: 'Dependency Graph Deconstructor',
  type: 'beta',
  skillId: 'unroll',
  description: 'Decomposes complex systems into causal order and prerequisite chains.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [UNROLL: Dependency Topology]

Deconstructing the problem space into causal layers:

\`\`\`
Layer 0 (Axioms / Physics):
└── Ground constraints that cannot be bargained with.

Layer 1 (State & Data Dependencies):
└── Components that must exist before execution can begin.

Layer 2 (Execution & Interaction):
└── The dynamic operations triggered by human or system input.
\`\`\`

[Author Verification Required]
- Does Layer 0 contain any hidden assumptions that belong in Layer 1?
- Which dependency is currently creating the tightest coupling?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

export const unrollAssumptionsBlock: Block = {
  id: 'unroll:unroll_assumptions',
  name: 'Hidden Assumption Isolator',
  type: 'beta',
  skillId: 'unroll',
  description: 'Exposes implicit premises treated as given facts.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [UNROLL: Hidden Assumptions Audit]

Examining the foundation of the active proposal:

1. [Assumption A]: We assume the network / user / environment behaves reliably.
2. [Assumption B]: We assume the throughput / scope does not scale by 10x.
3. [Assumption C]: We assume all participants share the same definition of success.

[Author Action]
Which of these assumptions, if proven false tomorrow, destroys the entire premise?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

// -------------------------------------------------------------
// /zoom Blocks (Type: beta - Altitude Agility)
// -------------------------------------------------------------

export const zoomOutBlock: Block = {
  id: 'zoom:out_macro',
  name: 'Macro Horizon Zoom-Out',
  type: 'beta',
  skillId: 'zoom',
  description: 'Elevates immediate tactical details to 30,000-foot systemic and strategic stakes.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [ZOOM OUT: The Strategic Horizon]

Stepping back from the immediate implementation details:

- **Systemic Goal:** What larger capability does this unblock for the entire system?
- **Horizon Impact:** If we solve this perfectly today, what is the next wall we hit 6 months from now?
- **The Core Tradeoff:** What strategic flexibility are we trading away for this immediate speed?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

export const zoomInBlock: Block = {
  id: 'zoom:in_tactical',
  name: 'Tactical Ground Zoom-In',
  type: 'beta',
  skillId: 'zoom',
  description: 'Drills a lofty abstract principle down to a concrete 1-inch execution beat or API call.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [ZOOM IN: Tactical Ground Truth]

Grounding the high-level principle into a concrete physical beat:

\`\`\`
Scenario: Monday morning at 09:00 AM.
Actor: [Specific User / Consumer]
Action: Invokes [Specific Interface / Operation]
Failure Mode: Returns [Specific Concrete Error / Resistance]
\`\`\`

Can you describe the exact byte payload or physical interaction in that single second?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};
