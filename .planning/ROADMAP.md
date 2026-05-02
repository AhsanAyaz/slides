# Roadmap: TEDx KTH 2026 — The Thinking Gap Talk

**Created:** 2026-05-01
**Granularity:** coarse (3 phases)
**Mode:** yolo
**Hard deadline:** 2026-05-04 (TEDx KTH Salon, Stockholm)

## Core Value

A delivered, polished TEDx deck that the speaker can take onto the red dot on May 4 and run reliably from his laptop. Visual fidelity to the published mockup, accurate timing cues, embedded speaker notes, and zero day-of surprises beat any other consideration.

## Phases

- [x] **Phase 1: Deck Shell & Style Foundation** — Wire `talks/tedx-kth.html`, plugins, fonts, and the TEDx palette/typography so the deck has a working frame with no content yet
- [ ] **Phase 2: Slides & Speaker Notes** — Author all 12 slides with their custom layouts inside `slides-markdown/tedx-kth.md` and embed timing/stage notes via the Notes plugin
- [ ] **Phase 3: Hub Integration & Pre-Delivery Verification** — Register on the hub, run the extractor + gulp build, and dry-run the deck (keyboard nav, Notes window, offline fonts, visual diff vs. mockup)

## Phase Details

### Phase 1: Deck Shell & Style Foundation
**Goal**: A working `talks/tedx-kth.html` shell loads reveal.js with the TEDx palette and typography — opening it shows a styled but empty deck ready to receive slide content.
**Depends on**: Nothing (first phase)
**Requirements**: DECK-01, DECK-02, DECK-03, DECK-04, DECK-05, STYLE-01, STYLE-02, STYLE-03
**Success Criteria** (what must be TRUE):
  1. Opening `talks/tedx-kth.html` in a browser boots reveal.js v4.4.0 with markdown, highlight, notes, and KaTeX plugins active and no console errors
  2. The shell loads `slides-markdown/tedx-kth.md` via `data-markdown` with `^\n---\n$` and `^\n--\n$` separators, matching sibling-talk convention
  3. Fraunces, JetBrains Mono, and Inter render on a placeholder slide (preconnect + display:swap link tags resolve), and the TEDx red `#e62b1e` accent shows on a probe element
  4. `talks/tedx-kth/style.css` defines both the deep-black `#0a0a0a` palette and the cream `#f5f1ea`/`#1a1208` palette as scoped rules that win over reveal's black theme without polluting other talks
  5. The speaker watermark/socials block is omitted or restyled so no Tailwind blue link is visible during slide playback
**Plans**: 3 plans
Plans:
- [x] 01-01-PLAN.md — Author talks/tedx-kth.html shell with deviations locked in (DECK-01, DECK-02, DECK-03, DECK-04, DECK-05)
- [x] 01-02-PLAN.md — Author talks/tedx-kth/style.css with variable contract, counter-rules, ink-switch (STYLE-01, STYLE-02, STYLE-03, DECK-02)
- [x] 01-03-PLAN.md — Self-hosted fonts, @font-face declarations, two-palette probe markdown (DECK-03, STYLE-03)
**UI hint**: yes

### Phase 2: Slides & Speaker Notes
**Goal**: All 12 TEDx slides exist in `slides-markdown/tedx-kth.md` with their custom layouts and the speaker can read the timing cues and stage directions on the Notes-plugin confidence monitor.
**Depends on**: Phase 1
**Requirements**: SLIDE-01, SLIDE-02, SLIDE-03, SLIDE-04, SLIDE-05, SLIDE-06, SLIDE-07, SLIDE-08, SLIDE-09, SLIDE-10, SLIDE-11, SLIDE-12, STYLE-04, NOTES-01, NOTES-02
**Success Criteria** (what must be TRUE):
  1. Pressing the right-arrow key advances through 12 slides in the order Title → Demo browser → PERMISSION DENIED → `adk web` reveal → 2x2 AI grid → Al-Khwarizmi → Thinking Gap (9 vs ~4,000) → 84%/29% stat → Dragon (Use/Trust/Output/Demand) → Karpathy reframe → Context engineering definition → "What is *worth* building?"
  2. Each of the 12 slides matches the static mockup's per-slide layout — terminal cursor blink and CRT scan-line on slide 3, gold `$` over giant `adk web` on slide 4, manuscript SVG on slide 6, oversized faded quote mark on slide 11, cream-themed strikethrough+arrow on slide 10, etc.
  3. Pressing `s` opens the Notes window and every slide shows its timing cue ("~ 9:00"), narrative beat, and stage direction copied verbatim from the mockup's `.slide-notes` blocks
  4. Special directions are preserved in the notes: slide 1 "hold for ~10s", slide 4 "hold silence ~2s after reveal", slide 7 "narrate their thoughts", slide 12 "final poster — do not advance to thank-you"
  5. TEDx red appears only where the mockup uses it (eyebrow rules, italic emphasis, terminal text, strikethrough, arrows, sep dots, dragon down-arrows, the dot in `adk web`); ink and ink-soft variants apply correctly per slide background
