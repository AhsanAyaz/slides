<!--
Talk: From Zero to Travel Agent
Speaker: Muhammad Ahsan Ayaz (GDE in AI & Angular)
Event: GDG Stockholm, May 2026
Format: 30 minutes, reveal.js markdown
Separators: `---` horizontal, `--` vertical
-->

# From Zero to Travel Agent

### Building Real AI Agents with Google ADK, MCP, and Gemini CLI

<small>Muhammad Ahsan Ayaz · GDE in AI & Angular</small><br/>
<small>GDG Stockholm · May 2026</small>

Note:
Welcome. 30 minutes. By the end, you'll have seen a real working agent built end-to-end in TypeScript, and more importantly, you'll know exactly how to build your own. No theory dumps. No "agentic AI is the future" slides. We're shipping something today.

---

## The room test

Quick show of hands.

> Who has **used** an AI agent this week?

> Who has **built** one?

> Who has built one that does something **actually useful** ... not a demo?

Note:
The gap between hands 1 and 3 is the entire reason for this talk. Most people use agents. Many have built one. Almost nobody has built one that survives contact with reality. Today we close that gap.

---

## Whoami

<div style="display:flex;gap:2rem;align-items:center">
<div style="flex:2">

**Muhammad Ahsan Ayaz**

- GDE in AI & Angular
- Software Architect
- 4x Author, 14M+ OSS installs
- Runs codewithahsan.dev (4,600+ devs)

</div>
<div style="flex:1;text-align:center">
<small>That guy who keeps showing up<br/>at GDG events</small>
</div>
</div>

Note:
Five seconds. Don't read the slide. Just say: "I'm Ahsan, I'm a GDE in AI and Angular, I run a community of about 4,600 developers, and I build things in production with the tools I'm about to show you." Move on.

---

# Part 1
## Why agents (and why most of them are bad)

Note:
This section is 3 minutes. We're going to be brutally honest about why most "agents" we see in demos don't survive in the real world.

--

## The agent illusion

<div style="font-size:1.2em;text-align:center;margin-top:2rem">

Most "AI agents" are just<br/>
**a chatbot + a system prompt + vibes**.

</div>

Note:
You've all seen them. The Twitter demos. The LinkedIn carousels. "I built an agent that does X in 50 lines of code." Beautiful. But ask it to do something it wasn't scripted for, and it falls apart. Why? Because there's no real agency. It's a fancy prompt with a hopeful tone.

--

## What an agent actually needs

```mermaid
graph LR
    A[An agent] --> B[Reasoning<br/>the model]
    A --> C[Tools<br/>to act on the world]
    A --> D[Context<br/>what it knows right now]
    A --> E[Loops<br/>try, observe, retry]

    style A fill:#4285F4,color:#fff
    style B fill:#EA4335,color:#fff
    style C fill:#FBBC04,color:#000
    style D fill:#34A853,color:#fff
    style E fill:#9AA0A6,color:#fff
```

Note:
This is the bare minimum. A real agent reasons (model), acts (tools), maintains context (sessions), and loops (observe, retry). Take any one of these out and you don't have an agent ... you have a parlor trick. The frameworks exist precisely because wiring all four together by hand is painful and error-prone.

--

## So what changed?

Three things landed in the last 12 months:

<div style="display:flex;gap:1.5rem;margin-top:2rem">
<div style="flex:1;padding:1rem;border:2px solid #4285F4;border-radius:8px">
<h3 style="color:#4285F4">ADK</h3>
A real framework for building agents in TypeScript
</div>
<div style="flex:1;padding:1rem;border:2px solid #EA4335;border-radius:8px">
<h3 style="color:#EA4335">MCP</h3>
A standard way to give agents new capabilities
</div>
<div style="flex:1;padding:1rem;border:2px solid #34A853;border-radius:8px">
<h3 style="color:#34A853">Gemini CLI</h3>
A coding co-pilot that lives in your terminal
</div>
</div>

Note:
These three together are why I'm giving this talk now and not a year ago. Individually they're useful. Combined, they collapse the time from "I have an idea" to "I have a working agent" by an order of magnitude. We're going to use all three today.

---

# Part 2
## The stack, in plain English

Note:
Two minutes per piece. Quick, clear, no marketing fluff. You should walk out knowing exactly what each one does and where it fits.

--

## ADK in one slide

**Agent Development Kit** ... Google's open-source framework for building agents.

