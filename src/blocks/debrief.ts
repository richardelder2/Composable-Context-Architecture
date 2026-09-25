/**
 * Composable Context Architecture (CCA) — /debrief Metacognitive Block
 * Helps the user reflect on their own thinking, reinforcing critical thinking capacity.
 * Plain-language, concise, and high-impact.
 */

import type { Block, BlockOutput } from '../core/types.js';

function estTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export const debriefSessionBlock: Block = {
  id: 'debrief:session_reflection',
  name: 'Metacognitive Session Debrief',
  type: 'gamma',
  skillId: 'debrief',
  description: 'Conducts a 3-question reflection at session close to reinforce critical thinking habits.',
  run: async (input: string): Promise<BlockOutput> => {
    const yieldText = `## [DEBRIEF: Thinking Reflection]

> *Why this move: Metacognition. Taking 60 seconds to reflect on HOW you thought solidifies your reasoning and prevents repeating old mistakes.*

### 1. The Pivot
**What assumption did you start with that changed or got thrown out today?**
<!-- Your answer here: e.g., "I thought we needed microservices, but a modular monolith is much simpler." -->

### 2. The Negative Choice
**What did you explicitly decide NOT to do, and why?**
<!-- Your answer here: e.g., "Decided not to support real-time sync in v1 to keep data safety guaranteed." -->

### 3. The Core Invariant
**What is the single non-negotiable truth you are carrying forward into execution?**
<!-- Your answer here: e.g., "The human always signs off before any data is permanently written." -->

---
*Run 'cca compile' when you are ready to turn these settled decisions into a formal project pipeline.*
`;
    return { yieldText, tokenCount: estTokens(yieldText) };
  }
};
