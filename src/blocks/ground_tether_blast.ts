/**
 * Composable Context Architecture (CCA) — Blocks for /ground, /tether, and /blast
 * Epistemic Disciplines: Empirical Precedent, Internal Contradiction, and Inversion / Pre-Mortems.
 */

import type { Block, BlockOutput } from '../core/types.js';

function estTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// -------------------------------------------------------------
// /ground Blocks (Type: beta - Empirical Precedent & OKF)
// -------------------------------------------------------------

export const groundPrecedentBlock: Block = {
  id: 'ground:precedent',
  name: 'Empirical Precedent & Prior Art',
  type: 'beta',
  skillId: 'ground',
  description: 'Anchors current proposals to historical precedents, known industrial failure modes, and OKF knowledge.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [GROUND: Empirical Precedent & Prior Art]

Anchoring the proposal against real-world systems and historical precedent:

- **Historical Precedent:** Where has this architectural pattern or narrative structure been deployed in the past?
- **Known Failure Mode:** What is the standard failure mode documented in industry (e.g. split-brain in distributed systems, pacing collapse in act 2)?
- **Google OKF Anchor:** What fundamental invariant cards in the mounted OKF bundle govern this domain?

[Author Grounding]
Are we knowingly deviating from established precedent, or are we accidentally repeating a solved mistake?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

// -------------------------------------------------------------
// /tether Blocks (Type: delta - Internal Logic & Continuity)
// Authority: Machine stress-tests claims & continuity; human resolves.
// -------------------------------------------------------------

export const tetherInterrogateBlock: Block = {
  id: 'tether:interrogate',
  name: 'Internal Logic & Contradiction Interrogation',
  type: 'delta',
  skillId: 'tether',
  description: 'Stress-tests internal logical consistency, spotting circular reasoning or broken constraints.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [TETHER: Logic & Continuity Interrogation]

> *Authority Mode: Interrogation. The machine stress-tests claims; the human resolves.*

[Diagnostic Audit of Internal Constraints]
1. [Contradiction Finding]: Does requirement A ("instant low-latency updates") conflict with constraint B ("offline-first synchronization without merge conflicts")?
2. [Causal Loop Finding]: Does step 3 rely on state that step 1 assumes is already finalized?
3. [Dormant Dependency]: Is there an unstated variable that has not been addressed?

[Author Resolution Required]
How do you intend to reconcile the tension between these competing constraints?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

// -------------------------------------------------------------
// /blast Blocks (Type: delta - Inversion & Boundary Stress-Testing)
// -------------------------------------------------------------

export const blastPreMortemBlock: Block = {
  id: 'blast:pre_mortem',
  name: 'Catastrophic Pre-Mortem & Inversion',
  type: 'delta',
  skillId: 'blast',
  description: 'Assumes the project suffered catastrophic failure in the future and works backward to identify the fatal flaw.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [BLAST: Catastrophic Pre-Mortem (Inversion)]

> *Scenario: It is 12 months in the future. The system collapsed, the user abandoned it, or the architecture suffered an unrecoverable failure. Why did it die?*

[Fatal Flaw 1: Unbounded Growth Collapse]
- The memory footprint or context window scaled linearly with time until it crashed the host.

[Fatal Flaw 2: The Cognitive Chasm]
- The operational burden of managing this system exhausted the human operator, leading to neglect.

[Fatal Flaw 3: Boundary Failure]
- An edge case that was considered "unlikely" occurred on day 3 and corrupted the primary state store.

[Inversion Hardening]
Which of these catastrophic failure modes is most probable if left unaddressed right now?
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};

export const blastRadiusBlock: Block = {
  id: 'blast:blast_radius',
  name: 'Blast Radius Mapping',
  type: 'delta',
  skillId: 'blast',
  description: 'Calculates downstream secondary and tertiary fallout if a core component fails.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [BLAST: Blast Radius Assessment]

Mapping downstream damage if the active component experiences an unhandled failure:

- **Immediate Impact (Primary Blast):** The active operation fails with an unhandled exception.
- **Secondary Impact (Downstream Cascade):** The transient context pipe is not cleared, leaking stale state into subsequent operations.
- **Tertiary Impact (Systemic Contamination):** Corrupted state is committed to permanent storage.

[Hardening Recommendation]
Wrap the active execution in a strict boundary firewall and verify isolation guarantees.
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};
