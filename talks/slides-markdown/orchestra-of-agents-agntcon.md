<!--
title: An Orchestra of Agents (AGNTCon + MCPCon Europe, 25-min stage cut)
date: 2026-09-17
venue: AGNTCon + MCPCon Europe, Amsterdam
tags: AI, Agentic, ADK, Production
description: The 25-minute stage cut of the Orchestra of Agents talk - production multi-agent patterns, the MCP truth, and the drain-loop war story with receipts.
-->

# An Orchestra of Agents

### What I learned running a multi-agent system for 5,000+ developers

<small>Muhammad Ahsan Ayaz · GDE in AI & Angular</small><br/>
<small>AGNTCon + MCPCon Europe · Amsterdam · 2026</small>

Note:
Hi, I'm Ahsan. For the past year I've been running a multi-agent system in production for my developer community, and in the next 25 minutes I'll show you the architecture, the real numbers, and the bug I shipped to five thousand people.

By the end you'll know which agent patterns survive contact with real users, and which ones I had to hotfix at eight in the evening.

*Under 20 seconds. Hard budget: 25 minutes total, aim to close at 23. Don't read the slide.*

---

## Scan for Slides & Code 📱

<img src="assets/images/orchestra-of-agents/qr-code.png" alt="Session QR"/>
<!-- .element style="height: 400px" -->

- All links related to this session
- The postmortems I'll be quoting
- My socials

Note:
Everything I show today, including the incident reports, is behind this QR. Scan it now if you want to follow along.

*Ten seconds.*

---

```text
[2026-05-23 19:55] user report:

  Q: "any good repos for Google's Antigravity CLI?"
  A: "dev.to temporarily unavailable."
```

5,000 developers. 16 agents. One `break` statement.

<!-- .element: class="fragment" -->

Note:
Before anything else, a real log line.

*Pause two seconds after the log appears. Say nothing.*

A member of my community asked the bot a normal question. The bot answered with an internal error message from a website the user never mentioned.

Five thousand developers. Sixteen agents. One break statement.

--

## We'll come back to this.

Note:
Hold that thought. By the end of this talk you'll be able to spot the bug yourself.

*Move on briskly.*

---

## Who here runs an AI agent in production? 🙋

--

### Who here runs more than one... talking to each other? 🙋

--

### And who found their worst agent bug from a user's message instead of their telemetry? 🙋

--

![Drawing](assets/images/nano-banana/drawing.png) <!-- .element: style="width: 50%;" -->

prompt:
Generate a super realistic image of a programmer using this drawing. Keep the weird pose as much as realistically possible.

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

<audio data-autoplay src="assets/audio/fahhh.mp3"></audio>

Note:
*The hands question is the segue: "keep your hand up... this talk is for you."*

And this is what I try to use AI for. My kids draw me in impossible poses, and I make Gemini take them seriously.

*Click through fast. Ninety seconds max for the whole opener stack.*

---

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
<small>Also me: shipped a `break`<br/>statement to 5,000 people 😅</small>
</div>
</div>

Note:
I'm Ahsan. GDE in AI and Angular, software architect, and I run the code-with-ahsan community.

The right column is the honest version of this slide.

*Five seconds. Don't read the slide.*

---

## The problem with being the community

> _"How do I start with Angular? Any recent articles worth reading? Also... is anyone here open to mentoring me?"_

One Discord message. Three different specialists. One of me.

<!-- .element: class="fragment" -->

What could go wrong?

<!-- .element: class="fragment" -->

Note:
This is the actual shape of a message in my Discord. One sentence, three completely different jobs: a roadmap, fresh content search, mentor matching.

The community is about five thousand developers. There is exactly one of me, and I sleep sometimes. So I built a bot to be me.

--

![what could go wrong](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTA2OTczcTVhNnh0ZW1odGVsZHJmcmFkbHczZTQ5YjZpanlucDg3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NV4cSrRYXXwfUcYnua/giphy.gif)

