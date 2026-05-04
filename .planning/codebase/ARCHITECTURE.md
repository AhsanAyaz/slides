# Architecture

**Analysis Date:** 2026-05-01

## Pattern Overview

**Overall:** Reveal.js-based presentation framework with a custom slides collection hub

**Key Characteristics:**
- Multi-instance presentation architecture (supports multiple presentations per page)
- Controller-based design pattern for separation of concerns
- Plugin system for extensibility
- Modular CSS with SCSS preprocessing and Tailwind integration
- Build pipeline with Rollup for bundled output and Gulp for tasks

## Layers

**Presentation Core (`js/reveal.js`):**
- Purpose: Main presentation engine managing state, navigation, and initialization
- Location: `js/reveal.js`
- Contains: Singleton Reveal factory function, state management, initialization logic
- Depends on: All controllers, components, utilities, and configuration
- Used by: Browser through UMD/ESM exports; embedded presentations use it directly

**Controllers (`js/controllers/`):**
- Purpose: Manage specific aspects of presentation behavior (navigation, UI, rendering)
- Location: `js/controllers/*.js` (13 controller files)
- Contains: SlideContent, SlideNumber, Backgrounds, AutoAnimate, Fragments, Overview, Keyboard, Location, Controls, Progress, Pointer, Plugins, Print, Touch, Focus, Notes
- Depends on: Reveal instance (injected via constructor), utilities
- Used by: Reveal core during initialization and runtime

**Components (`js/components/`):**
- Purpose: Reusable presentation elements with self-contained logic
- Location: `js/components/playback.js`
- Contains: Playback control component for media
- Depends on: Reveal instance
- Used by: Controllers (e.g., SlideContent for video playback)

**Utilities (`js/utils/`):**
- Purpose: Shared helper functions, constants, and device detection
- Location: `js/utils/`
- Contains: util.js (DOM queries, extend, transitions), constants.js (selectors), device.js (detection), color.js, loader.js
- Depends on: None
- Used by: Core, controllers, components

**Configuration (`js/config.js`):**
- Purpose: Default reveal.js configuration object with comprehensive options
- Location: `js/config.js`
- Contains: 60+ configurable options for presentation behavior, transitions, plugins
- Depends on: None
- Used by: Reveal.initialize() to set presentation defaults

**Styling (`css/`):**
- Purpose: Presentation visual design and layout
- Location: `css/reveal.scss` (main), custom themes in `css/theme/`
- Contains: Layout, theme definitions, print styles, reveal-specific and custom SCSS
- Depends on: None (preprocessed to CSS)
- Used by: HTML presentations

**Plugins (`plugin/`):**
- Purpose: Optional features loaded via plugin system
- Location: `plugin/{highlight|markdown|math|notes|search|zoom}/`
- Contains: 6 plugin directories with their own JS, CSS, and build outputs
- Depends on: Reveal instance (injected), external libraries
- Used by: presentations via config.plugins array

**Slides Hub Application (`index.html`, `main.js`):**
- Purpose: Landing page displaying collection of presentations
- Location: Root directory
- Contains: Responsive grid layout, slide discovery, link generation
- Depends on: Data files (`data/slides.json`, `data/externalSlides.json`), Tailwind CSS, DaisyUI
- Used by: Browser entry point

**Talk Presentations (`talks/`):**
- Purpose: Individual presentation slide decks
- Location: `talks/{talk-name}/index.html` or `talks/{talk-name}.html`
- Contains: HTML-based slide markup, Reveal.js initialization
- Depends on: Reveal.js framework
- Used by: Linked from hub or accessed directly

## Data Flow

**Presentation Initialization:**

1. User loads `index.html` (slides hub)
2. `main.js` fetches `data/slides.json` and `data/externalSlides.json`
3. Hub renders card grid dynamically from slide metadata
4. User clicks presentation link, navigates to `talks/{name}/index.html`
5. Talk presentation loads Reveal.js framework and initializes with markup

**Reveal.js Startup Flow:**

1. `Reveal.initialize(options)` called with configuration
2. DOM cached, config merged (defaults → configure() calls → init options → query params)
3. Viewport set, plugins loaded asynchronously
4. Controllers instantiated and bound to event listeners
5. 'ready' event dispatched when framework ready
6. Slide navigation managed by Keyboard, Controls, Touch controllers

**Slide Content Loading:**

1. SlideContent controller monitors viewDistance
2. Slides outside viewDistance unloaded (display: none)
3. Slides within viewDistance have lazy-loaded media (data-src) converted to src
4. Fragments processed and animated by Fragments controller
5. AutoAnimate controller interpolates between matching elements

**State Management:**
- Single Reveal instance per presentation maintains state: config, indexh, indexv, transition, autoSlide
- Controllers read state via Reveal.getConfig() and Reveal.getState()
- Controllers dispatch state changes via Reveal.setState()
- Navigation history tracked via navigationHistory object

## Key Abstractions

**Controller Pattern:**
- Purpose: Encapsulate domain logic for presentation aspects
- Examples: `js/controllers/keyboard.js`, `js/controllers/fragments.js`, `js/controllers/backgrounds.js`
- Pattern: Class constructor receives Reveal instance, exposes public methods (bind, unbind, update), manages internal state via closures

**Plugin System:**
- Purpose: Allow optional features without core bloat
- Examples: `plugin/markdown/`, `plugin/notes/`, `plugin/search/`
- Pattern: Plugins registered via Reveal.registerPlugin(), loaded asynchronously, receive Reveal instance for API access

**Lazy Loading:**
- Purpose: Performance optimization for media-heavy slides
- Pattern: data-src attributes replaced with src when slide enters viewDistance; managed by SlideContent.load()

**Fragment Animation:**
- Purpose: Reveal content progressively within slides
- Pattern: data-fragment-index attributes ordered, Fragments controller steps through visibility

## Entry Points

**Hub Application:**
- Location: `index.html`
- Triggers: User navigates to domain root
- Responsibilities: Display presentation collection, fetch slide metadata, render cards, link to talks

**Presentation Application:**
- Location: `talks/{name}/index.html`
- Triggers: User clicks presentation link from hub
- Responsibilities: Load Reveal.js, initialize presentation with markup, manage slide navigation

**Build Entry Point:**
- Location: `js/index.js`
- Triggers: npm run build/dev
- Responsibilities: Export Reveal class and VERSION; processed through Rollup to create `dist/reveal.js` and `dist/reveal.esm.js`

## Error Handling

**Strategy:** Minimal error recovery; presentation continues if non-critical components fail

**Patterns:**
- Plugin load failures logged but don't block initialization (Plugins controller catches and logs)
- Missing required DOM elements (`.reveal`, `.slides`) throw explicit errors during initialization
- Lazy-loaded media (data-src) loaded asynchronously; failures silent with fallback to unloaded state
- Transition animations degrade gracefully if CSS transforms unavailable

## Cross-Cutting Concerns

**Logging:** Custom console.log calls in plugins; no centralized logging framework

**Validation:** Data validation occurs during initialization (config merging, DOM checks); runtime slide data assumed valid

**Authentication:** None required; presentations are public web content

**Device Adaptation:** Device.js detects mobile/tablet; SlideContent.load() applies playsinline for mobile video; touch controller enables touch navigation

---

*Architecture analysis: 2026-05-01*
