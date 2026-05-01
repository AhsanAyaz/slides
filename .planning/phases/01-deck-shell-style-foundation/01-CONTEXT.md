# Phase 1: Deck Shell & Style Foundation - Context

**Gathered:** 2026-05-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire `talks/tedx-kth.html` so it loads reveal.js (v4.4.0) with the TEDx palette and typography in place. Opening the deck shows a styled-but-empty frame ready to receive the 12 TEDx slides in Phase 2. No per-slide layouts, no slide content, no hub registration — those belong in later phases.

**Locked at the requirements layer (do not re-decide during planning):**
- Shell at `talks/tedx-kth.html` (flat); markdown at `slides-markdown/tedx-kth.md`; per-talk CSS at `talks/tedx-kth/style.css`
- Plugins: `RevealMarkdown`, `RevealHighlight`, `RevealNotes`, `RevealMath.KaTeX`; reveal config flags `controls/progress/history/center` consistent with sibling talks
- Fonts: Fraunces (serif), JetBrains Mono, Inter
- Palette: TEDx red `#e62b1e` accent + deep-black `#0a0a0a` + cream `#f5f1ea` (with `#1a1208` ink) two-palette system
- Typography stack: Fraunces serif for headlines/definitions, JetBrains Mono for eyebrows/labels/commands/sources, Inter sans for body/meta
- Markdown separators: `^\n---\n$` (horizontal) and `^\n--\n$` (vertical)

</domain>

<decisions>
## Implementation Decisions

### Foundation isolation (CSS conflict resolution)

- **D-01:** Do **not** load `dist/theme/black.css`. The TEDx shell loads `../dist/reveal.css` (structural) plus `talks/tedx-kth/style.css` (visual). No `id="theme"` link. Sibling talks unaffected because they continue to load black.css from their own shells.
- **D-02:** Scope every TEDx style rule under `body.tedx`. The shell's `<body>` carries `class="tedx"`. All selectors in `talks/tedx-kth/style.css` start with `body.tedx .reveal …` (or `body.tedx` for body-level rules). This guarantees no leak to sibling talks regardless of `customizations.scss` ordering.
- **D-03:** Neutralize the existing global rules in `css/customizations.scss` (`.reveal code:not(.hljs) { color: yellow }` and `.reveal .slides { font-size: 32px }`) with higher-specificity counter-rules inside `talks/tedx-kth/style.css` only. Do **not** modify `customizations.scss` — it serves the rest of the deck collection.

### Font loading & offline behavior

- **D-04:** Hybrid font strategy. Primary load via Google Fonts CDN (preconnect + `display=swap`, satisfying DECK-03 verbatim). Self-hosted woff2 files bundled at `talks/tedx-kth/fonts/` and declared via `@font-face` inside `talks/tedx-kth/style.css` as fallback so brand fidelity survives a KTH Wi-Fi outage. The CSS font stacks still terminate in system fonts (Georgia / "Courier New" / system-ui) for the worst-case fail-soft.
- **D-05:** Font weight/subset matrix matches the mockup verbatim — no trimming until visually verified. Latin subset only.
  - Fraunces: weights 400, 500, 600 with variable optical-size axis `opsz 9..144`
  - JetBrains Mono: weights 400, 500, 700
  - Inter: weights 300, 400, 500, 600
- **D-06:** This locks the foundation for Phase 3's VERIFY-04 (offline loading test). Planner should bundle woff2 files at the same time the CDN `<link>` tags go in so the verification target exists from day one.

### Shell ergonomics (deviation from sibling-talk pattern)

- **D-07:** Skip the `profiles/ahsan.md` preface section that sibling shells include. The TEDx shell has a single `<div class="slides">` block loading `slides-markdown/tedx-kth.md` only. Slide 1 is the TEDx title slide — a TEDx host introduces the speaker, so an inline speaker preface would be off-frame.
- **D-08:** Drop the Tailwind CDN `<script>` tag. The mockup uses pure CSS; no Tailwind utility classes will be needed inside `slides-markdown/tedx-kth.md`. Eliminates a network dependency that conflicts with the offline goal and avoids any fight with Tailwind's preflight resets.
- **D-09:** Omit the watermark/socials block entirely (no `<div class="watermark">` element in the DOM). DECK-05 satisfied via removal rather than restyle. Hub-share screenshots will still show the talk title; personal-brand chrome belongs on Ahsan's other talks, not the TEDx deck.

### Two-palette mechanism

