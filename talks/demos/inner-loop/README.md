# Inner-loop demo — slide-stats

Tiny scenario used during the `agy` crash course to demo the
**explore → plan → execute** loop on a real bug.

## What it does

`slide-stats.js` exports `countBreaks(markdown)` which counts:

- horizontal slide breaks: `---` on its own line
- vertical slide breaks: `--` on its own line

## What's broken

The current implementation counts `---` and `--` lines that live
**inside fenced code blocks** (` ```bash ... ``` `). Those should be
treated as example text, not slide separators. The test asserts the
correct counts and fails until the fix lands.

## Run the test

```bash
node talks/demos/inner-loop/slide-stats.test.js
```

When fixed, prints `OK — slide-stats counts breaks correctly`.

## The prompt to give agy

> `@talks/demos/inner-loop/README.md @talks/demos/inner-loop/slide-stats.js @talks/demos/inner-loop/slide-stats.test.js` — read these, plan the fix so separators inside fenced code blocks are not counted, then apply and run the test.
