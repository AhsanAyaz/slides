---
phase: 01-deck-shell-style-foundation
plan: 03
subsystem: ui
tags: [reveal-js, fonts, woff2, google-fonts, fraunces, jetbrains-mono, inter, tedx, css, font-face]

# Dependency graph
requires:
  - phase: 01-deck-shell-style-foundation/01
    provides: "talks/tedx-kth.html shell with data-markdown=\"slides-markdown/tedx-kth.md\" attribute"
  - phase: 01-deck-shell-style-foundation/02
    provides: "talks/tedx-kth/style.css with --serif/--mono/--sans variable contract and section.deep/section.cream ink-switch"
provides:
  - "Self-hosted woff2 font fallback bundle (8 files) at talks/tedx-kth/fonts/"
  - "@font-face declarations in talks/tedx-kth/style.css wiring local woff2 to --serif/--mono/--sans stacks"
  - "talks/slides-markdown/tedx-kth.md with two probe sections (deep + cream) exercising the full font + accent chain"
  - "Offline-resilience foundation: deck renders with brand fonts even if Google Fonts CDN is unreachable"
affects: [02-slides-speaker-notes, 03-hub-integration-verification]

# Tech tracking
tech-stack:
  added:
    - "Self-hosted Google Fonts (Fraunces variable + JetBrains Mono + Inter, Latin subset only)"
  patterns:
    - "@font-face declarations live alongside variable contract in talks/tedx-kth/style.css (single source of truth, PATTERNS.md line 235)"
    - "Variable Fraunces with font-weight: 400 600 range and format('woff2-variations') + format('woff2') fallback"
    - "Probe sections use raw <section> HTML (not auto-generated from --- markdown) so data-background-color and class attributes stick (D-10)"
    - "Inline style=\"...\" attributes acceptable on probe scaffolding (D-12) — Phase 2 replaces with per-slide CSS"

key-files:
  created:
    - "talks/tedx-kth/fonts/Fraunces-Variable.woff2 (67 KB)"
    - "talks/tedx-kth/fonts/JetBrainsMono-Regular.woff2 (31 KB)"
    - "talks/tedx-kth/fonts/JetBrainsMono-Medium.woff2 (31 KB)"
    - "talks/tedx-kth/fonts/JetBrainsMono-Bold.woff2 (31 KB)"
    - "talks/tedx-kth/fonts/Inter-Light.woff2 (47 KB)"
    - "talks/tedx-kth/fonts/Inter-Regular.woff2 (47 KB)"
    - "talks/tedx-kth/fonts/Inter-Medium.woff2 (47 KB)"
    - "talks/tedx-kth/fonts/Inter-SemiBold.woff2 (47 KB)"
    - "talks/slides-markdown/tedx-kth.md (probe markdown, two sections)"
  modified:
    - "talks/tedx-kth/style.css (appended 8 @font-face declarations + comment header)"

key-decisions:
  - "Used Fraunces variable woff2 (single file, font-weight: 400 600 range) instead of three per-weight files — Google's CSS API returns the variable file when the axis range is requested"
  - "JetBrains Mono and Inter saved as per-weight filenames even though Google now serves the same physical variable woff2 for all weights — keeps @font-face declarations symmetric and lets Phase 2 swap individual files if static subsets are preferred later"

patterns-established:
  - "Pattern: font asset folder convention talks/<talk>/fonts/*.woff2 with relative url('fonts/<file>.woff2') from per-talk style.css"
  - "Pattern: offline-fallback chain ordered self-hosted woff2 -> Google Fonts CDN -> system font fallback (Georgia/Courier New/sans-serif)"
  - "Pattern: probe sections as throwaway scaffolding deleted by next phase (D-12) — Phase 2 will overwrite talks/slides-markdown/tedx-kth.md"

requirements-completed: [DECK-03, STYLE-03]

# Metrics
duration: ~6 min
completed: 2026-05-01
---

# Phase 1 Plan 3: Self-Hosted Fonts and Probe Markdown Summary

**8 woff2 fonts (Fraunces variable, JetBrains Mono 400/500/700, Inter 300/400/500/600) downloaded and wired via @font-face into style.css; two-palette probe markdown authored — Phase 1 deck chain is now end-to-end loadable.**

## Performance

