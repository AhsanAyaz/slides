# Requirements: TEDx KTH 2026 — The Thinking Gap Talk

**Defined:** 2026-05-01
**Core Value:** A delivered, polished TEDx deck that the speaker can take onto the red dot on May 4 and run reliably from his laptop.

## v1 Requirements

Requirements for the May 4 delivery. Each maps to roadmap phases.

### Deck Shell

- [ ] **DECK-01**: Create `talks/tedx-kth.html` shell that loads `dist/reveal.js`, `dist/reveal.css`, and uses the markdown loader convention (`data-markdown="slides-markdown/tedx-kth.md"` with `^\n---\n$` and `^\n--\n$` separators)
- [ ] **DECK-02**: Shell loads talk-specific stylesheet `talks/tedx-kth/style.css` after reveal.css so custom rules win without overriding the black theme globally
- [ ] **DECK-03**: Shell loads Fraunces, JetBrains Mono, and Inter from Google Fonts via preconnect + display:swap link tags
- [ ] **DECK-04**: Reveal.js initialized with `RevealMarkdown`, `RevealHighlight`, `RevealNotes`, `RevealMath.KaTeX` plugins; `controls`, `progress`, `history`, `center` configured consistently with sibling talks
- [ ] **DECK-05**: Speaker watermark/socials block omitted or restyled so it does not collide with TEDx visual frame (TEDx red is the accent — no Tailwind blue link visible during delivery)

### Visual Style

- [ ] **STYLE-01**: TEDx red `#e62b1e` is the single accent color across all 12 slides, used exactly where the mockup uses it (eyebrow rules, italic emphasis, terminal text, strikethrough, arrows, sep dots, dragon-row down arrows)
- [ ] **STYLE-02**: Two-palette system implemented: deep-black `#0a0a0a` background slides (1, 2, 3, 4, 7, 8, 9, 11) and cream `#f5f1ea`/`#1a1208` slides (10, 12, 6); ink colors and ink-soft variants set per slide
- [ ] **STYLE-03**: Typography stack applied: Fraunces serif for headlines and definitions, JetBrains Mono for eyebrows / labels / commands / source citations, Inter sans for body and meta
- [ ] **STYLE-04**: Custom per-slide layouts from the mockup are reproduced (terminal cursor blink, browser-frame chrome, manuscript decorative SVG, 2x2 AI grid, statistic typography, light-theme reframe with arrow SVG, oversized quotation mark, etc.)

### Slide Content (12 slides, in order)

- [ ] **SLIDE-01**: Title slide — eyebrow "TEDx KTH Salon · The Voice of Innovation"; title-1 "The next billion developers won't be blocked by syntax."; title-2 italic accent "They'll be blocked by thinking."; meta footer with author + Stockholm · 04.05.2026
- [ ] **SLIDE-02**: Demo story setup — dimmed browser frame showing `google.github.io/adk-docs` with "Build AI agents that can reason, plan, and act" heading; intentionally low-contrast / out-of-focus
- [ ] **SLIDE-03**: "The 4-hour hole" — large terminal-styled "PERMISSION DENIED" in TEDx red with blinking cursor and CRT scan-line texture
- [ ] **SLIDE-04**: The reveal — gold `$` prompt above giant `adk web` command (the dot in TEDx red); held in silence after reveal
- [ ] **SLIDE-05**: "What AI did for me" — 2x2 grid with four cells (Recovered a hacked blog / Replaced a CMS with markdown / Wrote a book in 3 months / A marketing agent called Alkhwarizmi); hand-drawn icon style; gold accent on icons
- [ ] **SLIDE-06**: Al-Khwarizmi — manuscript decorative geometry (SVG) on left, name "Muḥammad ibn Mūsā al-Khwārizmī" with translation note, dates 780–850 CE, and `al-jabr` etymology line
- [ ] **SLIDE-07**: The Thinking Gap (heart of talk) — branded label "The Thinking Gap" in TEDx red box; 9 vs ~4,000 number row with italic "vs"; footer line "Same year · Same hands · Same AI" with TEDx-red separators
- [ ] **SLIDE-08**: Stat slide — 84% / 29% side-by-side with the 84% in default ink and 29% in TEDx red; source line "Stack Overflow Developer Survey · 2025 · n = 49,000+"
- [ ] **SLIDE-09**: The dragon — four lines "Use ↑ / Trust ↓ / Output ↑ / Demand ↓" with up-arrows in ink and down-arrows in TEDx red
- [ ] **SLIDE-10**: Karpathy reframe — light-theme cream background; "typing" struck through in TEDx red on the left, "thinking" on the right, TEDx-red SVG arrow between; footnote "paraphrasing Karpathy"
- [ ] **SLIDE-11**: Context engineering definition — oversized opening `"` mark in TEDx-red faded; centered serif definition with TEDx-red italic emphasis on "what" and "before"; "Context engineering" mono label at top
- [ ] **SLIDE-12**: Closing question — light cream background; centered serif "What is *worth* building?" with "worth" in italic TEDx red; small accent bar above; no Thank-You / contact slide

