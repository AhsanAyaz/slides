# Phase 1: Deck Shell & Style Foundation - Pattern Map

**Mapped:** 2026-05-01
**Files analyzed:** 4 (3 new files + 1 new directory of woff2 assets)
**Analogs found:** 4 / 4 strong matches; 0 file-level analogs for self-hosted fonts (mockup `<head>` is the analog)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `talks/tedx-kth.html` | shell (deck entry HTML) | request-response (browser loads HTML, plugins, fonts, CSS) | `talks/the-prompt-is-dead-long-live-the-context.html` | exact role, **deviates** (D-01, D-07, D-08, D-09) |
| `talks/tedx-kth/style.css` | per-talk stylesheet (CSS-variable contract + counter-rules) | static asset / cascade override | `talks/tedx-kth/reference-material/slides.html` `<style>` block (mockup `:root`) + `css/customizations.scss` (rules to counter) | partial — no existing per-talk CSS file in repo; the mockup `:root` is the contract source, `customizations.scss` is the conflict source |
| `talks/tedx-kth/fonts/*.woff2` | self-hosted asset bundle | static asset (loaded via `@font-face` from `style.css`) | none — no other talk self-hosts fonts. Convention analog: `talks/<name>/` asset folder, e.g., `talks/web-dev-basics/` and `talks/assets/` | role-match (folder convention only) |
| `talks/slides-markdown/tedx-kth.md` | reveal.js markdown source (probe sections) | content authoring | `talks/slides-markdown/the-prompt-is-dead-long-live-the-context.md` | exact role, **deviates** (uses raw `<section>` HTML wrappers with `data-background-color` instead of pure markdown blocks separated by `---`) |

**Note on path semantics:** the sibling shell loads `data-markdown="slides-markdown/the-prompt-is-dead-long-live-the-context.md"`. The HTML lives at `talks/the-prompt-…html`, so reveal resolves the relative path to `talks/slides-markdown/<file>.md`. The TEDx shell will use `data-markdown="slides-markdown/tedx-kth.md"` — same convention; the markdown sits at `talks/slides-markdown/tedx-kth.md`.

---

## Pattern Assignments

### `talks/tedx-kth.html` (shell, request-response)

**Analog:** `talks/the-prompt-is-dead-long-live-the-context.html` (entire file, 65 lines)

**Why it's the closest analog:** Named in CONTEXT.md `<canonical_refs>` as the canonical sibling. Shows the exact plugin set (`RevealMarkdown`, `RevealHighlight`, `RevealNotes`, `RevealMath.KaTeX`) and `Reveal.initialize` flag set (`controls`, `progress`, `history`, `center`) Phase 1 is locked to. Also the canonical demonstration of the four deviations TEDx requires (D-01, D-07, D-08, D-09).

#### Code excerpt — full sibling shell (lines 1–65, verbatim)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />

    <title>The Prompt is Dead! Long live the Context!</title>

    <link rel="stylesheet" href="../dist/reveal.css" />
    <link rel="stylesheet" href="../dist/theme/black.css" id="theme" />
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../plugin/highlight/monokai.css" />
  </head>

  <body>
    <div class="reveal">
      <div class="slides">
        <section
          data-markdown="profiles/ahsan.md"
          data-separator="^\n---\n$"
          data-separator-vertical="^\n--\n$"
        ></section>
      </div>
      <div class="slides">
        <section
          data-markdown="slides-markdown/the-prompt-is-dead-long-live-the-context.md"
          data-separator="^\n---\n$"
          data-separator-vertical="^\n--\n$"
        ></section>
      </div>
    </div>
    <div class="watermark fixed bottom-4 left-4 flex items-center">
      <img class="w-10 scale-150" src="assets/images/code with ahsan.png" />
      <a href="https://twitter.com/codewith_ahsan" class="text-blue-500 text-lg"
        >@codewith_ahsan</a
      >
    </div>
    <script src="../dist/reveal.js"></script>
    <script src="../plugin/markdown/markdown.js"></script>
    <script src="../plugin/highlight/highlight.js"></script>
    <script src="../plugin/notes/notes.js"></script>
    <script src="../plugin/math/math.js"></script>

    <script>
      Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,

        plugins: [
          RevealMarkdown,
          RevealHighlight,
          RevealNotes,
          RevealMath.KaTeX,
        ],
      });
    </script>
  </body>