--

## Orchestrators route. Leaves work.

<div style="display:flex;gap:2rem;align-items:center;margin-top:1rem">
<div style="flex:1;text-align:center;padding:1.5rem;border:2px solid #EA4335;border-radius:8px">
<strong style="color:#EA4335">One big agent</strong><br/>
<small>Every skill in one prompt<br/>Every failure everywhere<br/>Nothing measurable</small>
</div>
<div style="flex:0;font-size:2rem;opacity:0.4">→</div>
<div style="flex:1;text-align:center;padding:1.5rem;border:2px solid #34A853;border-radius:8px">
<strong style="color:#34A853">An orchestra</strong><br/>
<small>Specialists with one job each<br/>A conductor that only routes<br/>Failures isolated per seat</small>
</div>
</div>

Note:
One giant prompt does onboarding, mentorship, content and roadmaps... badly. The fix isn't a better prompt, it's structure.

This is the whole mental model: in an orchestra, the conductor doesn't play the violin, and the violins don't set the tempo. Orchestrators route, leaves work, nobody improvises the other one's job.

Keep that sentence. We'll watch it break twice today.

*Two minutes in. The next section is the tree.*

---

## One bot, sixteen agents <small>(the abstract says twelve)</small>

The abstract says **12**.

<!-- .element: class="fragment" -->

My own docs say "12 total"... then list **13**.

<!-- .element: class="fragment" -->

I counted for this talk. It's **16**.

<!-- .element: class="fragment" -->

![math not mathing](assets/memes/math-lady.gif) <!-- .element: class="fragment" style="height: 260px" -->

Note:
Quick confession. When I submitted this talk I wrote twelve agents. While making the slides I grepped the codebase: thirteen LLM agents plus three workflow agents with no model at all. Sixteen.

Counting agents is apparently harder than orchestrating them.

*Fast beat. Fifteen seconds.*

--

## The tree

![wat](assets/images/orchestra-of-agents/agents-architecture.png) 

<small>13 `LlmAgent`s + 3 workflow agents. All `gemini-2.5-flash`. All in one process.</small>

Note:
The whole system. One root, six children, two of them compositions. The Sequential and Parallel agents never call a model... they're pure wiring.

And yes, one model everywhere. I tried being clever with multi-model routing; the operational complexity never paid for itself. Boring choices are a feature.

--

## The root, in code

```python
root_agent = LlmAgent(
    name="community_assistant",
    model=MODEL,  # gemini-2.5-flash
    instruction=ROOT_INSTRUCTION,
    before_model_callback=[pii_sanitizer, inject_current_date],
    sub_agents=[  # <-- this list IS the routing table
        onboarding_agent, mentorship_agent, projects_agent,
        roadmap_agent, content_agent, external_knowledge_agent,
    ],
)
```

<small>`sub_agents` gives you LLM-driven routing for free. Each child's `description` is its routing advertisement.</small>

Note:
The real root agent from production. The line that matters is sub_agents: hand ADK that list and it synthesizes transfer_to_agent from each child's description. The model makes the routing decision, per message. No intent classifier, no regex.

The callbacks on top... hold that thought for three slides.

--

## ⚠️ The busy conductor pitfall

**The orchestrator routes. It does not answer.**

<!-- .element: class="fragment" -->

```python
# BAD: root with tools and opinions of its own
root_agent = LlmAgent(
    tools=[search_blog_posts],  # <-- root hoards the turn
    sub_agents=[content_agent],  # ...and content_agent starves
)

# GOOD: route-only root, all work lives in leaves
root_agent = LlmAgent(
    instruction=ROUTING_INSTRUCTION,
    sub_agents=[content_agent, mentorship_agent],
)
```

<!-- .element: class="fragment" -->

Note:
Give the root its own tools and it starts answering instead of transferring. It's an LLM... given the choice between delegating and doing, it does. Your specialists starve and you're back to one big agent with extra steps.

