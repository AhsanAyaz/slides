# Speaker Notes Guide

Every content slide gets a `Note:` block. Notes are stage cues for Ahsan, written in second person. They are **not** narration — the audience never sees them, so don't echo what's on the slide.

## Format

```markdown
Note:
<First line: what to do or say, briefly>. <Second: why this slide matters or what the audience should leave with>. <Optional third: a specific production story, stage direction, or audience interaction>.
```

Single paragraph. No bullet list inside the Note (the reveal.js speaker view shows it as a chunk). Two to five sentences. Longer than that, the speaker won't read it under stage lights.

## What goes in a Note

- **Timing** — "3 minutes per piece" / "Don't spend more than 90 seconds here" / "Five seconds, don't read the slide"
- **Stage direction** — "Point at the output_key chain" / "Open adk web live, submit a topic" / "Pause after each line"
- **Audience interaction** — "Ask the audience: has anyone tried..." / "Show of hands"
- **Production story** — "I had a production agent quietly change behavior overnight..." / "Real talk: every time I demo MCP on a new machine, ONE of these three things bites me"
- **The reason this slide exists** — "This is THE concept of the talk" / "Save this one"
- **Transition cue** — "Move to the next slide and watch the State tab"

## What does NOT go in a Note

- Restating what's already on the slide
- "In this slide we will discuss..." — Ahsan already knows
- Generic advice like "Make eye contact with the audience"
- Long backstory the audience hears anyway

## Examples (verbatim from existing decks)

**Title slide:**

> Note: Welcome. 30 minutes. By the end, you'll have seen a real working agent built end-to-end in TypeScript, and more importantly, you'll know exactly how to build your own. No theory dumps. No "agentic AI is the future" slides. We're shipping something today.

**Code slide pointing at one line:**

> Note: Three things to notice. One: tools are just typed functions. Zod for the schema, a function for the execute. ADK handles the rest. Two: the agent now has a list of tools. That list is going to grow. Three: the model decides when to call the tool. We don't write "if user says tomorrow, call now()". Gemini figures that out from the description.

**Pitfall slide:**

> Note: This is the single most common ParallelAgent bug. No error is raised. One result just disappears. The fix is always the same: give every parallel branch a unique output_key. Point at this slide and say "save this one."

**Demo moment:**

> Note: This is the demo moment for SequentialAgent. Open adk web. Submit a spec. Then switch between State and Events tabs. The audience should see the state keys appear one by one as each agent finishes. This makes the "wire" concept tangible.

**Section opener:**

> Note: 3 minutes. This is the meta-section: how I actually built this thing, and how you should too.

**Whoami:**

> Note: Five seconds. Don't read the slide. Just say: "I'm Ahsan, I'm a GDE in AI and Angular, I run a community of about 4,600 developers, and I build things in production with the tools I'm about to show you." Move on.

**Close:**

> Note: This is the close. Slow it down. Pause between lines. The audience came in thinking agents are hard. They're leaving knowing agents are five lines of TypeScript plus the right tools. That's the gift. Hand them the torch.

**Thank you:**

> Note: Last slide on screen during Q&A. Don't fade it out. Don't put a "Questions?" slide — that's dead air. Keep contact + repo visible so people can scan, follow, fork, while they're walking up to the mic.

## When you don't have a real production story

If you're drafting a Note and don't have a real story to anchor it, write the stage direction and *flag it* in the note for Ahsan to fill in:

```markdown
Note:
<TODO Ahsan: insert your story about <topic> here>. Point at <X>. The audience should leave knowing <Y>.
```

Don't fabricate stories. Don't write "I once saw a team..." unless it actually happened.

## Quick checklist before saving a slide

- [ ] Note starts with action or timing, not "This slide..."
- [ ] Note doesn't repeat the slide title verbatim
- [ ] Note tells Ahsan what to *do* (point, pause, click, open, ask)
- [ ] Note ≤ 5 sentences
- [ ] Specific, not generic — references a named concept, line of code, or audience moment
