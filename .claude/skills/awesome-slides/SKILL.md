---
name: awesome-slides
description: Use this skill whenever the user wants to create, draft, outline, scaffold, extend, or refactor a slide deck in this `personal/slides` reveal.js repo — including phrases like "new talk", "new deck", "slides for X", "presentation about Y", "write a talk on Z", "make slides", or "add slides for this conference". Codifies Ahsan's signature presentation style: reveal.js markdown with fragments, opinionated anti-hype tone, code-first explanations with inline arrow-comments, ⚠️ pitfall slides, nano-banana meme opener, QR code on slide 2, two-column flex layouts in Google brand colors, Whoami slide, cheat-sheet table, "one thing to remember" close, and rich speaker notes with timing + production stories. Always invoke when generating slide content in this repo, even if the user only says "draft a deck" or names a topic without using the word "slides".
---

# Awesome Slides — Ahsan's Talk Style

This skill captures the recurring style of Ahsan's talks in `talks/slides-markdown/`. The engine is **reveal.js** with the markdown plugin. Each deck is **two** files: the markdown content at `talks/slides-markdown/<slug>.md` and a thin HTML host at `talks/<slug>.html` that loads it. The index page scans `talks/*.html` — without the HTML host the deck is invisible.

Don't invent a new style. Read the references when you need detail, follow the skeleton, and lean into the voice. The goal is a deck that reads like it came from the same speaker as `zero-to-agentic-orchestra.md`, `from-zero-to-travel-agent.md`, `the-prompt-is-dead-long-live-the-context.md`.

## When to invoke

- "draft a talk on X" / "new deck for Y" / "slides for $venue"
- extending or remixing an existing deck (e.g. tidb variant of agentic-orchestra)
- adding a section, pitfall slide, cheat sheet, or close to a deck in this repo
- the user pastes an outline and wants it turned into slide markdown

If the user is *just editing one line* of an existing deck, skip this — use a normal edit.

## What to do first

1. **Read at least two reference decks** to absorb voice before writing. Good triangulation set:
   - `talks/slides-markdown/zero-to-agentic-orchestra.md` — heavy code, workflow agents, pitfalls
   - `talks/slides-markdown/from-zero-to-travel-agent.md` — narrative arc with "litmus test", part numbering, lessons
   - `talks/slides-markdown/the-prompt-is-dead-long-live-the-context.md` — "Picture this: it's Monday morning" hook
2. Confirm with the user: **topic, venue, date, target length (minutes), audience expertise**. These shape the metadata block and the section count.
3. Check what assets already exist under `talks/assets/images/` — the nano-banana series, GDE badges, and prior deck folders are reusable.

## Required file structure

Each deck is **two** files. The slug is kebab-case and short, identical across both.

