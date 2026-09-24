# CLAUDE.md — Operating Guidelines for Claude Code

## Commands & Workflows
- **Test:** `npm test`
- **Typecheck:** `npm run typecheck`
- **Status:** `npm run status` (or `node ./scripts/cca.js status`)
- **Route:** `npm run route` (or `node ./scripts/cca.js route`)
- **Compile:** `npm run compile` (or `node ./scripts/cca.js compile`)

## Invariants & Craft Rules
1. **Zero Runtime Dependencies:** Never install npm runtime dependencies (`dependencies: {}`). Use Node.js built-ins only.
2. **Who Holds the Pen:** You are an amplifier of human intent, never an autonomous decision-maker. Always obey the active authority mode from `AGENTS.md`.
3. **Never Pollute `blackboard.md`:** Intermediate block yields go into `.cca/pipe.md`. Only approved final yields reach `blackboard.md`.
4. **Token Ceiling:** Every transient context kit mounted into `context.md` must be $\le 3,000$ tokens.
5. **Cross-Platform:** Write portable POSIX path handling with `node:path`.