- **D-10:** Each `<section>` switches palettes via two coordinated attributes — reveal's native `data-background-color` (sets the slide canvas background through the Backgrounds controller, preserving native transition support) plus a `class` (`deep` or `cream`) which `talks/tedx-kth/style.css` consumes to flip the ink-color CSS custom properties (`--ink`, `--ink-soft`, `--ink-faint`) and keep TEDx red accent constant.
  - Deep example: `<section data-background-color="#0a0a0a" class="deep">…</section>`
  - Cream example: `<section data-background-color="#f5f1ea" class="cream">…</section>`
- **D-11:** Deep-black is the implicit default. A `<section>` that omits both attributes renders dark with light ink. 8 of 12 mockup slides are deep — the default minimizes ceremony in Phase 2 markdown. Cream slides must explicitly carry `data-background-color="#f5f1ea"` and `class="cream"`.
- **D-12:** The two-palette mechanism is verified at the end of Phase 1 by two probe sections inside `slides-markdown/tedx-kth.md` — one deep, one cream — each containing a Fraunces headline, a JetBrains Mono eyebrow, an Inter body line, and a TEDx-red accent rule. These probe sections are placeholders that Phase 2 deletes/replaces when authoring the real 12 slides.

### Claude's Discretion

The planner / executor decide the following without asking the user again:
- Exact reveal config object beyond the locked flags (transition style, hash, slideNumber, etc.) — match sibling-talk defaults unless the mockup demands otherwise
- The exact woff2 filenames and `unicode-range` declarations bundled under `talks/tedx-kth/fonts/`
- Whether `talks/tedx-kth/style.css` is hand-authored CSS or compiled from a colocated `style.scss` — DECK-02 names the consumed file `style.css`; the source format is a build-pipeline detail
- The probe sections' exact placeholder copy (e.g., "TEDx KTH probe — deep palette" vs other strings) so long as all three fonts and the TEDx-red accent are exercised
- Specific CSS-variable names inside `:root` / `body.tedx` so long as the mockup's contract (`--accent`, `--ink`, `--ink-soft`, `--bg-deep`, `--bg-soft`, `--serif`, `--mono`, `--sans`) survives so Phase 2 can reuse mockup CSS verbatim
- Whether to copy the mockup's `:root` block into `style.css` wholesale (recommended) or restate variables manually
- KaTeX inclusion is locked by DECK-04 even though the talk has no math — keep it for sibling-shell consistency rather than diverging

### Folded Todos

None — phase 1 backlog is clean.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Visual contract (the deliverable target)
- `talks/tedx-kth/reference-material/slides.html` — 1,280-line static 12-slide mockup. The `:root` block (lines ~10–25) is the canonical CSS-variable contract. Per-slide layout blocks define what Phase 2 must reproduce, but Phase 1 must already provide the variables they consume.
- `talks/tedx-kth/reference-material/slides.md` — script v3 (~2,820 words / ~20 min) with stage directions and `.slide-notes` blocks. Phase 2 lifts speaker notes from here verbatim.

### Project anchors
- `.planning/PROJECT.md` — locked decisions table, constraints (offline tolerance, TEDx red, typography stack)
- `.planning/REQUIREMENTS.md` — Phase 1 covers DECK-01 through DECK-05 and STYLE-01 through STYLE-03 (8 requirements)
- `.planning/ROADMAP.md` §"Phase 1" — 5 success criteria the verifier will check

### Codebase intel
- `.planning/codebase/ARCHITECTURE.md` — controller/plugin patterns; Backgrounds controller behavior for `data-background-color`
- `.planning/codebase/STRUCTURE.md` — directory conventions (`talks/<name>.html` flat, `slides-markdown/<name>.md`, `talks/<name>/` for assets)
- `.planning/codebase/STACK.md` — reveal.js v4.4.0, Tailwind 3.4.14 (used by hub, not by TEDx shell), Gulp build pipeline
- `.planning/codebase/CONVENTIONS.md` — Prettier (single quotes, 2-space, 80 cols), ESLint rules (eqeqeq, new-cap, etc.) — apply to any new JS

### Sibling-talk reference (pattern to deviate from)
- `talks/the-prompt-is-dead-long-live-the-context.html` — canonical sibling shell. Shows what the TEDx shell **does not** copy (black.css, Tailwind CDN, profiles/ahsan.md preface, watermark) and what it **does** copy (plugin imports, `Reveal.initialize` shape, separator regex)
- `css/customizations.scss` — the global rules (yellow `code`, 32px base) the TEDx style.css must counter

