/**
 * Composable Context Architecture (CCA) — Core Data Contracts
 * Built upon the Interpretable Context Methodology (ICM)
 */

export type AuthorityMode = 
  | 'discovery'      // Socratic, human holds pen, machine asks 1 question at a time
  | 'divergence'     // Machine offers 3 structured options, human selects
  | 'interrogation'  // Machine stress-tests claims & continuity, human resolves
  | 'synthesis'      // Machine extracts invariants & topology, human validates
  | 'execution';     // Machine acts strictly behind human confirmation gate

export type BlockType = 
  | 'alpha'  // Generator / Broadener (spark, diverge, cross_pollinate, cast_lenses)
  | 'beta'   // Deconstructor / Inquirer (probe, dependency_graph, abstract_topology)
  | 'gamma'  // Pruner / Distiller (prune, extract_invariants, reflect)
  | 'delta'; // Verifier / Stress-Tester (interrogate, pre_mortem, continuity_check)

export type CognitiveTopology = 
  | 'creative_diamond'            // beta -> alpha -> gamma
  | 'red_team_gauntlet'            // gamma -> delta -> alpha
  | 'perspective_interrogation'   // alpha -> beta -> beta
  | 'strawman_catalyst';          // alpha -> beta -> gamma

export interface Block {
  id: string;
  name: string;
  type: BlockType;
  skillId: string;
  description: string;
  run: (input: string, options?: Record<string, unknown>) => Promise<BlockOutput>;
}

export interface BlockOutput {
  yieldText: string;
  tokenCount: number;
  metadata?: Record<string, unknown>;
}

export interface Skill {
  id: string;
  name: string;
  authorityMode: AuthorityMode;
  description: string;
  contextContractPath?: string;
  blocks: Block[];
}

export interface PipelineStep {
  blockId: string;
  blockType: BlockType;
  skillId: string;
  status: 'pending' | 'running' | 'completed' | 'skipped' | 'failed';
  inputSnippet?: string;
  outputSnippet?: string;
  tokenCount?: number;
}

export interface DynamicPipeline {
  id: string;
  name: string;
  topology: CognitiveTopology;
  rationale: string;
  steps: PipelineStep[];
  status: 'proposed' | 'active' | 'completed' | 'aborted';
  createdAt: string;
}

export interface ObservedPattern {
  fact: string;
  proposedDate: string;
  workspace: string;
  accepted: boolean;
}

export interface ProposedPattern {
  fact: string;
  proposedDate: string;
  workspace: string;
  conflictWith?: string;
}

export interface PersonContext {
  filePath: string;
  voice: string[];
  constraints: string[];
  fluencyExpert: string[];
  fluencyScaffolding: string[];
  harnessPreferences: Record<string, string>;
  observedPatterns: ObservedPattern[];
  proposedPatterns: ProposedPattern[];
}

export interface TelemetryEvent {
  timestamp: string;
  runId: string;
  topology: CognitiveTopology;
  blockId: string;
  blockType: BlockType;
  inputTokens: number;
  outputTokens: number;
  humanChoice: string;
}