### Speaker Notes

- [ ] **NOTES-01**: Each of the 12 slides carries reveal.js Notes-plugin speaker notes that include the timing cue (e.g., "~ 9:00"), the narrative beat, and the stage direction verbatim from the mockup's `.slide-notes` blocks (so the speaker sees them on his confidence monitor during delivery)
- [ ] **NOTES-02**: Special directions preserved — slide 1 hold-for-10s, slide 4 hold-silence-for-2s after reveal, slide 7 "narrate their thoughts" line tied to the slide, slide 12 final-poster instruction (no advance to thank-you)

### Hub Integration

- [ ] **HUB-01**: Register the talk in `data/slides.json` with `link: "tedx-kth.html"` and the TEDx-published title verbatim ("The next billion developers won't be blocked by syntax. They'll be blocked by thinking.")
- [ ] **HUB-02**: `scripts/extractSlideData.js` runs cleanly with the new talk present (no extractor error, output JSON valid)
- [ ] **HUB-03**: Hub `index.html` + `main.js` render the new talk card without breaking existing layout; click-through opens the deck

### Pre-Delivery Verification

- [ ] **VERIFY-01**: `gulp serve` (or equivalent dev server) runs cleanly; deck navigable end-to-end via keyboard at projector resolution (1920x1080) with no JS console errors
- [ ] **VERIFY-02**: `gulp build` produces a working bundled output without warnings/errors; deck still navigable from `dist/` build
- [ ] **VERIFY-03**: Reveal.js Notes plugin opens a separate speaker window (`s` key) showing each slide's notes alongside the next-slide preview; timing cues visible
- [ ] **VERIFY-04**: Deck loads acceptably without network — fonts fall back gracefully, no missing local assets, layout does not visually collapse if Google Fonts is unavailable
- [ ] **VERIFY-05**: Visual diff pass — open each of the 12 reveal.js slides side-by-side with the static mockup (`reference-material/slides.html`) and confirm every visual element matches: positions, colors, typography weights/sizes, decorative elements, spacing

## v2 Requirements

Deferred — possible future phases for the hub-evolution work mentioned during questioning.

### Hub Evolution

- **HUBV2-01**: Per-talk landing pages with abstract, video link, and resources
- **HUBV2-02**: Hub filtering / search by topic, year, or venue
- **HUBV2-03**: Improved hub responsive design and visual hierarchy
- **HUBV2-04**: Post-talk artifacts surfaced (recording embed, slides PDF, transcript)

### TEDx Talk Follow-up

- **TEDXV2-01**: Add TEDx recording embed to the talk page after publication
- **TEDXV2-02**: PDF / static export of the deck for sharing with organizers

## Out of Scope

| Feature | Reason |
|---------|--------|
| Multi-talk hub redesign | Deferred to v2; current scope is the new TEDx deck |
| Custom build tooling for TEDx assets | Reuse existing gulp pipeline |
| Speaker coaching / script revisions | Script v3 is locked; project consumes it as the spoken contract |
| Recorded delivery / video editing | TEDx organizers handle recording |
| Translations / subtitles | Out of scope for delivery; available post-publication if pursued |
| Analytics or audience-feedback capture | Not requested |
| Switching from reveal.js to another framework | Hard tech-stack constraint — repo is reveal.js |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DECK-01 | Phase 1 | Pending |
| DECK-02 | Phase 1 | Pending |
| DECK-03 | Phase 1 | Pending |
| DECK-04 | Phase 1 | Pending |
| DECK-05 | Phase 1 | Pending |
| STYLE-01 | Phase 1 | Pending |
| STYLE-02 | Phase 1 | Pending |
| STYLE-03 | Phase 1 | Pending |
| STYLE-04 | Phase 2 | Pending |
| SLIDE-01 | Phase 2 | Pending |
| SLIDE-02 | Phase 2 | Pending |
| SLIDE-03 | Phase 2 | Pending |
| SLIDE-04 | Phase 2 | Pending |
| SLIDE-05 | Phase 2 | Pending |
| SLIDE-06 | Phase 2 | Pending |
| SLIDE-07 | Phase 2 | Pending |
| SLIDE-08 | Phase 2 | Pending |
| SLIDE-09 | Phase 2 | Pending |
| SLIDE-10 | Phase 2 | Pending |
| SLIDE-11 | Phase 2 | Pending |
| SLIDE-12 | Phase 2 | Pending |
| NOTES-01 | Phase 2 | Pending |
| NOTES-02 | Phase 2 | Pending |
| HUB-01 | Phase 3 | Pending |
| HUB-02 | Phase 3 | Pending |
| HUB-03 | Phase 3 | Pending |
| VERIFY-01 | Phase 3 | Pending |
| VERIFY-02 | Phase 3 | Pending |
| VERIFY-03 | Phase 3 | Pending |
| VERIFY-04 | Phase 3 | Pending |
| VERIFY-05 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 31 total
- Mapped to phases: 31
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-01*
*Last updated: 2026-05-01 after roadmap creation (traceability populated)*
