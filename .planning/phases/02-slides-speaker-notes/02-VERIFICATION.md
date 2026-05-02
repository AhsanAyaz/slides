---
phase: 02-slides-speaker-notes
verified: 2026-05-02T00:00:00Z
status: gaps_found
score: 3/5 must-haves verified
overrides_applied: 0
re_verification: false
gaps:
  - truth: "Pressing the right-arrow key advances through 12 slides in the order Title → Demo browser → PERMISSION DENIED → adk web reveal → 2x2 AI grid → Al-Khwarizmi → Thinking Gap (9 vs ~4,000) → 84%/29% stat → Dragon → Karpathy reframe → Context engineering definition → 'What is worth building?'"
    status: failed
    reason: "All 12 slides are wrapped in explicit <section> tags in tedx-kth.md. The reveal.js markdown plugin wraps each separator-delimited segment in its own outer <section data-markdown>. When convertSlides() runs marked() and sets section.innerHTML, the explicit inner <section class='slide-N'> becomes a child section inside the outer wrapper. Reveal.js interprets child sections as vertical sub-slides. The result is one horizontal position with 12 vertical sub-slides below it — only slide 1 is visible on first load; slides 2–12 require pressing the down arrow, not the right arrow. The fix is to replace explicit <section> and </section> tags with reveal.js's <!-- .slide: class='...' data-background-color='...' --> comment directive at the top of each segment."
    artifacts:
      - path: "talks/slides-markdown/tedx-kth.md"
        issue: "Explicit <section data-background-color='...' class='deep slide-N'> wrappers on all 12 slides create nested vertical sub-slides when processed by the reveal.js markdown plugin"
    missing:
      - "Replace <section ...> / </section> wrapper tags on all 12 slides with <!-- .slide: class='...' data-background-color='...' --> comment directives at the top of each segment"
  - truth: "Each of the 12 slides matches the static mockup's per-slide layout — terminal cursor blink and CRT scan-line on slide 3, gold $ over giant adk web on slide 4, manuscript SVG on slide 6, oversized faded quote mark on slide 11, cream-themed strikethrough+arrow on slide 10"
    status: failed
    reason: "Because CR-01 blocks all slides from rendering as horizontal slides, no slide layout matches the mockup in practice. Additionally, CR-02 causes the three chat-bubble dots in the slide-5 fourth ai-cell to be invisible: CSS rule 'body.tedx .reveal .slides section.slide-5 .ai-cell svg { fill: none }' overrides the SVG presentation attribute fill='currentColor' on the three <circle> elements (CSS rules beat SVG attributes). The chat-bubble icon renders as an empty outline with no dots."
    artifacts:
      - path: "talks/slides-markdown/tedx-kth.md"
        issue: "Explicit <section> wrappers block all slides from rendering at the correct horizontal level (CR-01)"
      - path: "talks/tedx-kth/style.css"
        issue: "CSS rule '.ai-cell svg { fill: none }' (line 457) overrides fill='currentColor' on slide-5 cell-4 chat-bubble circle dots — three dots become invisible (CR-02)"
    missing:
      - "Fix CR-01 first (section tag replacement with comment directive)"
      - "Add CSS rule after the ai-cell svg block: 'body.tedx .reveal .slides section.slide-5 .ai-cell svg circle { fill: currentColor; }'"
---

# Phase 2: Slides & Speaker Notes — Verification Report

