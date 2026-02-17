# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `vue-client/`:

```bash
cd vue-client && npm run dev      # Start dev server (Vite)
cd vue-client && npm run build    # Production build
cd vue-client && npm run preview  # Preview production build
```

No test framework or linter is configured.

## Deployment

- GitHub Actions builds and pushes a Docker image to GHCR on push to `main`
- Docker build context is `./vue-client` (multi-stage: Node 20 build → nginx)
- `docker-compose.yml` runs the container on port 8000

## Architecture

Vue 3 + Vite single-page app (no router, no state library). All source lives in `vue-client/src/`.

### Component hierarchy

`App.vue` → `GameDashboard.vue` (sole top-level component, owns all game logic) → `PlayerHeader.vue`, `ScoreRow.vue` → `ScoreCell.vue`

### Composables

- **`useGameState.js`** — Reactive game state (`players[]`, `rounds[][]`), player/round CRUD, auto-persist to localStorage via deep watcher. Module-level singleton (state lives outside the function).
- **`useScoreCalculation.js`** — Pure computed derivations: round winner detection, column totals, ready-for-new-round check. Takes `state` as parameter.

### Key design decisions

- **Score input**: `<input type="text" inputmode="numeric">` (not `type="number"`, not contenteditable) for iPad compatibility. Users type positive numbers; the system auto-negates with `-Math.abs()`. Scores are displayed as negative values.
- **Winner detection**: Single-pass algorithm — exactly one zero score + all others negative = winner. Winner's displayed score is the positive sum of losers' scores (e.g. losers -25, -30, -15 → winner gets +70).
- **Player constraints**: MIN_PLAYERS=2, MAX_PLAYERS=6. Players can only be added/removed before the game starts (>1 round). Player names are always editable.
- **Persistence**: localStorage with validation (checks array lengths match between players and rounds). Invalid data falls back to defaults.
- **Enter key navigation**: In score cells, Enter moves focus to the next `.score-input` via DOM query.
