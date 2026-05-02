---
phase: 02-slides-speaker-notes
reviewed: 2026-05-02T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - talks/tedx-kth/style.css
  - talks/slides-markdown/tedx-kth.md
findings:
  critical: 2
  warning: 2
  info: 2
  total: 6
status: issues_found
---

# Phase 2: Code Review Report

**Reviewed:** 2026-05-02
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Both files were reviewed at standard depth. `style.css` is well-structured, correctly scoped under `body.tedx`, and all CSS variable references resolve to declared values. The `@font-face` declarations, palette switch, and per-slide layout rules are consistent with the reference mockup. No broken selectors or invalid variable names were found.

`tedx-kth.md` has two critical bugs that will prevent the deck from rendering correctly in reveal.js, plus two speaker notes that lack required delivery directions. Both critical issues are fixable without redesigning the slide content.

---

## Critical Issues

### CR-01: All 12 slides become vertical sub-slides — explicit `<section>` wrappers in markdown break horizontal navigation

**File:** `talks/slides-markdown/tedx-kth.md:1` (and lines 18, 41, 52, 64, 125, 158, 185, 206, 222, 247, 261)

**Issue:** Every slide segment opens with an explicit `<section data-background-color="..." class="...">` tag. The reveal.js markdown plugin (`plugin/markdown/markdown.js`) wraps each separator-delimited segment in its own `<section data-markdown>` container before parsing. When `marked` renders the inner HTML, the explicit `<section>` becomes a child `<section>` inside the wrapper — this is how reveal.js defines vertical (down-arrow) slides. The rendered DOM is:

```html
<div class="slides">
  <!-- horizontal slide 1 (the only one) -->
  <section data-markdown-parsed>
    <!-- vertical sub-slide 1 -->
    <section class="deep slide-1">...</section>
    <!-- vertical sub-slide 2 -->
    <section class="deep slide-2">...</section>
    ...
  </section>
</div>
```

All 12 slides collapse into one horizontal position with 12 vertical sub-slides. The audience would see only slide 1; the remaining 11 are hidden below it (accessible only via the down arrow). Every other talk in this codebase (e.g., `from-vibes-to-victory.md`, `the-prompt-is-dead-long-live-the-context.md`) omits `<section>` wrappers entirely and relies on the plugin to create them.

**Fix:** Remove the outer `<section>` and `</section>` tags from each slide. Move `data-background-color` and palette/slide-number classes to the separator via the `<!-- .slide: -->` directive, or apply them via the `data-attributes` mechanism. The minimal change is to strip the section tags and carry the attributes using reveal.js's built-in HTML comment attribute syntax:

```markdown
<!-- .slide: data-background-color="#0a0a0a" class="deep slide-1" -->
<div class="eyebrow">TEDx KTH Salon · The Voice of Innovation</div>
<div class="title-1">The next billion developers won't be blocked by syntax.</div>
<div class="title-2">They'll be blocked by thinking.</div>
<div class="meta">
  <span>Muhammad Ahsan Ayaz</span>
  <span>Stockholm · 04.05.2026</span>
</div>
<aside class="notes">
  ...
</aside>
```

Apply this pattern to all 12 slides: replace `<section ...>` / `</section>` with a `<!-- .slide: ... -->` comment at the top of each segment and remove the closing `</section>`.

---

### CR-02: CSS `fill: none` on `.ai-cell svg` overrides `fill="currentColor"` on chat-bubble dots — three dots will be invisible on slide 5

**File:** `talks/tedx-kth/style.css:457` and `talks/slides-markdown/tedx-kth.md:108-110`

**Issue:** The CSS rule for slide-5 SVG icons sets `fill: none` on all `svg` elements inside `.ai-cell`:

```css
/* style.css line 452-459 */
body.tedx .reveal .slides section.slide-5 .ai-cell svg {
  stroke: var(--gold);
  stroke-width: 1.5;
  fill: none;       /* <-- wins over SVG presentation attributes */
  opacity: 0.8;
}
```

SVG presentation attributes (such as `fill="currentColor"`) have lower specificity than any CSS rule. The three `<circle>` elements in the fourth ai-cell (chat-bubble icon) use `fill="currentColor"` to render as gold dots:

```html
<!-- tedx-kth.md lines 108-110 -->
<circle cx="24" cy="27" r="1.5" fill="currentColor" />
<circle cx="32" cy="27" r="1.5" fill="currentColor" />
<circle cx="40" cy="27" r="1.5" fill="currentColor" />
```

The CSS `fill: none` overrides this, making all three dots invisible. The chat-bubble outline (path) still renders via `stroke`, but the dots that represent a conversation disappear entirely.

The same CSS rule correctly applies `fill: none` to all path, line, and rect elements in the other three cells, so only cell 4's circles are affected.

