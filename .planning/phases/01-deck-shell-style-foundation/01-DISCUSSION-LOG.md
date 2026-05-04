# Phase 1: Deck Shell & Style Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `01-CONTEXT.md` — this log preserves the alternatives considered.

**Date:** 2026-05-01
**Phase:** 01-deck-shell-style-foundation
**Areas discussed:** Foundation isolation, Font loading & offline, Shell ergonomics, Two-palette mechanism

---

## Foundation isolation

### Q1: Should the TEDx shell load reveal's black theme (`dist/theme/black.css`) like sibling talks do?

| Option | Description | Selected |
|--------|-------------|----------|
| Skip black theme entirely | Don't load dist/theme/black.css. Only dist/reveal.css (structural) + talks/tedx-kth/style.css. Cleanest — no theme rules to fight. | ✓ |
| Load black + override | Load black.css for parity with siblings, then override every conflict in TEDx style.css. More CSS specificity wars. | |
| Load black, swap palette via CSS vars | Load black.css and only override its CSS custom properties. Surgical but fragile if reveal renames vars on upgrade. | |

**User's choice:** Skip black theme entirely
**Notes:** Removes the largest source of cascade conflict; sibling talks unaffected because they continue to load black.css from their own shells.

### Q2: How should TEDx CSS rules be scoped so they win locally but don't leak into sibling talks?

| Option | Description | Selected |
|--------|-------------|----------|
| Body class wrapper | Add `class="tedx"` to <body>. Every rule in style.css starts with `body.tedx .reveal …`. Simple, high specificity. | ✓ |
| Reveal data-attribute | `data-talk="tedx"` on .reveal. Rules use `.reveal[data-talk="tedx"] …`. Slightly more idiomatic to reveal but more verbose. | |
| Container ID | Wrap .reveal in `#tedx-kth`. Highest specificity but couples HTML id to CSS. | |

**User's choice:** Body class wrapper
**Notes:** Establishes a hard scoping perimeter independent of CSS load order.

### Q3: How do we neutralize the existing `css/customizations.scss` rules that bleed in?

| Option | Description | Selected |
|--------|-------------|----------|
| Override in TEDx style.css | Higher-specificity counter-rules (e.g., `body.tedx .reveal .slides { font-size: unset; }`). Nothing changes globally. | ✓ |
| Scope customizations.scss | Edit shared file to scope its rules to `:not(body.tedx) .reveal …`. Cleaner long-term but touches a shared file. | |
| Keep as-is, accept collision | Live with yellow `code` and 32px base; only override where it visibly breaks. Lowest effort, riskiest. | |

**User's choice:** Override in TEDx style.css
**Notes:** Keeps `css/customizations.scss` untouched so other talks are not regressed.

---

## Font loading & offline

### Q1: How should TEDx fonts (Fraunces, JetBrains Mono, Inter) load?

| Option | Description | Selected |
|--------|-------------|----------|
| Hybrid: Google Fonts + self-hosted woff2 fallback | CDN primary (DECK-03 verbatim) + local woff2 in talks/tedx-kth/fonts/ via @font-face. ~150-300KB extra. Brand survives Wi-Fi outage. | ✓ |
| CDN only + system-font fallback | Google Fonts CDN only, falls back to Georgia/Courier New/system-ui. Lowest effort, brand fidelity degrades when offline. | |
| Self-hosted only (no CDN) | Drop Google Fonts entirely; bundle woff2 locally. True offline; deviates from DECK-03 wording. | |

**User's choice:** Hybrid: Google Fonts + self-hosted woff2 fallback
**Notes:** Resolves the tension between DECK-03 (CDN-via-preconnect) and the "offline / Wi-Fi unreliable" assumption in PROJECT.md + VERIFY-04.

### Q2: Which font weights/subsets should we ship?

| Option | Description | Selected |
|--------|-------------|----------|
| Match mockup verbatim | Fraunces 400/500/600 (var opsz), JetBrains Mono 400/500/700, Inter 300/400/500/600. Latin only. | ✓ |
| Minimal trim | Drop rarely-used weights. Smaller payload, requires verifying every mockup heading. | |
| Decide during planning | Defer the exact list to /gsd-plan-phase. | |

**User's choice:** Match mockup verbatim
**Notes:** Zero risk of a missing weight breaking a heading on stage.

---

## Shell ergonomics

### Q1: Should the TEDx shell load the `profiles/ahsan.md` preface section?