```typescript
import { LlmAgent, GOOGLE_SEARCH } from '@google/adk';

const agent = new LlmAgent({
  name: 'researcher',
  model: 'gemini-flash-latest',
  instruction: 'You help users research topics thoroughly.',
  tools: [GOOGLE_SEARCH],
});
```

<small>That's a working agent. Five lines. Tools, model, instruction, done.</small>

Note:
This is the entire mental model. An LlmAgent is: a name, a model, an instruction (its system prompt), and a list of tools. Everything else we'll cover today is just adding more tools to that list. That's it. The framework handles the loop, the context, the streaming, the tool dispatch. You handle the ideas.

--

## MCP in one slide

**Model Context Protocol** ... think of it as **USB for AI agents**.

```mermaid
graph LR
    A[Your Agent] -->|speaks MCP| B[MCP Server]
    B --> C[Airbnb]
    B --> D[Filesystem]
    B --> E[GitHub]
    B --> F[Whatever]

    style A fill:#4285F4,color:#fff
    style B fill:#EA4335,color:#fff
```

Anyone can publish an MCP server. Your agent gets new powers without you writing the integration.

Note:
Before MCP, every framework had its own tool format. Want your LangChain tool to work with ADK? Rewrite it. Want it to work with Claude Desktop? Rewrite it again. MCP fixes that. One protocol. Write once, run anywhere. The Airbnb MCP server we'll use today wasn't built for ADK. It wasn't built for Gemini. It just speaks MCP, and that's enough.

--

## Gemini CLI in one slide

A **terminal-based AI coding assistant** that reads your codebase, runs commands, and edits files.

<div style="display:flex;gap:1.5rem;margin-top:1.5rem">
<div style="flex:1">

**It's not just chat.** It can:

- Read the whole ADK docs locally
- Edit your `agent.ts` for you
- Run `npm install` and check the output
- Course-correct when things break

</div>
<div style="flex:1">

**Why it matters here:**

We'll use Gemini CLI as our pair programmer through every step. No "let me copy-paste from the docs". The CLI does that for us.

</div>
</div>

Note:
Gemini CLI is the secret weapon here. Yes, you can build the agent without it. But the workflow we'll show in part 4 ... where Gemini CLI reads the ADK source, proposes changes, and we just say "yes" or "no" ... that's the actual experience of building agents in 2026. If you're still tab-tab-tabbing through autocomplete, you're working too hard.

---

# Part 3
## Let's build it

Note:
This is the meat of the talk. About 15 minutes. Four steps. Each step adds one capability to our agent. Each step is a self-contained "before and after" so you can see exactly what each piece buys you.

--

## The mission

Build a **travel agent** that can:

