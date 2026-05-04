# Testing Patterns

**Analysis Date:** 2026-05-01

## Test Framework

**Runner:**
- Jest ^29.7.0 - Primary test runner for unit tests
- QUnit with Puppeteer (node-qunit-puppeteer ^2.1.0) - Browser-based functional tests

**Run Commands:**
```bash
npm test                # Run all tests (Jest + QUnit via Puppeteer)
npm run test            # Alias: runs "jest && gulp test"
gulp test               # Runs ESLint and QUnit Puppeteer tests
npm run dev             # Development server with live reload
```

## Test File Organization

**Location:**
- Jest tests: `test/extractSlideData.test.js` - co-located naming pattern with descriptive names
- QUnit HTML tests: `test/*.html` - separate test HTML files in `test/` directory
- Test utilities: `test/assets/` - shared test assets

**Naming:**
- Jest files: `*.test.js` pattern
- QUnit tests: `test-*.html` pattern with descriptive names
  - `test.html` - Main test suite
  - `test-auto-animate.html` - Auto-animate feature tests
  - `test-dependencies.html` - Dependency resolution tests
  - `test-markdown.html` - Markdown parsing tests
  - `test-state.html` - State management tests
  - `test-pdf.html` - PDF export tests

**Structure:**
```
test/
├── extractSlideData.test.js      # Jest test file
├── test.html                     # Main QUnit tests
├── test-*.html                   # Feature-specific QUnit tests
├── nested/                       # Nested test structure examples
│   ├── index.html
│   └── very-nested/
│       └── index.html
├── assets/                       # Test fixtures
│   ├── external-script-*.js
│   └── index.html
└── simple.md                     # Markdown fixture
```

## Test Structure

**Jest Suite Organization:**

```javascript
// From test/extractSlideData.test.js
describe('listFilesInDirectory', () => {
  it('should list all files in the directory', () => {
    const fileNames = [];
    listFilesInDirectory(path.join('test', 'assets'), fileNames);
    expect(fileNames).toStrictEqual([
      path.join('test', 'assets', 'external-script-a.js'),
      path.join('test', 'assets', 'external-script-b.js'),
      path.join('test', 'assets', 'external-script-c.js'),
      path.join('test', 'assets', 'external-script-d.js'),
      path.join('test', 'assets', 'index.html'),
    ]);
  });
});

describe('extractTitle', () => {
  it('should extract title from HTML content', () => {
    const title = extractTitle(path.join('test', 'test.html'));
    expect(title).toBe('reveal.js - Tests');
  });
});

describe('extractSlideData', () => {
  it("should get html files' names and titles as JSON", () => {
    const data = extractSlideData(path.join('test', 'assets'));
    expect(JSON.parse(data)).toStrictEqual([
      { link: 'index.html', title: 'reveal.js - Simple Tests' },
    ]);
  });
});
```

**Patterns:**
- Setup: Variables initialized within test function scope
- Assertions: Using `expect()` matcher assertions
- Teardown: No explicit teardown needed for these unit tests
- Data isolation: Each test creates its own test data (path references)

## QUnit Test Structure

**HTML-based approach:**

```html
<!-- From test/test.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>reveal.js - Tests</title>
    <link rel="stylesheet" href="../dist/reveal.css" />
    <link rel="stylesheet" href="../node_modules/qunit/qunit/qunit.css" />
    <script src="../node_modules/qunit/qunit/qunit.js"></script>
  </head>

  <body style="overflow: auto">
    <div id="qunit"></div>
    <div id="qunit-fixture"></div>

    <div class="reveal" style="visibility: hidden">
      <!-- Test slide structure -->
      <div class="slides">
        <section data-visibility="hidden">Hidden section</section>
        <section data-background-image="examples/assets/image1.png">
          <h1>Slide 1</h1>
          <img data-src="" />
          <video data-src=""></video>
        </section>
      </div>
    </div>

    <script src="../dist/reveal.js"></script>
    <script>
      Reveal.configure({ maxScale: 1.11 });
      Reveal.initialize().then(function () {
        // Helper methods
        function triggerKeyboardEvent(config) {
          document.dispatchEvent(new KeyboardEvent('keydown', config));
        }
        // Test assertions...
      });
    </script>
  </body>
</html>
```

## Mocking

**Framework:** Jest has built-in mocking capabilities (not explicitly shown in current tests)

**Patterns:**
- File system mocking: Tests use actual file system with `fs.readFileSync()` and `fs.readdirSync()`
- No explicit mock functions defined in current test suite
- Test isolation through file paths: `path.join('test', 'assets')`

**What to Mock:**
- External API calls (not currently present in tests)
- File system operations (consider mocking for unit test speed improvement)
- Dependencies for isolated testing

**What NOT to Mock:**
- Core module functionality (let actual code run)
- Configuration objects (use real config)
- Built-in Node.js functions like `path`, `fs` when testing file handling is critical

