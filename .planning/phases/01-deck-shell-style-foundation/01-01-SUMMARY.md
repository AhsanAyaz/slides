---
phase: 01-deck-shell-style-foundation
plan: 01
subsystem: ui
tags: [reveal.js, html, google-fonts, fraunces, jetbrains-mono, inter, tedx]

requires:
  - phase: 00-init
    provides: REQUIREMENTS.md DECK-01..DECK-05; sibling shell talks/the-prompt-is-dead-long-live-the-context.html as canonical analog
provides:
  - talks/tedx-kth.html — reveal.js v4.4.0 shell entry for the TEDx KTH 2026 deck
  - body.tedx scoping hook so per-talk CSS (Plan 02) wins the cascade
  - Hub-extractor compatible <title> (TEDx-published verbatim, ASCII apostrophes)
  - Google Fonts CDN preconnect + family=Fraunces|JetBrains+Mono|Inter URL with display=swap
  - Stylesheet load order: dist/reveal.css -> plugin/highlight/monokai.css -> tedx-kth/style.css (last; highest cascade)
affects: [01-02-plan-style-css, 01-03-plan-probe-markdown, 02-slides-and-notes, 03-hub-integration-and-pre-delivery-verification]

tech-stack:
  added: []
  patterns:
    - "Per-talk shell deviation: drop dist/theme/black.css, Tailwind CDN, profiles preface, watermark; carry body class for scoping"
    - "Cascade priority via link order: per-talk style.css must be the last <link> in <head>"
    - "Hub-extractor preemption: place TEDx-published title verbatim in <title> so HUB-02 regex captures cleanly with ASCII apostrophes"

key-files:
  created:
    - talks/tedx-kth.html
  modified: []

key-decisions:
  - "Lifted four-plugin block + Reveal.initialize flag set verbatim from sibling shell (DECK-04)"
  - "Excluded dist/theme/black.css (D-01), Tailwind CDN (D-08), profiles/ahsan.md preface (D-07), watermark/socials block (D-09)"
  - "Added <body class=\"tedx\"> per D-02 so style.css selectors win without leaking to other talks"
  - "Loaded tedx-kth/style.css as the LAST <link> in <head> for highest cascade priority over reveal.css and monokai.css"
  - "Used straight ASCII apostrophes in <title> (won't / They'll) so the extractor regex /<title>\\s*([\\s\\S]*?)\\s*<\\/title>/i captures cleanly"

patterns-established:
  - "Pattern: shell deviation — copy plugin block + Reveal.initialize verbatim, delete theme/Tailwind/preface/watermark, add body class for scoping"
  - "Pattern: cascade-last per-talk stylesheet — <link> to per-talk CSS appears after every other stylesheet in <head>"
  - "Pattern: hub-extractor pre-emption — <title> set to the canonical published title at shell creation, not deferred to a later phase"

requirements-completed: [DECK-01, DECK-02, DECK-03, DECK-04, DECK-05]

duration: 1min
completed: 2026-05-01
---

# Phase 1 Plan 01: Reveal.js Shell for TEDx KTH 2026 Summary

**TEDx-titled reveal.js v4.4.0 shell at `talks/tedx-kth.html` with four-plugin pipeline, Fraunces/JetBrains Mono/Inter Google Fonts URL, body.tedx scoping hook, and per-talk style.css linked last for highest cascade priority — sibling-shell deviations (no black.css, no Tailwind CDN, no profiles preface, no watermark) locked at decisions D-01/D-07/D-08/D-09.**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-05-01T21:34:28Z
- **Completed:** 2026-05-01T21:35:24Z
- **Tasks:** 1
- **Files modified:** 1 (1 created, 0 modified)

## Accomplishments

- Authored `talks/tedx-kth.html` (51 lines) — the canonical TEDx shell that boots reveal.js v4.4.0 with markdown / highlight / notes / KaTeX plugins.
- Loaded `slides-markdown/tedx-kth.md` via `<section data-markdown=…>` with locked separators `^\n---\n$` and `^\n--\n$` (the markdown file itself is created by Plan 03; the link is dormant until then).
- Locked the four deviations from the canonical sibling shell (`talks/the-prompt-is-dead-long-live-the-context.html`): no `dist/theme/black.css`, no `https://cdn.tailwindcss.com` script, no `profiles/ahsan.md` preface section, no `watermark` block.
- Added `<body class="tedx">` (D-02) so every selector in `talks/tedx-kth/style.css` (created by parallel Plan 02 in a sister worktree) wins against `customizations.scss` without leaking to sibling talks.
- Placed `<link rel="stylesheet" href="tedx-kth/style.css" />` as the LAST stylesheet in `<head>` (line 16, after `dist/reveal.css` on line 8 and `plugin/highlight/monokai.css` on line 15) so per-talk CSS has highest cascade priority over both reveal core and the highlight plugin's CSS.
- Set the `<title>` to the exact TEDx-published string with straight ASCII apostrophes — pre-empts the Phase 3 HUB-02 hub-extractor pass (`scripts/extractSlideData.js` regex `/<title>\s*([\s\S]*?)\s*<\/title>/i`) so it captures cleanly.

## Task Commits

Each task was committed atomically:

1. **Task 1: Author talks/tedx-kth.html shell with deviations locked in** — `cff1626` (feat)

## Files Created/Modified

