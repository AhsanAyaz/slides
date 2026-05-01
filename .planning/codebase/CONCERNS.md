# Codebase Concerns

**Analysis Date:** 2026-05-01

## Tech Debt

**Incomplete ID Validation in Slide Generation:**
- Issue: UUID generation for slide IDs doesn't validate for duplicates
- Files: `scripts/addIdsToSlide.js` (line 29)
- Impact: Slides may have duplicate IDs which could break navigation and state management. The TODO comment explicitly flags this as unresolved.
- Fix approach: Implement a Set-based duplicate check before assigning UUIDs. Read existing slide IDs first, then only assign to sections without IDs and without conflicts.

**Inconsistent Path Handling in Markdown Processing:**
- Issue: Markdown plugin exposes internal functions as public API with unclear ownership
- Files: `plugin/markdown/plugin.js` (lines 503-508)
- Impact: The processSlides, convertSlides, slidify, and marked functions are exposed as part of the public API but the TODO comment questions whether they belong there. This creates maintenance confusion about what is intended API surface vs internal implementation.
- Fix approach: Document the intended API surface clearly, or move internal functions to private scope and expose only stable, versioned methods.

## Security Considerations

**Potential XSS in Markdown Rendering:**
- Risk: The `marked` library rendering HTML from markdown slides without explicit sanitization configuration
- Files: `plugin/markdown/plugin.js` (line 425)
- Current mitigation: Code escapes HTML in code blocks (line 485) but does not configure marked's `sanitize` option for general HTML content. The code uses `escapeForHTML()` selectively but relies on marked's default behavior for other markdown elements.
- Recommendations: Explicitly set `marked.setOptions({ sanitize: true })` or use a dedicated HTML sanitizer like DOMPurify for user-generated slide content. Consider restricting what HTML tags are allowed in markdown.

**innerHTML Usage Pattern:**
- Risk: Multiple uses of innerHTML could allow script injection if content source is compromised
- Files: 
  - `main.js` (line 33) - Appending SVG to button via innerHTML
  - `plugin/markdown/plugin.js` (lines 187-198) - Creating slide markup
  - `js/controllers/slidecontent.js` (lines 150-152) - Building video source elements
  - Various controller files use innerHTML for dynamic content
- Current mitigation: Content appears to come from trusted sources (internal slides.json, build-time markdown)
- Recommendations: Prefer `textContent` and `appendChild()` where possible. For SVG in `main.js`, use `createElementNS()` or parse as template. Document innerHTML usage restrictions.

**Data-driven Attribute Injection:**
- Risk: The markdown plugin dynamically sets attributes from slide markdown comments using regex pattern matching
- Files: `plugin/markdown/plugin.js` (lines 318-342, 348-408)
- Current mitigation: Attribute parsing is restrictive but uses setAttribute which is safer than innerHTML
- Recommendations: Validate attribute names against whitelist before setting. Document the security boundary of what attributes users can inject.

## Performance Bottlenecks

**Large reveal.js Bundle:**
- Problem: Main reveal.js file is 2,746 lines, containing all presentation logic
- Files: `js/reveal.js`
- Cause: Monolithic structure with many controllers and utilities bundled together
- Improvement path: 
  - Consider lazy-loading plugins that aren't needed on initial page load
  - Split reveal.js into smaller modules and use dynamic imports
  - Measure actual bundle impact and identify truly critical path code
  - Current gulpfile shows minification with terser which helps, but code-splitting could be more effective

**Auto-Animate Controller Complexity:**
- Problem: Auto-animate controller is 741 lines with complex DOM diffing and CSS generation
- Files: `js/controllers/autoanimate.js`
- Cause: Generates CSS stylesheets dynamically for animated transitions (line 127 creates stylesheet.innerHTML with generated CSS)
- Improvement path: Profile animation performance with DevTools. Consider pre-computing common animation patterns instead of generating CSS at runtime.

**Slide Content Lazy Loading Gap:**
- Problem: Video elements use innerHTML concatenation to build source tags dynamically
- Files: `js/controllers/slidecontent.js` (lines 147-154)
- Cause: String concatenation in a loop with split() operation for comma-separated sources
- Improvement path: Build source elements once using createElement/appendChild. The current approach re-evaluates HTML on each iteration.

## Fragile Areas

**Markdown Parsing Dependency on Regex:**
- Files: `plugin/markdown/plugin.js` (lines 9-12, 319-323)
- Why fragile: Parsing separators and attributes relies on complex regex patterns. Changes to markdown content formatting can break slides unexpectedly.
- Safe modification: Add comprehensive tests for edge cases (escaped separators, nested patterns, special characters in attributes). Consider switching to a proper markdown extension system rather than regex-based parsing.
- Test coverage: Limited - only `test/extractSlideData.test.js` exists, no tests for markdown plugin

