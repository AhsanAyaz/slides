# Deck Skeleton - annotated

Paste this into a new file at `talks/slides-markdown/<slug>.md` and fill in. Every block is annotated with what it does and which existing deck it came from. Strip the `<!-- HOWTO: ... -->` comments before saving.

```markdown
<!--
title: Full Talk Title
date: 2026-MM-DD
venue: GDG / DevFest / TiDB SCaiLE / etc.
tags: AI, Agentic, Angular
description: One-sentence summary for the talks index.
-->
# Talk Title

### subtitle line

<small>Muhammad Ahsan Ayaz · GDE in AI & Angular</small><br/>
<small>Venue · Year</small>

Note:
N minutes. One-sentence thesis - by the end the audience will be able to X. State the demo posture (live code? slides only?). Set expectations for tone (no theory dumps, etc.).

---

<!-- HOWTO: QR slide. Always slide 2. -->
<img src="assets/images/<deck-slug>/qr-code.png" alt="Session QR"/>
<!-- .element style="height: 400px" -->

- All links related to this session
- Feedback form
- My socials

---

<!-- HOWTO: Engagement cascade. Three sub-slides, audience raises hands. -->
## Who here likes <topic>? 🙋

--

### Who here uses <topic> for just X? 🙋

--

### Do you know what I try to use <topic> for?

--

<!-- HOWTO: Nano-banana meme cascade - Ahsan signature. Reuses assets/images/nano-banana/*. Keep verbatim unless a deck-specific replacement is intentional. -->
![Drawing](assets/images/nano-banana/drawing.png) <!-- .element: style="width: 50%;" -->

prompt:
Generate a super realistic image of a programmer using this drawing. Keep the weird pose as much as realistically possible.
Use myself as the programmer in the image.

<!-- .element: class="fragment" -->

--

![Generated Image 1](assets/images/nano-banana/generated-image-1.jpeg)

--

![Drawing](assets/images/nano-banana/drawing.png) <!-- .element: style="width: 30%;" -->

#### +

[Prompt]

#### +

## ![Ahsan PFP](assets/images/nano-banana/ahsan-pfp.jpeg) <!-- .element: style="width: 30%;" -->

--

![Generated Image 2](assets/images/nano-banana/generated-image-2.jpeg)

--

![Generated Image 3](assets/images/nano-banana/generated-image-3.jpeg)

<!-- .element style="height: 500px" -->

--

![Generated Image 4](assets/images/nano-banana/generated-image-4.jpeg)

<!-- .element style="height: 500px" -->

---

<!-- HOWTO: Whoami. Short, self-deprecating second column. Five seconds on stage. -->
## Whoami

<div style="display:flex;gap:2rem;align-items:center">
<div style="flex:2">

**Muhammad Ahsan Ayaz**

- GDE in AI & Angular
- Software Architect
- 4x Author, 14M+ OSS installs
- Runs codewithahsan.dev (5,000+ devs)

</div>
<div style="flex:1;text-align:center;opacity:0.5">
<small>That guy who keeps showing up<br/>at GDG events 😅</small>
</div>
</div>

Note:
Five seconds. Don't read the slide. One line: "I'm Ahsan, GDE in AI and Angular, I build production AI agents - let's go."

---

<!-- HOWTO: Problem framing. Italic blockquote of the user request, two fragmented setup lines, then a giphy reaction. -->
## The problem with <thing>

> _"<one-sentence user request that stress-tests the system>"_

<one-line setup>.

<!-- .element: class="fragment" -->

What could go wrong?

<!-- .element: class="fragment" -->

Note:
This is the litmus test from <reference>. Stress-tests the whole system in one sentence. Ask the audience if they've tried this. Then click to the GIF.

--

![what could go wrong](https://media3.giphy.com/media/...giphy.gif)

--

<!-- HOWTO: Failure mode enumeration. Each item fragments. Read once on stage, don't dwell. -->
## Everything, all at once

- <failure mode 1>
<!-- .element: class="fragment" -->

- <failure mode 2>
<!-- .element: class="fragment" -->

- <failure mode 3>
<!-- .element: class="fragment" -->

Note:
Each of these is a real production failure mode. The solution isn't a better prompt - it's <thesis transition>.

--

<!-- HOWTO: Mental model slide. Two-column comparison in red→green. -->
## The <thing> mental model

<div style="display:flex;gap:2rem;align-items:center;margin-top:1rem">
<div style="flex:1;text-align:center;padding:1.5rem;border:2px solid #EA4335;border-radius:8px">
<strong style="color:#EA4335">Before</strong><br/>
<small>Three short lines<br/>describing the<br/>broken approach.</small>
</div>
<div style="flex:0;font-size:2rem;opacity:0.4">→</div>
<div style="flex:1;text-align:center;padding:1.5rem;border:2px solid #34A853;border-radius:8px">
<strong style="color:#34A853">After</strong><br/>
<small>Three short lines<br/>describing the<br/>better approach.</small>
</div>
</div>

Note:
The metaphor matters. Make it concrete. "In an orchestra, the violins don't play drums."

---

<!-- HOWTO: Section opener. Big `# Part N` with subtitle. Always followed by sub-slides that drill down. -->
# Part 1

## <Section name>