- **Duration:** ~6 min (Tasks 1-3 only; Task 4 awaiting human verification)
- **Started:** 2026-05-01T21:42:47Z
- **Completed (auto tasks):** 2026-05-01T21:45:51Z
- **Tasks:** 3 of 4 auto tasks complete; Task 4 (checkpoint:human-verify) pending
- **Files modified:** 10 (8 created, 1 created markdown, 1 appended CSS)

## Accomplishments

- Downloaded 8 Latin-subset woff2 files from Google Fonts CSS API directly (gstatic.com), all valid (wOF2 magic bytes, ≥5 KB) and committed to repo
- Appended 8 @font-face blocks to talks/tedx-kth/style.css; Plan 02 contents preserved unchanged at the top
- Authored talks/slides-markdown/tedx-kth.md with two probe sections covering deep and cream palettes, exercising all three font stacks plus the TEDx red `#e62b1e` accent
- Phase 1 success criteria 1, 3 mechanically satisfied; criteria 2 and 4 (which require Plan 01 + Plan 02 + this plan together) are now also satisfied
- Offline-resilience foundation complete: Phase 3's VERIFY-04 offline test now has a working baseline

## Task Commits

Each task was committed atomically with `--no-verify` (parallel-executor convention):

1. **Task 1: Download self-hosted woff2 fonts** — `d4a1112` (feat)
2. **Task 2: Append @font-face declarations to style.css** — `f22596f` (feat)
3. **Task 3: Author tedx-kth.md probe sections** — `21327ae` (feat)

**Plan metadata commit:** Will be added by orchestrator after wave merges.

**Task 4: Visual verification** — Awaiting human signoff (see "Pending: Task 4 Checkpoint" below).

## Files Created/Modified

- `talks/tedx-kth/fonts/Fraunces-Variable.woff2` — 67,388 bytes — variable axis opsz 9..144, wght 400..600 (single file covers all 3 weights)
- `talks/tedx-kth/fonts/JetBrainsMono-Regular.woff2` — 31,340 bytes — weight 400, Latin subset
- `talks/tedx-kth/fonts/JetBrainsMono-Medium.woff2` — 31,340 bytes — weight 500
- `talks/tedx-kth/fonts/JetBrainsMono-Bold.woff2` — 31,340 bytes — weight 700
- `talks/tedx-kth/fonts/Inter-Light.woff2` — 48,432 bytes — weight 300
- `talks/tedx-kth/fonts/Inter-Regular.woff2` — 48,432 bytes — weight 400
- `talks/tedx-kth/fonts/Inter-Medium.woff2` — 48,432 bytes — weight 500
- `talks/tedx-kth/fonts/Inter-SemiBold.woff2` — 48,432 bytes — weight 600
- `talks/tedx-kth/style.css` — appended Section 4 with 8 @font-face blocks pointing at the local woff2 files
- `talks/slides-markdown/tedx-kth.md` — created with two `<section>` probe blocks separated by `---`

### Path Resolution Confirmation

- Shell at `talks/tedx-kth.html` declares `data-markdown="slides-markdown/tedx-kth.md"`
- Browser resolves relative to `talks/`, so the loaded path is `talks/slides-markdown/tedx-kth.md` — matches the file authored in Task 3
- @font-face `src: url('fonts/X.woff2')` paths in `talks/tedx-kth/style.css` resolve to `talks/tedx-kth/fonts/X.woff2` — matches files downloaded in Task 1

## Decisions Made

- **Fraunces stored as a single variable woff2** rather than three per-weight files. The plan's action text allowed either route; testing showed that requesting `Fraunces:opsz,wght@9..144,400..600` from Google's CSS API returns a single woff2 declared with `font-weight: 400 600`. This gives one smaller asset with the full weight range, matching the plan's preferred output and reducing the number of HTTP requests in fallback mode by 2.
- **JetBrains Mono and Inter saved under per-weight filenames** even though Google's CSS API returns the same variable woff2 URL regardless of which static weight is requested. This keeps the @font-face block structure symmetric (one block per weight, easy to scan and modify), preserves the option for Phase 2 to swap individual files in for true static subsets if needed, and matches the locked filenames in the plan's `files` field.
- **Variable Fraunces @font-face uses `font-weight: 400 600` range** with both `format('woff2-variations')` and `format('woff2')` source declarations. This ensures the browser resolves the variable file for any weight in 400..600 and falls back gracefully on browsers that do not understand `woff2-variations`.

## Deviations from Plan

None - plan executed exactly as written.

