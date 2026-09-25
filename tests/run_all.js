/**
 * Composable Context Architecture (CCA) — Zero-Dependency Test Runner
 */

import { runPrimitivesTests } from './primitives.test.js';
import { runOkfResolverTests } from './okf_resolver.test.js';
import { runGrammarAndBlocksTests } from './grammar_and_blocks.test.js';

async function main() {
  console.log('=====================================================');
  console.log('🚀 CCA Test Suite (Zero Runtime Dependencies)');
  console.log('=====================================================\n');

  try {
    await runPrimitivesTests();
    await runOkfResolverTests();
    await runGrammarAndBlocksTests();
    console.log('✅ ALL TEST SUITES PASSED SUCCESSFULLY');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ TEST SUITE FAILED:', err);
    process.exit(1);
  }
}

main();
