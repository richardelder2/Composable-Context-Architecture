# Composable Context Architecture Routing Map (Layer 1 Root)

This contract defines the execution flow and context routing for this CCA workspace.

---

## 1. System Execution Route

```
                  ┌─────────────────────────────────────┐
                  │       ~/.config/cca/me.md           │
                  │   Ambient Person Layer (Read Once)   │
                  └──────────────────┬──────────────────┘
                                     │ Ambient Context
                                     ▼
                  ┌─────────────────────────────────────┐
                  │            blackboard.md            │
                  │     Live Human Intent Canvas        │
                  └──────────────────┬──────────────────┘
                                     │
                                     ▼
                          ┌─────────────────────┐
                          │   src/core/router   │
                          │   Multi-Gear Router │
                          └──────────┬──────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              ▼                      ▼                      ▼
        Gear 1 (Direct)        Gear 2 (Single)       Gear 3 (Dynamic)
        /dig, /bracket         1 Recommended Block   Synthesizes 1 of 4 Topologies
              │                      │                      │
              └──────────────────────┼──────────────────────┘
                                     │
                                     ▼
                  ┌─────────────────────────────────────┐
                  │       Mount Transient context.md    │
                  │   Minimal Fragment (<3,000 tokens)  │
                  └──────────────────┬──────────────────┘
                                     │
                                     ▼
                  ┌─────────────────────────────────────┐
                  │      Execute Composable Block       │
                  │     (α: Gen, β: Inq, γ: Dis, δ: Ver)│
                  └──────────────────┬──────────────────┘
                                     │
                                     ▼
                  ┌─────────────────────────────────────┐
                  │       Stream to .cca/pipe.md        │
                  │    Intermediate Buffer (Clean BB)   │
                  └──────────────────┬──────────────────┘
                                     │
                                     ▼
                  ┌─────────────────────────────────────┐
                  │          Human Gate Review          │
                  │     [Approve / Tweak / Reject]      │
                  └──────────────────┬──────────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
             More Blocks in Run              Final Yield Approved
                    │                                 │
                    ▼                                 ▼
            Flush context.md                  Flush context.md
            Next Block in Chain               Yield to blackboard.md
                                              Log Git CCA-INVOKE micro-commit
```

---

## 2. Invariant Routing Rules

1. **Transient Flush Guarantee:** `context.md` must be emptied after every block action. No state may persist across steps through `context.md`.
2. **Intermediate Buffering:** Block intermediate streams pass through `.cca/pipe.md`. `blackboard.md` only receives human-approved outputs.
3. **Audit Trail:** Every approved block execution logs a micro-commit with tag `CCA-INVOKE:` and a structured JSON payload in the commit body.
4. **ICM Compilation Exit Ramp:** Once a chaotic workflow stabilizes, running `cca compile --to=icm` reads the micro-commit history and deterministically scaffolds numbered ICM stage directories (`stages/01_...`).
