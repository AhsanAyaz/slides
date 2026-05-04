---
phase: 01-deck-shell-style-foundation
reviewed: 2026-05-01T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - talks/tedx-kth.html
  - talks/tedx-kth/style.css
  - talks/slides-markdown/tedx-kth.md
findings:
  critical: 0
  warning: 1
  info: 2
  total: 3
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-05-01
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found (1 warning, 2 info — no critical issues)

## Summary

All three Phase 1 artifacts are structurally sound. Paths resolve correctly: `../dist/reveal.css`, `../dist/reveal.js`, and all plugin scripts match the repo layout; `data-markdown="slides-markdown/tedx-kth.md"` resolves correctly from the `talks/` directory; `@font-face` `url('fonts/...')` paths resolve relative to `talks/tedx-kth/style.css` to the confirmed `talks/tedx-kth/fonts/` directory.

The `body.tedx` scoping strategy works as designed. The two counter-rules are necessary and have correct specificity (`(0,3,0)` vs `(0,2,0)`). The ink-switch selectors `section.deep` / `section.cream` will match the raw HTML sections emitted by the markdown plugin. `RevealMath.KaTeX` is a valid export from `plugin/math/math.js`. The two probe slides exercise both palettes correctly.

One warning: a misleading comment in `style.css` incorrectly attributes a root cause to `customizations.scss` when the rule actually originates in `dist/reveal.css` itself. This will cause confusion during Phase 2 debugging. One `@font-face` issue could create a Phase 2 visual regression at the venue.

---

## Warnings

### WR-01: `font-variation-settings: 'opsz' 14` in `@font-face` descriptor pins optical size for the self-hosted fallback path

**File:** `talks/tedx-kth/style.css:105`

**Issue:** The `@font-face` descriptor `font-variation-settings: 'opsz' 14` sets a **default** optical size of 14 for every element using the self-hosted Fraunces woff2. This affects only the self-hosted code path (no internet / venue). The Google Fonts CDN path loads the full `opsz` range (`9..144`) and leaves axis values unconstrained.

At the venue, if the CDN is unavailable, any Phase 2 heading rule that does not explicitly override `font-variation-settings` will render Fraunces with `opsz=14` — the same optical size as small body text — regardless of the rendered font size. Large display headings (`font-size: clamp(22px, 3.4vw, 46px)` and larger) will look slightly heavier and less refined than the mockup, because the high-opsz optical corrections (wider proportions, higher contrast) will not be applied.

**Fix:** Phase 2 heading rules should explicitly set `font-variation-settings` per heading level so the self-hosted and CDN paths behave identically:

```css
/* Example for a large display heading */
body.tedx .reveal h1 {
  font-family: var(--serif);
  font-variation-settings: 'opsz' 72, 'wght' 500;
}

body.tedx .reveal h2 {
  font-family: var(--serif);
  font-variation-settings: 'opsz' 48, 'wght' 500;
}
```

Alternatively, remove `font-variation-settings` from the `@font-face` descriptor entirely (the browser will use the font's own default for `opsz`, which for Fraunces is typically the natural optical size at the rendered size):

```css
@font-face {
  font-family: 'Fraunces';
  font-style: normal;
  font-weight: 400 600;
  font-display: swap;
  src: url('fonts/Fraunces-Variable.woff2') format('woff2-variations'),
       url('fonts/Fraunces-Variable.woff2') format('woff2');
  /* Remove font-variation-settings here; set per-element in Phase 2 rules */
}
```

---

## Info

### IN-01: Comment incorrectly attributes `.reveal .slides { font-size: 32px }` solely to `customizations.scss`

**File:** `talks/tedx-kth/style.css:57`

**Issue:** The comment above the counter-rule reads:

> `Counter: customizations.scss sets .reveal .slides { font-size: 32px }`

`dist/reveal.css` itself contains `.reveal .slides{font-size:32px}` (present twice in the compiled output). `customizations.scss` has the same rule, but it is **not linked** by `talks/tedx-kth.html`, so the rule being countered is actually from `reveal.css`, not from `customizations.scss`. The counter-rule is correct and necessary; only the comment is wrong. A future maintainer chasing a specificity bug will waste time looking at `customizations.scss` instead of `reveal.css`.

**Fix:** Update the comment:

```css
/* Counter: reveal.css (compiled) sets .reveal .slides { font-size: 32px }.
 * customizations.scss sets the same rule but is not linked by this deck. */
body.tedx .reveal .slides {
  font-size: unset;
}
```

---

### IN-02: Stale comment on line 14 says self-hosted `@font-face` declarations are "appended in Plan 03"

**File:** `talks/tedx-kth/style.css:14`

**Issue:** The file header comment reads: "Self-hosted font face declarations are appended in Plan 03." All eight `@font-face` blocks are already present in this file. The comment is stale — Plan 03 was completed and merged into this file but the forward-reference was not removed.

**Fix:** Replace line 14 with a summary comment reflecting reality:

```css
 * Self-hosted @font-face declarations (Plan 03, D-04/D-05/D-06) are in
 * section 4 below.
```

---

_Reviewed: 2026-05-01_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
