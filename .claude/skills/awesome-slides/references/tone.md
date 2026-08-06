# Tone & Voice Guide

The goal: a deck that sounds like it came from the same speaker as `zero-to-agentic-orchestra.md` and `from-zero-to-travel-agent.md`. If a slide could appear in a generic vendor keynote, it's wrong.

## Voice principles

### Anti-hype, opinionated, brutally honest

| Don't write | Write instead |
|-------------|---------------|
| "AI agents represent an exciting new paradigm" | "Most 'agents' are a chatbot + a system prompt + vibes" |
| "Leveraging the power of LLMs" | "The model decides when to call the tool. We didn't tell it to." |
| "It is important to consider security implications" | "Pin your model version in production. `gemini-flash-latest` is fine in dev. Disaster in prod." |
| "The future of development is exciting" | "You don't need permission, a research budget, or a PhD to build a real AI agent today" |

The speaker has done this in production. The deck assumes the audience has been burned by hype before and is allergic to it. Earn trust by being specific and skeptical.

### The pivot is load-bearing, the em dash is not

The voice pivots mid-sentence to qualify or land the consequence. Keep that rhythm, but write it with a **spaced hyphen** ` - `, never an em dash or en dash.

**No em dashes (`—`) or en dashes (`–`) in any authored copy.** This is a house rule across every published surface: slides, speaker notes, articles, video metadata, social. It is not a stylistic preference to weigh against the voice, it is a hard constraint. A spaced hyphen carries the same pivot, so nothing is lost.

> "Three things landed in the last 12 months - and combined, they collapse the time from idea to working agent by an order of magnitude."

> "Custom tools are great when you control the data source - but what about the rest of the internet?"

> "MCP servers are processes. Treat them like services - health checks, timeouts, restarts."

### Practical present tense, casual contractions

- "We're shipping something today." ✅ Not "We will explore..."
- "Don't pseudocode." ✅ Not "It is recommended to avoid pseudocode."
- "You'll hit this. Save the slide." ✅ Not "Practitioners may encounter this."

### Specific over abstract

- "About 50 lines of TypeScript" ✅ Not "a minimal amount of code"
- "Three web searches that don't depend on each other" ✅ Not "independent tasks"
- "Stockholm to Paris, one night, budget below €200" ✅ Not "a hotel search query"
- "I had a production agent quietly change behavior overnight because the latest tag rolled forward" ✅ Not "Version pinning matters"

### Litmus tests and stress sentences

Signature device: a single sentence the audience can imagine typing, that exposes every gap.

> _"Plan a marketing campaign for my new app. Research trends, write messaging, draft ad copy, suggest visuals, and format a brief."_

> _"Hi, I'd like to book a hotel in Paris for tomorrow evening, one night. Budget below €200."_

The slide then unfolds what *should* happen (fragmented bullets) followed by what *actually* happens (a single `❌` line). This is the most reliable Ahsan setup-and-payoff pattern.

### Don't moralize, don't disclaim

- No "remember to be ethical"
- No "AI is powerful, use responsibly"
- No "your mileage may vary"
- No "this is just my opinion" - the whole deck is opinion. State it.

## Sentence rhythm

### Vary length deliberately

> "This is a working agent. Five lines. Tools, model, instruction, done."

Short sentences land. Use 2-3 in a row when the line matters.

### Fragments are fine

> "One prompt. One model. One shot."

> "Custom tools, MCP, GOOGLE_SEARCH. All in one agent. All in TypeScript."

### Parenthetical asides for honesty

> "It's not a toy or a demo framework (it's what Google uses internally)."

> "Boring use case, exciting capabilities."

## Slide titles

- Title-case the main heading; sentence-case the body.
- Use backticks for class names, file names, code symbols: `LlmAgent`, `output_key`, `agent.ts`.
- Section headings can be questions: "What is Google ADK?", "What just happened?"
- Pitfall headings start with `⚠️` and are short: "⚠️ The parallel pitfall", "⚠️ Loop pitfalls".

## Speaker note voice

Notes are the **spoken script**: the words Ahsan says, in his own first person voice, same register as the rest of this guide. Directions he acts on rather than speaks go in *asterisks*. Don't repeat the slide content. Full guide in `speaker-notes.md`.

> Note:
> And here's the demo moment.
>
> *Open adk web, submit a spec, then switch between the State and Events tabs.*
>
> Watch the state keys appear one by one as each agent finishes. That's the wire, made visible.

> Note:
> I'm Ahsan, GDE in AI and Angular, and I build production AI agents.
>
> Let's go.
>
> *Five seconds. Don't read the slide.*

> Note:
> Real talk: every time I demo MCP for the first time on a new machine, one of these three things bites me.
>
> If you only remember three things from this talk, remember these.

## Bad smells (signs the draft has drifted)

- "Let's explore..." / "Let's dive into..." - cut.
- "It's important to note that..." - cut. State the thing.
- "In conclusion..." - cut. The close handles the conclusion.
- "Many developers struggle with..." - replace with a concrete example.
- Bullet that's a complete sentence with a period - usually it can be trimmed to a noun phrase.
- Three slides in a row with no code, no image, no fragment - break it up.
- Speaker notes that paraphrase the slide, or that instruct rather than speak - rewrite them as the words to say.

## When in doubt

- Cut a sentence.
- Add a specific number or name.
- Replace the abstract noun with what it actually is in code.
- Ask: would Ahsan say this with a straight face on stage?
