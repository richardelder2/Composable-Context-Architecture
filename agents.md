# Agent Registry & Harness Configuration

This registry configures agent models, execution constraints, and harness routes for this workspace.

## 1. Default Harness Mapping
- **Discovery & Socratic (`/dig`, `write-me`):** `claude-3-7-sonnet` (or local reasoning agent)
- **Divergence & Brainstorming (`/bracket`, `/bridge`):** `gemini-2.5-pro` / `claude-3-7-sonnet`
- **Falsification & Stress Testing (`/tether`, `/blast`):** `claude-3-7-sonnet`
- **Synthesis & Deconstruction (`/distill`, `/unroll`):** `claude-3-7-sonnet`

## 2. Invariant Token Limits
- **Max Transient Context (`context.md`):** 3,000 tokens
- **Max Intermediate Pipe Buffer (`.cca/pipe.md`):** 4,000 tokens
- **Max Single Block Output:** 1,200 tokens

## 3. Registered Skill Packs
- `/spark` — Low-stakes strawman generator (Type: α)
- `/dig` — Socratic inquiry rooted in human's exact words (Type: β)
- `/bracket` — 3-option divergence forks (Type: α)
- `/prune` — Constraint sieve & elimination (Type: γ)
- `/distill` — Invariant extraction & tension mapping (Type: γ)
- `/unroll` — Dependency deconstruction & first principles (Type: β)
- `/prism` — Multi-stakeholder archetypal lenses (Type: α)
- `/bridge` — Cross-domain structural isomorphism (Type: α)
- `/tether` — Logic & continuity falsification (Type: δ)
- `/blast` — Boundary mapping & pre-mortem stress testing (Type: δ)
- `write-me` — Person calibration interview (Type: β)
