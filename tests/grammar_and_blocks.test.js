/**
 * Composable Context Architecture (CCA) — Phase 2 Grammar & Blocks Test Suite
 * Asserts the Cognitive Grammar guardrails, 8 canonical topologies, and block execution.
 */

import assert from 'node:assert';
import { CognitiveGrammar, CANONICAL_TOPOLOGIES } from '../dist/core/grammar.js';
import { getAllBlocks, getBlock, getBlocksByType } from '../dist/blocks/registry.js';

export async function runGrammarAndBlocksTests() {
  console.log('🧪 Running Phase 2 Grammar & Blocks Tests...\n');

  // ---------------------------------------------------------
  // TEST 1: Cognitive Grammar & Topologies
  // ---------------------------------------------------------
  console.log('  Testing CognitiveGrammar (Guardrails & Canonical Topologies)...');
  const grammar = new CognitiveGrammar();

  // Test all 8 canonical topologies validate cleanly
  for (const [key, topo] of Object.entries(CANONICAL_TOPOLOGIES)) {
    const valRes = grammar.validateChain(topo.pattern);
    assert.strictEqual(valRes.valid, true, `Topology ${key} (${topo.name}) must be valid`);
    const matched = grammar.matchTopology(topo.pattern);
    assert.ok(matched !== undefined, `Topology ${key} must match its pattern`);
  }
  console.log('  ✅ All 8 Canonical Topologies validated.');

  // Guardrail 1: No Cold Attacks
  const coldAttack = grammar.validateChain(['delta', 'alpha']);
  assert.strictEqual(coldAttack.valid, false, 'Cold attack (delta first) must fail');
  assert.ok(coldAttack.reason?.includes('Guardrail 1'), 'Must cite Guardrail 1');

  // Guardrail 2: Divergence Circuit-Breaker (3 alphas)
  const runawayDivergence = grammar.validateChain(['alpha', 'alpha', 'alpha']);
  assert.strictEqual(runawayDivergence.valid, false, '3 consecutive alphas must fail');
  assert.ok(runawayDivergence.reason?.includes('Guardrail 2'), 'Must cite Guardrail 2');

  // Guardrail 3: Dangling Attack
  const danglingAttack = grammar.validateChain(['beta', 'delta']);
  assert.strictEqual(danglingAttack.valid, false, 'Chain ending on delta must fail');
  assert.ok(danglingAttack.reason?.includes('Guardrail 3'), 'Must cite Guardrail 3');

  console.log('  ✅ All 3 Grammatical Guardrails strictly enforced.\n');

  // ---------------------------------------------------------
  // TEST 2: Block Registry & Typings
  // ---------------------------------------------------------
  console.log('  Testing Block Registry (Type classification & signatures)...');
  const allBlocks = getAllBlocks();
  assert.ok(allBlocks.length >= 15, `Must have registered blocks (found ${allBlocks.length})`);

  const alphas = getBlocksByType('alpha');
  const betas = getBlocksByType('beta');
  const gammas = getBlocksByType('gamma');
  const deltas = getBlocksByType('delta');

  assert.ok(alphas.length >= 4, 'Must have at least 4 alpha blocks');
  assert.ok(betas.length >= 5, 'Must have at least 5 beta blocks');
  assert.ok(gammas.length >= 3, 'Must have at least 3 gamma blocks');
  assert.ok(deltas.length >= 2, 'Must have at least 2 delta blocks');
  console.log(`  ✅ Registry verified (${alphas.length} α, ${betas.length} β, ${gammas.length} γ, ${deltas.length} δ).\n`);

  // ---------------------------------------------------------
  // TEST 3: Block Execution & Output Invariants
  // ---------------------------------------------------------
  console.log('  Testing Block Execution & Authority Contracts...');
  const testCases = [
    { id: 'spark:strawman', input: 'Need a fast distributed queue' },
    { id: 'dig:probe', input: 'The client timeout is set to 500ms' },
    { id: 'bracket:diverge', input: 'How do we handle network partitions?' },
    { id: 'tether:interrogate', input: 'Immediate read consistency with disconnected nodes' },
    { id: 'distill:extract_invariants', input: 'Exploration stream of invariants and rules' }
  ];

  for (const tc of testCases) {
    const block = getBlock(tc.id);
    assert.ok(block !== undefined, `Block ${tc.id} must exist in registry`);
    const output = await block.run(tc.input);

    assert.ok(output.yieldText.length > 0, `Block ${tc.id} must produce output`);
    assert.ok(output.tokenCount <= 1200, `Block ${tc.id} output must be under 1,200 tokens (was ${output.tokenCount})`);

    // Verify bracket notation or authority tags
    assert.ok(
      output.yieldText.includes('[') && output.yieldText.includes(']'),
      `Block ${tc.id} must format output using bracket method`
    );
  }
  console.log('  ✅ Block outputs adhere to token limits and bracket authority formatting.\n');

  console.log('🎉 All Phase 2 Grammar & Blocks Tests Passed!\n');
}