- `talks/tedx-kth.html` (created, 51 lines) — Reveal.js v4.4.0 shell entry for the TEDx KTH 2026 talk. Loads core reveal CSS, the TEDx Google Fonts URL (Fraunces opsz 9..144 / 400-500-600, JetBrains Mono 400-500-700, Inter 300-400-500-600, all `display=swap`), the highlight plugin's monokai.css, and the per-talk `tedx-kth/style.css` (provided by parallel Plan 02). Body carries `class="tedx"`. Single `<div class="slides">` block loads `slides-markdown/tedx-kth.md` (provided by Plan 03). `Reveal.initialize` carries the four plugin instances and four locked flags (`controls`, `progress`, `history`, `center`).

## Decisions Made

- **Stylesheet ordering verified:** `../dist/reveal.css` at line 8, `../plugin/highlight/monokai.css` at line 15, `tedx-kth/style.css` at line 16 — Plan-mandated cascade order achieved, confirmed by `grep -n` ordering check.
- **ASCII apostrophes in title:** Used straight `'` (U+0027) for "won't" and "They'll" rather than curly `'` (U+2019). The plan called this out explicitly (Task 1 implementation note 7) because the hub-extractor regex passes either through, but ASCII keeps the captured string identical to the canonical reference in `data/slides.json` (set in Phase 3 HUB-01).
- **Plain `Reveal.initialize` formatting kept verbatim from sibling:** Two-space indent, single quotes for JS, trailing commas inside arrays — matches Prettier conventions per CONVENTIONS.md.

## Deviations from Plan

None - plan executed exactly as written.

The plan supplied the exact 51-line file body to write; no auto-fixes (Rule 1/2/3) were triggered and no architectural decisions (Rule 4) were needed. All 22 acceptance criteria passed on first verification:

| # | Criterion | Result |
|---|-----------|--------|
| 1 | File `talks/tedx-kth.html` exists | PASS |
| 2 | `data-markdown="slides-markdown/tedx-kth.md"` exactly once | PASS (count=1) |
| 3 | `data-separator="^\n---\n$"` present | PASS |
| 4 | `data-separator-vertical="^\n--\n$"` present | PASS |
| 5 | `<body class="tedx">` present | PASS |
| 6 | Title verbatim with ASCII apostrophes | PASS |
| 7 | `<link rel="stylesheet" href="../dist/reveal.css" />` present | PASS |
| 8 | `tedx-kth/style.css` link AFTER reveal.css AND monokai.css | PASS (lines 8, 15, 16) |
| 9 | preconnect to googleapis.com present | PASS |
| 10 | preconnect to gstatic.com with crossorigin present | PASS |
| 11 | Google Fonts URL substring matches mockup line 9 verbatim | PASS |
| 12 | All four plugins in `Reveal.initialize` plugins array | PASS |
| 13 | All four flags (`controls`/`progress`/`history`/`center`: true) | PASS |
| 14 | NO `dist/theme/black.css` | PASS |
| 15 | NO `id="theme"` | PASS |
| 16 | NO `cdn.tailwindcss.com` | PASS |
| 17 | NO `tailwindcss` anywhere | PASS |
| 18 | NO `profiles/ahsan.md` | PASS |
| 19 | NO `watermark` | PASS |
| 20 | NO `text-blue-500` or `@codewith_ahsan` | PASS |
| 21 | Exactly ONE `<div class="slides">` block | PASS (count=1) |
| 22 | `<title>` regex captures non-empty content | PASS (captures "The next billion developers won't be blocked by sy…") |

## Issues Encountered

None. The plan was fully specified — every line was determined up-front from the canonical sibling shell + four locked deviations.

## User Setup Required

None - no external service configuration required for this plan. Google Fonts CDN access is required at runtime but no API keys / accounts are needed.

## Next Phase Readiness

- **Plan 01-02 (parallel, in sister worktree):** Will author `talks/tedx-kth/style.css` with the `body.tedx { … }` variable contract, counter-rules, and `@font-face` declarations. The shell already references the file at line 16; once Plan 01-02 ships, the link resolves and styles apply.
- **Plan 01-03:** Will author `slides-markdown/tedx-kth.md` with the two probe sections (deep + cream) that exercise all three fonts and the TEDx-red accent. The shell already loads it via `<section data-markdown="slides-markdown/tedx-kth.md" …>` (line 22).
- **Phase 3 HUB-02:** Will run `scripts/extractSlideData.js` and pull `<title>` text. The title already matches the canonical TEDx-published string verbatim — HUB-02 will pass preemptively.
- **Phase 3 VERIFY-01:** Will run a full browser smoke test (`gulp serve` → open shell → check console for zero errors). Cannot pass yet because `tedx-kth/style.css` and `slides-markdown/tedx-kth.md` are still pending Plans 01-02 and 01-03.
- **No blockers introduced** — sibling-talk shells are unmodified (Plan 01 only writes one file at the `talks/` root).

## Self-Check: PASSED

Verified before returning to orchestrator:

- File `talks/tedx-kth.html` exists (`[ -f talks/tedx-kth.html ]` → 0)
- Commit `cff1626` exists in `git log` on this worktree branch
- All 22 acceptance criteria recorded above pass
- No unintended file deletions in commit `cff1626` (`git diff --diff-filter=D --name-only HEAD~1 HEAD` → empty)
- No modifications to STATE.md or ROADMAP.md (per parallel-executor mandate)
- Sibling-talk shells under `talks/*.html` unmodified

---
*Phase: 01-deck-shell-style-foundation*
*Plan: 01*
*Completed: 2026-05-01*