Screenshot this one. And remember the rule, it comes back at the end from the opposite direction.

---

## Workflow agents: when you stop trusting the LLM

```python
onboarding_agent = SequentialAgent(
    name="onboarding_agent",
    sub_agents=[
        skill_level_extractor,  # output_key="user_skill_level"
        goals_extractor,        # output_key="user_goals"
        welcome_agent,          # user-facing, runs LAST on purpose
    ],
)
```

<small>`output_key` is scalar: one agent, one state key. Two facts = two silent extractors. State is the contract.</small>

Note:
Onboarding looks like one job. It's three agents, because ADK's output_key is scalar: one LLM agent writes exactly one state key, and I need two structured facts out of an intro message.

The welcome agent runs last for a reason: a SequentialAgent's final response is whatever its last child says. Put an extractor last and your warm welcome is the literal word "beginner".

Downstream agents read these keys with optional templating... and there's a test that enforces the question mark.

--

## The fan-out

```python
external_knowledge_fan_out = ParallelAgent(
    name="ExternalFanOut",
    sub_agents=[gh_researcher, devto_researcher, so_researcher],
)

external_knowledge_agent = SequentialAgent(
    name="external_knowledge_agent",  # routable name on the WRAPPER
    sub_agents=[external_knowledge_fan_out, synthesizer],
)
```

<small>GitHub, dev.to, Stack Overflow in parallel. Then one synthesizer voice.</small>

Note:
External knowledge: three researchers in parallel, each writing its own state key, then a synthesizer that reads all three and produces the one reply the user sees.

Notice the routable name sits on the outer wrapper: this used to be one monolithic agent, and keeping the old name meant the root's routing instruction never changed when I split it. Migrations love a stable name.

--

## The parallel win 📊

| | time |
|---|---|
| `gh_researcher` | 4,463 ms |
| `devto_researcher` | 4,570 ms |
| `so_researcher` | 5,251 ms |
| **Parallel total** | **5,251 ms** |
| Serial would be | 14,284 ms |

<!-- .element: class="fragment" -->

Note:
Real numbers from a production soak log. Three leaves, slowest one is five point two seconds, and that IS the fan-out time. You pay for the slowest branch, not the sum.

*If ahead of schedule: play the 60-second recorded adk web Events-tab clip here, three branches entering within 1 ms. If not, skip - the numbers carry it.*

--

## The bottleneck didn't disappear. It moved.

End-to-end turn: **17.6 s**

<!-- .element: class="fragment" -->

The synthesizer alone: **10.9 s**

<!-- .element: class="fragment" -->

![waiting](assets/memes/bean-waiting.gif) <!-- .element: class="fragment" style="height: 220px" -->

Note:
Same soak log, whole picture. The fan-out I was so proud of is five seconds; the full turn is seventeen, and eleven of those are the synthesizer... one LLM call, reading three summaries.

"Parallel" is a topology, not a speedup. Parallelize the branches and the merge becomes your critical path. Nobody puts this slide in the framework tutorial.

*This is the first "down" of the story. Ten minutes in, roughly.*

---

## Boring tools that never miss

```python
def search_github(query: str) -> dict:
    """Search GitHub repositories for a topic."""  # docstring IS the schema
    try:
        resp = _client.get("/search/repositories", ...)  # 10s timeout
        ...
    except httpx.HTTPError:
        return {"status": "error", "detail": "github unavailable"}
        # <-- return, never raise
```

<small>Plain Python functions. ADK derives the tool schema from signature + docstring.</small>

Note:
Every tool in this system is a plain Python function. ADK reads the type hints and the docstring and hands Gemini a tool definition, so the docstring isn't documentation... it's the API contract the model sees.

And one rule that carries the whole fan-out: a failing tool returns an error dict, it never raises. An exception in one parallel branch kills its siblings. An error dict flows to the synthesizer, which just says "dev dot to didn't have much today" and moves on.

A dead branch must never kill the fan-out.

