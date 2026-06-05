# Reusable Snippets

Paste-ready blocks for the common slide shapes. Each block notes which deck it came from so you can read the original in context.

---

## 1. Metadata header

```markdown
<!--
title: Full Talk Title
date: 2026-MM-DD
venue: Conference / meetup
tags: AI, Agentic, Angular
description: One-sentence summary.
-->
```

## 2. Title slide

```markdown
# Talk Title

### subtitle / hook line

<small>Muhammad Ahsan Ayaz · GDE in AI & Angular</small><br/>
<small>Venue · Year</small>

Note:
N minutes. By the end of this talk you'll <thesis>. <One sentence on demo posture>.
```

Variant with a venue logo (see `zero-to-agentic-orchestra-tidb.md`):

```markdown
# Talk Title

### subtitle

<img src="assets/images/<slug>/venue-logo.png" alt="Venue Logo" style="height: 80px; margin: 20px auto;" />

<small>Muhammad Ahsan Ayaz · GDE in AI & Angular</small><br/>
```

## 3. QR slide

```markdown
<img src="assets/images/<slug>/qr-code.png" alt="Session QR"/>
<!-- .element style="height: 400px" -->

- All links related to this session
- Feedback form
- My socials
```

## 4. Nano-banana cascade (signature opener)

See full block in `references/skeleton.md` — paste verbatim. Don't trim. The cascade is:

1. "Who here likes <topic>? 🙋"
2. "Who here uses <topic> for just X? 🙋"
3. "Do you know what I try to use <topic> for?"
4. Drawing image
5. Prompt fragment
6. Generated image 1
7. Drawing + prompt + Ahsan PFP composition
8. Generated images 2–4

## 5. Whoami

```markdown
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
```

There's also a richer profile partial at `talks/profiles/ahsan.md` if the deck wants the full intro with award images.

## 6. Two-column red/green comparison

```markdown
<div style="display:flex;gap:2rem;align-items:center;margin-top:1rem">
<div style="flex:1;text-align:center;padding:1.5rem;border:2px solid #EA4335;border-radius:8px">
<strong style="color:#EA4335">Before</strong><br/>
<small>Three lines<br/>describing the bad<br/>state.</small>
</div>
<div style="flex:0;font-size:2rem;opacity:0.4">→</div>
<div style="flex:1;text-align:center;padding:1.5rem;border:2px solid #34A853;border-radius:8px">
<strong style="color:#34A853">After</strong><br/>
<small>Three lines<br/>describing the better<br/>state.</small>
</div>
</div>
```

## 7. Three-column tinted cards (Google colors)

```markdown
<div style="display:flex;gap:1.5rem;margin-top:2rem">
<div style="flex:1;padding:1rem;border:2px solid #4285F4;border-radius:8px" class="fragment">
<h3 style="color:#4285F4">Thing 1</h3>
One-sentence description.
</div>
<div style="flex:1;padding:1rem;border:2px solid #EA4335;border-radius:8px" class="fragment">
<h3 style="color:#EA4335">Thing 2</h3>
One-sentence description.
</div>
<div style="flex:1;padding:1rem;border:2px solid #34A853;border-radius:8px" class="fragment">
<h3 style="color:#34A853">Thing 3</h3>
One-sentence description.
</div>
</div>
```

## 8. Border-left list of cards (with 4th yellow option)

```markdown
<div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:1.5rem">

<div style="flex:1;min-width:250px;padding:1rem;border-left:4px solid #4285F4" class="fragment">
<strong>Idea 1</strong><br/>
<small>Stack note</small>
</div>

<div style="flex:1;min-width:250px;padding:1rem;border-left:4px solid #EA4335" class="fragment">
<strong>Idea 2</strong><br/>
<small>Stack note</small>
</div>

<div style="flex:1;min-width:250px;padding:1rem;border-left:4px solid #34A853" class="fragment">
<strong>Idea 3</strong><br/>
<small>Stack note</small>
</div>

<div style="flex:1;min-width:250px;padding:1rem;border-left:4px solid #FBBC04" class="fragment">
<strong>Idea 4</strong><br/>
<small>Stack note</small>
</div>

</div>
```

## 9. Litmus test slide

