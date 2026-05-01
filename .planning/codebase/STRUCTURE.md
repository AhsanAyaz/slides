# Codebase Structure

**Analysis Date:** 2026-05-01

## Directory Layout

```
slides/
├── .github/                    # GitHub workflows and CI/CD configuration
├── .planning/                  # GSD planning documents (generated)
│   └── codebase/              # Codebase analysis documents
├── .vscode/                    # VS Code workspace settings
├── css/                        # Styling (SCSS + Tailwind)
│   ├── reveal.scss            # Main reveal.js framework styles
│   ├── customizations.scss    # Project-specific style overrides
│   ├── layout.scss            # Custom layout rules
│   ├── index.css              # Compiled Tailwind output
│   ├── print/                 # Print-to-PDF specific styles
│   └── theme/                 # Reveal.js theme files
├── data/                       # Metadata for presentation discovery
│   ├── slides.json            # Generated: local presentations metadata
│   └── externalSlides.json    # External presentation links
├── dist/                       # Built outputs (generated, git-ignored)
│   ├── reveal.js              # UMD bundle with polyfills
│   ├── reveal.esm.js          # ES Module bundle for modern browsers
│   ├── reveal.js.map          # Source maps
│   └── index.css              # Compiled CSS
├── examples/                   # Reveal.js framework examples
├── js/                         # JavaScript source (reveal.js framework)
│   ├── index.js               # Entry point; exports Reveal class
│   ├── reveal.js              # Core presentation engine (state, init, API)
│   ├── config.js              # Default configuration options
│   ├── components/            # Reusable UI components
│   │   └── playback.js        # Media playback control component
│   ├── controllers/           # Feature controllers (13 files)
│   │   ├── slidecontent.js    # Media loading, lazy load, playback
│   │   ├── fragments.js       # Fragment visibility and animation
│   │   ├── overview.js        # Slide overview mode
│   │   ├── backgrounds.js     # Background rendering and transitions
│   │   ├── keyboard.js        # Keyboard navigation
│   │   ├── touch.js           # Touch gesture handling
│   │   ├── controls.js        # UI navigation arrows
│   │   ├── progress.js        # Progress bar
│   │   ├── slidenumber.js     # Slide number display
│   │   ├── pointer.js         # Laser pointer feature
│   │   ├── location.js        # URL hash navigation
│   │   ├── notes.js           # Speaker notes
│   │   ├── print.js           # PDF printing support
│   │   ├── focus.js           # Focus management
│   │   ├── autoanimate.js     # Auto-animation between slides
│   │   └── plugins.js         # Plugin loading and lifecycle
│   └── utils/                 # Utility functions and helpers
│       ├── util.js            # DOM manipulation, timing, extend()
│       ├── constants.js       # CSS selectors, configuration constants
│       ├── device.js          # Device detection (mobile, touch, etc)
│       ├── color.js           # Color manipulation
│       └── loader.js          # Dynamic script/CSS loading
├── plugin/                     # Optional presentation plugins
│   ├── highlight/             # Syntax highlighting for code blocks
│   ├── markdown/              # Markdown slide support
│   ├── math/                  # Math equation rendering (KaTeX/MathJax)
│   ├── notes/                 # Speaker notes/notes view
│   ├── search/                # In-presentation search
│   └── zoom/                  # Zoom capability
├── projects/                   # Example projects and reference implementations
├── scripts/                    # Build and utility scripts
│   ├── extractSlideData.js    # Scans talks/ folder, generates data/slides.json
│   └── addIdsToSlide.js       # Slide ID assignment utility
├── talks/                      # Individual presentation slide decks
│   ├── web-dev-basics/        # Example nested presentation
│   │   ├── index.html         # Hub/overview for this talk
│   │   ├── 001-intro.html     # Slide files
│   │   └── slide.html         # Dynamic slide loader
│   ├── assets/                # Shared presentation assets
│   │   ├── images/            # Images, logos
│   │   └── gemini-cli-examples/  # Example resources
│   ├── profiles/              # Speaker profiles
│   ├── slides-markdown/       # Markdown-based slides
│   ├── *.html                 # Individual presentation files (at root of talks/)
│   └── *.html (nested)        # Some presentations as folders
├── test/                       # Unit and integration tests
│   ├── qunit/                 # QUnit test files
│   ├── assets/                # Test fixtures and resources
│   └── nested/                # Nested test examples
├── gulpfile.js                # Build task definitions (Gulp 4)
├── package.json               # Dependencies, scripts, ESLint config
├── package-lock.json          # Locked dependency versions
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS processor config (Tailwind input)
├── .prettierrc                # Code formatting rules
├── .editorconfig              # Editor neutral formatting
├── .env                       # Environment configuration (not committed)
├── .gitignore                 # Git exclusions
├── index.html                 # Slides hub landing page
├── main.js                    # Hub application logic (loads slides.json, renders grid)
├── demo.html                  # Reveal.js framework demo/reference
└── README.md                  # Project documentation
```

## Directory Purposes

