# Technology Stack

**Analysis Date:** 2026-05-01

## Languages

**Primary:**
- JavaScript (ES6+) - Reveal.js framework core, plugins, and slide presentation logic
- HTML5 - Presentation structure and slide templates
- CSS/SCSS - Styling, theming, and responsive design

**Markup & Content:**
- Markdown - Slide content management (see `talks/slides-markdown/`)

## Runtime

**Environment:**
- Node.js >=10.0.0

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (33,233 lines)

## Frameworks & Core Libraries

**Presentation:**
- reveal.js (custom forked/extended version) - Main presentation framework providing slide deck functionality, plugins, and slide navigation
  - Location: `js/` (core reveal.js implementation)
  - Plugins: `plugin/` directory containing markdown, highlight.js, notes, math plugins
  - Built and distributed to `dist/reveal.js` and `dist/reveal.esm.js`

**Styling & UI:**
- Tailwind CSS 3.4.14 - Utility-first CSS framework for responsive design
  - Config: `tailwind.config.js`
  - Uses DaisyUI 4.12.14 theme plugin with 'synthwave' theme
  - Content paths: `./talks/**/*.{html,js,css}`, `./css/**/*.scss`, `./**/*.html`, `./js/**/*.js`

- SCSS/Sass 1.39.2 - CSS preprocessor for advanced styling
  - Config: `postcss.config.js`

**Build & Development:**
- Gulp 4.0.2 - Task runner for build pipeline (see `gulpfile.js`)
- Rollup 2.48.0 - JavaScript bundler for ES modules and UMD bundles
  - Plugins:
    - @rollup/plugin-babel 5.3.0 - ES6+ transpilation
    - @rollup/plugin-commonjs 19.0.0 - CommonJS support
    - @rollup/plugin-node-resolve 13.0.0 - Node module resolution
    - rollup-plugin-terser 7.0.2 - Code minification

- Babel 7.14.3 - JavaScript transpiler
  - Core: @babel/core 7.14.3
  - Preset: @babel/preset-env 7.14.2 (ES5/ES6 compatibility)
  - Parser: @babel/eslint-parser 7.14.3
  - Plugin: babel-plugin-transform-html-import-to-string 0.0.1 (imports HTML as strings)

**CSS Processing:**
- PostCSS 8.4.47 - CSS transformation pipeline
- gulp-autoprefixer 8.0.0 - Vendor prefix injection
- gulp-postcss 10.0.0 - PostCSS integration with Gulp
- gulp-clean-css 4.2.0 - CSS minification

**Testing:**
- Jest 29.7.0 - JavaScript testing framework (see `package.json` scripts)
- QUnit 2.17.2 - Unit testing framework
- node-qunit-puppeteer 2.1.0 - Headless browser test runner

**Code Quality:**
- ESLint (via gulp-eslint 6.0.0) - JavaScript linting
  - Config: Embedded in `package.json` eslintConfig
  - Parser: @babel/eslint-parser with ES6 module support
  - Rules: eqeqeq, no-use-before-define, new-cap, no-caller, no-eq-null, etc.
  
- Prettier 2.8.0 - Code formatter
  - Config: `.prettierrc` with 80 char line width, single quotes, 2-space tabs

**Code Highlighting:**
- highlight.js 10.0.3 - Syntax highlighting for code blocks
  - CSS theme: `plugin/highlight/monokai.css`

**Markdown Processing:**
- marked 4.0.12 - Markdown parser
- plugin/markdown/ - Custom reveal.js markdown plugin for slide content

**Math Rendering:**
- KaTeX and MathJax support (plugins/math/) - Mathematical formula rendering

**Utilities:**
- fitty 2.3.0 - Text scaling for responsive typography
- uuid 9.0.1 - Unique ID generation for slides
  - Used in: `scripts/addIdsToSlide.js` to add unique identifiers to slide sections
- yargs 15.1.0 - CLI argument parsing for gulp tasks
- colors 1.4.0 - Terminal color output
- glob 7.1.7 - File pattern matching

**Data & File Processing:**
- fs (Node.js built-in) - File system operations
- path (Node.js built-in) - File path utilities
- core-js 3.12.1 - Polyfills for older browsers

## Configuration Files

**Build & Development:**
- `gulpfile.js` - Main build task definitions (serve, build, build-talks, deploy, package)
- `package.json` - Project metadata and dependencies
- `postcss.config.js` - PostCSS plugin chain
- `tailwind.config.js` - Tailwind CSS configuration with DaisyUI themes
- `.prettierrc` - Prettier formatting rules

**Browser Support:**
- `.browserslist` - "> 2%, not dead" (last 2 versions of major browsers)

**Editor Config:**
- `.editorconfig` - Editor configuration for consistent code styles
- `.vscode/` - VS Code settings and extensions

**Node Version:**
- `.npmignore` - npm publish exclusions
- Minimum Node: 10.0.0 (specified in `engines`)

## Platform Requirements

**Development:**
- Node.js 10.0.0 or higher
- npm
- Modern browser with ES6 module support (for development)

**Production:**
- Static hosting (GitHub Pages compatible - uses `gh-pages` package)
- Browser: Modern browsers supporting ES6+, or wider browser support via UMD build in `dist/reveal.js`

## Build Output

**Compiled Artifacts:**
- `dist/reveal.js` - UMD bundle with broad browser support (ES5 compatible)
- `dist/reveal.esm.js` - ES module bundle for modern browsers
- `dist/reveal.css` - Compiled stylesheets
- `dist/index.css` - Tailwind + DaisyUI compiled styles
- `dist/theme/` - Reveal.js theme files
- `build/` - Production-ready presentation files (from gulp build tasks)

## Special Processing

**Slide Data Extraction:**
- `scripts/extractSlideData.js` - Extracts slide titles and links from HTML files
  - Generates `data/slides.json` for index page navigation
  - Extracts `<title>` tags from slide files
  - Recursive directory scanning for talks

**Slide ID Management:**
- `scripts/addIdsToSlide.js` - Adds unique UUIDs to slide sections
  - Uses uuid 9.0.1
  - Processes markdown separators (`;HS;` and `;VS;`)

---

*Stack analysis: 2026-05-01*
