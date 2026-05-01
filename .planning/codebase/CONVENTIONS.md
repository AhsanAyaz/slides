# Coding Conventions

**Analysis Date:** 2026-05-01

## Naming Patterns

**Files:**
- JavaScript module files use camelCase: `slidecontent.js`, `extractSlideData.js`, `addIdsToSlide.js`
- Controller files are lowercase with descriptive names: `slidecontent.js`, `backgrounds.js`, `keyboard.js`, `fragments.js`
- HTML test files use dash-separated convention: `test-auto-animate.html`, `test-dependencies.html`, `test-markdown.html`
- Scss/Sass files use dash-separated names: `reveal.scss`, `index.css`, `index.html`

**Functions:**
- Arrow functions and regular functions use camelCase: `extractTitle()`, `listFilesInDirectory()`, `shouldPreload()`, `load()`, `triggerKeyboardEvent()`
- Constructor functions and class names use PascalCase: `SlideContent`, `Reveal`, `Deck`, `SlideNumber`, `Backgrounds`, `Fragment`, `Keyboard`
- Exported utility functions use camelCase: `extend()`, `queryAll()`, `toggleClass()`, `deserialize()`, `distanceBetween()`, `transformElement()`, `matches()`

**Variables:**
- Local variables and object properties use camelCase: `indexh`, `indexv`, `previousSlide`, `currentSlide`, `navigationHistory`, `autoSlide`, `autoSlideTimeout`
- Object keys use camelCase: `controlsLayout`, `controlsTutorial`, `controlsBackArrows`, `controlsLayout`
- Private/internal variables follow same convention as public: `eventsAreBound`, `slidesTransform`, `dom`, `transition`
- Constants use UPPER_SNAKE_CASE: `SLIDES_SELECTOR`, `HORIZONTAL_SLIDES_SELECTOR`, `VERTICAL_SLIDES_SELECTOR`, `POST_MESSAGE_METHOD_BLACKLIST`

**Types:**
- Class names: `SlideContent`, `Backgrounds`, `AutoAnimate`, `Fragments`, `Reveal` (PascalCase)
- Import/export naming uses descriptive module names: `import Deck, { VERSION }`, `export default class SlideContent`

## Code Style

**Formatting:**
- Prettier configuration enforced via `.prettierrc`:
  - Print width: 80 characters
  - Single quotes for strings: `'string'` not `"string"`
  - Tabs disabled, use spaces
  - Tab width: 2 spaces
  - Semicolons required: all statements end with `;`
  - Bracket spacing enabled: `{ property }` not `{property}`

**Example formatted code from `js/index.js`:**
```javascript
let Reveal = Deck;

Reveal.initialize = (options) => {
  Object.assign(Reveal, new Deck(document.querySelector('.reveal'), options));
  enqueuedAPICalls.map((method) => method(Reveal));
  return Reveal.initialize();
};
```

**Linting:**
- ESLint configuration in `package.json` with Babel parser (`@babel/eslint-parser`)
- Run via `npm run eslint` - checks `./js/**` and `gulpfile.js`
- Browser environment with ES6 support enabled
- Key rules enforced:
  - `eqeqeq: 2` - Strict equality required (`===` not `==`)
  - `new-cap: 2` - Constructor functions must use PascalCase
  - `no-caller: 2` - Forbids `arguments.callee` and `arguments.caller`
  - `no-eq-null: 2` - Forbids `== null` comparisons
  - `wrap-iife: [2, "any"]` - Immediately Invoked Function Expressions must be wrapped
  - `no-use-before-define: [2, { functions: false }]` - Variables must be defined before use, functions are hoisted
  - Relaxed rules: `curly: 0`, `dot-notation: 0`, `no-unused-expressions: 0`

**Babel Configuration:**
- `.babelrc` configured in `gulpfile.js` for ES5 and ESM bundles
- Preset: `@babel/preset-env` with core-js 3
- Plugin: `transform-html-import-to-string` for HTML imports
- Targets modern browsers with module support

## Import Organization

**Order:**
1. Internal module imports from `./` or `../` paths
2. Dependency imports from `node_modules`
3. Constants/utilities grouped by type

