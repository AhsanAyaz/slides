# External Integrations

**Analysis Date:** 2026-05-01

## APIs & External Services

**Google Fonts:**
- Service: Google Fonts API
  - Used for: Nunito font loading
  - Integration: HTML link tags in presentation files
  - URL: `https://fonts.googleapis.com/css2?family=Nunito&display=swap`
  - DNS preconnect: `https://fonts.googleapis.com` and `https://fonts.gstatic.com`
  - Implementation: Embedded in talk HTML files (`talks/**/*.html`) and index pages

**Tailwind CSS CDN:**
- Service: Tailwind CSS Content Delivery Network
  - Used for: On-demand CSS generation in some presentations
  - Integration: `<script src="https://cdn.tailwindcss.com"></script>`
  - Location: Some talk HTML files use CDN version for rapid prototyping
  - Note: Production builds use compiled `dist/index.css` instead

**Google Presentation Embedding:**
- Service: Google Slides
  - Used for: External presentation link
  - Data source: `data/externalSlides.json`
  - Example: "The Offline AI in Your Pocket: How Google Gemini Nano Turns Chrome into a Secret Superpower"
  - URL format: `https://docs.google.com/presentation/d/[presentation-id]/edit#slide=id.[slide-id]`

**Social Media:**
- Twitter/X:
  - Profile: `https://twitter.com/codewith_ahsan` (@codewith_ahsan)
  - Integration: Social links in presentation footers and navigation
  - Location: Footer watermarks in `talks/**/*.html` and `index.html`

## Data Storage

**Local Filesystem:**
- JSON Data Files:
  - `data/slides.json` - Index of local presentation files with titles and links
  - `data/externalSlides.json` - External Google Slides presentations

**Generated Slide Index:**
- Extraction: `scripts/extractSlideData.js` generates slide manifest
- Source: Parses HTML `<title>` tags from `talks/**/*.html`
- Output: JSON format consumed by `index.html` and `main.js`

**File Structure:**
```
talks/
├── [talk-folder]/
│   ├── index.html (or direct HTML file)
│   ├── assets/
│   │   └── images/
│   └── slides-markdown/
│       └── [section].md
```

## Configuration & Secrets

**Environment Configuration:**
- `.env` file exists (54 bytes) - Contains project-specific configuration
- File is in `.gitignore` - Secrets not committed
- No environment-specific integrations detected in runtime code

**Git Hosting:**
- Repository: `https://github.com/ahsanayaz/slides.git`
- Public repository for slide sharing

## Authentication & Identity

**No Authentication Layer:**
- Presentations are publicly accessible
- No user authentication or authorization
- No session management
- No API authentication tokens in code

**Author Identity:**
- Author: Muhammad Ahsan Ayaz
- Email: ahsan.ubitian@gmail.com (in package.json metadata)
- Website: https://codewithahsan.dev
- Twitter: @codewith_ahsan

## Monitoring & Observability

**Error Tracking:**
- Not detected - No integration with Sentry, Rollbar, or similar services

**Logs:**
- Console logging only (via `console.log` statements)
- Example: `scripts/extractSlideData.js` logs file processing status
- No centralized logging service

**Browser Metrics:**
- Not detected - No Google Analytics, Mixpanel, or similar

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (primary deployment target)
- Package: `gh-pages` 4.0.0
- Deployment method: `gulp deploy` task publishes `./build` directory

**Deployment Pipeline:**
```
npm run build-talks → gulp build-talks → gh-pages.publish('./build')
```

**Build Tasks:**
- `npm run dev` - Development server with file watching and live reload
- `npm run build` - Production build
- `npm run build-talks` - Build all talk presentations
- `npm run deploy` - Deploy to GitHub Pages
- `predeploy` hook runs `npm run build-talks` before deployment

**Live Reload:**
- gulp-connect 5.7.0 - Local development server with live reload
- Watches: `*.html`, `*.md`, `talks/**/*.*`, `js/**`, `plugin/**/plugin.js`

## Webhooks & Callbacks

**Incoming:**
- None detected - Presentations are static content

**Outgoing:**
- External slide links via `data/externalSlides.json`
- Social media links (Twitter/X) in navigation and footers
- No active webhook integrations

## Content Delivery

**Local Resource Serving:**
- Reveal.js framework files: `dist/reveal.js`, `dist/reveal.esm.js`
- CSS: `dist/reveal.css`, `dist/index.css`
- Plugins: `plugin/` directory with markdown, highlight, notes, math plugins
- Assets: `talks/assets/images/`, `talks/assets/` subdirectories
- Themes: `dist/theme/` (black theme used in talks)

**CDN-Delivered Resources:**
- Google Fonts (Nunito typeface)
- Tailwind CSS JIT (in some presentations)

## Third-Party Plugins

**Reveal.js Plugin Stack:**
- Markdown plugin (`plugin/markdown/`) - Parses markdown content
- Highlight.js plugin (`plugin/highlight/`) - Code syntax highlighting
- Notes plugin (`plugin/notes/`) - Speaker notes support
- Math plugin (`plugin/math/`) - KaTeX and MathJax support

## Dependency Locations

**Development Dependencies:**
- All managed via npm in `package-lock.json`
- Lock file tracking: 33,233 lines (comprehensive dependency tree)

**Runtime Dependencies:**
- `carbon-now-cli` 2.1.0 - Command-line tool for code screenshots (in dependencies, not used in browser)
- `uuid` 9.0.1 - Unique identifier generation for slide IDs

**Build-Only Dependencies:**
- Babel, Rollup, Gulp, and all build tools are devDependencies
- Not included in production bundles

## Security Considerations

**No Sensitive Data Integration:**
- No API keys in code or HTML
- No database connections
- No authentication services
- Environment secrets managed via `.env` (not in git)

**CORS & Cross-Origin:**
- Google Fonts (safe, public CDN)
- Tailwind CDN (safe, public CDN)
- GitHub Pages (public hosting)

---

*Integration audit: 2026-05-01*