**Fix:** Override `fill` back to `currentColor` specifically on `circle` elements within the chat-bubble icon. The cleanest approach is to target circles inside that specific SVG:

```css
/* In style.css, after the .ai-cell svg rule */
body.tedx .reveal .slides section.slide-5 .ai-cell svg circle {
  fill: currentColor;
}
```

Alternatively, remove the `fill="currentColor"` presentation attributes from the circles and replace with a class that sets `fill`:

```html
<!-- tedx-kth.md — cell 4 circles -->
<circle class="dot" cx="24" cy="27" r="1.5" />
<circle class="dot" cx="32" cy="27" r="1.5" />
<circle class="dot" cx="40" cy="27" r="1.5" />
```

```css
body.tedx .reveal .slides section.slide-5 .ai-cell svg .dot {
  fill: var(--gold);
}
```

---

## Warnings

### WR-01: Slide 8 speaker notes contain no advance or delivery cue

**File:** `talks/slides-markdown/tedx-kth.md:197-201`

**Issue:** The notes for slide 8 (84%/29% statistics) describe the visual design intent but do not include any spoken delivery direction, advance cue, or instruction for how/when to move to the next slide. All other notes in the deck include an explicit action directive ("Advance to slide 3 the moment you say…", "Stay on this slide through…", "Reveal this slide as you say…"). Slide 8's notes are:

> Two numbers, side by side, no chart. The 84% is the same color as the rest of the slide; the 29% is in TEDx red. The visual contrast IS the argument. Source line is small enough to be quoted accurately by anyone who screenshots, but not loud enough to compete with the numbers.

Under pressure at the venue, a speaker needs to know when to advance.

**Fix:** Add a delivery and advance directive, for example:

```
~ 11:30

Two numbers, side by side, no chart. The 84% is the same color as the rest of the slide;
the 29% is in TEDx red. The visual contrast IS the argument. Source line is small enough
to be quoted accurately by anyone who screenshots, but not loud enough to compete
with the numbers.

Advance to slide 9 after you deliver the line "And yet we are still flinching."
Hold here long enough for the gap between the two numbers to land without narration.
```

---

### WR-02: Slide 10 speaker notes contain no advance or delivery cue

**File:** `talks/slides-markdown/tedx-kth.md:238-242`

**Issue:** The notes for slide 10 (Karpathy reframe, cream palette) describe the theme switch and provide the spoken line to deliver but do not say when to advance to slide 11. The note ends after quoting the "speed becomes the trap" line without an explicit next-step instruction.

**Fix:** Add an advance cue at the end of the note:

```
After delivering the "speed becomes the trap" line, pause two beats,
then advance to slide 11 as you say "So what do you actually do about it?"
```

---

## Info

### IN-01: SVG arrow in slide 10 uses hardcoded hex stroke instead of CSS variable

**File:** `talks/slides-markdown/tedx-kth.md:229-230`

**Issue:** The transition arrow SVG between "typing" and "thinking" uses `stroke="#e62b1e"` as a hardcoded value:

```html
<path d="M10 30 L180 30" stroke="#e62b1e" stroke-width="2" stroke-linecap="round"/>
<path d="M165 18 L185 30 L165 42" stroke="#e62b1e" stroke-width="2" .../>
```

This hard-codes the accent color at the SVG attribute level. If `--accent` is ever updated, this arrow will not follow. The value happens to match `--accent: #e62b1e` exactly today, but it is not linked.

**Fix:** Remove the inline `stroke` attributes and control the color from CSS, or set `stroke="currentColor"` and rely on `color: var(--accent)` from a parent:

```html
<svg class="arrow-svg" viewBox="0 0 200 60" fill="none" style="color: var(--accent)">
  <path d="M10 30 L180 30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M165 18 L185 30 L165 42" stroke="currentColor" stroke-width="2" .../>
</svg>
```

---

### IN-02: `.word-box.to` has no dedicated CSS rule — implicit asymmetry with `.word-box.from`

**File:** `talks/tedx-kth/style.css:779-784`

**Issue:** The CSS for slide 10 defines `.word-box.from .word` with an explicit override (strikethrough, muted color) but has no corresponding `.word-box.to` rule. The "thinking" word-box inherits the base `.word-box .word { color: var(--ink-dark) }` which renders correctly on the cream background, but the lack of an explicit `.to` rule makes the design intent implicit and harder to maintain.

**Fix:** Add an explicit `.to` rule for symmetry and self-documentation:

```css
/* style.css — after the .word-box.from block */
body.tedx .reveal .slides section.slide-10 .word-box.to .word {
  color: var(--ink-dark);   /* affirmed: strong/legible on cream */
}
```

---

_Reviewed: 2026-05-02_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