**Plans**: TBD
**UI hint**: yes

### Phase 3: Hub Integration & Pre-Delivery Verification
**Goal**: The talk is discoverable from the hub, builds cleanly through the existing pipeline, and passes a full dry-run that proves it will run reliably from the speaker's laptop on May 4.
**Depends on**: Phase 2
**Requirements**: HUB-01, HUB-02, HUB-03, VERIFY-01, VERIFY-02, VERIFY-03, VERIFY-04, VERIFY-05
**Success Criteria** (what must be TRUE):
  1. The hub at `index.html` shows a card titled "The next billion developers won't be blocked by syntax. They'll be blocked by thinking." that links to `tedx-kth.html` and opens the deck on click; no existing talk cards are broken
  2. `node scripts/extractSlideData.js` (or its npm-script equivalent) runs without errors against the new talk and emits valid JSON
  3. `gulp serve` runs the deck end-to-end at projector resolution (1920x1080) with keyboard navigation and zero JS console errors; `gulp build` produces a working `dist/` bundle that is also navigable end-to-end
  4. With Wi-Fi disabled (or Google Fonts blocked at the network layer) the deck still loads, all 12 slides remain readable, and layout does not visually collapse — the fallback typography degrades gracefully
  5. A side-by-side visual diff against `talks/tedx-kth/reference-material/slides.html` confirms each of the 12 slides matches on positions, colors, typography weights/sizes, decorative SVG elements, and spacing; the Notes window opens via `s` and shows next-slide preview with timing cues during the dry-run
**Plans**: TBD
**UI hint**: yes

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Deck Shell & Style Foundation | 3/3 | Complete | 2026-05-02 |
| 2. Slides & Speaker Notes | 0/0 | Not started | - |
| 3. Hub Integration & Pre-Delivery Verification | 0/0 | Not started | - |

## Coverage

- v1 requirements: 31 total
- Mapped to phases: 31
- Unmapped: 0 ✓

| Requirement | Phase |
|-------------|-------|
| DECK-01 | Phase 1 |
| DECK-02 | Phase 1 |
| DECK-03 | Phase 1 |
| DECK-04 | Phase 1 |
| DECK-05 | Phase 1 |
| STYLE-01 | Phase 1 |
| STYLE-02 | Phase 1 |
| STYLE-03 | Phase 1 |
| STYLE-04 | Phase 2 |
| SLIDE-01 | Phase 2 |
| SLIDE-02 | Phase 2 |
| SLIDE-03 | Phase 2 |
| SLIDE-04 | Phase 2 |
| SLIDE-05 | Phase 2 |
| SLIDE-06 | Phase 2 |
| SLIDE-07 | Phase 2 |
| SLIDE-08 | Phase 2 |
| SLIDE-09 | Phase 2 |
| SLIDE-10 | Phase 2 |
| SLIDE-11 | Phase 2 |
| SLIDE-12 | Phase 2 |
| NOTES-01 | Phase 2 |
| NOTES-02 | Phase 2 |
| HUB-01 | Phase 3 |
| HUB-02 | Phase 3 |
| HUB-03 | Phase 3 |
| VERIFY-01 | Phase 3 |
| VERIFY-02 | Phase 3 |
| VERIFY-03 | Phase 3 |
| VERIFY-04 | Phase 3 |
| VERIFY-05 | Phase 3 |

---
*Roadmap created: 2026-05-01*
