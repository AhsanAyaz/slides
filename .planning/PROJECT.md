# TEDx KTH 2026 — The Thinking Gap Talk

## What This Is

A new ~20-minute reveal.js presentation for **TEDx KTH Salon, Stockholm, 4 May 2026**, slotting into Muhammad Ahsan Ayaz's existing `cwa-slides` deck collection. The talk — *"The next billion developers won't be blocked by syntax. They'll be blocked by thinking."* — pairs a custom TEDx-styled visual deck (12 slides, brand-faithful typography and palette) with the speaker's prepared 2,820-word script v3 stored in `talks/tedx-kth/reference-material/`.

## Core Value

**A delivered, polished TEDx deck that the speaker can take onto the red dot on May 4 and run reliably from his laptop.** Visual fidelity to the published mockup, accurate timing cues, embedded speaker notes, and zero day-of surprises beat any other consideration.

## Requirements

### Validated

<!-- Inferred from existing cwa-slides codebase. -->

- ✓ Reveal.js presentation framework (v4.4.0) with markdown loader, notes plugin, highlight, KaTeX — existing
- ✓ Talk authoring convention: `talks/<name>.html` shell loads `slides-markdown/<name>.md` with `^\n---\n$` / `^\n--\n$` separators — existing
- ✓ Profile preface slide via `profiles/ahsan.md` — existing
- ✓ Hub registration via `data/slides.json` (link + title) rendered by `index.html` + `main.js` — existing
- ✓ Build pipeline: gulp serve / gulp build / gulp deploy with Rollup bundling — existing
- ✓ Slide-data extraction script (`scripts/extractSlideData.js`) feeding hub — existing

### Active

- [ ] Author 12-slide TEDx deck loaded by `talks/tedx-kth.html` (or folder variant), matching the v3 mockup's visual design
- [ ] Carry over the published TEDx-red palette, Fraunces / JetBrains Mono / Inter typography, and per-slide custom layouts (terminal text, browser frame, AI grid, dragon, reframe, etc.)
- [ ] Embed speaker notes from the mockup (timing cues, pause directions, narrative beats) as reveal.js notes (Notes plugin)
- [ ] Use horizontal slide separators (`---`) between the 12 main slides, matching the existing convention
- [ ] Register the talk in `data/slides.json` so it appears on the hub immediately
- [ ] Verify the deck runs cleanly via `gulp serve` and `gulp build` without breaking the slide-data extractor or hub
- [ ] Local preview / dry-run pass before May 4 — keyboard navigation, fragment timing, font loading, projector-safe contrast

### Out of Scope

- Multi-talk hub redesign or theme overhaul — deferred; may revisit after the talk lands
- Custom build tooling for TEDx-specific assets — reuse existing gulp pipeline
- Speaker coaching / script revisions — script v3 is locked; this project produces the deck for that script
- Recorded delivery / video editing — TEDx organizers handle the recording
- Translation / subtitles — out of scope for v1
- Analytics or audience-feedback capture for this talk specifically — not requested

## Context

- **Repo state:** Brownfield. `cwa-slides` is a personal fork of reveal.js (v4.4.0) that hosts ~16 talks plus a hub landing page. Codebase already mapped (`.planning/codebase/*.md`).
- **Material on hand:** `talks/tedx-kth/reference-material/slides.html` is a static, fully-styled 12-slide mockup; `talks/tedx-kth/reference-material/slides.md` is the full script v3 (~2,820 words, ~20 min) with stage directions and timing markers. Both are the contract for the deliverable.
- **Existing convention details:** Talks load `data-markdown="slides-markdown/<name>.md"`, use Reveal's black theme + Tailwind + Nunito, render a watermark, and initialize plugins (markdown, highlight, notes, math). Visual customization for this talk will not use the black theme — it brings its own TEDx palette.
- **Authoring choice:** Inline HTML inside the slides-markdown file. Custom CSS extracted to `talks/tedx-kth/style.css` and loaded by the shell HTML, so the markdown stays focused on per-slide structure and notes.
- **Timing pressure:** 3 calendar days from project init to delivery (init = 2026-05-01; talk = 2026-05-04). Polish budget is tight; correctness > nice-to-have.

## Constraints

- **Timeline:** Hard delivery deadline is **2026-05-04, TEDx KTH Salon, Stockholm** — non-negotiable.
- **Tech stack:** Must use the existing reveal.js v4.4.0 setup. No new presentation framework, no separate build pipeline.
- **Convention compatibility:** Must be loadable by the existing slide-data extractor (`scripts/extractSlideData.js`) and renderable by the hub (`main.js` + `data/slides.json`).
- **Visual fidelity:** TEDx-published title verbatim, TEDx red `#e62b1e`, Fraunces serif / JetBrains Mono / Inter sans — these are part of the talk's identity and cannot be swapped for the default Nunito/black-theme look.
- **Speaker notes:** Notes from the mockup (`.slide-notes` blocks) must reach the reveal.js Notes plugin so the speaker sees them on his confidence monitor.
- **Performance:** Deck must run from a laptop offline (KTH Wi-Fi unreliable assumption) — fonts and assets bundled or fail-soft.
- **Compatibility:** Render correctly in Chrome/Safari at projector resolution; speaker confidence monitor (Notes window) must work.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Full GSD project (not `/gsd-quick`) | User wants room for hub-evolution as later phases; multi-phase scaffolding earns its keep | — Pending |
| Inline HTML inside slides-markdown (not pure HTML sections, not stripped-down markdown) | Preserves existing convention while keeping the rich per-slide visual design | — Pending |
| Per-talk stylesheet at `talks/tedx-kth/style.css` | Keeps custom CSS out of the markdown but scoped to this talk; isolates from black theme | — Pending |
| Register on hub immediately (not held until after delivery) | User wants the link shareable now for promotion / feedback | — Pending |
| Folder layout: `talks/tedx-kth/` already exists with reference material; final shell at `talks/tedx-kth.html` (flat, matching majority of talks) and `slides-markdown/tedx-kth.md` | Stays close to the dominant convention; folder reserved for talk-specific assets and reference material | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-01 after initialization*