1. `talks/slides-markdown/<slug>.md` — the deck content (this skill's main output)
2. `talks/<slug>.html` — the reveal.js host that loads the markdown

### The HTML host (mandatory — index page won't see the deck without it)

Copy `talks/zero-to-agentic-orchestra.html` as the template. Three lines change:

- `<title>...</title>` — short browser-tab title
- `data-markdown="slides-markdown/<slug>.md"` — point at your new markdown
- Separator attrs stay as `data-separator="^\n---\n$"` and `data-separator-vertical="^\n--\n$"`

After writing both files, run `npm run extract` to regenerate `data/slides.json` so the deck appears on the index. (`npm run dev` does this automatically on start.)

### Metadata block (top of the markdown)

Parsed by `scripts/extractSlideData.js`. Always include it:

```markdown
<!--
title: Full Talk Title
date: 2026-MM-DD
venue: Conference / meetup name
tags: AI, Agentic, Angular (comma-separated, pick 2-4)
description: One sentence — what someone reading the talks index needs to know.
-->
```

If the talk is a variant of an existing one (different conference, same content), copy the original file, rename, and only diff the metadata + QR + venue-specific tweaks. See `zero-to-agentic-orchestra.md` vs `zero-to-agentic-orchestra-tidb.md`.

## Slide separator convention

- `---` on its own line → **horizontal** slide break (new section)
- `--` on its own line → **vertical** sub-slide (same section, drill-down)

Older decks use `;HS;` / `;VS;` tokens — don't introduce those in new decks. Stick to `---` / `--`.

## The canonical deck skeleton

Read `references/skeleton.md` for the full annotated template. The minimal arc is:

1. **Title slide** — `# Title`, `### subtitle`, `<small>` byline, speaker Note with timing + thesis
2. **QR slide** — single QR image, bullet list (links / feedback / socials)
3. **Engagement opener** — "Who here likes X? 🙋" cascade, then nano-banana meme series (4-5 vertical sub-slides)
4. **Whoami** — flex two-column, role + creds, small joke column on the right
5. **Problem framing** — italic blockquote of a user request, then fragments "What could go wrong?", then a giphy GIF
6. **The thesis** — one mental-model slide (orchestra metaphor, "agents need 4 things", before/after comparison)
7. **Section 1..N** — each opens with `---` divider then `# Part N` + `## subtitle`; content drills down with `--`
8. **Cheat sheet** — table of patterns + when-to-use, with `<!-- .slide: style="font-size: 0.8em;" -->`
9. **Common pitfalls** — numbered list, each item fragmented, each with a one-line `<small>` story
10. **What's next** — two-column "in the framework / in production"
11. **Resources** — QR again (acceptable to repeat)
12. **The one thing to remember** — centered, large font, slow pause-able lines
13. **Thank you** — flex two-column: socials + repo, Q&A in small text

Length guide: **20-minute talk ≈ 40-60 slide breaks** (counting `--` as a break). Don't pad. Empty slides waste real estate.

## Voice and tone

Read `references/tone.md` for the full guide. Quick rules:

- **Anti-hype, opinionated, brutally honest.** "Most agents you see in demos are a chatbot + a system prompt + vibes." Not "Agents represent an exciting paradigm shift."
- **Em dashes are load-bearing.** "Three things landed in the last 12 months — and combined, they collapse the time from idea to working agent by an order of magnitude."
- **Practical present tense.** "We're shipping something today." Not "We will explore how one might."
- **Casual contractions.** "Don't", "you'll", "it'll".
- **Specific numbers and names beat abstractions.** "About 50 lines of TypeScript", not "a small amount of code".
- **Litmus tests and one-sentence hooks** are signature. "Plan a marketing campaign for my new app." → unfold the failure modes.
- **Don't moralize.** No "remember to be ethical", no "AI is powerful, use responsibly".

## Speaker notes are mandatory

Every slide that isn't a section divider gets a `Note:` block. Read `references/speaker-notes.md` for examples. Notes contain:

- **Timing** — "3 minutes per piece" / "Don't spend more than 90 seconds here"
- **Real production stories** — "I had a production agent quietly change behavior overnight because the latest tag rolled forward"
- **Stage direction** — "Point at the output_key chain", "Pause after each line", "Open adk web live"
- **Audience interaction** — "Ask the audience: has anyone tried..."
- **The reason this slide exists** — what the audience should leave with

Notes are written *to Ahsan*, in second person. They're not narration — they're stage cues. Don't echo the slide text.

## Recurring building blocks

Read `references/snippets.md` for ready-to-paste blocks. Common ones:

- **Nano-banana meme cascade** — drawing → prompt → generated images. Reuses `assets/images/nano-banana/*`. Use as the engagement opener almost universally — it's a Ahsan signature.
- **Fragment reveal** — `<!-- .element: class="fragment" -->` on its own line after the bullet/paragraph. Every list of 3+ items should fragment-reveal unless it's a cheat sheet.
- **Image sizing** — `<!-- .element: style="height: 500px" -->` or `style="width: 50%;"`. Always size meme/diagram images — defaults are too big.
- **Two-column flex** — Google brand colors: blue `#4285F4`, red `#EA4335`, green `#34A853`, yellow `#FBBC04`. Border-left `4px solid <color>` for tinted card lists; `2px solid` for comparison boxes.
- **Pitfall slide** — heading starts with `## ⚠️`. BAD code block above, GOOD code block below, fragment-reveal each. Note: "Save this slide."
- **Litmus test slide** — italic blockquote of a user query, then fragments enumerating what *should* happen, then `❌` line with what *actually* happens.

## Code slide conventions

- Pick **one language per deck** (the talk's stack). Python for ADK Python, TypeScript for ADK TS, Angular/TS for Angular talks.
- **Inline arrow-comments** point at the line that matters: `tools=[now], # <-- the only line that matters` or `# overwrites on each iteration`.
- A `<small>` caption *below* the code block gives the one-line takeaway: "That's the whole file. Run it: `npx adk run .`"
- For BAD/GOOD comparisons, single fenced block, blank line between. Comments do the labeling — `# BAD: ...` and `# GOOD: ...`.
- Don't pseudocode. Use working examples. If the real example is too long, trim with `# ...` not `...`.

## Image and asset conventions

- New per-deck images live at `talks/assets/images/<deck-slug>/`.
- Reuse `assets/images/nano-banana/*` for the meme opener.
- QR codes are PNG, named `qr-code.png` (or `qr-code-<venue>.png` for variants), sized `height: 400px` on the QR slide.
- For diagram slides, prefer a single hero image with `<!-- .element: style="height: 500px" -->` over text-heavy explanations.
- Giphy URLs are inline-OK for reaction GIFs ("what could go wrong"). For anything important, save locally.
- If an image doesn't exist yet, add a TODO marker in a `Note:` block — don't silently break the build.

## Things that are *not* on the list

- No emoji-spam in slide bodies. Strategic use only: 🙋 for audience prompts, ⚠️ for pitfall slides, 💸 for cost warnings, 🇸🇪/country flag for venue close.
- No "Questions?" slide. The thank-you slide stays up during Q&A — Note explicitly says so.
- No agenda slide at the top. The flow reveals itself.
- No "About Me" deep dive — the Whoami is five lines max with a self-deprecating column.
- No bullet density > 5 per slide. Split into sub-slides with `--`.

## Workflow when generating a new deck

1. Confirm topic / venue / date / minutes / audience.
2. Read 2 reference decks (pick the closest in topic).
3. Sketch the section list in chat — get user approval before writing slides.
4. Generate the markdown in `talks/slides-markdown/<slug>.md` in one pass, using the skeleton in `references/skeleton.md`.
5. **Write the HTML host** at `talks/<slug>.html` (copy `talks/zero-to-agentic-orchestra.html`, swap `<title>` and `data-markdown` path). Skipping this leaves the deck off the index.
6. Add per-deck asset folder if it has unique images: `talks/assets/images/<slug>/`.
7. Tell the user what's still missing (QR image, diagrams, real numbers to fill in).
8. Suggest the dev command: `npm run dev` then open `http://localhost:8000/talks/<slug>.html`.

## Variants

If the user asks for a variant of an existing deck for a different venue:

- Copy the source `.md`, rename with venue suffix (`-tidb`, `-stockholm`).
- Update only: metadata block, venue line on title slide, QR image filename, any conference-specific logo on the title slide.
- Keep the body identical unless content reasons say otherwise. Don't "improve while you're in there".

## Reference files

| File | When to read |
|------|--------------|
| `references/skeleton.md` | Drafting a new deck — full annotated template |
| `references/tone.md` | Stuck on phrasing, or the draft sounds generic |
| `references/snippets.md` | Need a flex column, pitfall block, nano-banana cascade, table |
| `references/speaker-notes.md` | Writing the `Note:` blocks |
