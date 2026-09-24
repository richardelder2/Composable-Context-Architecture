# Composable Context Architecture (CCA) — Engineering Specification

*The Dynamic Companion Framework to Interpretable Context Methodology (ICM)*  
*Engineered on the Architectural Principles of Jake Van Clief & Richard Elder*

---

## 1. Executive Summary & Core Philosophy

**Composable Context Architecture (CCA)** is the fluid companion to **Interpretable Context Methodology (ICM)** (arXiv:2603.16021). Where ICM provides structured, repeatable, phased pipelines for mature workflows (such as Soundingboard's 5-stage novel production or multi-station software delivery), CCA governs the phase *before* optimization: the chaotic, non-linear stretch of creative exploration, research, architecture, and knowledge discovery.

CCA is **domain-agnostic** and **100% cross-platform** (macOS, Linux, Windows), designed to amplify human cognition across software architecture, systemic design, essay writing, scientific exploration, and narrative creation.

### The Governing Invariant: "Who Holds the Pen"
- **AI amplifies human agency; it does not absorb it.**
- The human is the sole source of **intent, meaning, judgment, taste, and authorship**.
- The machine brings **capability, structural memory, analysis, challenging questions, transformation, and execution**.
- Authority is enforced through explicit per-mode contracts. The machine never quietly assumes ownership of decisions, never flattens idiosyncratic voice, and never performs silent rewrites.

---

## 2. The Four Non-Negotiable "Van Clief Invariants"

Every line of code and markdown schema in CCA adheres to four fundamental principles:

1. **The Tripartite Chain of Custody:**
   $$\text{Deterministic Tool Observation} \longrightarrow \text{Agent Craft Framing} \longrightarrow \text{Author Sovereign Decision}$$
   Tools make mechanical observations (syntax checks, token metrics, ASTs); agents frame observations into structured options or Socratic questions; the human signs the gate.
2. **Separation of Technical Integrity from Creative Uncertainty:**
   - *Technical Integrity:* Syntax errors, unclosed brackets, token budget violations ($>3,000$ tokens), or state leaks into `blackboard.md` are **fatal errors** that halt the engine immediately.
   - *Creative Uncertainty:* Ambiguous ideas, open plot holes, incomplete requirements, and raw brainstorming are **first-class citizens** quarantined with brackets (`[unverified]`, `[option A | option B]`) and never block progress.
3. **Lossless Cache Restoration:**
   *The markdown file is the record; the index is a cache.* If `.cca/` or any cache file is deleted, `cca reindex` losslessly reconstructs the system state from disk in under 50ms.
4. **Zero Runtime Dependencies:**
   No npm runtime packages (`dependencies: {}`). Built strictly with Node.js built-ins (`node:fs`, `node:path`, `node:child_process`, `node:crypto`). A CCA workspace will run identically a decade from now.

---

## 3. Multi-Tiered Architecture & Stream Buffering

```
┌────────────────────────────────────────────────────────────────────────┐
│              1. The Person Layer (~/.config/cca/me.md)                │
│    Voice, Constraints, Fluency, Harness Prefs, Auditable Patterns      │
│    • Outlives all projects • Read once per session as ambient context  │
│    • System can ONLY propose to staging; Human promotes                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Ambient Read
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 2. Workspace Primitives (Project-Scoped)               │
│                                                                        │
│   blackboard.md (Human Thinking Canvas — UNPOLLUTED by Machine Output)  │
│                                   │                                    │
│                                   ▼                                    │
│       context.md (Transient Action Pipe, <3,000 tokens flushed)       │
│                                   │                                    │
│                                   ▼                                    │
│      .cca/pipe.md (Intermediate Stream Buffer between Blocks)          │
│                                   │                                    │
│     agents.md (Harness, Prompt & Authority Constraint Registry)       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│            3. Composable Cognitive Blocks (26 Unix Filters)           │
│   α (Generators)  │  β (Inquirers)  │  γ (Distillers)  │  δ (Verifiers)│
└────────────────────────────────────────────────────────────────────────┘
```

### A. The Person Layer: `me.md` (`~/.config/cca/me.md`)
Sits above all workspaces. Resides in the user's home configuration directory:
- **Sections:**
  1. *Voice & Working Style* (preferred cadence, tolerance for pushback vs. direct execution).
  2. *Standing Constraints* (inviolable cross-project rules, e.g., "never commit without diff").
  3. *Domain Fluency Map* (deep expertise areas vs. scaffolding needs).
  4. *Harness & Tool Preferences* (agent model mappings).
  5. *Observed Patterns* (system-writable holding area governed by propose/stage/accept).
- **Inline Provenance:** `<!-- proposed: YYYY-MM-DD, workspace: X, accepted -->`. Deleting a fact deletes its provenance simultaneously.
- **Echo Chamber Prevention:** Local workspace `preferences.md` or frontmatter overrides `me.md`. `--fresh` activates an incognito mode.

### B. The Workspace Primitives
1. **`blackboard.md` (Human Thinking Surface):** Continuously written, erased, and rewritten by the human. The machine never dumps intermediate scratchpad text here.
2. **`.cca/pipe.md` (Intermediate Stream Buffer):** Acts as the Unix pipeline buffer between dynamic cognitive blocks.
3. **`context.md` (Transient Action Pipe):** Single-purpose pipe mounting only minimal data fragments for the active block. Flushed cleanly after every action (enforcing sub-3k token discipline with squashing).
4. **`agents.md` (Registry):** Declarative, human-maintained registry of agent constraints, personas, and tools.

---

## 4. The 10 Cognitive Skills & Typed Grammar

To avoid combinatorial chaos across the 26 blocks, every block has a **Type Signature**:
- **$\alpha$ (Generators / Broadeners):** Expand search space, introduce raw material.
- **$\beta$ (Deconstructors / Inquirers):** Unpack structure, probe meaning, map topology.
- **$\gamma$ (Pruners / Distillers):** Eliminate non-viable paths, extract invariants, crystallize.
- **$\delta$ (Verifiers / Stress-Testers):** Falsify logic, attack boundaries, audit continuity.

### The Cognitive Skills Matrix

| Skill | Type | Core Role | Who Supplies Content | Who Decides |
| :--- | :---: | :--- | :--- | :--- |
| **`/spark`** | $\alpha$ | Low-stakes strawman generator to defeat blank-page paralysis | Machine (Strawman) | Human (Reaction) |
| **`/dig`** | $\beta$ | Socratic inquiry rooted in human's exact words | Human (Content) | Human |
| **`/bracket`** | $\alpha$ | 3 orthogonal candidate pathways (A, B, C, D) | Machine (Options) | Human (Selection) |
| **`/prune`** | $\gamma$ | Constraint sieve & ruthless elimination of bad options | Machine (Sieve) | Human (Culling) |
| **`/distill`** | $\gamma$ | Invariant extraction & tension crystallization | Machine (Extraction) | Human (Validation) |
| **`/unroll`** | $\beta$ | Dependency deconstruction & first principles | Machine (Topology) | Human (Validation) |
| **`/prism`** | $\alpha$ | Multi-stakeholder archetypal lenses | Machine (Lenses) | Human (Judgment) |
| **`/bridge`** | $\alpha$ | Cross-domain structural isomorphism | Machine (Analogies) | Human (Inspiration) |
| **`/tether`** | $\delta$ | Logic, continuity & assumption falsification | Machine (Audits) | Human (Resolution) |
| **`/blast`** | $\delta$ | Boundary mapping & pre-mortem stress testing | Machine (Attacks) | Human (Hardening) |
| **`write-me`** | $\beta$ | Person calibration interview | Human (Interview) | Human |

### The 4 Canonical Cognitive Topologies
1. **The Creative Diamond ($\beta \rightarrow \alpha \rightarrow \gamma$):** Ground problem $\rightarrow$ explore widely $\rightarrow$ ruthlessly converge.
2. **The Red-Team Gauntlet ($\gamma \rightarrow \delta \rightarrow \alpha$):** Isolate core claim $\rightarrow$ stress-test to failure $\rightarrow$ generate hardening forks.
3. **The Perspective Interrogation ($\alpha \rightarrow \beta \rightarrow \beta$):** View through outsider eyes $\rightarrow$ isolate deepest tension $\rightarrow$ Socratic probe.
4. **The Strawman Catalyst ($\alpha \rightarrow \beta \rightarrow \gamma$):** Generate intentionally flawed prototype $\rightarrow$ capture human reaction $\rightarrow$ extract invariants.

### Lifecycle Guardrails
- **Embryonic Phase:** Destructive stress testing ($\delta$: `/blast`, `/tether`) is blocked to protect nascent ideas from premature frost.
- **Hardening Phase:** Falsification and boundary testing are recommended before `cca compile --to=icm`.

---

## 5. Phased Build Roadmap (The Van Clief Execution Plan)

### Phase 0 — Formal Contract Locking (The Specification)
- [ ] Initialize repository base: `package.json`, `tsconfig.json`, `README.md`.
- [ ] Write root governance contracts: `AGENTS.md`, `CONTEXT.md`, `CLAUDE.md`, `GEMINI.md`.
- [ ] Formalize frontmatter schemas and lifecycle contracts in `_config/templates/`.

### Phase 1 — Physical Disk Primitives & Glass Box Core
- [ ] Implement workspace primitives: `blackboard.md`, `context.md`, `agents.md`, `.cca/pipe.md`.
- [ ] Implement the Person Layer manager (`src/core/person/me_manager.ts`, `staging.ts`).
- [ ] Implement context squashing algorithm and transient wiper (`src/core/context_mounter.ts`).
- [ ] Write Phase 1 Invariant Test Suite (`tests/primitives.test.ts`):
  - Test: `context.md` wiped cleanly after use.
  - Test: `.cca/pipe.md` buffers streams without polluting `blackboard.md`.
  - Test: Sub-3,000 token ceiling strictly enforced.

### Phase 2 — Atomic Unix Cognitive Blocks & Typed Grammar
- [ ] Implement pure, zero-dependency functions for all 26 atomic blocks in `src/blocks/`.
- [ ] Implement type signature validation ($\alpha, \beta, \gamma, \delta$) in `src/core/grammar.ts`.
- [ ] Write block unit tests asserting correct input/output schemas and token bounds.

### Phase 3 — Multi-Gear Router & Canonical Topologies
- [ ] Implement Multi-Gear Router (`src/core/router.ts`):
  - *Gear 1:* Immediate single-command execution (`/dig`, `/bracket`).
  - *Gear 2:* Single-step contextual suggestion.
  - *Gear 3:* Synthesizing one of the 4 Canonical Topologies.
- [ ] Implement interactive stepping runner (`src/core/dynamic_runner.ts`) with explicit human gate checkpoints.

### Phase 4 — Git Telemetry & The Tripartite Audit Stream
- [ ] Implement `src/core/telemetry.ts` generating micro-commits tagged `CCA-INVOKE:` with structured JSON bodies.
- [ ] Record the Tripartite Chain of Custody: Tool Observation $\rightarrow$ Agent Framing $\rightarrow$ Human Decision.

### Phase 5 — Universal & Decoupled Narrative Skill Packs
- [ ] Build universal skill packs with micro-`CONTEXT.md` and `SKILL.md`: `/spark`, `/dig`, `/bracket`, `/prune`, `/distill`, `/unroll`, `/prism`, `/bridge`, `/tether`, `/blast`, and `write-me`.
- [ ] Build decoupled narrative skill packs: `skills/dig-narrative/`, `skills/bracket-narrative/`, `skills/tether-narrative/` operating strictly on plain markdown notes with **zero CLI reliance**.

### Phase 6 — The ICM Compilation Bridge
- [ ] Implement `src/core/compiler.ts` (`cca compile --to=icm`):
  - Ingest Git micro-commit stream.
  - Detect recurring cognitive chains.
  - Emit committed `intent.md` handoff artifact.
  - Deterministically scaffold standard ICM stage directories (`stages/01_...`).