</html>
```

#### What to copy verbatim

| Block | Sibling lines | Reuse for TEDx |
|-------|---------------|----------------|
| `<!DOCTYPE html>` + `<html lang="en">` + `<meta charset="utf-8" />` boilerplate | 1–4 | copy verbatim |
| `<link rel="stylesheet" href="../dist/reveal.css" />` (reveal core CSS) | 8 | copy verbatim — required structural CSS |
| `<link rel="preconnect" href="https://fonts.googleapis.com" />` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />` | 11–12 | copy verbatim — required by DECK-03 (`preconnect`); satisfies D-04 hybrid loading |
| `<link rel="stylesheet" href="../plugin/highlight/monokai.css" />` | 17 | copy verbatim — highlight plugin's stylesheet (KaTeX inclusion locked by DECK-04) |
| The `<section data-markdown="…" data-separator="^\n---\n$" data-separator-vertical="^\n--\n$"></section>` skeleton inside `<div class="slides">` | 23–27, 30–34 | copy structurally; substitute markdown path → `slides-markdown/tedx-kth.md` |
| `<script src="../dist/reveal.js"></script>` and the four plugin script tags (markdown, highlight, notes, math) | 43–47 | copy verbatim — same plugin set per CONTEXT D-domain |
| `Reveal.initialize({ controls: true, progress: true, history: true, center: true, plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealMath.KaTeX] })` | 49–63 | copy verbatim — flag set is locked at the requirements layer |

#### What to deviate (and why)

| Sibling line(s) | Deviation | Source decision |
|-----------------|-----------|------------------|
| Line 6: `<title>The Prompt is Dead! Long live the Context!</title>` | Replace with `<title>The next billion developers won't be blocked by syntax. They'll be blocked by thinking.</title>` (UI-SPEC §Copywriting Contract; pre-empts HUB-02 extractor pass) | UI-SPEC line 161; HUB-01 |
| Line 9: `<link rel="stylesheet" href="../dist/theme/black.css" id="theme" />` | **DELETE entirely.** Do not load any theme stylesheet. No `id="theme"` link. | D-01 (CONTEXT.md line 26) |
| Line 10: `<script src="https://cdn.tailwindcss.com"></script>` | **DELETE entirely.** TEDx shell is plain CSS; no Tailwind utility classes inside markdown. | D-08 (CONTEXT.md line 42) |
| Lines 13–16: `<link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet" />` | Replace with the TEDx Google Fonts URL covering Fraunces (opsz 9..144, wt 400/500/600), JetBrains Mono (wt 400/500/700), Inter (wt 300/400/500/600). Reference URL exists verbatim at `talks/tedx-kth/reference-material/slides.html` line 9. Use `display=swap` per DECK-03. | D-04, D-05; UI-SPEC §Typography |
| Lines 21–28: First `<div class="slides">` containing `<section data-markdown="profiles/ahsan.md" …></section>` | **DELETE the entire first `<div class="slides">` block.** TEDx shell has only ONE `<div class="slides">` — the one loading `slides-markdown/tedx-kth.md`. | D-07 (CONTEXT.md line 41) |
| Lines 37–42: `<div class="watermark fixed bottom-4 left-4 …">` block (avatar + Twitter link) | **DELETE entirely.** No watermark element in the DOM. | D-09 (CONTEXT.md line 43) |
| Line 20: `<body>` | Add `class="tedx"`. The shell's `<body>` carries `class="tedx"` so all `body.tedx` selectors in `style.css` match. | D-02 (CONTEXT.md line 27) |
| New (no analog line) | Add `<link rel="stylesheet" href="tedx-kth/style.css" />` as the **last** stylesheet link in `<head>` so it has highest cascade priority over `dist/reveal.css` and the highlight CSS. | CONTEXT.md `<code_context>` line 113 |

---

### `talks/tedx-kth/style.css` (per-talk stylesheet, static cascade override)

**Analogs:**
1. `talks/tedx-kth/reference-material/slides.html` lines 11–25 — the canonical CSS-variable contract to lift verbatim
2. `css/customizations.scss` lines 46–52 — the global rules the TEDx CSS must counter (D-03)