*Say that last line slowly. It comes back.*

---

## So. How much MCP holds this together?

Note:
Okay. We're at MCPCon. I promised MCP in the abstract. Time to answer honestly.

*Beat of silence. Smile. Click.*

--

# Zero.

![zero](assets/memes/jobs-zero.gif) <!-- .element: class="fragment" style="height: 280px" -->

Note:
Zero. There is not one MCP server in this production system. I grepped for this talk: no MCPToolset, no server configs, nothing.

I'm saying this at MCPCon on purpose, because I'd rather tell you the truth than retrofit a protocol into my slides.

*Let the room react.*

--

## Why function tools won here

- One process. I own **both ends** of every call
<!-- .element: class="fragment" -->

- Typed dict in, typed dict out... no serialization boundary
<!-- .element: class="fragment" -->

- No server lifecycle, no auth ceremony, no extra hop to monitor
<!-- .element: class="fragment" -->

Note:
The reasoning, not the vibes: every tool is code I wrote, running in the same process as the agents. There's no boundary to standardize. Putting MCP between my agent and my own function means adding a server, a transport and a failure mode to reach code I could just... call.

MCP is a protocol for a boundary. I don't have a boundary. I have a monolith with opinions.

--

## Where MCP earns its place

- Tools that cross an **org boundary**: someone else's system, someone else's auth
<!-- .element: class="fragment" -->

- Tools consumed by **clients you don't control**: Claude, IDEs, other people's agents
<!-- .element: class="fragment" -->

- Dev-time tooling, where the server ecosystem is genuinely a gift
<!-- .element: class="fragment" -->

Note:
And the fair half, because this isn't an anti-MCP talk. The moment a tool crosses a boundary you don't own, or serves clients you don't control, the protocol is exactly what you want. If my platform ever exposes its mentorship search to YOUR agents... that's an MCP server, no question.

Orchestration is the skeleton, tools are the muscles. MCP is the standard connector between bodies. My system is one body.

*Midpoint. Roughly 13 minutes in.*

---

## Callbacks: the immune system

<div style="display:flex;gap:1.5rem;margin-top:2rem">
<div style="flex:1;padding:1rem;border:2px solid #EA4335;border-radius:8px" class="fragment">
<h3 style="color:#EA4335">PII sanitizer</h3>
Redacts before the model sees it.
</div>
<div style="flex:1;padding:1rem;border:2px solid #4285F4;border-radius:8px" class="fragment">
<h3 style="color:#4285F4">Tool cache</h3>
600 s TTL on repeat searches.
</div>
</div>

<div style="display:flex;gap:1.5rem;margin-top:1.5rem">
<div style="flex:1;padding:1rem;border:2px solid #34A853;border-radius:8px" class="fragment">
<h3 style="color:#34A853">Lifecycle telemetry</h3>
JSON to stdout. Zero infra.
</div>
<div style="flex:1;padding:1rem;border:2px solid #FBBC04;border-radius:8px" class="fragment">
<h3 style="color:#FBBC04">Date injection</h3>
The model learns what "today" is.
</div>
</div>

Note:
The layer nobody writes tutorials about: 432 lines, four layers wrapped around every turn. PII sanitization, because users paste emails into Discord bots... they just do. A tool-result cache, because forty people a day ask for Angular content. Telemetry as JSON lines on stdout that Cloud Run scrapes... structured observability for the price of print statements. Measured overhead: microseconds.

None of these existed in version one. Every one is a scar. And they all obey one rule: try except everything, return None... a regex bug must never crash a user's turn.

The yellow one has the best story. Sixty seconds on it.

--

## May 2026. The bot recommends...

> _"Front-end Weekly News Week - 18"_
>
> **published 2020**

![frustrated](assets/memes/frustrated.gif) <!-- .element: class="fragment" style="height: 220px" -->

Note:
Routine smoke test, May 2026. I ask for fresh Angular reading. Top pick: a weekly news roundup from 2020. Confidently presented, six years stale.

