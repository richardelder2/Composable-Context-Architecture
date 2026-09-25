/**
 * Composable Context Architecture (CCA) — Grammar of Thought
 * Implements cognitive block type signatures, grammatical guardrails,
 * and the 8 Canonical Cognitive Topologies.
 */

import type { BlockType, CognitiveTopology } from './types.js';

export interface TopologyDefinition {
  id: CognitiveTopology | string;
  name: string;
  pattern: BlockType[];
  description: string;
  epistemicInvariant: string;
}

export const CANONICAL_TOPOLOGIES: Record<string, TopologyDefinition> = {
  creative_diamond: {
    id: 'creative_diamond',
    name: 'The Creative Diamond',
    pattern: ['beta', 'alpha', 'gamma'],
    description: 'Ground problem -> explore widely -> ruthlessly converge.',
    epistemicInvariant: 'First-Principles & Tradeoff Realism'
  },
  red_team_gauntlet: {
    id: 'red_team_gauntlet',
    name: 'The Red-Team Gauntlet',
    pattern: ['gamma', 'delta', 'alpha'],
    description: 'Isolate core claim -> stress-test to failure -> generate hardening forks.',
    epistemicInvariant: 'Inversion & Boundary Stress-Testing'
  },
  popperian_falsification: {
    id: 'popperian_falsification',
    name: 'The Popperian Falsification',
    pattern: ['alpha', 'delta', 'gamma'],
    description: 'Formulate bold conjecture -> attempt severe refutation -> distill surviving invariant.',
    epistemicInvariant: 'Empirical Falsification'
  },
  diagnostic_refactor: {
    id: 'diagnostic_refactor',
    name: 'The Diagnostic Refactor',
    pattern: ['beta', 'delta', 'alpha'],
    description: 'Deconstruct dependencies -> pinpoint failure points -> generate targeted refactor options.',
    epistemicInvariant: 'Root-Cause Medicine & Invariant Isolation'
  },
  socratic_drill_down: {
    id: 'socratic_drill_down',
    name: 'The Socratic Drill-Down',
    pattern: ['beta', 'beta', 'gamma'],
    description: 'Surface probe -> deep premise unrolling -> axiomatic grounding.',
    epistemicInvariant: 'Socratic Humility & Definitional Precision'
  },
  analogical_leap: {
    id: 'analogical_leap',
    name: 'The Analogical Leap',
    pattern: ['beta', 'alpha', 'delta', 'gamma'],
    description: 'Abstract topology -> import cross-domain isomorphism -> verify mechanics -> distill valid patterns.',
    epistemicInvariant: 'Latticework of Mental Models'
  },
  perspective_interrogation: {
    id: 'perspective_interrogation',
    name: 'The Perspective Interrogation',
    pattern: ['alpha', 'beta', 'beta'],
    description: 'Steelman outside lenses -> scan friction points -> Socratic probe on deepest tension.',
    epistemicInvariant: 'Steelmanning & Multi-Perspective Audit'
  },
  strawman_catalyst: {
    id: 'strawman_catalyst',
    name: 'The Strawman Catalyst',
    pattern: ['alpha', 'beta', 'gamma'],
    description: 'Generate intentionally flawed draft -> capture human reaction -> extract invariants.',
    epistemicInvariant: 'Low-Stakes Prototyping (Failing Cheaply)'
  }
};

export class CognitiveGrammar {
  /**
   * Validates whether a sequence of block types satisfies the 3 Grammatical Guardrails.
   */
  public validateChain(chain: BlockType[]): { valid: boolean; reason?: string } {
    if (!chain || chain.length === 0) {
      return { valid: false, reason: 'Pipeline chain cannot be empty.' };
    }

    // Guardrail 1: No Cold Attacks
    // A verifier/attack (delta) cannot run as the first step on an empty context.
    if (chain[0] === 'delta') {
      return {
        valid: false,
        reason: 'Guardrail 1 Violated (No Cold Attacks): A verifier (delta) cannot execute first without prior grounding (beta) or proposition (alpha).'
      };
    }

    // Guardrail 2: Divergence Circuit-Breaker
    // Prevent 3 consecutive generators (alpha -> alpha -> alpha) without a pruning/distillation or inquiry step.
    let consecutiveAlphas = 0;
    for (let i = 0; i < chain.length; i++) {
      if (chain[i] === 'alpha') {
        consecutiveAlphas++;
        if (consecutiveAlphas >= 3) {
          return {
            valid: false,
            reason: 'Guardrail 2 Violated (Divergence Circuit-Breaker): 3+ consecutive generators (alpha) cause cognitive paralysis. Insert a distiller (gamma) or inquirer (beta).'
          };
        }
      } else {
        consecutiveAlphas = 0;
      }
    }

    // Guardrail 3: Grounding Rule
    // Multi-step pipelines (length >= 2) must conclude with a distiller (gamma) or generator (alpha for forks),
    // and should not end dangling on an unhandled destructive attack (delta).
    if (chain.length >= 2 && chain[chain.length - 1] === 'delta') {
      return {
        valid: false,
        reason: 'Guardrail 3 Violated (Dangling Attack): A pipeline cannot end on an unmitigated attack (delta). It must resolve into hardening options (alpha) or distilled invariants (gamma).'
      };
    }

    return { valid: true };
  }

  /**
   * Matches a given chain of types to a known canonical topology, if one matches.
   */
  public matchTopology(chain: BlockType[]): TopologyDefinition | undefined {
    for (const topo of Object.values(CANONICAL_TOPOLOGIES)) {
      if (
        topo.pattern.length === chain.length &&
        topo.pattern.every((val, idx) => val === chain[idx])
      ) {
        return topo;
      }
    }
    return undefined;
  }
}