**Why these are the closest analogs:** No prior talk in the repo ships a per-talk stylesheet, so there is no role-exact analog file. The mockup's `<style>` block in `slides.html` defines the contract Phase 2 will reuse, and `customizations.scss` is the only file actively setting global `.reveal …` rules in Phase 1's cascade.

#### Code excerpt 1 — mockup `:root` block (`talks/tedx-kth/reference-material/slides.html` lines 10–25, verbatim)

```html
<style>
  :root {
    --bg-deep: #0a0a0a;
    --bg-soft: #f5f1ea;
    --ink: #f5f1ea;
    --ink-soft: rgba(245, 241, 234, 0.6);
    --ink-faint: rgba(245, 241, 234, 0.25);
    --ink-dark: #0a0a0a;
    --ink-dark-soft: rgba(10, 10, 10, 0.55);
    --accent: #e62b1e;
    --accent-soft: rgba(230, 43, 30, 0.15);
    --gold: #c9a961;
    --serif: 'Fraunces', Georgia, serif;
    --mono: 'JetBrains Mono', 'Courier New', monospace;
    --sans: 'Inter', sans-serif;
  }
```

#### Code excerpt 2 — global rules to counter (`css/customizations.scss` lines 46–52, verbatim)

```scss
.reveal code:not(.hljs) {
  color: yellow;
}

.reveal .slides {
  font-size: 32px;
}
```

#### What to copy verbatim

| Block | Source lines | Reuse |
|-------|--------------|-------|
| All 13 CSS custom-property declarations (`--bg-deep` through `--sans`) | mockup lines 12–24 | Lift the **values** verbatim into a `body.tedx { … }` block. Variable **names** are also locked — UI-SPEC §Color states "Do not rename any variable" (line 119). |
| `--serif: 'Fraunces', Georgia, serif;` font stack | mockup line 22 | Verbatim — Georgia is the system fallback per D-04 fail-soft |
| `--mono: 'JetBrains Mono', 'Courier New', monospace;` | mockup line 23 | Verbatim — Courier New is the system fallback |
| `--sans: 'Inter', sans-serif;` | mockup line 24 | Verbatim — `sans-serif` is the generic system fallback |

#### What to deviate (and why)