**Example from `js/reveal.js`:**
```javascript
// 1. Internal controllers (ordered functionally)
import SlideContent from './controllers/slidecontent.js';
import SlideNumber from './controllers/slidenumber.js';
import Backgrounds from './controllers/backgrounds.js';
// ... more controllers

// 2. Components
import Playback from './components/playback.js';

// 3. Config and utilities
import defaultConfig from './config.js';
import * as Util from './utils/util.js';
import * as Device from './utils/device.js';

// 4. Constants
import {
  SLIDES_SELECTOR,
  HORIZONTAL_SLIDES_SELECTOR,
  VERTICAL_SLIDES_SELECTOR,
  POST_MESSAGE_METHOD_BLACKLIST,
} from './utils/constants.js';
```

**Path Aliases:**
- No aliases used in current configuration
- Relative imports with explicit paths: `./js/`, `../scripts/`

## Error Handling

**Patterns:**
- Try-catch blocks used in utility functions that perform file I/O:
```javascript
// From scripts/extractSlideData.js
try {
  const data = fs.readFileSync(path, 'utf8');
  // ... process data
} catch (err) {
  console.log(err.message);
  process.exit(1);
}
```

- Error objects logged to console: `console.log(err.message)` or `console.log(err)`
- Process exits on fatal errors: `process.exit(1)`
- No custom error classes defined; reliant on built-in Error types

## Logging

**Framework:** Native `console` object

**Patterns:**
- Simple console.log() calls: `console.log(err)`, `console.log(err.message)`, `console.log(vinylFile.path)`
- Conditional logging for errors during build: `console.log(vinylFile.path); console.log(err.formatted);`
- Colors used in build/gulp output via `colors` package for status messages

**Example from `gulpfile.js`:**
```javascript
console.log(
  `${'!'} ${filename} [${result.stats.passed}/${result.stats.total}] in ${result.stats.runtime}ms`.red
);
console.log(`${'✔'} Passed ${totalTests} tests`.green.bold);
```

## Comments

**When to Comment:**
- JSDoc comments for exported utility functions: `/**` ... `*/`
- Block comments explaining complex logic: `// Controllers for different aspects...`
- Inline comments for non-obvious behavior: `// These tests expect the DOM to contain...`
- Descriptive comments in configuration objects explaining each option

**JSDoc/TSDoc:**
- JSDoc comments used extensively for public API functions
- Format: multi-line with description and param/return type annotations

**Example from `js/utils/util.js`:**
```javascript
/**
 * Extend object a with the properties of object b.
 * If there's a conflict, object b takes precedence.
 *
 * @param {object} a
 * @param {object} b
 */
export const extend = (a, b) => {
  for (let i in b) {
    a[i] = b[i];
  }
  return a;
};
```

**Example from `js/controllers/slidecontent.js`:**
```javascript
/**
 * Should the given element be preloaded?
 * Decides based on local element attributes and global config.
 *
 * @param {HTMLElement} element
 */
shouldPreload(element) {
  // ...
}
```

## Function Design

**Size:** Functions kept modular and focused (10-60 lines typical)

**Parameters:** 
- Functions accept options objects rather than multiple parameters: `load(slide, options = {})`
- Destructuring used in modern code: `const { link, title } = slide;`
- Default parameters supported: `options = {}`

**Return Values:**
- Utility functions return transformed data: `return a;`, `return Array.from(...)`
- Methods return `this` for chaining where applicable
- Async functions in main.js return promises

**Example function from `js/controllers/slidecontent.js`:**
```javascript
shouldPreload(element) {
  let preload = this.Reveal.getConfig().preloadIframes;
  
  if (typeof preload !== 'boolean') {
    preload = element.hasAttribute('data-preload');
  }
  
  return preload;
}
```

## Module Design

**Exports:**
- Named exports for utility functions: `export const extend = ...`
- Default exports for classes: `export default class SlideContent`
- Package exports from utilities as namespace imports: `import * as Util from './utils/util.js'`

**Barrel Files:**
- `js/index.js` serves as main entry point
- Re-exports Deck class with backward compatibility layer
- Maintains singleton API for legacy support

**Example from `js/index.js`:**
```javascript
import Deck, { VERSION } from './reveal.js';

let Reveal = Deck;

Reveal.initialize = (options) => { /* ... */ };
Reveal.VERSION = VERSION;

export default Reveal;
```

---

*Convention analysis: 2026-05-01*
