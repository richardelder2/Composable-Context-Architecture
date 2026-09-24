# Composable Context Architecture (CCA)

<p align="center">
  <em>The Dynamic, Fluid Companion Framework to Interpretable Context Methodology (ICM)</em>
</p>

<p align="center">
  <a href="package.json"><img src="https://img.shields.io/badge/dependencies-0%20runtime-brightgreen.svg" alt="Zero Runtime Dependencies" /></a>
  <a href="package.json"><img src="https://img.shields.io/badge/node-%3E%3D18-blue.svg" alt="Node Version" /></a>
  <a href="docs/CCA_SPECIFICATION.md"><img src="https://img.shields.io/badge/methodology-ICM%20Companion-orange.svg" alt="Methodology" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
</p>

---

## 1. Executive Summary & Core Philosophy

**Composable Context Architecture (CCA)** is the fluid companion to **Interpretable Context Methodology (ICM)** (arXiv:2603.16021). 

Where ICM excels at structured, repeatable, rigid pipelines (e.g. Soundingboard's 5-stage novel production studio, or multi-phase software delivery), CCA governs the phase *before* optimization: the messy, non-linear stretch of creative exploration, research, architecture, and knowledge discovery where a rigid pipeline would trap the human in the wrong phase.

### The Governing Principle: "Who Holds the Pen"

> **AI should amplify human agency, not absorb it.**

The human remains the sole source of **intent, meaning, judgment, taste, and authorship**. The machine brings **capability, memory, analysis, challenging questions, structural transformation, and execution**. Neither pretends to be the other:

* The human sets direction; the machine helps explore.
* The human makes judgments; the machine provides capability.
* The human can change their mind at any point, and the machine adapts to the changing intent rather than anchoring to the old one.
* The machine can challenge assumptions without owning the decision.
* The work stays inspectable, the process stays attributable, and the human holds the red pen at all times.

---

## 2. The Four Non-Negotiable Invariants

1. **The Tripartite Chain of Custody:**
   $$\text{Deterministic Tool Observation} \longrightarrow \text{Agent Craft Framing} \longrightarrow \text{Author Sovereign Decision}$$
   Tools make mechanical observations (syntax checks, token metrics, ASTs); agents frame observations into structured options or Socratic questions; the human signs the gate.
2. **Separation of Technical Integrity from Creative Uncertainty:**
   * *Technical Integrity:* Syntax errors, unclosed brackets, token budget violations ($>3,000$ tokens), or state leaks into `blackboard.md` are **fatal errors** that halt the engine immediately.
   * *Creative Uncertainty:* Ambiguous ideas, open plot holes, incomplete requirements, and raw brainstorming are **first-class citizens** quarantined with brackets (`[unverified]`, `[option A | option B]`) and never block progress.
3. **Lossless Cache Restoration:**
   *The markdown file is the record; the index is a cache.* If `.cca/` or any cache file is deleted, `cca reindex` losslessly reconstructs the system state from disk in under 50ms.
4. **Zero Runtime Dependencies:**
   No npm runtime packages (`dependencies: {}`). Built strictly with Node.js standard library built-ins (`node:fs`, `node:path`, `node:child_process`, `node:crypto`). A CCA workspace will run identically a decade from now.

---

## 3. Architecture: The Person Layer vs. Workspace Primitives

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

### The Person Layer: `me.md` (`~/.config/cca/me.md`)
Scoped **per person** and sits strictly **above all workspace primitives**. It survives project boundaries and compilations.
* **Sections:** Voice & Working Style, Standing Constraints, Domain Fluency Map, Harness Preferences, and Observed Patterns.
* **Auditable Staging:** The system can *only* write cross-project observations to a `## Proposed` holding area with inline provenance comments (`<!-- proposed: YYYY-MM-DD, workspace: X, accepted -->`). Deleting removes fact and provenance simultaneously.
* **Echo Chamber Prevention:** Workspace-level `preferences.md` overrides ambient `me.md`. An incognito flag (`--fresh`) enables unconditioned discovery.

### The Three Workspace Primitives
* **`blackboard.md`:** The live human thinking canvas. Intermediate block outputs stream through `.cca/pipe.md` and are **never** dumped directly here. Only human-approved milestones or final yields reach the blackboard.
* **`context.md`:** Transient, single-purpose pipe mounting strictly minimal data fragments for the active action and flushed cleanly after every use ($<3,000$ tokens).
* **`agents.md`:** Declarative registry of agent personas, authority boundaries, tool parameters, and harness targets.

---

## 4. The 10 Cognitive Skills & Typed Grammar

Every skill operates as an **interactive, creative, temporary ICM micro-pipeline** with its own `CONTEXT.md` defining token envelopes, schemas, and authority contracts:

| Skill | Type | Core Role | Who Supplies Content | Who Decides |
| :--- | :---: | :--- | :--- | :--- |
| **`/spark`** | $\alpha$ | Low-stakes strawman generator to defeat blank page | Machine (Strawman) | Human (Reaction) |
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

---

## 5. Quickstart

### Prerequisites
* Node.js $\ge 18.0.0$
* Git

### Installation
Clone the repository and install dev dependencies:
```bash
git clone https://github.com/richardelder2/Composable-Context-Architecture.git
cd Composable-Context-Architecture
npm test
```

### CLI Commands
* `cca status` — Inspect the health of workspace primitives, ambient `me.md`, and pipe buffer.
* `cca route` — Analyze `blackboard.md` and synthesize an appropriate cognitive topology.
* `cca run` — Step through a dynamic block pipeline interactively with human gate approvals.
* `cca compile --to=icm` — Ingest Git micro-commits, isolate recurring workflows, and scaffold rigid ICM stages.
* `cca me` — Inspect, stage, and approve cross-workspace person patterns.
* `cca doctor` — Verify invariant compliance, token discipline, and cross-platform integrity.

---

## 6. License & Methodology

* **Architecture Specification:** [docs/CCA_SPECIFICATION.md](docs/CCA_SPECIFICATION.md)
* **Methodology:** Companion to Interpretable Context Methodology (ICM, arXiv:2603.16021).
* **License:** [MIT](LICENSE) © 2026 Richard Elder & Antigravity
