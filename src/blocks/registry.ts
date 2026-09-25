/**
 * Composable Context Architecture (CCA) — Central Block Registry
 * Aggregates and indexes all 26 atomic Unix cognitive blocks.
 */

import type { Block, BlockType } from '../core/types.js';
import { sparkStrawmanBlock, sparkSeedContrastBlock, resonateFeltSenseBlock } from './spark_resonate.js';
import { digProbeBlock, digReflectBlock, unrollDependencyGraphBlock, unrollAssumptionsBlock, zoomOutBlock, zoomInBlock } from './dig_unroll_zoom.js';
import { bracketDivergeBlock, bridgeCrossPollinateBlock, fuseSynthesisBlock, prismCastLensesBlock } from './bracket_bridge_fuse_prism.js';
import { groundPrecedentBlock, tetherInterrogateBlock, blastPreMortemBlock, blastRadiusBlock } from './ground_tether_blast.js';
import { pruneConstraintSieveBlock, tradeoffMatrixBlock, distillInvariantsBlock, distillSummaryBlock } from './prune_tradeoff_distill.js';
import { debriefSessionBlock } from './debrief.js';

export const ALL_BLOCKS: Block[] = [
  // Initiation (alpha & beta)
  sparkStrawmanBlock,
  sparkSeedContrastBlock,
  resonateFeltSenseBlock,

  // Inquiry & Deconstruction (beta)
  digProbeBlock,
  digReflectBlock,
  unrollDependencyGraphBlock,
  unrollAssumptionsBlock,
  zoomOutBlock,
  zoomInBlock,

  // Expansion & Divergence (alpha)
  bracketDivergeBlock,
  bridgeCrossPollinateBlock,
  fuseSynthesisBlock,
  prismCastLensesBlock,

  // Reality & Stress-Testing (beta & delta)
  groundPrecedentBlock,
  tetherInterrogateBlock,
  blastPreMortemBlock,
  blastRadiusBlock,

  // Convergence & Distillation (gamma)
  pruneConstraintSieveBlock,
  tradeoffMatrixBlock,
  distillInvariantsBlock,
  distillSummaryBlock,
  debriefSessionBlock
];

export const BLOCK_REGISTRY: Record<string, Block> = Object.fromEntries(
  ALL_BLOCKS.map(block => [block.id, block])
);

export function getBlock(id: string): Block | undefined {
  return BLOCK_REGISTRY[id];
}

export function getAllBlocks(): Block[] {
  return ALL_BLOCKS;
}

export function getBlocksByType(type: BlockType): Block[] {
  return ALL_BLOCKS.filter(b => b.type === type);
}

export function getBlocksBySkill(skillId: string): Block[] {
  return ALL_BLOCKS.filter(b => b.skillId === skillId);
}
