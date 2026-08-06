# Speaker Notes Guide

Every content slide gets a `Note:` block, and the note **is the script**: the words Ahsan actually says out loud on that slide, written in his first person voice. He reads from these while recording, so a note that describes what to do instead of what to say has to be translated on the fly, which is exactly the wrong thing to be doing on camera.

Anything that is genuinely a stage direction rather than a spoken line gets **wrapped in asterisks**, so it renders as italics in the reveal speaker view and can never be mistaken for a line to read out.

```markdown
Note:
The spoken line. Then the next one.

*Pause here. Flip to the demo.*

The line he says after the demo.
```

Canonical example: `talks/slides-markdown/angular-linkedsignal.md`. Every note in that deck is the script, with directions in asterisks.

## Writing the spoken part

- **First person, his voice.** "I've shipped this bug, probably more than once." Not "Explain that this bug is common."
- **Contractions and spoken rhythm.** It has to sound like a person talking, not prose being read. Short sentences. Ellipses where he trails off or pivots, which is his tell in speech as well as in writing.
- **Blank lines between beats**, not one dense paragraph. He is scanning this while looking at a camera, so give his eye somewhere to land.
- **Say the specific thing.** Name the API, the number, the exact behaviour. "It's been public API since v20, experimental in v19" beats "mention the version".
- **Never restate the slide.** The slide is the visual, the note is what he adds on top of it.
- **No em dashes or en dashes**, same as everywhere else.

## What belongs in asterisks

Only what he does rather than says:

- **Timing** - `*Under 20 seconds.*` / `*About 30 seconds on this slide.*`
- **Stage direction** - `*Flip to the demo, type a letter, show the counter snap to 0.*`
- **Delivery** - `*Pause after "and writable".*` / `*Say that line again.*`
- **Audience interaction** (live talks) - `*Show of hands here.*`
- **Production notes** - `*data-autoplay restarts the clip if you navigate back.*`

If you catch yourself writing `*Mention that ...*` or `*Tell them ...*`, stop: that is a line worth saying, so write the line instead and drop the asterisks.

## What does NOT go in a note

- Restating what is already on the slide
- "In this slide we will discuss..." - he already knows
- Generic advice like "Make eye contact with the audience"
- Fabricated war stories. If there is no real story, leave a `*TODO Ahsan: your story about X here*` marker rather than inventing one

## Examples

**Title slide:**

> Note:
> Hey, I'm Ahsan. Angular GDE, and I wrote a book on signals.
>
> By the end of this video you'll know exactly when linkedSignal beats a computed, when it beats an effect, and you'll have seen the one argument almost every tutorial skips.
>
> Let's get into it.
>
> *Under 20 seconds. Don't read the slide, just hit the promise and move.*

**Code slide:**

> Note:
> Two functions, two jobs.
>
> source decides when it resets. Whatever signals you read in there are your reset triggers.
>
> computation decides what the new value is, and it gets that source value handed to it as the first argument.

**Pitfall slide:**

> Note:
> You'll see this version in the wild, and it's not wrong exactly... it's just a dead end.
>
> Reading those two signals is enough to register them as dependencies, so it does reset correctly. That's why it looks fine.
>
> Screenshot this one, it'll save you an afternoon at some point.

**Demo moment:**

> Note:
> And here's the fix for the bug we opened with.
>
> *Flip to the demo: type a letter, show the counter snap to 0. Then click Next twice and change the page size.*
>
> Notice you stay on the same person instead of getting thrown somewhere random.

**Cheat sheet:**

> Note:
> Here's the whole thing on one screen, so pause the video if you want it.
>
> The top two rows are about ninety percent of what you'll actually reach for.
>
> *Don't read the table line by line. Hold still for two seconds so they can pause.*

## Note on older decks

Decks written before this rule (the agentic-orchestra and travel-agent family) use the older style, where notes were terse second-person stage cues. Leave them as they are unless you are already revising that deck. Do not mix the two styles inside one deck.

## Quick checklist before saving a slide

- [ ] The note reads as words to say, not instructions to follow
- [ ] Every stage direction is wrapped in asterisks
- [ ] No `*Mention ...*` or `*Say that ...*` that should have been a written line
- [ ] Beats separated by blank lines, not one wall of text
- [ ] Does not repeat the slide title verbatim
- [ ] Specific: names a real concept, line of code, or number
- [ ] No em dashes or en dashes
