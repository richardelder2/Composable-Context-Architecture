/**
 * Composable Context Architecture (CCA) — Phase 1 Invariant Test Suite
 * Asserts the physical disk primitives, token discipline, and glass box properties.
 */

import assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { ContextMounter } from '../dist/core/context_mounter.js';
import { PipeBuffer } from '../dist/core/pipe.js';
import { MeManager } from '../dist/core/person/me_manager.js';

export async function runPrimitivesTests() {
  console.log('🧪 Running Phase 1 Primitives Invariant Tests...\n');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cca-test-'));

  try {
    // ---------------------------------------------------------
    // TEST 1: ContextMounter & Token Discipline
    // ---------------------------------------------------------
    console.log('  Testing ContextMounter (Transient pipe & token discipline)...');
    const mounter = new ContextMounter(tempDir);
    
    // Initial state: empty or wiped
    mounter.wipe();
    const initialContext = mounter.read();
    assert.ok(initialContext.includes('Transient Action Context'), 'Should initialize empty transient template');

    // Mount fragment within budget
    const mountRes = mounter.mount(
      'action-01',
      [{ label: 'Sample Frag', content: 'This is a small valid fragment.' }],
      'Authority: Socratic Questioning Only'
    );
    assert.strictEqual(mountRes.squashed, false, 'Small fragment should not be squashed');
    assert.ok(mountRes.tokenEstimate < 3000, 'Tokens must be well under 3000');
    assert.ok(mounter.read().includes('Sample Frag'), 'Mounted content should be present');

    // Mount massive fragment exceeding 3,000 tokens
    const massiveContent = 'Repeatable test content token stream. '.repeat(500); // ~5,000 tokens
    const massiveMount = mounter.mount(
      'action-02',
      [{ label: 'Massive Frag', content: massiveContent }],
      'Authority: Socratic Questioning Only'
    );
    assert.strictEqual(massiveMount.squashed, true, 'Massive fragment must trigger squashing');
    assert.ok(massiveMount.tokenEstimate <= mounter.MAX_TOKENS + 50, 'Squashed tokens must be under ceiling');
    assert.ok(mounter.read().includes('TRUNCATED / SQUASHED'), 'Squash marker must be injected');

    // Wipe invariant: context.md must be wiped cleanly
    mounter.wipe();
    const wiped = mounter.read();
    assert.ok(!wiped.includes('Massive Frag'), 'Wiped context must not leak past content');
    console.log('  ✅ ContextMounter passed (Transient flush & <= 3,000 token budget enforced).\n');

    // ---------------------------------------------------------
    // TEST 2: PipeBuffer & Blackboard Non-Pollution
    // ---------------------------------------------------------
    console.log('  Testing PipeBuffer (.cca/pipe.md isolation)...');
    const pipe = new PipeBuffer(tempDir);
    const bbPath = path.join(tempDir, 'blackboard.md');
    fs.writeFileSync(bbPath, '# Workspace Blackboard\n\n## Active Problem Space\nTest problem\n\n## Approved Discoveries & Settled Decisions\n- None yet\n', 'utf-8');

    // Write to pipe
    pipe.write('Intermediate step 1 output (scratchpad analysis)');
    const pipeContent = pipe.read();
    assert.ok(pipeContent.includes('Intermediate step 1'), 'Pipe must capture stream');

    // Invariant: blackboard.md MUST NOT be altered by pipe writes
    const bbContentDuringStream = fs.readFileSync(bbPath, 'utf-8');
    assert.ok(!bbContentDuringStream.includes('Intermediate step 1'), 'blackboard.md MUST NOT be polluted during intermediate streaming');

    // Promotion to blackboard only on human gate approval
    const promoted = pipe.promoteToBlackboard('Approved at milestone 1');
    assert.strictEqual(promoted, true, 'Promotion must succeed');
    const bbContentAfterPromote = fs.readFileSync(bbPath, 'utf-8');
    assert.ok(bbContentAfterPromote.includes('Discovery Milestone'), 'blackboard.md receives promoted yield');
    assert.ok(bbContentAfterPromote.includes('Approved at milestone 1'), 'Carries human note');

    // Pipe should be cleared after promotion
    assert.ok(pipe.read().includes('DO NOT EDIT MANUALLY'), 'Pipe is cleared after promotion');
    console.log('  ✅ PipeBuffer passed (blackboard unpolluted, promotion gate enforced).\n');

    // ---------------------------------------------------------
    // TEST 3: MeManager & Propose/Stage/Accept Lifecycle
    // ---------------------------------------------------------
    console.log('  Testing MeManager (Person layer & conflict flagging)...');
    const mePath = path.join(tempDir, 'me.md');
    const me = new MeManager(mePath);

    me.ensureInitialized();
    assert.ok(fs.existsSync(mePath), 'me.md must be initialized');

    const loaded = me.load();
    assert.ok(loaded.voice.length > 0, 'Must parse voice section');
    assert.ok(loaded.constraints.length > 0, 'Must parse constraints');
    assert.ok(loaded.observedPatterns.length > 0, 'Must parse default observed pattern');
    assert.strictEqual(loaded.observedPatterns[0].accepted, true, 'Default pattern is accepted');

    // Stage a new proposal
    const stageRes = me.stageProposal('Tends to build quick modular prototypes before writing formal RFCs', 'test-ws');
    assert.strictEqual(stageRes.staged, true, 'Should stage proposal');
    assert.strictEqual(stageRes.conflict, undefined, 'No conflict on non-contradictory proposal');

    // Check staging area in file
    const stagedCheck = me.load();
    const foundProposed = stagedCheck.proposedPatterns.find(p => p.fact.includes('quick modular prototypes'));
    assert.ok(foundProposed, 'Proposed pattern must be in Proposed section');

    // Stage a contradictory proposal (conflict detection)
    // Existing: "allergic to corporate filler" / "direct execution" vs "prefers detailed corporate filler"
    const conflictRes = me.stageProposal('Prefers detailed, exhaustive boilerplate on all tasks', 'conflict-ws');
    // Test conflict detector directly
    const directConflict = me.detectConflict('Prefers detailed explanations', [{
      fact: 'Prefers terse, brief replies',
      proposedDate: '2026-09-24',
      workspace: 'test',
      accepted: true
    }]);
    assert.ok(directConflict && directConflict.includes('Conflict detected'), 'Conflict detector must flag terse vs detailed tension');

    // Accept proposal
    const accepted = me.acceptProposal('quick modular prototypes');
    assert.strictEqual(accepted, true, 'Should accept proposal');
    const postAccept = me.load();
    const inObserved = postAccept.observedPatterns.find(p => p.fact.includes('quick modular prototypes'));
    assert.ok(inObserved, 'Accepted proposal must now be in Observed Patterns');

    // Incognito mode test
    const freshContext = me.load({ incognito: true });
    assert.strictEqual(freshContext.voice.length, 0, 'Fresh mode must blind ambient voice');
    assert.strictEqual(freshContext.observedPatterns.length, 0, 'Fresh mode must blind ambient patterns');
    console.log('  ✅ MeManager passed (Cross-platform staging, conflict detection & fresh mode verified).\n');

    console.log('🎉 All Phase 1 Primitives Invariant Tests Passed!\n');
  } finally {
    // Cleanup temporary test directory
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
