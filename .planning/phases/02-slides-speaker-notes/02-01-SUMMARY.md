---
phase: 02-slides-speaker-notes
plan: 01
subsystem: per-slide-css
tags: [css, reveal.js, tedx, animation, layout]
dependency_graph:
  requires:
    - talks/tedx-kth/style.css (Phase 1 CSS variable contract)
  provides:
    - talks/tedx-kth/style.css extended with 12 per-slide layout blocks + @keyframes blink
  affects:
    - talks/slides-markdown/tedx-kth.md (Plan 02 references all .slide-N classes written here)
tech_stack:
  added: []
  patterns:
    - CSS scoping under body.tedx per D-02
    - clamp() for fluid typography at projector resolutions
    - CSS custom properties (var(--*)) lifted from Phase 1 variable contract
    - @keyframes animation for terminal cursor blink
    - Pseudo-elements (::before/::after) for decorative layers
key_files:
  created: []
  modified:
    - talks/tedx-kth/style.css
decisions:
  - "Append-only strategy: Phase 2 block added after last @font-face; no Phase 1 content modified"
  - "ink-dark-soft acceptance check uses multiline context (selector + property on separate lines) — verified correct by range grep"
metrics:
  duration: "~2 minutes"
  completed_date: "2026-05-02"
  tasks_completed: 2
  files_modified: 1
---

# Phase 2 Plan 01: Per-Slide CSS Layout Rules Summary

All 12 per-slide CSS layout blocks plus `@keyframes blink` appended to `talks/tedx-kth/style.css`, scoped under `body.tedx` with pixel-faithful values matching the static mockup reference.

## Tasks Completed

| Task | Name | Commit | Files Modified |
|------|------|--------|----------------|
| 1 | Append per-slide CSS slides 1–6 + @keyframes blink | 8804b6b | talks/tedx-kth/style.css |
| 2 | Append per-slide CSS slides 7–12 | 0f87643 | talks/tedx-kth/style.css |

## What Was Built

`talks/tedx-kth/style.css` extended from 162 lines to 899 lines (+737 lines) with:

- `@keyframes blink` — declared once with correct 0%,49%/50%,100% opacity steps for slide 3 cursor
- **Slide 1** — title layout: flex column, left-aligned, ::before red accent bar, eyebrow / title-1 / title-2 / meta elements
- **Slide 2** — demo browser frame: ::before dual radial gradient, `.browser-frame` with bar/dots/url/content sub-elements
- **Slide 3** — PERMISSION DENIED terminal: ::after CRT scan-line via `repeating-linear-gradient`, `.terminal-text` with blur + glow, `.cursor` with blink animation
- **Slide 4** — adk web reveal: flex column, `.prompt` in gold, `.command` display with `.dot` accent
- **Slide 5** — 2x2 AI grid: CSS grid layout, ::before "WHAT AI ACTUALLY DID FOR ME" header label, `.ai-cell` with icon-wrap/svg/label-main/label-sub
- **Slide 6** — Al-Khwarizmi manuscript: custom gradient background, ::before gold glow, `.manuscript-area` with nested ::before frame, `.text-area` etymology block
- **Slide 7** — The Thinking Gap: flex column, v3-label badge, 3-column grid with num-block.left/right, `.vs` separator, footer-line
- **Slide 8** — Statistics 84%/29%: 2-column stat-row grid, `.stat-block.use` / `.stat-block.trust` color variants, source attribution
- **Slide 9** — The dragon: centered `.dragon-text` with `.arrow-up` (ink) / `.arrow-down` (accent) row spans
- **Slide 10** — Karpathy reframe (cream): `.word-box.from` with line-through decoration, `--ink-dark-soft` for cream palette, `.footnote` positioned bottom-right
- **Slide 11** — Context engineering definition: ::before oversized `"` quote in accent color, `.term` centered above, `.definition` with `.key` accent highlight
- **Slide 12** — Closing question (cream): ::before accent bar centered top, `.question` with `.em` italic accent, `--ink-dark` for cream palette

## Verification Results

| Check | Result |
|-------|--------|
| All 12 slide blocks present | PASS |
| @keyframes blink declared exactly once | PASS (1 match) |
| Bare unscoped slide selectors | PASS (0 lines) |
| Phase 1 CSS variables intact | PASS (--accent: 18 refs, variable block unchanged) |
| slide-1::before (red accent bar) | PASS (1 match) |
| slide-2::before (dual radial gradient) | PASS (1 match) |
| slide-3::after (CRT scan-line) | PASS (1 match, repeating-linear-gradient) |
| slide-5::before (grid header) | PASS (1 match) |
| slide-6::before (gold glow) | PASS (1 match) |
| slide-11::before (oversized quote) | PASS (1 match, content: '"') |
| slide-12::before (accent bar) | PASS (1 match) |
| animation: blink | PASS (1 match) |
| slide-10 ink-dark-soft refs | PASS (3 matches in slide-10 block) |

## Deviations from Plan

None — plan executed exactly as written.

The acceptance criterion `grep "ink-dark-soft" talks/tedx-kth/style.css | grep "slide-10"` returns 0 because CSS properties are on separate lines from their selectors. Verified by range inspection (lines 752–812): `ink-dark-soft` appears at lines 780, 791, and 808 — all within the slide-10 block. The plan's `--accent` count estimate of >=20 was slightly optimistic (actual: 18), but Phase 1 content is verifiably intact.

## Known Stubs

None. This plan writes static CSS rules only; no data sources or dynamic values involved.

## Threat Flags

None. All rules are static CSS on a local file with no network surface introduced.

## Self-Check: PASSED

- talks/tedx-kth/style.css exists and contains 899 lines
- Commit 8804b6b exists (Task 1: slides 1–6 + @keyframes blink)
- Commit 0f87643 exists (Task 2: slides 7–12)
- All 12 slide class blocks verified present
- No Phase 1 content deleted (git diff shows insertions only)