Root cause was almost embarrassing: nothing in the stack tells the model the current date. Its only sense of time is its training data, so "recent" silently means "recent as of training".

--

## The fix is ten tokens

```python
def inject_current_date(callback_context, llm_request):
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    llm_request.append_instructions([
        f"Today is {today} (UTC). When surfacing third-party "
        f"content, prefer the most recent items unless the user "
        f"asks for historical material."
    ])  # <-- system_instruction, not a get_date TOOL (that costs a round trip)
```

<small>Verified with a query about a tool announced 2 days earlier: all 5 repos dated inside those 2 days.</small>

Note:
The fix: a before-model callback appending one dated sentence to the system instruction on every call. Not a date tool... a tool means the model must decide to call it and burn a round trip. The date is ambient truth, and ambient truth goes in instructions. And the cost of those ten extra tokens: even at a thousand turns a day it would be three hundredths of a cent.

And the verification trick, steal this: prove the model prefers fresh data by asking about something newer than every training cutoff. Antigravity CLI had been announced two days earlier; post-fix, every surfaced repo was dated inside those two days.

Hold onto "Antigravity CLI". That exact query is about to come back.

---

## A websocket bot on serverless <small>(yes, really)</small>

- `--min-instances=1` : scale-to-zero hangs up the Discord websocket
<!-- .element: class="fragment" -->

- `--max-instances=1` : in-memory sessions... two instances = split-brain memory
<!-- .element: class="fragment" -->

- `--no-cpu-throttling` : **Cloud Run throttles CPU between requests. A websocket bot's work happens between requests.**
<!-- .element: class="fragment" -->

- `PYTHONUNBUFFERED=1` : or the stdout telemetry pipeline just... buffers
<!-- .element: class="fragment" -->

Note:
Deployment, in one slide, because everyone shows you the agent code and nobody shows you the flags that keep it alive.

Cloud Run is built for request-driven services. A Discord bot is the opposite: one long-lived outbound websocket, zero inbound HTTP. So: minimum one instance or the bot hangs up. Maximum one instance or its memory forks. And the killer, which isn't even a deploy flag: by default Cloud Run throttles CPU between requests... and ALL of my bot's work happens in what the platform considers idle time. Without that flag the event loop runs in slow motion.

Each line here cost me between twenty minutes and half a day. Photograph it.

And then those flags sent me a bill. Next slide.

--

## The epilogue 💸

Always-on + unthrottled CPU = **instance-based billing**

<!-- .element: class="fragment" -->

1 vCPU rented 24/7 ≈ **$47 / month**. The free tier covers ~50 hours of it.

<!-- .element: class="fragment" -->

Today the same container runs on an Always-Free `e2-micro` VM: **~$3-4 / month**

<!-- .element: class="fragment" -->

<small>Same Dockerfile, same image. The flags that keep a websocket bot alive on Cloud Run are the flags that make it expensive there.</small>

Note:
Here's the part no tutorial mentions: the moment you set min instances and turn off CPU throttling, Cloud Run switches you to instance-based billing. You're renting a full vCPU around the clock... about forty-seven dollars a month for one community bot, and the free tier covers roughly fifty hours of that. You can't even lower the CPU, because fractional vCPU requires throttling to be ON.

So two weeks ago the bot moved. Same container image, same Dockerfile, now on a single Always-Free e2-micro VM. Three to four dollars a month, and most of that is the external IP.

The deployment lesson in one line: the flags that keep a websocket bot alive on serverless are exactly the flags that make serverless the wrong home for it.

--

## So: sanitized, cached, instrumented, deployed.

### Nothing could go wrong. Right?

![this is fine](assets/memes/this-is-fine.gif) <!-- .element: class="fragment" style="height: 260px" -->

Note:
Let's take stock. PII layer, cache, telemetry on every agent, date-aware models, a hardened deployment.

I was, honestly, feeling pretty good about this system.

