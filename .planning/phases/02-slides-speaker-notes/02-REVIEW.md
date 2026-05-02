---
phase: 02-slides-speaker-notes
reviewed: 2026-05-02T12:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - talks/slides-markdown/tedx-kth.md
  - talks/tedx-kth/style.css
findings:
  critical: 0
  warning: 0
  info: 2
  total: 2
status: issues_found
---

# Phase 2: Code Review Report (gap-closure 02-03)

**Reviewed:** 2026-05-02T12:00:00Z
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

This review covers gap-closure plan 02-03, which addressed two previously identified critical bugs:

**CR-01 (section tag migration):** All 12 explicit `<section data-background-color="..." class="...">` opening tags have been replaced with `<!-- .slide: class="..." data-background-color="..." -->` directives, and all 12 closing `</section>` tags have been removed. Attribute values (class names and background-color hex codes) are preserved exactly. The 11 `---` separators remain in place with correct blank-line padding. The reveal.js markdown plugin will now generate one `<section>` per horizontal slide as intended. CR-01 is resolved.

**CR-02 (chat-bubble dot visibility):** The new CSS rule `body.tedx .reveal .slides section.slide-5 .ai-cell svg circle { fill: currentColor; }` was added immediately after the parent `svg` rule that sets `fill: none`. The selector chain is correctly scoped and the specificity of the circle rule (adds one element to the parent's chain) correctly overrides the parent. The three dots in the fourth ai-cell chat bubble will now render. CR-02 is resolved.

No critical or warning-level issues were introduced by the gap-closure changes. Two pre-existing, low-severity observations are documented below.

---

## Info

### IN-01: Chat-bubble circles will render with a visible gold stroke outline

**File:** `talks/tedx-kth/style.css:452-463`

**Issue:** The parent rule for `.ai-cell svg` sets `stroke: var(--gold)` and `stroke-width: 1.5` on all SVG elements. The new circle override adds `fill: currentColor` but does not set `stroke: none`. As a result, the three chat-bubble dots in slide-5 cell 4 will render as cream-filled circles each outlined with a 1.5px gold ring. On small circles with `r="1.5"` the stroke width equals the radius, making the gold ring visually dominant and potentially obscuring the cream fill.

```css
/* Current state after gap-closure */
body.tedx .reveal .slides section.slide-5 .ai-cell svg {
  stroke: var(--gold);
  stroke-width: 1.5;
  fill: none;
  opacity: 0.8;
}

body.tedx .reveal .slides section.slide-5 .ai-cell svg circle {
  fill: currentColor;
  /* stroke inherits: var(--gold), stroke-width inherits: 1.5 */
}
```

**Fix:** Add `stroke: none` to the circle rule to drop the outline and render the dots as clean filled circles:

```css
body.tedx .reveal .slides section.slide-5 .ai-cell svg circle {
  fill: currentColor;
  stroke: none;
}
```

---

### IN-02: `<!-- .slide: -->` directive attribute order differs from reveal.js canonical examples

**File:** `talks/slides-markdown/tedx-kth.md:1` (and all 12 directive lines)

**Issue:** All 12 directives use the attribute order `class="..." data-background-color="..."`. The reveal.js documentation and plugin source examples consistently show `data-*` attributes before non-data attributes (e.g., `<!-- .slide: data-background="#ff0000" class="special" -->`). The current order (`class` before `data-background-color`) is functionally valid — the reveal.js markdown plugin uses a regex that extracts all `key="value"` pairs regardless of order — so this is not a functional bug. It is a minor consistency note for future authoring.

**Fix:** No action required for correctness. If consistency with upstream examples is preferred, reorder to:

```markdown
<!-- .slide: data-background-color="#0a0a0a" class="deep slide-1" -->
```

---

_Reviewed: 2026-05-02T12:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