| Option | Description | Selected |
|--------|-------------|----------|
| Skip the preface entirely | Single .slides block. Slide 1 is the TEDx title slide. | ✓ |
| Keep the standard ahsan.md preface | Two .slides blocks (sibling pattern). Out of frame at TEDx event. | |
| Custom TEDx preface | Author tedx-specific preface. Adds work for marginal value. | |

**User's choice:** Skip the preface entirely
**Notes:** TEDx host introduces the speaker; an inline preface would feel off-frame.

### Q2: Should the TEDx shell load the Tailwind CDN script?

| Option | Description | Selected |
|--------|-------------|----------|
| Drop Tailwind CDN | Mockup uses pure CSS; no Tailwind utilities needed. Removes a network dep. | ✓ |
| Keep Tailwind CDN | Match sibling shell convention. Adds a network dependency conflicting with offline goal. | |

**User's choice:** Drop Tailwind CDN
**Notes:** Reduces moving parts; eliminates Tailwind preflight as a potential conflict source.

### Q3: Watermark/socials block — omit or restyle?

| Option | Description | Selected |
|--------|-------------|----------|
| Omit entirely | No watermark element in the DOM. Matches the mockup's clean visual frame. | ✓ |
| Restyle in TEDx red, hide on stage | Keep for hub screenshots, hide via CSS during playback. | |
| Restyle in TEDx red, keep visible | Recolor link in TEDx red. Visible during delivery — deviates from mockup. | |

**User's choice:** Omit entirely
**Notes:** A TEDx talk has TEDx branding, not personal-brand chrome.

---

## Two-palette mechanism

### Q1: How should sections switch between deep-black and cream palettes?

| Option | Description | Selected |
|--------|-------------|----------|
| Reveal data-background-color + class for ink | `<section data-background-color="#0a0a0a" class="deep">`. Reveal handles bg natively; class flips ink CSS variables. | ✓ |
| Single section class per palette | `<section class="deep">`. style.css sets bg + ink via class. Bypasses reveal's bg system. | |
| CSS custom properties only | Each section: `style="--bg: #0a0a0a; --ink: #f5f1ea"`. Most flexible, most verbose. | |

**User's choice:** Reveal data-background-color + class for ink
**Notes:** Idiomatic to reveal (preserves slide-transition background support) and gives Phase 2 a single class hook for typography flip.

### Q2: Which palette should be the default?

| Option | Description | Selected |
|--------|-------------|----------|
| Deep-black default | Sections without class render dark. 8 of 12 mockup slides are deep. | ✓ |
| No default (every section must declare) | Force every section to declare. Catches errors but adds friction. | |
| Cream default | Cream is default; dark slides opt in. Inverted from majority. | |

**User's choice:** Deep-black default
**Notes:** Minimizes ceremony in Phase 2 markdown for the majority case.

### Q3: What does the empty deck contain when opened before Phase 2 authoring?

| Option | Description | Selected |
|--------|-------------|----------|
| Two probe sections (one per palette) | Deep + cream placeholders, each with Fraunces headline + JetBrains Mono eyebrow + Inter body + TEDx-red accent. | ✓ |
| Single deep-black probe section | One placeholder with all three fonts and TEDx-red accent. Cream verification slips to Phase 2. | |
| Empty deck (no markdown content) | Reveal boots, no errors. No visual probe. Doesn't satisfy success criterion #3 cleanly. | |

**User's choice:** Two probe sections (one per palette)
**Notes:** Maximum verification value; both palettes, all three fonts, and accent proven in one keypress before Phase 2 starts.

---

## Claude's Discretion

The following were not asked because the user delegated implementation choice or the requirements layer locked them:
- Exact reveal config object beyond locked flags (`controls`, `progress`, `history`, `center`)
- Exact woff2 filenames and `unicode-range` declarations
- Whether `talks/tedx-kth/style.css` is hand-authored CSS or compiled from a `style.scss` source
- Probe section placeholder copy (so long as all three fonts + accent are exercised)
- Specific CSS variable names inside `:root` / `body.tedx` so long as the mockup contract is preserved

## Deferred Ideas

None surfaced during this discussion. Everything outside Phase 1 boundary already lives in REQUIREMENTS.md / ROADMAP.md as Phase 2, Phase 3, v2, or post-delivery scope.

---

*Phase: 01-deck-shell-style-foundation*
*Discussion log written: 2026-05-01*