*Long pause. Look at the audience. One click reveals the dog, let the laugh happen, then click into Part 6. About 17 minutes in - the finale needs six.*

---

## The night the telemetry lied

```text
[2026-05-23 19:55] user report:

  Q: "any good repos for Google's Antigravity CLI?"
  A: "dev.to temporarily unavailable."
```

Note:
The log from the beginning, and now you know the system behind it. The query routed, correctly, to the fan-out: GitHub, dev.to, Stack Overflow in parallel, then the synthesizer. You know this pipeline. You've seen its numbers.

And the user got a leaf's internal error string. Here's the bug.

*Slow down. No jokes until the fix lands.*

--

## The loop that looked correct

```python
async for event in runner.run_async(...):
    events_seen.append(event)
    if event.is_final_response() and event.content:
        response_text = event.content.parts[0].text or ""
        break  # <-- the entire incident
```

<small>Reads perfectly. Reviewed. Shipped. Wrong.</small>

Note:
The Discord bot's event loop, as it ran in production. Stream events, grab the final response, stop. Every tutorial writes this loop. I'd bet money some of you have it in production right now.

--

## The docstring I didn't read slowly enough

> "...when multiple agents participate in one invocation, there could be one event has `is_final_response()` as True **for each participating agent**."

<small>ADK's own `Event.is_final_response` docs.</small>

Note:
From ADK's source. Final response is not a property of the invocation... it's a property of each agent. In a multi-agent turn you get one "final" event per participating agent. My loop takes the FIRST one and hangs up.

So who finishes first in a parallel fan-out?

--

## The fastest agent wins. The fastest agent was broken.

- dev.to 404s on the two-day-old tag → error dict → done in **1.2 s**
<!-- .element: class="fragment" -->

- GitHub: 2.4 s. Stack Overflow: 2.6 s. The synthesizer: never heard from
<!-- .element: class="fragment" -->

- My "graceful degradation" is now the bot's answer
<!-- .element: class="fragment" -->

Note:
The race. Antigravity CLI was two days old, dev dot to had no such tag, that researcher failed fast exactly as designed... and produced its polite little error dict. Fastest branch in the fan-out. First final event. My loop grabbed it and broke.

Remember "a dead branch must never kill the fan-out"? The branch didn't kill anything. It WON. My graceful degradation sprinted past the healthy branches and became the user-facing reply.

*Pause. Let the irony land.*

--

## And then the `break` pulled the pin

`break` → `GeneratorExit` → **`asyncio.TaskGroup` cancelled mid-flight**

<!-- .element: class="fragment" -->

Root + synthesizer exit callbacks: **never fired**

<!-- .element: class="fragment" -->

**The bug corrupted the telemetry built to catch it.**

<!-- .element: class="fragment" -->

Note:
Breaking out of an async generator is not a passive act. The break sends GeneratorExit up through ADK's parallel merge, which cancels the whole TaskGroup while branches are still running.

And here's the knife: cancellation means the root's and synthesizer's exit callbacks never run. The duration metrics for the two most important agents in the turn: missing. My immune system's data was silently truncated by the same break statement causing the user-facing bug.

*Say the bold line slowly, once.*

--

## How long? Since the fan-out shipped.

The synthesizer's reply had **never once reached a user**.

<!-- .element: class="fragment" -->

> "Local `adk web` drains the **entire** event stream, so synthesizer output always rendered. The smoke test was a false positive."

<!-- .element: class="fragment" -->

**The dev tool was more forgiving than production.**

<!-- .element: class="fragment" -->

Note:
This wasn't a fresh regression. The loop had been wrong since the fan-out shipped. Those beautiful parallel numbers? Real... and the synthesis they fed was produced and thrown away, every single time. Users got whichever leaf finished first, for weeks, and it usually looked plausible enough that nobody reported it.

Why did every test miss it? Because I tested through adk web, and adk web, being a good debugging UI, drains the whole stream and renders everything. The bug lived only in MY loop, the one path no test exercised.

