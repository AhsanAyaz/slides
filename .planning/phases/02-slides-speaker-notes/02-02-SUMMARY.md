---
phase: 02-slides-speaker-notes
plan: 02
subsystem: slide-content-authoring
tags: [reveal.js, tedx, slides, speaker-notes, html, svg]
dependency_graph:
  requires:
    - talks/tedx-kth/style.css (Plan 01 — all 12 .slide-N CSS classes + component classes)
    - talks/tedx-kth/reference-material/slides.html (visual contract — HTML content, SVG geometry)
    - talks/tedx-kth/reference-material/slides.md (speaker notes — timing cues, stage directions)
  provides:
    - talks/slides-markdown/tedx-kth.md (complete 12-slide TEDx deck content)
  affects:
    - talks/tedx-kth.html (loads tedx-kth.md via data-markdown; now has real content to render)
tech_stack:
  added: []
  patterns:
    - Reveal.js markdown loader with raw HTML sections (inline HTML inside slides-markdown)
    - data-separator="^\n---\n$" horizontal slide boundaries (11 separators for 12 slides)
    - aside.notes blocks for reveal.js Notes plugin speaker view
    - Inline SVG geometry (slide 5 AI grid icons, slide 6 Arabic deco, slide 10 arrow)
    - CSS variable references via class attributes (deep/cream palette switch)
key_files:
  created: []
  modified:
    - talks/slides-markdown/tedx-kth.md
decisions:
  - "Dot span in slide 4: adk<span class='dot'>.</span>web — accent-colored period per plan (differs from reference HTML which shows plain 'adk web' without dot span; plan's must_haves are authoritative)"
  - "Slide-10 SVG arrow uses hardcoded stroke='#e62b1e' per plan — CSS var() unreliable in SVG stroke context"
  - "No trailing --- after slide 12 — avoids blank 13th slide in reveal.js"
  - "Two 'narrate their thoughts' directions: slide 4 notes carry the ADK reveal direction, slide 7 notes carry the asymmetry direction — matches NOTES-02 spec"
metrics:
  duration: "~9 minutes"
  completed_date: "2026-05-02"
  tasks_completed: 1
  files_modified: 1
---

# Phase 2 Plan 02: Slide Content Authoring Summary

Complete 12-slide TEDx deck written into `talks/slides-markdown/tedx-kth.md` — replacing the 2-slide Phase 1 probe file with all slide HTML, SVG geometry, and `<aside class="notes">` speaker notes blocks matching the visual contract in `talks/tedx-kth/reference-material/slides.html` and timing/stage directions from `talks/tedx-kth/reference-material/slides.md`.

## Tasks Completed

| Task | Name | Commit | Files Modified |
|------|------|--------|----------------|
| 1 | Write complete tedx-kth.md with all 12 slides and speaker notes | 4820238 | talks/slides-markdown/tedx-kth.md |

## What Was Built

`talks/slides-markdown/tedx-kth.md` replaced from 16 lines (2-slide probe) to 270 lines with:

- **Slide 1** — Title: `.eyebrow`, `.title-1`, `.title-2`, `.meta` — deep palette, `slide-1` class, 10s hold direction
- **Slide 2** — Demo browser: `.browser-frame` with bar/dots/url/content sub-elements — dark-deep `#050505` palette
- **Slide 3** — PERMISSION DENIED: `.terminal-text` with `.cursor` blink span — CRT-scan-line via CSS ::after
- **Slide 4** — adk web reveal: `.prompt` ($), `.command` with `adk<span class="dot">.</span>web` — 2s silence + narrate-their-thoughts direction
- **Slide 5** — 2×2 AI grid: 4 `.ai-cell` divs with `.icon-wrap`, hand-drawn SVG icons (file, doc, book, chat bubble), `.label-main`, `.label-sub`
- **Slide 6** — Al-Khwarizmi: `.manuscript-area` with `.arabic-deco` SVG (geometric pattern), `.text-area` with `.name-arabic`, `.name-trans`, `.name-dates`, `.etymology .word`
- **Slide 7** — The Thinking Gap: `.v3-label .term` badge, `.row` grid with `.num-block.left` (9), `.vs`, `.num-block.right` (~4,000), `.footer-line` with `.sep` accents — narrate-their-thoughts direction
- **Slide 8** — 84%/29% stats: `.stat-row` grid, `.stat-block.use` / `.stat-block.trust` with `.stat-num` and superscript `%`, `.source` attribution
- **Slide 9** — The dragon: `.dragon-text` with 4 `.row` spans, `.arrow-up` (↑) / `.arrow-down` (↓)
- **Slide 10** — Karpathy reframe (cream): `.reframe` flex with `.word-box.from` (typing, line-through), SVG arrow with hardcoded `#e62b1e` stroke, `.word-box.to` (thinking), `.footnote`
- **Slide 11** — Context engineering: `.term` label, `.definition` with two `.key` spans (what, before)
- **Slide 12** — Closing question (cream): `.question` with `.em` span on "worth" — do-not-advance direction

## Verification Results

| Check | Expected | Result |
|-------|----------|--------|
| Section count | 12 | PASS (12) |
| Notes count | 12 | PASS (12) |
| Probe content gone | 0 | PASS (0) |
| PERMISSION DENIED | 1 | PASS |
| class="dot" (slide 4) | 1 | PASS |
| arrow-down | 2 | PASS |
| al-Khwārizmī | 1 | PASS |
| class="key" spans | 2 | PASS (2 occurrences on 1 line) |
| Do NOT advance (slide 12) | 1 | PASS |
| Hold for ~10 seconds (slide 1) | 1 | PASS |
| two full seconds (slide 4) | 1 | PASS |
| narrate their thoughts | 2 | PASS (slides 4+7) |
| data-background-color="#f5f1ea" | 2 | PASS (slides 10+12) |
| class="cream" | 2 | PASS (slides 10+12) |
| Separator count | 11 | PASS (11) |
| No script tags | 0 | PASS |

Note: `grep -c 'class="key"'` returns 1 (both spans on same line). Verified with `grep -o` that 2 occurrences exist.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

**Observation (not a deviation):** The reference HTML `slides.html` slide 4 shows `<div class="command">adk web</div>` without the `.dot` span. The plan's must_haves explicitly require `adk<span class="dot">.</span>web` and the CSS confirms `.dot { color: var(--accent) }`. The plan's content specification is authoritative; the reference HTML predates the dot-span decision.

## Known Stubs

None. All 12 slides are fully wired with content from the reference materials. No placeholder text, no TODO comments, no hardcoded empty values that affect rendering.

## Threat Flags

| Flag | File | Description |
|------|------|-------------|
| threat_flag: inline-html | talks/slides-markdown/tedx-kth.md | File contains inline HTML parsed by reveal.js Markdown loader — verified no script tags present (grep -c "<script" = 0) |

T-02-02-04 mitigation verified: no `<script>` tags in the output file.

## Self-Check: PASSED

- `talks/slides-markdown/tedx-kth.md` exists (270 lines, replaces 16-line probe)
- Commit 4820238 exists (`feat(02-02): write complete 12-slide TEDx deck with speaker notes`)
- All 12 section blocks verified present with correct class attributes
- All 12 aside.notes blocks verified present with timing cues
- No Phase 1 probe content remains (DECK · PROBE strings: 0 matches)
- No script tags (0 matches)
- 11 separators (correct for 12 slides, no trailing separator)