### Hub-integration compatibility surface (Phase 3 will exercise these — Phase 1 must not break them)
- `scripts/extractSlideData.js` — scans `talks/` root for `.html` files and folder `index.html`; reads `<title>` tag. The TEDx shell must have a valid `<title>` so Phase 3's HUB-02 passes when the script runs.
- `main.js` — renders slides.json cards; `link` containing `http` is treated as external. Internal link `tedx-kth.html` (set in Phase 3) is fine.
- `data/slides.json` — Phase 3 entry point; not modified in Phase 1.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`../dist/reveal.css`** — load directly as the only reveal stylesheet; structural rules without theme palette
- **Reveal Backgrounds controller (`js/controllers/backgrounds.js`)** — natively consumes `data-background-color` on each `<section>`. Plugging into it costs us nothing and keeps slide-transition backgrounds working correctly.
- **Reveal plugin set (`../plugin/markdown/`, `../plugin/highlight/`, `../plugin/notes/`, `../plugin/math/`)** — already built; load via the same `<script>` tags sibling shells use.
- **`talks/tedx-kth/` folder** — already exists with `reference-material/`. Reserve `talks/tedx-kth/fonts/` (new, Phase 1) for self-hosted woff2 fallbacks.
- **`talks/tedx-kth/reference-material/slides.html` `:root` block** — copy CSS variable definitions verbatim into `talks/tedx-kth/style.css` to preserve mockup contract.

### Established Patterns
- **Talk-shell template:** sibling talks use `<div class="reveal"><div class="slides"><section data-markdown="…" data-separator="…" data-separator-vertical="…"></section></div></div>` followed by `Reveal.initialize({ … plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealMath.KaTeX] })`. TEDx shell follows this skeleton with the deviations in D-07/D-08/D-09.
- **CSS load order:** sibling shells load `../dist/reveal.css` then `../dist/theme/<theme>.css` then plugin highlight CSS, then any per-talk CSS via inline `<style>`. TEDx skips theme step (D-01) and adds `<link rel="stylesheet" href="tedx-kth/style.css">` last so it has highest cascade priority.
- **Markdown separator regex:** `^\n---\n$` and `^\n--\n$` — used by every sibling talk; adopted unchanged.

### Integration Points
- **Hub auto-discovery (`scripts/extractSlideData.js`):** Phase 1 deliverable already discoverable because it places `tedx-kth.html` at `talks/` root. Title-tag content needs to match HUB-01's exact string in Phase 3, but Phase 1 can stub a working `<title>` (e.g., the TEDx-published title verbatim) so HUB-02 passes preemptively.
- **Build pipeline (`gulpfile.js`):** Existing `gulp serve` and `gulp build` already glob `talks/**/*.html` and `talks/**/*.{html,js,css}` for Tailwind content, but TEDx CSS is plain (D-08) so Tailwind JIT won't process it. No changes to the gulp pipeline expected in Phase 1.
- **`css/customizations.scss`** — read-only from Phase 1's perspective. The TEDx CSS counter-rules in `talks/tedx-kth/style.css` are the integration. Don't modify the shared file.

</code_context>

<specifics>
## Specific Ideas

- **Visual contract is the mockup, verbatim.** When the planner has a choice between "match the mockup HTML" and "do a clean reveal-idiomatic thing," prefer the mockup. The talk's identity is the typography, palette, and per-slide custom layouts the audience sees on stage — divergence from the mockup is a regression.
- **Reusable variables, not divergent ones.** The mockup CSS already names the variables Phase 2 will consume (`--accent`, `--ink`, `--ink-soft`, `--ink-faint`, `--bg-deep`, `--bg-soft`, `--serif`, `--mono`, `--sans`, `--gold`). Phase 1 should publish those exact names so Phase 2 can lift mockup CSS blocks with minimal renaming.
- **Offline must just work.** No banner, no warning, no degraded indicator. If the projector has no Wi-Fi the deck loads from local woff2 and looks correct.
- **Probe sections are throwaway scaffolding.** They prove the foundation works at the end of Phase 1 and are deleted/overwritten when Phase 2 begins authoring real slides — not preserved.

</specifics>

<deferred>
## Deferred Ideas

- **Per-slide custom layouts (terminal cursor blink, browser-frame chrome, AI grid, dragon row, manuscript SVG, oversized quote mark, light-theme reframe with arrow SVG)** — these are STYLE-04 and SLIDE-01..12, all locked to Phase 2.
- **Speaker notes via Notes plugin** — NOTES-01 and NOTES-02 are Phase 2.
- **Hub registration in `data/slides.json`** — HUB-01..03 are Phase 3.
- **`gulp build` and offline / visual-diff verification** — VERIFY-01..05 are Phase 3.
- **Hub-evolution v2 ideas** — per-talk landing pages, search/filter, post-talk artifacts (HUBV2-01..04 in REQUIREMENTS.md) remain explicitly out of v1 scope.
- **TEDx talk follow-up** — recording embed, PDF export (TEDXV2-01..02) are post-delivery work.

</deferred>

---

*Phase: 01-deck-shell-style-foundation*
*Context gathered: 2026-05-01*