If your smoke test doesn't go through the same drain loop your users do, it's testing a different system.

--

## 37 minutes. The fix: drain everything, keep the last word.

```python
async for event in runner.run_async(...):
    events_seen.append(event)
    if event.is_final_response() and event.content and event.content.parts:
        text = event.content.parts[0].text or ""
        if text:
            response_text = text  # keep latest; synthesizer wins
# no break. The stream ends when the stream ends.
```

<small>Report 19:55 → root cause 20:01 → deployed 20:32. Leaves speak first, orchestrators speak last.</small>

Note:
Thirty-seven minutes from user report to verified fix in production... and honestly, the corrupted telemetry is WHY it was fast: the pattern of what was missing, exit events for exactly the orchestrator and synthesizer, pointed straight at cancellation. The absence was the clue.

The fix is smaller than the incident deserved: drain the entire stream, every final overwrites the previous one, empty text never overwrites real text. In agent trees, finality flows upward... whoever speaks last, speaks for the system.

--

## The clean trace

```text
agent.enter  gh_researcher                          20:33:43.220
agent.enter  devto_researcher                       20:33:43.220
agent.enter  so_researcher                          20:33:43.221
agent.exit   devto_researcher              1365ms   20:33:44.586
agent.exit   so_researcher                 5009ms   20:33:48.229
agent.exit   gh_researcher                 7025ms   20:33:50.246
agent.enter  external_knowledge_synthesizer         20:33:50.248
agent.exit   external_knowledge_synthesizer 3637ms  20:33:53.883
agent.exit   community_assistant           13072ms  20:33:53.884
```

<small>Three leaves entering within 1 ms. Every enter pairs with an exit. This is what healthy looks like.</small>

Note:
The verification trace, one minute after deploy. Three researchers entering within a millisecond: true concurrency. Dev dot to still failing fast, and it no longer matters. Every enter has its exit.

I keep this trace like other people keep photos.

*Let them read it for a few seconds.*

--

## The confession, and the fix for the fixer

That night, I never wrote the regression test.

<!-- .element: class="fragment" -->

```python
async def test_synthesizer_beats_fastest_leaf_in_fan_out_race():
    events = [
        _final("devto_researcher", "dev.to temporarily unavailable."),
        _final("gh_researcher", "Found 5 GitHub repos."),
        _final("so_researcher", "Found 4 Stack Overflow questions."),
        _final("external_knowledge_synthesizer", synthesizer_answer),
    ]
    text = await drain_final_response(_stream(events, []), events_seen=[])
    assert text == synthesizer_answer
```

<!-- .element: class="fragment" -->

<small>Written while preparing this talk. It passes. It would have failed for weeks.</small>

Note:
One more confession: the postmortem's first open question said "write a regression test". For months, nobody did. Hotfix adrenaline doesn't write tests.

So while building this talk, I finally did. The real test: a scripted stream where the failing leaf finals first, and the assertion that the synthesizer wins anyway. It passes today. It would have failed every single day for those weeks.

Close your postmortems' open questions... apparently conference deadlines work.

---

## The one I haven't fixed

![leaves refusing in the event stream](assets/images/orchestra-of-agents/adk-web-leaf-refusal.png)

<!-- .element: style="height: 400px; border-radius: 8px;" -->

**Leaves don't get opinions about scope. That's the orchestrator's job... in both directions.**

<!-- .element: class="fragment" -->

<small>Captured last night, rehearsing this talk. Fix is still a proposal doc. Find me after and tell me where it's wrong.</small>

<!-- .element: class="fragment" -->

Note:
One bug I haven't fixed... and this screenshot is from last night, while rehearsing this talk. On the left, adk web's Events panel with the whole sixteen-agent tree. On the right, I asked for a GitHub repo. Watch the leaves: dev dot to refuses, "I can only search for articles". Stack Overflow refuses, "try a different search engine". Neither one called its tool. Meanwhile the GitHub researcher quietly did its job.