**js/:**
- Purpose: Reveal.js presentation framework source code
- Contains: Core engine, controllers, utilities, configuration
- Key files: `js/reveal.js` (main engine), `js/index.js` (entry), `js/config.js` (options)

**css/:**
- Purpose: Presentation visual styling
- Contains: Framework styles (reveal.scss), custom overrides, theme definitions, print styles
- Key files: `css/reveal.scss` (core), `css/customizations.scss` (overrides), `css/index.css` (Tailwind compiled output)

**plugin/:**
- Purpose: Optional presentation features
- Contains: 6 plugin modules (highlight, markdown, math, notes, search, zoom)
- Each plugin has its own JS, CSS, and build configuration

**talks/:**
- Purpose: Repository of presentation slide decks
- Contains: Individual presentations (HTML files or folders), shared assets
- Patterns: Some presentations as single HTML file (e.g., `careershowtalk.html`), others nested (e.g., `web-dev-basics/index.html`)

**data/:**
- Purpose: Presentation metadata and discovery
- Contains: Generated `slides.json` (local presentations), `externalSlides.json` (external links)
- Generated by: `npm run extract` which runs `scripts/extractSlideData.js`

**scripts/:**
- Purpose: Build and utility automation
- Contains: `extractSlideData.js` (scans talks/ to generate metadata), `addIdsToSlide.js` (ID utility)

**test/:**
- Purpose: Test suite and fixtures
- Contains: QUnit tests, test assets, nested test examples
- Run via: `npm run test` (Jest + gulp test)

**dist/:**
- Purpose: Build output (generated, not committed)
- Contains: Bundled JS (UMD and ESM), compiled CSS, source maps
- Generated by: `npm run build` (Rollup + Gulp)

## Key File Locations

**Entry Points:**
- `index.html`: Slides hub landing page
- `js/index.js`: Reveal.js framework entry point
- `talks/{name}/index.html`: Individual presentation (example)

**Configuration:**
- `js/config.js`: Reveal.js default configuration
- `package.json`: Build scripts, dependencies, ESLint rules
- `tailwind.config.js`: Tailwind CSS customization
- `gulpfile.js`: Build task definitions

**Core Logic:**
- `js/reveal.js`: Main presentation engine
- `js/controllers/slidecontent.js`: Content loading and lazy loading
- `js/controllers/fragments.js`: Fragment animation
- `js/controllers/keyboard.js`: Keyboard navigation

**Styling:**
- `css/reveal.scss`: Framework styles
- `css/customizations.scss`: Project overrides
- `css/index.css`: Compiled Tailwind output

**Testing:**
- `test/` directory: Test files and fixtures

## Naming Conventions

**Files:**
- Controllers: `camelCase.js` (e.g., `slidecontent.js`, `autoanimate.js`)
- Utilities: `camelCase.js` (e.g., `device.js`, `loader.js`)
- Presentations: `kebab-case.html` (e.g., `careershowtalk.html`, `web-dev-basics/`)
- Styles: `snake_case.scss` or direct name (e.g., `reveal.scss`, `customizations.scss`)
- Data: lowercase (e.g., `slides.json`)

**Directories:**
- Feature folders (controllers, components, utils): lowercase (e.g., `controllers/`, `components/`, `utils/`)
- Presentation folders: kebab-case (e.g., `web-dev-basics/`, `slides-markdown/`)
- Build output: `dist/`

## Where to Add New Code

**New Presentation/Talk:**
- Primary code: `talks/{talk-name}/index.html` (or `talks/{talk-name}.html` for single file)
- Assets: `talks/assets/{asset-type}/` (shared) or `talks/{talk-name}/assets/` (local to talk)
- Add title tag to HTML; run `npm run extract` to generate metadata
- Link will appear in hub automatically

**New Feature/Plugin:**
- Implementation: `plugin/{feature-name}/` (create new directory with plugin.js, CSS, build config)
- Or add controller to `js/controllers/{featurename}.js` if core feature
- Integrate into `js/reveal.js` (import, instantiate controller)
- Register in `config.js` if configurable

**Utilities/Helpers:**
- Shared helpers: `js/utils/util.js` (general) or new file `js/utils/{name}.js`
- Import and use across controllers/components

**Styling:**
- Global overrides: `css/customizations.scss`
- Theme-specific: `css/theme/{theme-name}.scss`
- Print styles: `css/print/{concern}.scss`

**Tests:**
- Unit tests: `test/` directory, follow QUnit or Jest conventions
- Fixtures: `test/assets/`

## Special Directories

**dist/:**
- Purpose: Build output destination
- Generated: Yes (by `npm run build`)
- Committed: No (in .gitignore since 7565e75)

**node_modules/:**
- Purpose: Installed dependencies
- Generated: Yes (by `npm install`)
- Committed: No (in .gitignore)

**.git/:**
- Purpose: Git version control metadata
- Generated: Yes (automatic)
- Committed: N/A

**examples/:**
- Purpose: Reveal.js framework examples/references
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-05-01*