```markdown
## The litmus test

> _"<one-sentence user query that stress-tests the system>"_

What we want: <!-- .element: class="fragment" -->

1. <expected behavior 1>
<!-- .element: class="fragment" -->

2. <expected behavior 2>
<!-- .element: class="fragment" -->

3. <expected behavior 3>
<!-- .element: class="fragment" -->

❌ What we get: <one-sentence failure>. <!-- .element: class="fragment" -->

Note:
Stress-tests the entire system in one sentence. <Why this query was chosen>.
```

## 10. Failure mode list

```markdown
## Everything, all at once

- <failure 1>
<!-- .element: class="fragment" -->

- <failure 2>
<!-- .element: class="fragment" -->

- <failure 3>
<!-- .element: class="fragment" -->

- <failure 4>
<!-- .element: class="fragment" -->

Note:
Each one is a real production failure mode. The solution isn't a better prompt — it's <thesis>.
```

## 11. Code slide with arrow-comment + caption

````markdown
## `<concept>` in code

```python
from foo import Thing

thing = Thing(
    name="critical",
    important_field="...",  # <-- the only line that matters
)
```

<small>That's a working <concept>. Run it: `<one-liner>`.</small>

Note:
Three things to notice. One: <X>. Two: <Y>. Three: <Z>.
````

## 12. BAD / GOOD pitfall block

````markdown
## ⚠️ The <thing> pitfall

**<One-sentence rule>.**

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
This is the single most common <pitfall> bug. No error is raised. Point at this slide and say "save this one."
````

## 13. Parameters/options table

```markdown
| Parameter | Purpose |
|-----------|---------|
| `name`    | Unique identifier |
| `field`   | **The one that matters** |
```

For long tables, prefix the slide with `<!-- .slide: style="font-size: 0.8em;" -->`.

## 14. Patterns cheat sheet

```markdown
<!-- .slide: style="font-size: 0.8em;" -->

## Patterns cheat sheet

| Pattern | Primitive | When to use |
|---------|-----------|-------------|
| **Sequential pipeline** | `Foo` | Fixed order, each step reads previous |
| **Fan-out / gather** | `Bar` inside `Baz` | Independent tasks, then synthesize |
| **Iterative refinement** | `Loop` + exit tool | Self-correction loops |
```

## 15. Common pitfalls numbered list

```markdown
<!-- .slide: style="font-size: 0.8em;" -->

## Common pitfalls

1. **<Pitfall 1>** — <one-line consequence>
<!-- .element: class="fragment" -->

2. **<Pitfall 2>** — <one-line consequence>
<!-- .element: class="fragment" -->

3. **<Pitfall 3>** — <one-line consequence>
<!-- .element: class="fragment" -->

Note:
Go through these quickly. Each is a real failure mode. #<N> is the most insidious — <why>.
```

## 16. What's next (two-column)

```markdown
<!-- .slide: style="font-size: 0.8em;" -->

## What's next

**In the framework:**

- `<thing>` — <one-line desc>
<!-- .element: class="fragment" -->

- `<thing>` — <one-line desc>
<!-- .element: class="fragment" -->

**In production:**

- `<thing>` — <one-line desc>
<!-- .element: class="fragment" -->

Note:
Don't spend more than 90 seconds here. Name each thing, one sentence, move on.
```

## 17. "One thing to remember" close

```markdown
## The one thing to remember

<!-- .slide: style="font-size: 0.8em;" -->

<div style="font-size:1.2em;text-align:center;margin-top:2rem;line-height:1.8">

<one-line punchline><br/>
<one-line punchline with **bold thing**><br/>
<one-line punchline>

<br/>

<small style="opacity:0.6">One small tagline.</small>

</div>

Note:
This is the close. Pause after each line.
```

## 18. Thank you slide

```markdown
## Thank you<optional venue flag>

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

<small>Q&A — ask me anything</small>

</div>

</div>

Note:
Keep this slide up during Q&A. Don't replace it with a "Questions?" slide — that's dead air.
```

## 19. Image sizing patterns

```markdown
![Caption](path.png) <!-- .element: style="width: 50%;" -->

![Caption](path.png) <!-- .element: style="width: 30%; margin: auto;" -->

![Caption](path.png)
<!-- .element: style="height: 500px" -->
```

The `style="height: 500px"` form needs a blank line above the comment. The inline form takes the comment on the same line as the image.

## 20. Inline giphy reaction

```markdown
![what could go wrong](https://media3.giphy.com/media/<id>/giphy.gif)
```

Use sparingly. One reaction per major beat. Always size if the GIF is huge.