That's the busy conductor pitfall, reflected: there the orchestrator did a leaf's work, here leaves decided what's in scope. I told you the sentence would break twice.

The fix, a leaf contract that says "never refuse, always call your tool, let the synthesizer narrate gaps", is written up but not shipped. I genuinely want to hear how you'd enforce it. Hallway track, come find me.

--

## What the user actually sees

![the same query in Discord: one clean answer](assets/images/orchestra-of-agents/discord-clean-answer.png)

<!-- .element: style="width: 95%; border-radius: 8px;" -->

<small>Same night, same query, through the fixed drain loop: the synthesizer's answer, refusals swallowed.</small>

Note:
And the same query, same night, in the real Discord. One clean answer with the right repo. The refusals you just saw are still happening inside the stream... the drained loop just makes sure the synthesizer gets the last word.

In May, this exact query shape returned "dev dot to temporarily unavailable" to a real user. Tonight it returns the repo. That's the whole talk in two screenshots: what the event stream contains, versus what the user sees.

--

<!-- .slide: style="font-size: 0.8em;" -->

## Patterns cheat sheet

| Pattern | When | The gotcha |
|---|---|---|
| **LLM auto-transfer routing** | intent is genuinely open | route-only root: no tools, no opinions |
| **`SequentialAgent` + `output_key`** | order must be guaranteed | keys are scalar; state is the contract |
| **`ParallelAgent` fan-out** | independent I/O branches | total = slowest branch + the merge |
| **Function tools** | you own both ends of the call | return error dicts, never raise in a branch |
| **MCP** | tools cross an org/client boundary | don't pay a server hop for your own code |
| **Callbacks** | cross-cutting concerns | fail open: try/except, return `None` |
| **Cloud Run for a gateway bot** | request-driven work only | always-on flags flip it to instance billing; a tiny VM wins |
| **Event-stream drain** | any production runner | `is_final_response()` fires per agent |

Note:
The whole talk, one screen. Photograph this one. The top half is architecture; the bottom half only shows up in production.

*Hold still for ten seconds so phones can come out.*

--

## Resources & Code 📱

<img src="assets/images/orchestra-of-agents/qr-code.png" alt="Resources QR"/>
<!-- .element style="height: 400px" -->

<small>The repo · the postmortems · the soak logs · these slides</small>

Note:
Everything from today: the agent code, the incident reports, the soak log with the numbers, and this deck. All real documents, typos and all.

--

## The one thing to remember

<div style="font-size:1.2em;text-align:center;margin-top:2rem;line-height:1.8">

Determinism where you can.<br/>
An **LLM** only where you must.<br/>
And drain the whole stream.

<br/>

<small style="opacity:0.6">Orchestrators route. Leaves work. Production keeps the receipts.</small>

</div>

Note:
If you keep one thing.

Determinism where you can: workflow agents for order, error dicts instead of exceptions, a dated sentence instead of a date tool. An LLM only where you must: routing, extraction, synthesis. And drain the whole stream.

*Slow down. Pause after each line.*

--

## Thank you, Amsterdam 🇳🇱

<div style="display:flex;gap:3rem;align-items:center;justify-content:center;margin-top:2rem">

<div>

**Muhammad Ahsan Ayaz**

🌐 codewithahsan.dev<br/>
🐦 @codewith_ahsan<br/>
💼 linkedin.com/in/ahsanayaz

</div>

<div style="font-size:0.9em">

**Code from today:**<br/>
github.com/AhsanAyaz/<br/>code-with-ahsan

<br/>

<small>Q&A - ask me anything<br/>(especially about the unfixed bug)</small>

</div>

</div>

Note:
Thank you, Amsterdam. The system is live, the community is real, and if you ask it about Antigravity CLI tonight, you'll get actual repos now.

Come find me for the leaf-contract discussion... I meant that invitation.

*Keep this slide up during Q&A. No "Questions?" slide, that's dead air.*