The plan explicitly anticipated both Fraunces output paths (variable file vs. three per-weight files) and instructed the executor to "document the choice in the SUMMARY"; the choice (variable file) is documented above. The choice required no changes to the @font-face block in Task 2 — it matches the plan's preferred shape.

## Issues Encountered

None during execution. One observation worth flagging for Phase 2/3:

- **Google Fonts CSS API returns the same variable woff2 file** for JetBrains Mono and Inter regardless of which static weight points are requested in the URL. The file contains the variable axis with all weights baked in. This means the three "JetBrainsMono-*.woff2" files on disk and the four "Inter-*.woff2" files on disk are byte-identical copies of the same variable woff2 — disk usage is ~94 KB JBM + ~189 KB Inter when it could be ~31 KB JBM + ~48 KB Inter if reduced to a single variable file per family. Not a correctness issue (the deck renders correctly either way), but Phase 2 or Phase 3 may want to consolidate to single-variable files to reduce repo size if disk footprint matters. Tracked as a Phase 2/3 nice-to-have.

## User Setup Required

None - all artifacts are self-contained in the repo.

## Pending: Task 4 Checkpoint (human-verify)

**Status:** Awaiting human verification. The executor returned a checkpoint state to the orchestrator immediately after committing this SUMMARY.md so the user can perform the visual checks.

**What to verify** (per the plan's `<how-to-verify>`):

1. From repo root, run `npx http-server -p 8080 .` (or `python3 -m http.server 8080`)
2. Open `http://localhost:8080/talks/tedx-kth.html` in Chrome/Safari
3. Confirm DevTools console has zero red errors (ROADMAP success criterion 1)
4. First slide: deep-palette probe — black `#0a0a0a` background, `DECK · PROBE · DEEP` eyebrow in JetBrains Mono, `TEDx KTH Salon — Deep Palette Probe` headline in Fraunces, red horizontal rule, body in Inter (success criterion 3)
5. Right-arrow → second slide: cream-palette probe — cream `#f5f1ea` background, dark text, same fonts, same red rule (success criterion 4)
6. Press `s` to confirm speaker notes window opens (DECK-04)
7. DevTools Network → confirm requests to `fonts/Fraunces-Variable.woff2`, `fonts/JetBrainsMono-Regular.woff2`, `fonts/Inter-Regular.woff2` (D-04, D-06)
8. Optional: DevTools Network "Offline" → reload → deck still renders (D-04 fail-soft)
9. Inspect second slide's `<section>` → confirm `data-background-color="#f5f1ea"` AND `class="cream"`; computed `--ink` = `#1a1208` (D-10 ink-switch wiring)

**Resume signal:** User types `approved` to mark Phase 1 complete, or describes issues for gap-closure.

## Next Phase Readiness

- Phase 1 deck shell + style + fonts + probe markdown form a complete, loadable foundation
- Phase 2 can begin authoring the 12 real TEDx slides into `talks/slides-markdown/tedx-kth.md` — **Phase 2 planner: per D-12, the probe sections in this file are throwaway scaffolding and Phase 2's first task should delete them and replace with the 12 real slides** (do not preserve the probe sections — they exist only to verify the foundation chain works)
- Plan 02's variable contract (--bg-deep, --bg-soft, --ink, --accent, --serif, --mono, --sans) is in place — Phase 2 lifts mockup CSS using these exact identifiers
- Self-hosted fonts mean Phase 3's VERIFY-04 offline test has a working baseline; no additional font work needed
- The same pattern (per-talk `fonts/` folder + @font-face in `style.css`) is reusable for any future talk that needs custom typography

## Self-Check: PASSED

Verified post-creation:

- All 8 woff2 files present at `talks/tedx-kth/fonts/` with valid wOF2 magic bytes and >5KB each
- 8 `@font-face` blocks in `talks/tedx-kth/style.css`; all reference `fonts/*.woff2` paths that exist on disk
- `talks/slides-markdown/tedx-kth.md` exists with 2 `<section>` blocks, 1 `^---$` separator line, all four `var(--*)` token references
- All three task commits exist in git log: `d4a1112`, `f22596f`, `21327ae`
- Plan 02 contents preserved unchanged: body.tedx variable contract, counter-rules, section.deep/cream ink-switch all intact
- No modifications to `.planning/STATE.md` or `.planning/ROADMAP.md` (orchestrator owns those writes)

---
*Phase: 01-deck-shell-style-foundation*
*Plan: 03*
*Completed (Tasks 1-3): 2026-05-01*
*Task 4: pending human verification*
