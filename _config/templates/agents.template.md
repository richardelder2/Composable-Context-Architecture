# Agent Registry & Harness Configuration

This registry configures agent models, execution constraints, and harness routes for this workspace.

## 1. Default Harness Mapping
- **Discovery & Socratic (`/dig`, `write-me`):** `claude-3-7-sonnet` (or local reasoning agent)
- **Divergence & Brainstorming (`/bracket`, `/bridge`):** `gemini-2.5-pro` / `claude-3-7-sonnet`
- **Falsification & Stress Testing (`/tether`, `/blast`):** `claude-3-7-sonnet`
- **Synthesis & Deconstruction (`/distill`, `/unroll`):** `claude-3-7-sonnet`

## 2. Invariant Token Limits
- **Max Transient Context (`context.md`):** 3,000 tokens
- **Max Intermediate Pipe Buffer (`pipe.md`):** 4,000 tokens
- **Max Single Block Output:** 1,200 tokens

## 3. Registered Skill Packs
- `/spark` — Low-stakes strawman generator
- `/dig` — Socratic inquiry rooted in human's exact words
- `/bracket` — 3-option divergence forks
- `/prune` — Constraint sieve & elimination
- `/distill` — Invariant extraction & tension mapping
- `/unroll` — Dependency deconstruction & first principles
- `/prism` — Multi-stakeholder archetypal lenses
- `/bridge` — Cross-domain structural isomorphism
- `/tether` — Logic & continuity falsification
- `/blast` — Boundary mapping & pre-mortem stress testing
- `write-me` — Person calibration interview

## 4. Mounted Knowledge Bundles (Google OKF)
<!--
  Declare paths to Google Open Knowledge Format (OKF) bundle directories here.
  CCA mounts matching OKF cards as domain anchors directly into context.md.
-->
- path: ./bundles/