**Phase Goal:** All 12 TEDx slides exist in `slides-markdown/tedx-kth.md` with their custom layouts and the speaker can read the timing cues and stage directions on the Notes-plugin confidence monitor.
**Verified:** 2026-05-02
**Status:** gaps_found
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths (from ROADMAP Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Right-arrow advances through 12 slides in the correct order | FAILED | All 12 `<section>` tags are explicit in tedx-kth.md, causing reveal.js markdown plugin to create 12 nested vertical sub-slides under one horizontal position (CR-01 from 02-REVIEW.md — confirmed by reading plugin.js `convertSlides()` and `slidify()` source) |
| 2 | Each slide matches the mockup's per-slide layout (cursor blink, CRT, manuscript SVG, oversized quote, cream arrow) | FAILED | CR-01 prevents rendering entirely; additionally CR-02 makes chat-bubble dots invisible on slide 5 (CSS `fill: none` overrides SVG `fill="currentColor"` on circle elements at line 457 of style.css) |
| 3 | Pressing `s` opens Notes window and every slide shows its timing cue, narrative beat, and stage direction | VERIFIED | All 12 `<aside class="notes">` blocks present with timing cues (`Cold open · 0:00`, `~ 0:30`, `~ 1:30`, `HEART OF TALK · ~ 9:00`, etc.); Notes plugin loaded in tedx-kth.html; notes wiring is correct in the file — will work once CR-01 is resolved |
| 4 | Special directions preserved: slide 1 hold-for-10s, slide 4 silence-2s, slide 7 narrate-their-thoughts, slide 12 do-not-advance | VERIFIED | All four special directions verified present verbatim: slide 1 "Hold on this slide for ~10 seconds"; slide 4 "Hold the silence for two full seconds"; slide 7 "narrate their thoughts" line (also present as slide 4 secondary direction, matching SUMMARY); slide 12 "Do NOT advance to a 'Thank you' or contact slide" |
| 5 | TEDx red appears only where the mockup uses it; ink and ink-soft variants apply correctly per slide background | VERIFIED | All 12 CSS slide classes present and scoped under `body.tedx`. Cream-palette slides (10, 12) correctly use `--ink-dark` and `--ink-dark-soft` (confirmed at style.css lines 775, 780, 791, 808, 890). Deep-palette slides use `--ink`, `--ink-soft`, `--ink-faint`. No bare unscoped selectors found. `@keyframes blink` declared exactly once. |

**Score: 3/5 truths verified**

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `talks/tedx-kth/style.css` | All 12 per-slide layout rules + @keyframes blink | STUB (partial) | All 12 `.slide-N` class blocks exist (lines 178–897 of 899-line file); all pseudo-elements present (slide-1::before, slide-2::before, slide-3::after, slide-5::before, slide-6::before, slide-11::before, slide-12::before); @keyframes blink declared once; scoping correct. STUB because CR-02 bug (fill:none override on ai-cell svg circles) makes slide-5 chat-bubble dots invisible |
| `talks/slides-markdown/tedx-kth.md` | 12-slide deck with speaker notes | STUB (structural bug) | File exists, 270 lines. All 12 `<section>` blocks present. All 12 `<aside class="notes">` present. All 4 NOTES-02 directions present. No probe content remaining. No script tags. 11 separators for 12 slides (no trailing separator). STUB because explicit `<section>` tags wrap all slides, causing reveal.js nested vertical sub-slide rendering (CR-01) |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `tedx-kth.md` | `talks/tedx-kth/style.css` | CSS classes `.slide-1` through `.slide-12` referenced in `<section class="...slide-N">` | WIRED | All 12 CSS class blocks confirmed present; classes match exactly |
| `tedx-kth.md` | RevealNotes plugin | `<aside class="notes">` inside each section | WIRED | 12/12 `<aside class="notes">` blocks present; RevealNotes loaded in tedx-kth.html |
| `tedx-kth.md` | `talks/tedx-kth.html data-separator` | Horizontal slides separated by `^\n---\n$` | BROKEN | The file uses correct blank-line `---` blank-line separators (11 separators verified, all with correct blank lines before and after). BUT explicit `<section>` tags in the content cause the plugin to create vertical sub-slides despite correct separator usage. The `data-separator` itself works; the `<section>` wrappers defeat it |
| `talks/tedx-kth.html` | `talks/tedx-kth/style.css` | `<link rel="stylesheet" href="tedx-kth/style.css">` | WIRED | Present at line 16 of tedx-kth.html |
| `talks/tedx-kth.html` | RevealNotes | `<script src="../plugin/notes/notes.js">` + `RevealNotes` in plugins array | WIRED | Present at lines 32, 44 of tedx-kth.html |

---

### Data-Flow Trace (Level 4)

Not applicable — this phase delivers static HTML/CSS assets with no dynamic data sources. All content is authored directly in the files.

---

### Behavioral Spot-Checks

Step 7b: SKIPPED — deck requires a running HTTP server with reveal.js to verify slide rendering behavior. The structural bug (CR-01) is confirmed programmatically via plugin source code analysis and does not require serving the deck to verify.

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| STYLE-04 | 02-01-PLAN | Custom per-slide layouts from the mockup reproduced | BLOCKED | CSS rules exist for all 12 layouts, but CR-01 prevents them from rendering correctly as horizontal slides; CR-02 makes slide-5 dots invisible |
| SLIDE-01 | 02-01, 02-02 | Title slide — eyebrow, title-1, title-2 italic accent, meta footer | BLOCKED | Content present in tedx-kth.md (lines 1–14); CSS present; blocked by CR-01 rendering bug |
| SLIDE-02 | 02-01, 02-02 | Demo browser frame | BLOCKED | Content present; blocked by CR-01 |
| SLIDE-03 | 02-01, 02-02 | PERMISSION DENIED terminal with cursor blink and CRT scan-line | BLOCKED | Content present; CSS cursor + CRT present; blocked by CR-01 |
| SLIDE-04 | 02-01, 02-02 | Gold `$` prompt over `adk.web` with accent dot | BLOCKED | Content present; blocked by CR-01 |
| SLIDE-05 | 02-01, 02-02 | 2x2 AI grid with four cells and hand-drawn SVG icons | BLOCKED | Content present; chat-bubble dots invisible due to CR-02 in addition to CR-01 |
| SLIDE-06 | 02-01, 02-02 | Al-Khwarizmi manuscript SVG + text area | BLOCKED | Content present; blocked by CR-01 |
| SLIDE-07 | 02-01, 02-02 | The Thinking Gap — branded label, 9 vs ~4,000, footer | BLOCKED | Content present; blocked by CR-01 |
| SLIDE-08 | 02-01, 02-02 | 84%/29% stat with source attribution | BLOCKED | Content present; blocked by CR-01 |
| SLIDE-09 | 02-01, 02-02 | Dragon — Use/Trust/Output/Demand with colored arrows | BLOCKED | Content present; blocked by CR-01 |
| SLIDE-10 | 02-01, 02-02 | Karpathy reframe, cream palette, strikethrough + SVG arrow | BLOCKED | Content present; blocked by CR-01 |
| SLIDE-11 | 02-01, 02-02 | Context engineering definition, oversized quote mark | BLOCKED | Content present; blocked by CR-01 |
| SLIDE-12 | 02-01, 02-02 | Closing question cream palette, "worth" in italic red | BLOCKED | Content present; blocked by CR-01 |
| NOTES-01 | 02-02-PLAN | Each slide has timing cue, narrative beat, stage direction | SATISFIED | All 12 `<aside class="notes">` blocks present with timing cues and directions (confirmed via grep: 12/12 notes, all timing marks present) |
| NOTES-02 | 02-02-PLAN | Special directions for slides 1, 4, 7, 12 | SATISFIED | All 4 directions present verbatim in the file |

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `talks/slides-markdown/tedx-kth.md` | 1, 18, 41, 52, 64, 125, 158, 185, 206, 222, 247, 261 | Explicit `<section data-background-color="..." class="...">` tags in reveal.js markdown file | BLOCKER | Creates 12 vertical sub-slides under one horizontal position; 11 of 12 slides invisible to right-arrow navigation |
| `talks/tedx-kth/style.css` | 457 | `fill: none` on `.ai-cell svg` overrides `fill="currentColor"` on SVG `<circle>` presentation attributes in slide-5 cell 4 | BLOCKER | Three chat-bubble dots (chat icon in the 4th ai-cell) rendered invisible |
| `talks/slides-markdown/tedx-kth.md` | 197–201 | Slide 8 speaker notes lack an advance cue or delivery directive | WARNING | Speaker cannot tell when to advance from slide 8 during live delivery |
| `talks/slides-markdown/tedx-kth.md` | 238–242 | Slide 10 speaker notes lack an advance cue | WARNING | Speaker cannot tell when to advance from slide 10 during live delivery |
| `talks/slides-markdown/tedx-kth.md` | 229–230 | SVG arrow in slide 10 uses hardcoded `stroke="#e62b1e"` instead of CSS variable | INFO | Not dynamically linked to `--accent`; will require a manual edit if the accent color changes |
| `talks/tedx-kth/style.css` | (absent) | `.word-box.to` has no dedicated CSS rule | INFO | Relies on implicit inheritance from base `.word-box .word` rule; works today but intent is not documented |

---

### Human Verification Required

None (all blockers are programmatically confirmed and do not require human testing to identify).

---

### Gaps Summary

Two blockers prevent goal achievement:

**Blocker 1 — CR-01: Section tag nesting (high severity).**
Every slide in `talks/slides-markdown/tedx-kth.md` is wrapped in an explicit `<section data-background-color="..." class="deep/cream slide-N">` / `</section>` pair. The reveal.js markdown plugin's `slidify()` function wraps each separator-delimited segment in `<section data-markdown>...<script type="text/template">CONTENT</script></section>`. Then `convertSlides()` runs `marked()` on the content and sets `section.innerHTML` to the result. `marked()` passes raw HTML through — the inner `<section class="slide-N">` becomes a DOM child `<section>` inside the outer wrapper section. Reveal.js identifies any `<section>` nested inside another `<section>` as a vertical sub-slide. The rendered DOM has one horizontal position containing 12 vertical sub-slides. Right-arrow navigation stops at slide 1; the remaining 11 slides are only reachable via the down-arrow. This is confirmed by reading `plugin/markdown/plugin.js` lines 165–203 (`slidify()`) and lines 414–446 (`convertSlides()`), and comparing against the pattern used by other talks in this codebase (`from-vibes-to-victory.md`, `the-prompt-is-dead-long-live-the-context.md`) which use markdown headings and NO explicit `<section>` tags.

The fix is to replace the 12 explicit `<section ...>` / `</section>` pairs with reveal.js's `<!-- .slide: class="..." data-background-color="..." -->` comment directive at the top of each segment. This allows the plugin to add the attributes to the outer `<section data-markdown>` wrapper it creates, which then becomes a proper horizontal slide. No other content changes are needed.

**Blocker 2 — CR-02: CSS `fill: none` overrides SVG circle dots (low severity, visual only).**
`style.css` line 457 sets `fill: none` on all `svg` elements inside `.ai-cell`. This correctly removes fill from the path, rect, and line elements used in cells 1–3 (stroked icons). However, cell 4's chat-bubble icon uses `<circle cx="24" cy="27" r="1.5" fill="currentColor" />` (×3) to render dots indicating a conversation. CSS rules have higher specificity than SVG presentation attributes, so `fill: none` wins, making the three dots invisible. The chat-bubble outline (path) still renders via stroke, but the dots are gone.

The fix is one additional CSS rule after the `.ai-cell svg` block:
```css
body.tedx .reveal .slides section.slide-5 .ai-cell svg circle {
  fill: currentColor;
}
```

Both fixes are surgical and do not require redesigning content. Blocker 1 must be addressed first before the deck is functional. Blocker 2 can be addressed in the same pass.

---

_Verified: 2026-05-02_
_Verifier: Claude (gsd-verifier)_