| Mockup pattern | Deviation | Source decision |
|----------------|-----------|------------------|
| Mockup wraps variables in `:root { … }` (global) | Wrap in `body.tedx { … }` instead. All TEDx selectors must be scoped under `body.tedx` to prevent leakage to sibling talks. | D-02 (CONTEXT.md line 27) |
| Mockup has no counter-rules (it's a standalone HTML file with no `customizations.scss` in scope) | **Add** counter-rules per UI-SPEC §"CSS Counter-Rules (Required)" lines 210–220 (paste the two `body.tedx .reveal …` rules verbatim). | D-03 (CONTEXT.md line 28); UI-SPEC counter-rule block |
| Mockup has no `@font-face` declarations (Google Fonts CDN only) | **Add** `@font-face` declarations for self-hosted woff2 files at `talks/tedx-kth/fonts/`. Latin subset only per D-04. Weight/optical-size matrix per D-05. | D-04, D-05, D-06 |

#### Required counter-rule block (paste verbatim from UI-SPEC lines 211–219)

```css
/* Counter: customizations.scss sets .reveal code:not(.hljs) { color: yellow } */
body.tedx .reveal code:not(.hljs) {
  color: var(--ink);
}

/* Counter: customizations.scss sets .reveal .slides { font-size: 32px } */
body.tedx .reveal .slides {
  font-size: unset;
}
```

#### Required ink-color switch block (per UI-SPEC §"Ink Color Switching")

```css
/* .deep is implicit default; declared for symmetry */
body.tedx .reveal .slides section.deep {
  --ink: #f5f1ea;
  --ink-soft: rgba(245, 241, 234, 0.6);
}

body.tedx .reveal .slides section.cream {
  --ink: #1a1208;
  --ink-soft: rgba(26, 18, 8, 0.55);
}
```

(Selector path traverses `body.tedx .reveal .slides section.<class>` per D-02 scoping; the `data-background-color` attribute handles the canvas color natively via Reveal's Backgrounds controller — no CSS needed for the background itself.)

---

### `talks/tedx-kth/fonts/*.woff2` (self-hosted font assets)

**Analog (folder convention only):** `talks/web-dev-basics/` and `talks/assets/`

**Why these are the closest analogs:** No existing talk self-hosts fonts. The `talks/<name>/` directory pattern is the only convention to mirror — confirmed by `talks/tedx-kth/reference-material/` already existing as a peer subdirectory.

**Folder convention:**
- `talks/web-dev-basics/` — sibling per-talk asset directory (contains `001-intro.html`, `index.html`, `slide.html`)
- `talks/assets/` — shared cross-talk asset directory (contains `audios/`, `gemini-cli-examples/`, `images/`, `memes/`, `videos/`)

**What to copy:** the directory placement convention only — `talks/tedx-kth/fonts/` sits at the same level as `talks/tedx-kth/reference-material/`, both under `talks/tedx-kth/`. No file-level pattern to copy.

**What to deviate:** Phase 1 introduces self-hosting as a new convention. Filenames and exact `unicode-range` declarations are Claude's discretion (CONTEXT.md line 57). Latin subset only per D-04. Weight/optical-size matrix per D-05:
- Fraunces: 400, 500, 600 with variable `opsz 9..144`
- JetBrains Mono: 400, 500, 700
- Inter: 300, 400, 500, 600

`@font-face` declarations live in `talks/tedx-kth/style.css`, **not** in a separate fonts.css — keeps the cascade rooted at one file.

---

### `talks/slides-markdown/tedx-kth.md` (reveal.js markdown source, content authoring)

**Analog:** `talks/slides-markdown/the-prompt-is-dead-long-live-the-context.md` (canonical sibling, 80 lines inspected)

**Why it's the closest analog:** Same role (markdown source consumed by reveal-markdown plugin via `data-markdown` attribute on the shell), same separator regex (`^\n---\n$` horizontal, `^\n--\n$` vertical), same plugin pipeline.

#### Code excerpt — sibling separator pattern (lines 1–32, verbatim)

```markdown
# The Prompt is Dead!

# Long Live the Context! 👑

**Muhammad Ahsan Ayaz**

<!-- .element: class="fragment" -->

_Google Developer Expert (GDE) in AI & Angular_

<!-- .element: class="fragment" -->

---

<img src="assets/images/context-engineering/qr-code-devfest-2025.png" alt="Session QR"/>

- All links related to this session
- Feedback form
- My socials

---

## Who here likes AI? 🙋

--

### Who here uses AI for just coding? 🙋

--

### Do you know what I try to use AI for?
```

#### What to copy

| Pattern | Sibling line(s) | Reuse for TEDx |
|---------|-----------------|----------------|
| Horizontal slide separator: blank line + `---` + blank line | line 13, line 21 | Use `---` between the two probe sections (deep → cream) |
| File starts at line 1 with content (no front-matter, no separator) | line 1 | TEDx file also starts with content directly |
| Inline `<img>` HTML allowed | line 15 | TEDx probe sections allow inline HTML; in fact they require `<section>` wrappers (see deviation) |

#### What to deviate (and why)

The sibling markdown is **pure markdown blocks** — reveal-markdown wraps each `---`-separated block in an auto-generated `<section>`. The TEDx probe sections need explicit `data-background-color` attributes and `class="deep"` / `class="cream"` on each `<section>` (D-10), which auto-generated sections do not provide.

**Reveal.js solution:** Use raw `<section data-background-color="…" class="…">…</section>` HTML wrappers around the probe content. reveal-markdown processes markdown inside `<section>` tags when `data-markdown` is set inline on the section, but for static prose-only probes the simpler approach is HTML-only sections (markdown plugin still walks them, content can be any HTML).

**Concrete probe-section structure (from UI-SPEC §Copywriting + §Typography):**

```html
<section data-background-color="#0a0a0a" class="deep">
  <p style="font-family: var(--mono); font-size: clamp(9px, 1vw, 12px); letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-soft);">DECK · PROBE · DEEP</p>
  <h1 style="font-family: var(--serif); font-weight: 500; font-size: clamp(22px, 3.4vw, 46px); line-height: 1.15; letter-spacing: -0.02em; color: var(--ink);">TEDx KTH Salon — Deep Palette Probe</h1>
  <hr style="width: 40px; height: 4px; background: var(--accent); border: 0; margin: 16px 0;" />
  <p style="font-family: var(--sans); font-size: 14px; line-height: 1.5; color: var(--ink);">Fraunces headline · JetBrains Mono eyebrow · Inter body · accent rule confirmed</p>
</section>

---

<section data-background-color="#f5f1ea" class="cream">
  <p style="font-family: var(--mono); font-size: clamp(9px, 1vw, 12px); letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-soft);">DECK · PROBE · CREAM</p>
  <h1 style="font-family: var(--serif); font-weight: 500; font-size: clamp(22px, 3.4vw, 46px); line-height: 1.15; letter-spacing: -0.02em; color: var(--ink);">TEDx KTH Salon — Cream Palette Probe</h1>
  <hr style="width: 40px; height: 4px; background: var(--accent); border: 0; margin: 16px 0;" />
  <p style="font-family: var(--sans); font-size: 14px; line-height: 1.5; color: var(--ink);">Fraunces headline · JetBrains Mono eyebrow · Inter body · accent rule confirmed</p>
</section>
```

The `---` between the two `<section>` blocks is the horizontal separator. Inline `style=""` is acceptable for throwaway probes (D-12: "deleted/replaced when Phase 2 begins") — Phase 2 will introduce per-slide CSS classes.

**Probe content contract (UI-SPEC lines 84–90, verbatim):**
- Fraunces 500 at `clamp(22px, 3.4vw, 46px)`, line-height 1.15, letter-spacing -0.02em — one headline per probe
- JetBrains Mono 400 at `clamp(9px, 1vw, 12px)`, letter-spacing 0.3em, uppercase — one eyebrow per probe
- Inter 400 at 14px, line-height 1.5 — one body line per probe
- One element per probe must show `--accent` (`#e62b1e`)

---

## Shared Patterns

### Authentication / Authorization
**Not applicable** — Phase 1 is a static-asset deck, no auth surface.

### Error Handling
**Not applicable** — Phase 1 has no JS in the shell beyond `Reveal.initialize`. Plugin/load errors surface in the browser console only (UI-SPEC §Interaction Contract line 169).

### CSS Cascade Priority (applies to: shell + style.css)

**Source:** `talks/the-prompt-is-dead-long-live-the-context.html` lines 8–17

```html
<link rel="stylesheet" href="../dist/reveal.css" />
<link rel="stylesheet" href="../dist/theme/black.css" id="theme" />
<!-- … fonts … -->
<link rel="stylesheet" href="../plugin/highlight/monokai.css" />
```

**Pattern:** Stylesheets load in cascade order — earlier links lose to later links at equal specificity. Sibling shell loads `reveal.css` → `theme/black.css` → `highlight/monokai.css`. Any per-talk inline `<style>` would naturally win because it comes after all `<link>` tags.

**Apply to TEDx shell:** Load order is `dist/reveal.css` → `plugin/highlight/monokai.css` → **`tedx-kth/style.css` (last)** so the per-talk CSS wins over both reveal core and highlight CSS. Also wins over `customizations.scss` because customizations is bundled into reveal's pipeline upstream.

### CSS Selector Scoping (applies to: every rule in `style.css`)

**Source:** D-02 (CONTEXT.md line 27)

**Pattern:** Every rule is prefixed with `body.tedx` (or `body.tedx .reveal …` for slide-content rules) so styles cannot leak to sibling talks regardless of `customizations.scss` ordering.

```css
/* Body-level */
body.tedx { /* CSS variables here */ }

/* Slide-content */
body.tedx .reveal h1 { /* … */ }

/* Counter-rule (higher specificity than .reveal …) */
body.tedx .reveal code:not(.hljs) { color: var(--ink); }
```

**Apply to:** every selector in `talks/tedx-kth/style.css` — no exceptions.

### Hub-extractor compatibility (applies to: `talks/tedx-kth.html`)

**Source:** `scripts/extractSlideData.js` lines 16–33 and 35–60

#### Code excerpt — `<title>` extraction (lines 16–33, verbatim)

```javascript
const extractTitle = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const titleRegex = /<title>\s*([\s\S]*?)\s*<\/title>/i;
    const match = data.match(titleRegex);

    if (match) {
      const titleContent = match[1];
      return titleContent;
    } else {
      console.log({ data });
      return '';
    }
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
```

#### Code excerpt — `talks/` walker (lines 35–60, verbatim)

```javascript
const extractSlideData = (folderName) => {
  try {
    const talksPath = path.resolve(folderName);
    const files = fs.readdirSync(talksPath);

    const indexFilter = /index\.html$/;
    const htmlFilter = /\.html$/;
    const folderFilter = /\./;

    let talks = [];
    files.forEach((file) => {
      if (!folderFilter.test(file)) {
        const fileNames = [];
        listFilesInDirectory(path.join(talksPath, file), fileNames);

        return fileNames.forEach((file) => {
          if (indexFilter.test(file)) {
            talks.push(file.replace(talksPath, '').substring(1));
          }
        });
      }

      if (htmlFilter.test(file)) {
        talks.push(file);
      }
    });
```

**Pattern:** the extractor walks `talks/` root. For each entry:
- If the entry name has no `.` (i.e., is a directory), it recursively scans for `index.html` and registers any matches.
- If the entry name matches `\.html$`, it registers the file directly.
- Then it calls `extractTitle` on the registered file to pull the `<title>` text via regex `/<title>\s*([\s\S]*?)\s*<\/title>/i`.

**Apply to TEDx shell:**
1. `talks/tedx-kth.html` is a flat `.html` at the `talks/` root — matches the `htmlFilter` branch (line 57). Discoverable.
2. The `talks/tedx-kth/` directory contains no `index.html` — won't be double-registered by the directory branch (line 51). Safe.
3. The `<title>` tag must be valid HTML (open + close on a single line is simplest; multi-line works because the regex uses `[\s\S]*?`). Phase 1 sets it to the exact TEDx-published title verbatim per UI-SPEC line 161, so HUB-02 passes preemptively.

**Constraint:** Do NOT add a `talks/tedx-kth/index.html` — that would register a duplicate hub entry under the directory branch (line 51). Phase 1's only HTML at `talks/tedx-kth.html` is the canonical entry point.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `talks/tedx-kth/fonts/*.woff2` (file-level) | static asset | static load | No existing talk self-hosts fonts. Mitigation: directory convention is borrowed from `talks/<name>/` pattern (e.g., `talks/web-dev-basics/`); `@font-face` declarations live in `talks/tedx-kth/style.css` per D-04. Filenames/unicode-range are Claude's discretion (CONTEXT.md line 57). |

---

## Project Skill Rules Considered

- **`./CLAUDE.md`** — does not exist at repo root. No project-level instructions to apply.
- **`.claude/skills/` and `.agents/skills/`** — neither directory exists. No project skills to load.
- **CONVENTIONS** — per `.planning/codebase/CONVENTIONS.md` referenced in CONTEXT line 88: Prettier (single quotes, 2-space indent, 80 cols), ESLint (eqeqeq, new-cap). Applies only to JS — Phase 1 has no new JS files (the inline `Reveal.initialize` block in the shell is the only JS, and it's copied verbatim from a sibling). Apply Prettier formatting to HTML and CSS for consistency.

---

## Metadata

**Analog search scope:**
- `talks/` (sibling shells, asset folder convention)
- `talks/slides-markdown/` (markdown source pattern)
- `talks/tedx-kth/reference-material/` (mockup `:root` block)
- `css/customizations.scss` (global rules to counter)
- `scripts/extractSlideData.js` (hub-extractor compatibility surface)

**Files scanned:** 7
**Files read with line-number excerpts:** 5 (sibling shell, customizations.scss, mockup `<head>`+`<style>`, sibling markdown, extractor)
**Pattern extraction date:** 2026-05-01

---

*Phase: 01-deck-shell-style-foundation*
*PATTERNS.md created: 2026-05-01*
*Sources: 01-CONTEXT.md (D-01..D-12), 01-UI-SPEC.md (Color, Typography, Counter-Rules, Copywriting blocks), live codebase reads*