Note:
N minutes. One sentence on what this section delivers.

--

<!-- HOWTO: Code slide. One key concept per slide. Inline arrow-comments on the line that matters. <small> caption below. -->
## `<concept>` in code

```python
from foo import Thing

thing = Thing(
    name="...",
    important_field="...",  # <-- the line that matters
)
```

<small>That's a working <concept>. <one-line takeaway>.</small>

Note:
Point at <line>. Walk through what's load-bearing. Why this works.

--

<!-- HOWTO: Parameters / API reference table. Bold the columns the audience must internalize; explain in Note. -->
## The parameters that matter

| Parameter | Purpose |
|-----------|---------|
| `name`    | What it is |
| `field`   | **Why this one is the contract between things** |

Note:
The two highlighted ones are the concepts your audience needs to internalize. <Why>. Everything else is scaffolding.

---

<!-- HOWTO: Pitfall slide. ⚠️ in heading, BAD/GOOD code, each fragmented. -->
## ⚠️ The <thing> pitfall

**<One-sentence rule that sounds obvious in hindsight>.**

<!-- .element: class="fragment" -->

```python
# BAD: <what breaks>
foo = Thing(key="result")
bar = Thing(key="result")  # ← silently overwrites foo

# GOOD: <fix>
foo = Thing(key="result_foo")
bar = Thing(key="result_bar")
```

<!-- .element: class="fragment" -->

Note:
This is the single most common <pitfall> bug. No error is raised. <Outcome>. Point at this slide and say "save this one."

---

<!-- HOWTO: Big demo slide. Hero image of the architecture, then sub-slides with each code chunk. -->
## Putting it all together

### <Demo name>

![diagram](assets/images/<slug>/architecture.png)

<!-- .element: style="height: 500px" -->

Note:
This is the demo moment. Everything we've covered in one composition. Each primitive does one job.

---

<!-- HOWTO: Cheat sheet. Small font. Use this near the end. -->
<!-- .slide: style="font-size: 0.8em;" -->

## Patterns cheat sheet

| Pattern | Primitive | When to use |
|---------|-----------|-------------|
| **Sequential pipeline** | `Foo` | Fixed order |
| **Fan-out / gather** | `Bar inside Baz` | Independent tasks |

--

<!-- HOWTO: Common pitfalls list. Numbered, each fragmented, each with one-line <small> caption. -->
<!-- .slide: style="font-size: 0.8em;" -->

## Common pitfalls

1. **<Pitfall name>** - <one-line consequence>
<!-- .element: class="fragment" -->

2. **<Pitfall name>** - <one-line consequence>
<!-- .element: class="fragment" -->

Note:
Each one is a real failure mode. <Which one to dwell on and why>.

---

<!-- HOWTO: What's next. Two columns - in-framework / in-production. -->
<!-- .slide: style="font-size: 0.8em;" -->

## What's next

**In the framework:**

- `<thing>` - <one-line desc>
<!-- .element: class="fragment" -->

**In production:**

- `<thing>` - <one-line desc>
<!-- .element: class="fragment" -->

Note:
Don't spend more than 90 seconds here. Name each thing, one sentence, move on.

--

## Resources

<!-- .slide: style="font-size: 0.8em;" -->

![QR Code](assets/images/<slug>/qr-code.png)

Note:
All free, all working today. <Where the audience should look first.>

---

<!-- HOWTO: The one thing to remember. Centered, large font, slow pause-able lines. -->
## The one thing to remember

<!-- .slide: style="font-size: 0.8em;" -->

<div style="font-size:1.2em;text-align:center;margin-top:2rem;line-height:1.8">

<one-line punchline><br/>
<one-line punchline with **bold**><br/>
<one-line punchline>

<br/>

<small style="opacity:0.6">One small tagline.</small>

</div>

Note:
This is the close. Pause after each line. <What the audience should leave knowing>.

--

<!-- HOWTO: Thank you. Two-column. Stays up during Q&A - Note says so. -->
## Thank you

<div style="display:flex;gap:3rem;align-items:center;justify-content:center;margin-top:2rem">

<div>

**Muhammad Ahsan Ayaz**

🌐 codewithahsan.dev<br/>
🐦 @codewith_ahsan<br/>
💼 linkedin.com/in/ahsanayaz

</div>

<div style="font-size:0.9em">

**Code from today:**<br/>
github.com/AhsanAyaz/<br/><repo-name>

<br/>

<small>Q&A - ask me anything</small>

</div>

</div>

Note:
Keep this slide up during Q&A. Don't replace it with a "Questions?" slide - that's dead air. Let people scan the URL while walking up to the mic.
```

## Length tuning

- **20-min talk:** ≈ 40-60 slide breaks (counting `--` and `---`)
- **30-min talk:** ≈ 60-80 breaks, add a Part 5 (Lessons learned) and a "what you can build this weekend" cards slide
- **Lightning (10-min):** drop the Whoami, drop the cheat sheet, keep one Part section, keep the close

## Per-section timing rule of thumb

- Title + QR + nano-banana + Whoami: 2-3 min total
- Problem framing + mental model: 3-4 min
- Each Part: 3-5 min
- Pitfalls + cheat sheet + what's next: 2-3 min
- Close + thank you: 1-2 min
