/**
 * Composable Context Architecture (CCA) — Google OKF Resolver Test Suite
 * Asserts parsing, frontmatter extraction, token estimation, and bundle matching.
 */

import assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { OkfResolver } from '../dist/core/okf/resolver.js';

export async function runOkfResolverTests() {
  console.log('🧪 Running Google OKF Resolver Tests...\n');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cca-okf-test-'));

  try {
    const resolver = new OkfResolver();

    // 1. Create sample Google OKF cards
    const card1Content = `---
title: "CAP Theorem Invariants"
type: "concept"
tags: [distributed-systems, consistency, partition-tolerance]
description: "Core tradeoffs between Consistency, Availability, and Partition Tolerance."
confidence: 0.95
---

# CAP Theorem Invariants

In any distributed data store, you can only simultaneously guarantee two out of the three properties:
1. Consistency (every read receives the most recent write)
2. Availability (every request receives a non-error response)
3. Partition Tolerance (system continues to operate despite network drops)

When a network partition occurs, you must choose between Consistency (CP) or Availability (AP).
`;

    const card2Content = `---
title: "Idempotency Keys in Distributed APIs"
type: "pattern"
tags: [api-design, distributed-systems, fault-tolerance]
description: "Preventing duplicate state mutations during network retries."
confidence: 0.90
---

# Idempotency Keys

Clients generate a unique UUID per mutation request. The server caches the result for that key.
`;

    const card1Path = path.join(tempDir, 'cap-theorem.md');
    const card2Path = path.join(tempDir, 'idempotency-keys.md');
    fs.writeFileSync(card1Path, card1Content, 'utf-8');
    fs.writeFileSync(card2Path, card2Content, 'utf-8');

    // 2. Test parseCard
    console.log('  Testing parseCard (YAML frontmatter & token bounds)...');
    const card1 = resolver.parseCard(card1Path);
    assert.ok(card1 !== null, 'Should parse valid card');
    assert.strictEqual(card1.title, 'CAP Theorem Invariants');
    assert.strictEqual(card1.type, 'concept');
    assert.ok(card1.tags.includes('distributed-systems'));
    assert.ok(card1.tags.includes('partition-tolerance'));
    assert.ok(card1.tokenEstimate > 20 && card1.tokenEstimate < 900, 'Must estimate token bounds under 900');
    console.log('  ✅ parseCard passed.\n');

    // 3. Test loadBundle
    console.log('  Testing loadBundle (Directory scanning)...');
    const bundle = resolver.loadBundle(tempDir);
    assert.strictEqual(bundle.cards.length, 2, 'Bundle must contain both cards');
    console.log('  ✅ loadBundle passed.\n');

    // 4. Test findMatchingCards
    console.log('  Testing findMatchingCards (Tag matching & scoring)...');
    const matchConsistency = resolver.findMatchingCards(bundle, ['consistency'], 1);
    assert.strictEqual(matchConsistency.length, 1);
    assert.strictEqual(matchConsistency[0].title, 'CAP Theorem Invariants');

    const matchApi = resolver.findMatchingCards(bundle, ['api-design'], 1);
    assert.strictEqual(matchApi.length, 1);
    assert.strictEqual(matchApi[0].title, 'Idempotency Keys in Distributed APIs');
    console.log('  ✅ findMatchingCards passed.\n');

    console.log('🎉 All Google OKF Resolver Tests Passed!\n');
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