**ID Generation Without Persistence:**
- Files: `scripts/addIdsToSlide.js`
- Why fragile: Running the script multiple times will generate new UUIDs. If a slide gets re-processed, its ID changes, breaking any bookmarks/references to that slide.
- Safe modification: Before adding IDs, check for existing `<!-- .slide: id=` markers and preserve them. Only generate IDs for slides that lack them.
- Test coverage: Not tested

**Build Process Assumption:**
- Files: `gulpfile.js`, `package.json` (scripts: `extract`)
- Why fragile: The build depends on running `extractSlideData.js` which reads all slide files synchronously. If talks directory structure changes, the script silently generates invalid JSON or incomplete data.
- Safe modification: Add validation to `extractSlideData.js` to verify at least one file was processed. Log warnings if expected directories are missing.
- Test coverage: No integration tests verifying end-to-end build output

## Test Coverage Gaps

**No Plugin Tests:**
- What's not tested: Markdown plugin parsing, rendering, attribute injection; Highlight plugin code block processing; Search plugin functionality; Notes and Zoom plugins
- Files: All files in `plugin/` directory
- Risk: Regression in plugin functionality won't be caught. Users will discover bugs in live presentations.
- Priority: High - plugins are user-facing and critical to presentation function

**No Controller Tests:**
- What's not tested: Slide navigation, fragment handling, auto-animation, keyboard controls, touch gestures, overview mode, note display
- Files: All files in `js/controllers/` directory
- Risk: Core presentation functionality changes could break without detection
- Priority: High

**No Integration Tests:**
- What's not tested: Full presentation lifecycle (load → navigate → animate → print), CSS compilation with Tailwind + core CSS, plugin initialization order
- Files: Build output, gulpfile.js, main.js
- Risk: Build artifacts could be corrupted or missing without detection
- Priority: Medium - jest is configured but primarily used for extractSlideData validation only

**Slide Data Validation Gaps:**
- What's not tested: Does `extractSlideData.js` handle missing title tags? Does it handle malformed HTML? What happens with circular symlinks?
- Files: `scripts/extractSlideData.js`
- Risk: Silent failures or corrupted slides.json that breaks the landing page
- Priority: Medium

## Dependencies at Risk

**Outdated Babel Packages:**
- Risk: @babel/core 7.14.3 (released June 2021) is significantly outdated; current is 7.x with many improvements and security patches
- Impact: Missing modern JavaScript feature support, potential security vulnerabilities in babel-plugin-transform-html-import-to-string
- Migration plan: Update @babel/core, @babel/preset-env, and @babel/eslint-parser to latest 7.x versions. Test with `npm run build` and `npm run test`.

**Deprecated highlight.js Version:**
- Risk: highlight.js 10.0.3 (released October 2020) is very old; current is 11.x with better performance and language support
- Impact: Missing syntax highlighting for new languages, potential security issues in code block rendering
- Migration plan: Upgrade to latest 11.x. Check for breaking changes in renderer API (currently using custom renderer modifications in plugin).

**Older Gulp Ecosystem:**
- Risk: Multiple gulp plugins are 1-2 years old (gulp-autoprefixer 8.0.0, gulp-clean-css 4.2.0, gulp-connect 5.7.0)
- Impact: Potential compatibility issues with new CSS features, security vulnerabilities in dependencies
- Migration plan: Run `npm audit` to identify actual security issues. Update incrementally and test CSS output after each update.

**jQuery/Browser Compat Code:**
- Risk: Code uses `[].slice.call()` pattern and old XMLHttpRequest instead of modern Fetch API
- Files: `plugin/markdown/plugin.js` (line 215), `js/controllers/slidecontent.js` (line 56), multiple locations
- Impact: Larger bundle size, harder to maintain for new developers unfamiliar with legacy patterns
- Migration plan: This is reveal.js framework code - changing it requires careful testing. Consider this during major refactor.

## Missing Critical Features

**No Error Boundary for Slide Rendering:**
- Problem: If a single slide fails to parse or render, it could crash the entire presentation
- Blocks: Graceful degradation for malformed slide content
- Impact: One broken slide in a 14-slide presentation makes the whole presentation potentially unusable

**No Loading State Feedback:**
- Problem: The main landing page fetches two JSON files but provides no loading indicator or error message if fetch fails
- Blocks: Users cannot tell if page is loading or broken
- Files: `main.js` - no try/catch on fetch operations
- Impact: Blank page if slides.json is missing or malformed

## Scaling Limits

**Single Language Environment:**
- Current capacity: Presentation slides only in English
- Limit: Cannot serve international audiences; UI text is hardcoded
- Scaling path: Abstract strings to i18n config file; add language parameter to landing page

**Build Time Performance:**
- Current capacity: Gulp tasks run sequentially in watch mode
- Limit: CSS changes require full Tailwind + core CSS rebuild (significant delay as codebase grows)
- Scaling path: Use Tailwind's JIT compilation mode more aggressively; consider vite instead of gulp for faster rebuild

---

*Concerns audit: 2026-05-01*