1. Have a conversation about travel
2. Know what time it is (sounds trivial; it isn't)
3. Search the web for real, current info
4. Find actual Airbnb listings

All in **TypeScript**. All in about 50 lines of code.

Note:
Trivial sounding goals on purpose. The point of this talk isn't "look at the cool thing I built." It's "look at the cool thing YOU can build, in a workshop afternoon, with these tools." Boring use case, exciting capabilities.

--

## Setup (30 seconds)

```bash
mkdir travel-agent && cd travel-agent
npm init -y
npm pkg set type="module"
npm pkg set main="agent.ts"

# the SDK + dev tools
npm install @google/adk
npm install -D @google/adk-devtools

# your API key
echo "GOOGLE_API_KEY=your_key_here" > .env
```

Get the API key at **aistudio.google.com**.

Note:
30 seconds, literally. Get the API key from AI Studio (free tier is generous), set up the env file, npm install. The dev tools give us `adk run` and `adk web` for interactive testing. We'll use both today.

---

## Step 1
### A basic agent

Note:
We start with the absolute minimum. No tools. Just a model with a personality.

--

## `agent.ts` ... v1

```typescript
import { LlmAgent } from '@google/adk';

export const rootAgent = new LlmAgent({
  name: 'travel_basic',
  model: 'gemini-2.5-flash',
  description: 'A basic travel assistant.',
  instruction: `You are a helpful travel assistant.
    You can help with general travel advice
    based on your knowledge.`,
});
```

<small>That's the whole file. Run it: `npx adk run .`</small>

Note:
This is a working agent. Run it, ask it about Stockholm, it'll tell you about Gamla Stan and the archipelago. Cool. But notice what's missing: it has no idea what TODAY is. Its knowledge was frozen when the model was trained. Watch what happens when we test that.

--

## The litmus test

> *"Hi, I'd like to book a hotel in Paris for tomorrow evening, one night. Budget below €200."*

<br/>

What we want:

1. Agent recognizes "tomorrow" needs **today's date**
2. Agent recognizes it needs to **search hotels live**
3. Agent returns **real, bookable options**

What we get:

❌ Hallucinated dates, fake hotels, vibes-based prices.

Note:
This is the litmus test from the original codelab and it's brilliant. One sentence stress-tests the entire system. The agent fails it. Why? Because we gave it zero tools. It can talk about travel; it can't DO travel. That's the gap we close in step 2, 3, and 4.

---

## Step 2
### Give it a tool

Note:
The smallest possible tool: tell me what time it is. Stupid problem. Reveals everything about how tools work in ADK.

--

## `agent.ts` ... v2

```typescript
import { FunctionTool, LlmAgent } from '@google/adk';
import { z } from 'zod';

const now = new FunctionTool({
  name: 'now',
  description: 'Returns the current date and time.',
  parameters: z.object({}),
  execute: () => ({
    status: 'success',
    currentTime: new Date().toISOString(),
  }),
});

export const rootAgent = new LlmAgent({
  name: 'travel_agent',
  model: 'gemini-2.5-flash',
  instruction: 'You are a helpful travel assistant.',
  tools: [now],   // <-- the only line that matters
});
```

Note:
Three things to notice. One: tools are just typed functions. Zod for the schema, a function for the execute. ADK handles the rest. Two: the agent now has a list of tools. That list is going to grow. Three: the model decides when to call the tool. We don't write "if user says tomorrow, call now()". Gemini figures that out from the description.

--

## What just happened

```mermaid
sequenceDiagram
    participant U as User
    participant A as Agent
    participant T as now() tool

    U->>A: "Book a hotel for tomorrow"
    A->>A: I need today's date
    A->>T: now()
    T-->>A: 2026-05-14T10:00:00Z
    A->>A: tomorrow = 2026-05-15
    A-->>U: "Looking for May 15..."
```

The model **decided** to call the tool. We didn't tell it to.

Note:
This is the critical mental shift. You don't write logic that calls tools. You give the model tools and a description, and it decides. This is what makes it an agent and not a workflow. If you're writing if-statements about when to call tools, you're not building an agent ... you're building a state machine that happens to use an LLM.

---

## Step 3
### Plug it into the real world

Note:
Custom tools are great when you control the data source. But what about the rest of the internet? Enter built-in tools.

--

## `agent.ts` ... v3

```typescript
import { LlmAgent, GOOGLE_SEARCH } from '@google/adk';

export const rootAgent = new LlmAgent({
  name: 'travel_agent',
  model: 'gemini-2.5-flash',
  instruction: `You are a travel agent.
    Your job is to help the user plan a trip.
    You have access to a search engine.
    If you don't know the answer, use the search engine.
    When you are done, reply with "DONE".`,
  tools: [GOOGLE_SEARCH],
});
```

<small>One import. One line in `tools`. The agent can now read the live web.</small>

Note:
GOOGLE_SEARCH is a first-class tool in ADK. No API key wrangling, no rate-limit handling, no scraping. The model gets grounded responses with citations. This is what people mean by "grounding" in the AI literature ... your model's answers are anchored in real, retrievable sources. Without it, you're trusting whatever your model memorized at training time.

--

## ⚠️ Caveat

In Gemini 2.x, you can't mix `GOOGLE_SEARCH` with custom tools in the **same agent**.

<br/>

Two ways out:

1. Use **separate agents** with sub-agent delegation
2. Wait for Gemini 3 (already supports it)
3. Use **MCP** for external data (which is where we're going next anyway)

<small><a href="https://github.com/palladius/adk-gemini-cli-workshop">See workshop README for the workaround</a></small>

Note:
This bit me hard the first time. You assume tools just compose. They don't, in current Gemini 2.x. The honest answer is: you'll hit this, design around it, and it'll be fixed in Gemini 3. The community is aware. The workaround using sub-agents is documented in the repo. Don't let this stop you.

---

## Step 4
### MCP, where it gets interesting

Note:
This is the moment where the agent stops being a chatbot with extra steps and starts being something genuinely capable. MCP is the "USB" moment for agents.

--

## What MCP unlocks

Without MCP, every integration is **bespoke code you write**.

<br/>

With MCP, you get:

- Filesystem access (one server)
- GitHub (one server)
- Slack (one server)
- Airbnb (one server)
- ... and ~hundreds more

You don't write the integration. You **plug in** the server.

Note:
Before MCP, integrating Airbnb meant: read the Airbnb API docs, write OAuth, write request handling, write the schema, expose it as a tool. Days of work, per integration. With MCP, someone else did all that. They published the server. You add 4 lines of config. Done. This is the same productivity jump as going from raw `fetch()` calls to using an SDK.

--

## `agent.ts` ... v4

```typescript
import 'dotenv/config';
import { LlmAgent, MCPToolset } from '@google/adk';

const airbnb = new MCPToolset({
  connectionParams: {
    command: 'npx',
    args: [
      '-y',
      '@openbnb/mcp-server-airbnb',
      '--ignore-robots-txt',
    ],
  },
});

export const rootAgent = new LlmAgent({
  name: 'travel_agent',
  model: 'gemini-2.5-flash',
  instruction: `You are a helpful travel assistant.
    Use the Airbnb tools to find accommodation.`,
  tools: [airbnb],
});
```

Note:
That's it. Eight lines of MCP config. The MCPToolset handles: starting the server process, discovering its tools, converting their schemas to ADK format, proxying calls back and forth, and shutting it down cleanly. We didn't write a single line of Airbnb-specific code.

--

## Under the hood

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant A as ADK Agent
    participant M as MCPToolset
    participant S as Airbnb MCP Server

    U->>A: "Find a place in Stockholm, May 14"
    A->>M: discover tools
    M->>S: list_tools (MCP)
    S-->>M: [airbnb_search, airbnb_listing_details]
    M-->>A: ADK BaseTools
    A->>M: call airbnb_search(...)
    M->>S: call_tool (MCP)
    S-->>M: real listings
    M-->>A: results
    A-->>U: "Here are 3 options under €200..."
```

Note:
Walk through this once on stage. The agent doesn't know it's talking to Airbnb. It just knows it has tools called airbnb_search and airbnb_listing_details. The MCPToolset is the translator in the middle. This abstraction is why the same agent code can work with any MCP server tomorrow without changes.

--

## ⚠️ Pitfalls I hit

<div style="font-size:0.9em">

**1. Default timeout is too short**

```typescript
// Airbnb can take ~15s on first call; bump the timeout
new MCPToolset({
  connectionParams: { command: 'npx', args: [...] },
  timeout: 30,  // seconds
});
```

**2. Pin the MCP server version**

```typescript
args: ['-y', '@openbnb/mcp-server-airbnb@0.1.2', '--ignore-robots-txt']
```

**3. `npx` needs to actually be on the PATH**

Cloud Shell? Fine. Some corp laptops? Pain.

</div>

Note:
Real talk: every time I demo MCP for the first time on a new machine, ONE of these three things bites me. Timeouts, version drift, npx availability. If you only remember three things from this talk, remember these. Save the slide.

---

# Part 4
## The Gemini CLI co-pilot loop

Note:
3 minutes. This is the meta-section: how I actually built this thing, and how you should too.

--

## I didn't write this from scratch

I opened the project and asked Gemini CLI:

> *"Read the ADK TypeScript docs in `./rag/`. Look at my current `agent.ts`. Add an Airbnb MCP server tool. Show me the diff before applying."*

It read the docs. Read my code. Proposed a change. I approved.

Note:
This is the workflow shift. I didn't open ten browser tabs of documentation. I didn't context-switch to Stack Overflow. The CLI had local copies of the ADK docs (we mirror them with download-adk.sh, see the repo). It read what it needed. It proposed a code change with the diff highlighted. I either approved or said "no, do it differently." That's the loop.

--

## The vibe-coding loop

```mermaid
graph LR
    A[I describe<br/>what I want] --> B[Gemini CLI<br/>reads docs + code]
    B --> C[Proposes a diff]
    C --> D{I review}
    D -->|yes| E[Apply + test]
    D -->|no| F[Refine the ask]
    F --> B
    E --> G[Next feature]

    style A fill:#4285F4,color:#fff
    style C fill:#FBBC04,color:#000
    style E fill:#34A853,color:#fff
```

Note:
This is "vibe coding" done responsibly. You're still the engineer. You still review every diff. But you've offloaded the boring parts: navigating docs, remembering APIs, writing boilerplate. The CLI is a junior dev who never gets tired, never forgets the docs, and asks clarifying questions when stuck.

--

## What this changes

<div style="font-size:1.1em;text-align:center;margin-top:2rem">

The bottleneck for building agents<br/>
isn't <strike>knowing the framework</strike>.

It's **knowing what to build**.

</div>

Note:
This is the punchline. A year ago, the bottleneck was learning ADK, learning MCP, learning the SDKs. Today, with the CLI as a co-pilot, the bottleneck shifts to ideas and judgment. That's a much better problem to have. It also means: stop reading framework docs cover-to-cover. Start building. The CLI will fill in the gaps.

---

# Part 5
## What I learned

Note:
3 minutes. The honest stuff. The things you don't get from blog posts.

--

## Five lessons from production

<div style="font-size:0.95em">

**1. Start with one tool. Add tools one at a time.**
Multi-tool agents fail in confusing ways; isolate the failure.

**2. Treat the agent's instruction like a system prompt for a junior dev.**
Specific, with examples, with edge cases.

**3. Log everything.**
Agent reasoning is opaque. Logs are your only window in.

**4. Pin your model version in production.**
"gemini-flash-latest" is fine in dev. Disaster in prod.

**5. MCP servers are processes. Treat them like services.**
Health checks, timeouts, restarts. The whole nine.

</div>

Note:
Walk through these one at a time. Each is a 30-second story you've actually lived. #4 especially: I had a production agent quietly change behavior overnight because the latest tag rolled forward. Pin your versions.

--

## What you can build (this weekend)

<div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:1.5rem">

<div style="flex:1;min-width:250px;padding:1rem;border-left:4px solid #4285F4">
<strong>A code review agent</strong><br/>
<small>GitHub MCP + your style guide</small>
</div>

<div style="flex:1;min-width:250px;padding:1rem;border-left:4px solid #EA4335">
<strong>A meeting prep agent</strong><br/>
<small>Calendar MCP + Gmail MCP + GOOGLE_SEARCH</small>
</div>

<div style="flex:1;min-width:250px;padding:1rem;border-left:4px solid #34A853">
<strong>A doc Q&A agent</strong><br/>
<small>Filesystem MCP + your team's wiki</small>
</div>

<div style="flex:1;min-width:250px;padding:1rem;border-left:4px solid #FBBC04">
<strong>A SaaS expense auditor</strong><br/>
<small>Stripe MCP + your CSV of subscriptions</small>
</div>

</div>

Note:
The point of these examples: every single one is the same five-line LlmAgent we built today, plus a different MCP server. The SAME architecture. That's the leverage. Once you've built one, you've built them all.

---

# Part 6
## Take it home

Note:
2 minutes. Resources, code, where to find me.

--

## Resources

<div style="font-size:0.95em">

📖 **ADK TypeScript docs**
adk.dev/get-started

💻 **Workshop repo (Python; TS port in progress)**
github.com/palladius/adk-gemini-cli-workshop

🔌 **MCP server directory**
modelcontextprotocol.io/servers

🛠️ **Gemini CLI**
github.com/google-gemini/gemini-cli

🤖 **Sample agents (TypeScript)**
github.com/google/adk-samples

</div>

Note:
All of this is free. All of this works today. If you take notes on one slide, take notes on this one. Or just... grab the photo with your phone like everyone else.

--

## The one thing I want you to remember

<div style="font-size:1.3em;text-align:center;margin-top:2.5rem;line-height:1.6">

You don't need permission,<br/>
a research budget,<br/>
or a PhD<br/>
to build a real AI agent today.

<br/>

You need <strong>30 minutes</strong>,<br/>
a <strong>terminal</strong>,<br/>
and the <strong>willingness to start</strong>.

</div>

Note:
This is the close. Slow it down. Pause between lines. The audience came in thinking agents are hard. They're leaving knowing agents are five lines of TypeScript plus the right tools. That's the gift. Hand them the torch.

--

## Thank you, Stockholm 🇸🇪

<div style="display:flex;gap:3rem;align-items:center;justify-content:center;margin-top:2rem">

<div>

**Muhammad Ahsan Ayaz**

🌐 codewithahsan.dev<br/>
🐦 @codewithahsan<br/>
💼 linkedin.com/in/muhammadahsanayaz

</div>

<div style="font-size:0.9em">

**Slides + code:**<br/>
github.com/ahsanayaz/<br/>gdg-stockholm-2026

<small>Q&A time</small>

</div>

</div>

Note:
Last slide on screen during Q&A. Don't fade it out. Don't put a "Questions?" slide ... that's dead air. Keep contact + repo visible so people can scan, follow, fork, while they're walking up to the mic.