## Fixtures and Factories

**Test Data:**

```javascript
// From test/extractSlideData.test.js
// Using real file system as fixture source
const data = extractSlideData(path.join('test', 'assets'));
expect(JSON.parse(data)).toStrictEqual([
  { link: 'index.html', title: 'reveal.js - Simple Tests' },
]);
```

**Location:**
- `test/assets/` - Contains fixture HTML files and scripts:
  - `test/assets/index.html` - Test fixture with title "reveal.js - Simple Tests"
  - `test/assets/external-script-*.js` - External script fixtures
- `test/nested/` - Nested folder structure fixtures for recursive testing
- `test/simple.md` - Markdown test fixture

**Factory Pattern:**
- Functions create fixture data on-the-fly: `listFilesInDirectory(path, fileNames)` accumulates files
- Recursive descent used to build nested test structures

## Coverage

**Requirements:** No explicit coverage threshold enforced in test configuration

**View Coverage:**
```bash
# Jest provides built-in coverage
# Add to npm scripts if needed:
jest --coverage
```

## Test Types

**Unit Tests:**
- Scope: Individual functions in isolation
- Approach: Jest framework with direct function calls
- Location: `test/*.test.js` files
- Example: `extractSlideData.test.js` tests pure functions that read/parse files
- Assertion style: `expect().toStrictEqual()`, `expect().toBe()`

**Integration Tests:**
- Scope: Multiple components working together
- Approach: QUnit HTML tests exercise reveal.js with DOM
- Example: `test-auto-animate.html`, `test-state.html` test feature interactions
- Include real DOM elements, keyboard events, configuration

**Functional Tests:**
- Scope: Browser-based testing of reveal.js features
- Framework: QUnit with Puppeteer for headless execution
- Run via: `gulp qunit` task in `gulpfile.js`
- Uses node-qunit-puppeteer to run HTML test files in headless Chrome
- Timeout: 20 seconds per test file
- Output: Console reporting with pass/fail counts and runtime

**E2E Tests:**
- Not formally implemented
- Live HTML tests (test/*.html) serve as manual E2E verification
- Served via `gulp serve` on localhost:8000

## Test Execution Pipeline

**From gulpfile.js:**

```javascript
gulp.task('test', gulp.series('eslint', 'qunit'));

// QUnit execution with Puppeteer
const tests = Promise.all(
  testFiles.map((filename) => {
    return new Promise((resolve, reject) => {
      qunit
        .runQunitPuppeteer({
          targetUrl: `http://localhost:8009/${filename}`,
          timeout: 20000,
          redirectConsole: false,
          puppeteerArgs: ['--allow-file-access-from-files'],
        })
        .then((result) => {
          if (result.stats.failed > 0) {
            console.log(
              `${'!'} ${filename} [${result.stats.passed}/${result.stats.total}] in ${result.stats.runtime}ms`.red
            );
            qunit.printResultSummary(result, console);
            qunit.printFailedTests(result, console);
          } else {
            console.log(
              `${'✔'} ${filename} [${result.stats.passed}/${result.stats.total}] in ${result.stats.runtime}ms`.green
            );
          }
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  })
);
```

## Common Patterns

**Async Testing:**

```javascript
// From test.html - QUnit async test pattern
Reveal.initialize().then(function () {
  // Tests run after reveal.js initializes
  // Synchronous assertions after promise resolution
});

// Jest async (not shown but supported)
// Use async/await or .resolves/.rejects matchers
```

**Error Testing:**

```javascript
// From extractSlideData.js test
// Tests graceful error handling
it('should get empty JSON if no html in folder', () => {
  const data = extractSlideData(path.join('test', 'no-content'));
  expect(JSON.parse(data)).toStrictEqual([]);
});

// Implementation handles missing folder gracefully
try {
  // ... file operations
} catch (err) {
  console.log(err);
  process.exit(1);
}
```

**DOM Testing:**

```html
<!-- From test.html - QUnit DOM test pattern -->
<div class="reveal" style="visibility: hidden">
  <div class="slides">
    <section data-background-image="examples/assets/image1.png">
      <h1>1</h1>
      <img data-src="" />
      <video data-src=""></video>
      <audio data-src=""></audio>
      <aside class="notes">speaker notes 1</aside>
    </section>
  </div>
</div>

<script>
  Reveal.configure({ maxScale: 1.11 });
  Reveal.initialize().then(function () {
    // Access DOM and verify state
    let slide = Reveal.getCurrentSlide();
    // QUnit assertions on DOM state
  });
</script>
```

## Test Output

**Console Output Format:**
- Pass: `✔ test/test.html [23/23] in 4523ms` (green)
- Fail: `! test/test.html [19/23] in 3201ms` (red)
- Summary: `✔ Passed 500 tests` (green, bold)
- Detailed failures printed via `qunit.printFailedTests(result, console)`

---

*Testing analysis: 2026-05-01*
