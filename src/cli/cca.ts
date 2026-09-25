#!/usr/bin/env node

/**
 * Composable Context Architecture (CCA) — Zero-Dependency CLI Entry Point
 * Implements status, doctor, me, route, run, and compile commands.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { ContextMounter } from '../core/context_mounter.js';
import { PipeBuffer } from '../core/pipe.js';
import { MeManager } from '../core/person/me_manager.js';
import { OkfResolver } from '../core/okf/resolver.js';

const workspaceRoot = process.cwd();
const command = process.argv[2] || 'status';
const subArgs = process.argv.slice(3);

const mounter = new ContextMounter(workspaceRoot);
const pipe = new PipeBuffer(workspaceRoot);
const me = new MeManager();

async function handleStatus() {
  console.log('\n======================================================');
  console.log('🌌 Composable Context Architecture (CCA) — Status');
  console.log('======================================================\n');

  console.log(`📁 Workspace Root: ${workspaceRoot}`);

  // 1. Person Layer
  console.log('\n👤 Person Layer (Cross-Workspace):');
  const mePath = me.getPath();
  if (me.exists()) {
    const meCtx = me.load();
    console.log(`   Path: ${mePath} (Active)`);
    console.log(`   Voice Rules: ${meCtx.voice.length}`);
    console.log(`   Standing Constraints: ${meCtx.constraints.length}`);
    console.log(`   Observed Patterns: ${meCtx.observedPatterns.length}`);
    console.log(`   Staged Proposals: ${meCtx.proposedPatterns.length}`);
  } else {
    console.log(`   Path: ${mePath} (Not initialized — run 'cca me init')`);
  }

  // 2. Workspace Primitives
  console.log('\n📋 Workspace Primitives:');
  const bbPath = path.join(workspaceRoot, 'blackboard.md');
  if (fs.existsSync(bbPath)) {
    const bbSize = fs.statSync(bbPath).size;
    console.log(`   blackboard.md: Active (${bbSize} bytes)`);
  } else {
    console.log(`   blackboard.md: Missing (Run 'cca init')`);
  }

  const ctxPath = mounter.getContextPath();
  if (fs.existsSync(ctxPath)) {
    const ctxContent = mounter.read();
    const isClean = ctxContent.includes('DO NOT EDIT MANUALLY') && ctxContent.split('\n').length <= 15;
    const tokens = mounter.estimateTokens(ctxContent);
    console.log(`   context.md:    ${isClean ? 'Clean (Flushed)' : 'Mounted'} (~${tokens} tokens / ceiling: 3000)`);
  } else {
    console.log(`   context.md:    Missing`);
  }

  const pipePath = pipe.getPipePath();
  if (fs.existsSync(pipePath)) {
    const pipeContent = pipe.read();
    const isClean = pipeContent.includes('<!--') || pipeContent.split('\n').length <= 15;
    console.log(`   .cca/pipe.md:  ${isClean ? 'Empty (Buffer Ready)' : 'Buffered Output Waiting'}`);
  } else {
    console.log(`   .cca/pipe.md:  Ready to buffer`);
  }

  const agPath = path.join(workspaceRoot, 'agents.md');
  console.log(`   agents.md:     ${fs.existsSync(agPath) ? 'Registered' : 'Missing'}`);

  // 3. Google OKF Bundles
  console.log('\n📚 Knowledge Bundles (Google OKF):');
  const bundlesDir = path.join(workspaceRoot, 'bundles');
  if (fs.existsSync(bundlesDir)) {
    const bundleDirs = fs.readdirSync(bundlesDir).filter(f => fs.statSync(path.join(bundlesDir, f)).isDirectory());
    if (bundleDirs.length === 0) {
      console.log('   bundles/: Ready (No bundles currently mounted)');
    } else {
      const okf = new OkfResolver();
      bundleDirs.forEach(b => {
        const bundle = okf.loadBundle(path.join(bundlesDir, b));
        console.log(`   - ${bundle.name} (${bundle.cards.length} OKF cards loaded)`);
      });
    }
  } else {
    console.log('   bundles/: Not created yet (Create bundles/ to mount OKF knowledge)');
  }

  console.log('\n✨ System ready for fluid discovery.\n');
}

async function handleDoctor() {
  console.log('\n🩺 Running CCA System Doctor (Verifying Van Clief Invariants)...\n');
  let issues = 0;

  // Invariant 1: Zero runtime dependencies
  const pkgPath = path.join(workspaceRoot, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const depCount = Object.keys(pkg.dependencies || {}).length;
    if (depCount === 0) {
      console.log('  ✅ Invariant 4: Zero runtime dependencies verified (dependencies: {})');
    } else {
      console.log(`  ❌ Invariant 4: Found ${depCount} runtime dependencies in package.json!`);
      issues++;
    }
  }

  // Invariant 2: Context Token Discipline
  const ctxContent = mounter.read();
  const tokens = mounter.estimateTokens(ctxContent);
  if (tokens <= mounter.MAX_TOKENS) {
    console.log(`  ✅ Invariant 1: Context ceiling verified (${tokens} <= ${mounter.MAX_TOKENS} tokens)`);
  } else {
    console.log(`  ❌ Invariant 1: Context ceiling violated (${tokens} > ${mounter.MAX_TOKENS} tokens)!`);
    issues++;
  }

  // Invariant 3: Blackboard Unpolluted
  const bbPath = path.join(workspaceRoot, 'blackboard.md');
  if (fs.existsSync(bbPath)) {
    const bbContent = fs.readFileSync(bbPath, 'utf-8');
    if (!bbContent.includes('<!-- Action ID and Target Block -->') && !bbContent.includes('DO NOT EDIT MANUALLY')) {
      console.log('  ✅ Invariant 2: blackboard.md is unpolluted by machine stream artifacts');
    } else {
      console.log('  ❌ Invariant 2: blackboard.md contains raw machine stream artifacts!');
      issues++;
    }
  }

  // Invariant 4: me.md Health
  if (me.exists()) {
    const ctx = me.load();
    console.log(`  ✅ Person Layer: me.md parsed cleanly (${ctx.observedPatterns.length} observed, ${ctx.proposedPatterns.length} proposed)`);
  } else {
    console.log('  ⚠️ Person Layer: me.md not yet created (Run `cca me init`)');
  }

  console.log(`\nDoctor check completed: ${issues === 0 ? 'ALL INVARIANTS CLEAN' : `${issues} issue(s) detected`}.\n`);
}

async function handleMe() {
  const meSub = subArgs[0] || 'status';

  if (meSub === 'init') {
    const createdPath = me.ensureInitialized();
    console.log(`\n✅ Initialized personal context at: ${createdPath}\n`);
  } else if (meSub === 'stage') {
    const fact = subArgs.slice(1).join(' ');
    if (!fact) {
      console.log('\n❌ Usage: cca me stage <fact>\n');
      return;
    }
    const res = me.stageProposal(fact, path.basename(workspaceRoot));
    console.log(`\n✅ Staged proposal: "${fact}"`);
    if (res.conflict) {
      console.log(`⚠️  ${res.conflict}`);
    }
    console.log();
  } else if (meSub === 'accept') {
    const search = subArgs.slice(1).join(' ');
    if (!search) {
      console.log('\n❌ Usage: cca me accept <pattern-search-term>\n');
      return;
    }
    const ok = me.acceptProposal(search);
    if (ok) {
      console.log(`\n✅ Accepted and promoted proposal matching: "${search}"\n`);
    } else {
      console.log(`\n❌ Could not find proposal matching: "${search}"\n`);
    }
  } else if (meSub === 'reject') {
    const search = subArgs.slice(1).join(' ');
    if (!search) {
      console.log('\n❌ Usage: cca me reject <pattern-search-term>\n');
      return;
    }
    const ok = me.rejectProposal(search);
    if (ok) {
      console.log(`\n🗑️  Rejected and removed proposal matching: "${search}"\n`);
    } else {
      console.log(`\n❌ Could not find proposal matching: "${search}"\n`);
    }
  } else {
    // List me status
    const ctx = me.load();
    console.log('\n======================================================');
    console.log('👤 Personal Context Profile (~/.config/cca/me.md)');
    console.log('======================================================\n');
    console.log('Observed Patterns:');
    if (ctx.observedPatterns.length === 0) {
      console.log('  (None yet)');
    } else {
      ctx.observedPatterns.forEach(p => console.log(`  - ${p.fact} [from: ${p.workspace}, ${p.proposedDate}]`));
    }
    console.log('\nProposed (Awaiting Your Review):');
    if (ctx.proposedPatterns.length === 0) {
      console.log('  (No staged proposals waiting)');
    } else {
      ctx.proposedPatterns.forEach(p => console.log(`  - ${p.fact} [staged from: ${p.workspace}]`));
      console.log('\nRun `cca me accept <term>` or `cca me reject <term>` to review.');
    }
    console.log();
  }
}

async function main() {
  switch (command) {
    case 'status':
      await handleStatus();
      break;
    case 'doctor':
      await handleDoctor();
      break;
    case 'me':
      await handleMe();
      break;
    case 'route':
      console.log('\n🧭 `cca route` will evaluate blackboard.md and synthesize dynamic topology (coming in Phase 3).\n');
      break;
    case 'run':
      console.log('\n⚡ `cca run` will interactively step through dynamic blocks (coming in Phase 3).\n');
      break;
    case 'compile':
      console.log('\n📦 `cca compile` will translate stabilized micro-commits into ICM stages (coming in Phase 6).\n');
      break;
    default:
      console.log(`\nUnknown command: ${command}`);
      console.log('Available commands: status, doctor, me, route, run, compile\n');
  }
}

main().catch(err => {
  console.error('Fatal CLI Error:', err);
  process.exit(1);
});
