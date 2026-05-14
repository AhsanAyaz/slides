# Zero to Agentic Orchestra

### with Google ADK

<small>Muhammad Ahsan Ayaz · GDE in AI & Angular</small><br/>
<small>GDG Prishtina · 2026</small>

Note:
20 minutes. By the end you'll understand how to compose multiple AI agents into a system that's more capable than any single one. We're going from zero — a single agent — to a full orchestra. Live code the whole way.

---

## The problem with one big agent

> _"Plan a marketing campaign for my new app. Research trends, write messaging, draft ad copy, suggest visuals, and format a brief."_

One prompt. One model. One shot.

<!-- .element: class="fragment" -->

What could go wrong?

<!-- .element: class="fragment" -->

Note:
Ask the audience: has anyone tried to stuff everything into one massive system prompt? This is the instinct. It's also why most "agents" are disappointing in practice. Let's talk about why.

--

![what could go wrong](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTA2OTczcTVhNnh0ZW1odGVsZHJmcmFkbHczZTQ5YjZpanlucDg3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NV4cSrRYXXwfUcYnua/giphy.gif)

--

## Everything, all at once

- The model context overflows
<!-- .element: class="fragment" -->

- Earlier instructions get "forgotten"
<!-- .element: class="fragment" -->

- You can't test one step without running all of them
<!-- .element: class="fragment" -->

- When it breaks, you have no idea where
<!-- .element: class="fragment" -->

- You can't swap out the "research" part without rewriting everything
<!-- .element: class="fragment" -->

Note:
Each of these is a real production failure mode. The solution isn't a better prompt. The solution is the same thing software engineering discovered 40 years ago: decompose the problem.

--

## The orchestra mental model

<div style="display:flex;gap:2rem;align-items:center;margin-top:1rem">
<div style="flex:1;text-align:center;padding:1.5rem;border:2px solid #EA4335;border-radius:8px">
<strong style="color:#EA4335">Soloist</strong><br/>
<small>One giant agent.<br/>One huge prompt.<br/>Hope for the best.</small>
</div>
<div style="flex:0;font-size:2rem;opacity:0.4">→</div>
<div style="flex:1;text-align:center;padding:1.5rem;border:2px solid #34A853;border-radius:8px">
<strong style="color:#34A853">Orchestra</strong><br/>
<small>Specialized agents.<br/>Clear roles.<br/>A conductor that routes.</small>
</div>
</div>

Note:
In an orchestra, the violins don't also play drums. The conductor doesn't play an instrument. Each section is excellent at one thing. ADK gives us the primitives to build exactly this.

---

## What is Google ADK?

**Agent Development Kit** — Google's open-source, code-first framework for building production-grade AI agents.

- Powers Google's own Agentspace and CES agents
<!-- .element: class="fragment" -->

- Announced at Google Cloud NEXT 2025
<!-- .element: class="fragment" -->

- `pip install google-adk` — that's it
<!-- .element: class="fragment" -->

- Comes with `adk web` for local dev UI and `adk run` for terminal
<!-- .element: class="fragment" -->

Note:
This isn't a toy or a demo framework. It's what Google uses internally. The dev tooling is genuinely good — the web UI shows you every event, every tool call, every state change in real time. We'll use it throughout the demos.

---

## The four building blocks

![The four building blocks](assets/images/zero-to-agent-orchestra/four-building-blocks.png)

Note:
Everything in ADK is a BaseAgent. LlmAgent is the one that reasons — it talks to a model. The Workflow Agents (Sequential, Parallel, Loop) are deterministic glue — they never touch an LLM. They just schedule their children. Custom Agents are anything else you need. We'll build with all three workflow types today.

--

## How agents talk to each other

Three mechanisms — pick the right one:

**1. Shared session state** — a key-value whiteboard all agents can read/write

<!-- .element: class="fragment" -->

**2. LLM-driven transfer** — parent LLM decides which sub-agent handles next

<!-- .element: class="fragment" -->

**3. AgentTool** — wrap an agent as a callable tool; parent calls it like a function

<!-- .element: class="fragment" -->

Note:
Session state is passive — it doesn't move control. Transfer moves the conversation to a new agent and the user continues there. AgentTool is synchronous — the parent calls the sub-agent, gets a result back, and keeps going. Most beginner mistakes are using the wrong mechanism for the job.

---

## `LlmAgent` — the reasoning engine

```python
from google.adk.agents import LlmAgent
from google.adk.tools import google_search

researcher = LlmAgent(
    name="researcher",
    model="gemini-flash-latest",
    description="An assistant that can search the web.",
    instruction="You help users research topics using Google Search.",
    tools=[google_search],
)
```

Note:
This is a working agent. Four parameters. Run it with `adk web` right now and it'll answer questions, search the web, maintain a conversation. The description is used by OTHER agents that might delegate to this one — make it precise.

--

## The parameters that matter

| Parameter     | Purpose                                                  |
| ------------- | -------------------------------------------------------- |
| `name`        | Unique identifier in the agent tree                      |
| `model`       | `"gemini-flash-latest"` or any LiteLlm alias             |
| `instruction` | System prompt — can use `{state_key}` templates          |
| `description` | **What other agents read to decide to delegate here**    |
| `tools`       | Python callables, built-ins, AgentTool, McpToolset       |
| `sub_agents`  | Children for delegation or orchestration                 |
| `output_key`  | **Writes agent's output to session state automatically** |

Note:
The two highlighted ones are the concepts your audience needs to internalize. Description is your delegation API. output_key is your data bus. Everything else is scaffolding.

--

## Tools are just functions

```python
def get_weather(city: str) -> dict:
    """Retrieves the current weather for a city.

    Args:
        city: The city name to look up.

    Returns:
        dict: status and result or error message.
    """
    if city.lower() == "stockholm":
        return {"status": "success", "report": "Sunny, 22°C"}
    return {"status": "error", "error_message": f"No data for '{city}'."}
```

The **docstring** is not decorative — the model reads it to decide when and how to call this tool.

<!-- .element: class="fragment" -->

Note:
ADK auto-wraps Python functions in FunctionTool by reading type hints and the docstring. Always return a dict with a status field. The docstring is the tool's "label" from the model's perspective — write it like you're explaining the tool to a junior engineer, not to Python.

--

## `output_key` — the wire between agents

```python
agent_a = LlmAgent(
    name="CapitalFinder",
    model="gemini-flash-latest",
    instruction="Find the capital of France.",
    output_key="capital_city",          # writes to session.state
)

agent_b = LlmAgent(
    name="CityExpert",
    model="gemini-flash-latest",
    instruction="Tell me about {capital_city}.",  # reads from session.state
)
```

`output_key` writes. `{key}` in instructions reads.

<!-- .element: class="fragment" -->

This is how data flows through your orchestra.

<!-- .element: class="fragment" -->

Note:
This is THE concept of the talk. output_key is the contract between agents. When AgentA finishes, its text response is automatically stored in session.state["capital_city"]. AgentB's instruction template resolves it at runtime. No manual state management. No passing variables around. The framework wires it.

---

## `SequentialAgent` — the assembly line

Runs sub-agents **strictly in order**, sharing the same session state.

![SequentialAgent](assets/images/zero-to-agent-orchestra/sequential-agents.png)

Use when: **order is fixed** and each step depends on the previous.

Note:
Sequential is the simplest and most common pattern. Write → Review → Refactor. Fetch → Summarize → Translate. Validate → Process → Report. The workflow agent itself is dumb — it's just a list with a for-loop. The intelligence is in the LlmAgents inside it.

--

## Sequential in code

````python
from google.adk.agents import SequentialAgent, LlmAgent

MODEL = "gemini-flash-latest"

writer = LlmAgent(
    name="CodeWriter",
    model=MODEL,
    instruction="Write a Python implementation for the user's spec. "
                "Output only code in a ```python``` block.",
    output_key="generated_code",
)

reviewer = LlmAgent(
    name="CodeReviewer",
    model=MODEL,
    instruction="Review this code:\n```python\n{generated_code}\n```\n"
                "List issues, or say 'No major issues found.'",
    output_key="review_comments",
)

refactorer = LlmAgent(
    name="CodeRefactorer",
    model=MODEL,
    instruction="Refactor:\n```python\n{generated_code}\n```\n"
                "Apply these review comments:\n{review_comments}\n"
                "Output only the final code.",
    output_key="refactored_code",
)

pipeline = SequentialAgent(
    name="CodePipeline",
    sub_agents=[writer, reviewer, refactorer],
)
root_agent = pipeline
````

Note:
Point at the output_key chain. Writer puts code in session.state. Reviewer reads it with {generated_code}. Refactorer reads both. None of them know about each other — they just read from and write to the shared whiteboard. Run adk web, ask it to "write a function that reverses a string", then open the State tab and watch generated_code → review_comments → refactored_code appear.

--

## What to look at in `adk web`

**State tab** — the live `session.state` JSON whiteboard

```json
{
  "generated_code": "def reverse(s): return s[::-1]",
  "review_comments": "No major issues found.",
  "refactored_code": "def reverse_string(s: str) -> str:\n    return s[::-1]"
}
```

**Events tab** — every function call, transfer, and tool result in order

<!-- .element: class="fragment" -->

Note:
This is the demo moment for SequentialAgent. Open adk web. Submit a spec. Then switch between State and Events tabs. The audience should see the state keys appear one by one as each agent finishes. This makes the "wire" concept tangible.

---

## `ParallelAgent` — fan-out / gather

Runs sub-agents **concurrently** in separate branches — all writing to the same shared state.

![ParallelAgent](assets/images/zero-to-agent-orchestra/parallel-agent.png)

<!-- .element: style="height: 500px" -->

Use when: tasks are **independent** and you want them done simultaneously.

Note:
Three web searches that don't depend on each other. Three lenses on the same pull request. Three models cross-checking the same answer. Parallel cuts wall-clock time significantly. The "gather" synthesizer must come AFTER the parallel block — wrap both in a SequentialAgent.

--

## Parallel in code

```python
from google.adk.agents import LlmAgent, ParallelAgent, SequentialAgent
from google.adk.tools import google_search

MODEL = "gemini-flash-latest"

renewable = LlmAgent(
    name="RenewableResearcher",
    model=MODEL,
    instruction="Search 'renewable energy'. Output a 2-sentence summary.",
    tools=[google_search],
    output_key="renewable_result",
)

ev = LlmAgent(
    name="EVResearcher",
    model=MODEL,
    instruction="Search 'electric vehicle technology'. Output a 2-sentence summary.",
    tools=[google_search],
    output_key="ev_result",
)

carbon = LlmAgent(
    name="CarbonResearcher",
    model=MODEL,
    instruction="Search 'carbon capture methods'. Output a 2-sentence summary.",
    tools=[google_search],
    output_key="carbon_result",
)

research_team = ParallelAgent(
    name="ResearchTeam",
    sub_agents=[renewable, ev, carbon],
)

synthesizer = LlmAgent(
    name="Synthesizer",
    model=MODEL,
    instruction=(
        "Combine into one structured report:\n"
        "- Renewable: {renewable_result}\n"
        "- EVs: {ev_result}\n"
        "- Carbon: {carbon_result}"
    ),
)

root_agent = SequentialAgent(
    name="ResearchAndSynthesize",
    sub_agents=[research_team, synthesizer],
)
```

Note:
Key things to highlight: each researcher has a DIFFERENT output_key. The synthesizer wraps up after — hence the outer SequentialAgent. In adk web Events tab, watch the three branches interleave — events from RenewableResearcher, EVResearcher, and CarbonResearcher arrive in a mixed order because they're truly concurrent.

--

## ⚠️ The parallel pitfall

**Parallel children share session state.**

If two agents write to the **same key** — one silently wins.

<!-- .element: class="fragment" -->

```python
# BAD: both write to "result" — race condition
agent_a = LlmAgent(..., output_key="result")
agent_b = LlmAgent(..., output_key="result")  # ← overwrites agent_a

# GOOD: unique keys per branch
agent_a = LlmAgent(..., output_key="result_a")
agent_b = LlmAgent(..., output_key="result_b")
```

<!-- .element: class="fragment" -->

Note:
This is the single most common ParallelAgent bug. No error is raised. One result just disappears. The fix is always the same: give every parallel branch a unique output_key. Point at this slide and say "save this one."

---

## `LoopAgent` — iterative refinement

Runs sub-agents **in a loop** until one of two things happens:

1. `max_iterations` is reached (always set this — it's your safety net)
<!-- .element: class="fragment" -->

2. A sub-agent calls an `exit_loop` tool that sets `escalate = True`
<!-- .element: class="fragment" -->

Use when: you need **self-correction** — generate until it's good enough.

<!-- .element: class="fragment" -->

Note:
LoopAgent is where agents stop being pipelines and start being autonomous. The classic pattern is Writer + Critic in a loop. The critic either finds issues (another iteration) or calls exit_loop (done). The max_iterations cap is non-negotiable for production — without it, a stubborn critic can run forever.

--

## Loop in code

```python
from google.adk.agents import LoopAgent, LlmAgent
from google.adk.tools.tool_context import ToolContext

MODEL = "gemini-flash-latest"

def exit_loop(tool_context: ToolContext) -> dict:
    """Call ONLY when no further changes are needed."""
    tool_context.actions.escalate = True
    return {}

writer = LlmAgent(
    name="Writer",
    model=MODEL,
    instruction="Improve the document in state:\n{current_doc}\n"
                "Address any criticism in {critique?}.\n"
                "Output only the revised document.",
    output_key="current_doc",
)

critic = LlmAgent(
    name="Critic",
    model=MODEL,
    instruction="Critique this document:\n{current_doc}\n\n"
                "If it is clear and complete, call exit_loop.\n"
                "Otherwise, output 2-3 specific improvements.",
    tools=[exit_loop],
    output_key="critique",
)

refinement_loop = LoopAgent(
    name="RefinementLoop",
    max_iterations=5,
    sub_agents=[writer, critic],
)
root_agent = refinement_loop
```

Note:
Two things to highlight. One: {critique?} with the question mark — this silently resolves to empty string on the first iteration when critique doesn't exist yet. Without the ?, it raises an error on loop 1. Two: the callback parameter MUST be named exactly tool_context — ADK passes it by keyword and renaming it raises TypeError. Always set max_iterations even when you have an exit_loop tool.

--

## ⚠️ Loop pitfalls

**1. Missing `{key?}` on first iteration**

```python
# BAD: critique doesn't exist on loop 1 → KeyError
instruction="Apply critique: {critique}"

# GOOD: silently empty if missing
instruction="Apply critique: {critique?}"
```

**2. Forgetting `max_iterations`** — critic never satisfied → infinite loop → 💸

<!-- .element: class="fragment" -->

**3. Trying to escalate from `after_agent_callback`** — not supported. Use an `exit_loop` tool or a checker sub-agent.

<!-- .element: class="fragment" -->

Note:
Each of these is a real, frequently-seen mistake. The {?} syntax is subtle and not obvious from the docs. The max_iterations omission is the most expensive mistake — I've seen it rack up thousands of API calls. The callback escalation limitation catches people coming from other frameworks.

---

## Putting it all together

### The Content Orchestra

![ContentOrchestra](assets/images/zero-to-agent-orchestra/content-orchestra.png)

<!-- .element: style="height: 500px" -->

Note:
This is the demo. Everything we've covered in one composition: parallel research fan-out, sequential pipeline, iterative critic loop. Each primitive does one job. None of them know about the others — they just read and write session state. Let's look at the code then run it live.

--

## The orchestra: research (parallel)

```python
from google.adk.agents import LlmAgent, SequentialAgent, ParallelAgent, LoopAgent
from google.adk.tools import google_search
from google.adk.tools.tool_context import ToolContext

MODEL = "gemini-flash-latest"

trend_researcher = LlmAgent(
    name="TrendResearcher", model=MODEL,
    instruction="Use google_search. Find 3 current trends about: {topic}. "
                "Output a short bullet list.",
    tools=[google_search], output_key="trends",
)

audience_researcher = LlmAgent(
    name="AudienceResearcher", model=MODEL,
    instruction="Use google_search. Identify the target audience for: {topic}. "
                "Output 3 concise persona bullets.",
    tools=[google_search], output_key="audience",
)

competitor_researcher = LlmAgent(
    name="CompetitorResearcher", model=MODEL,
    instruction="Use google_search. Find 3 competing pieces of content about: {topic}. "
                "Output title + one-line summary each.",
    tools=[google_search], output_key="competitors",
)

research_team = ParallelAgent(
    name="ResearchTeam",
    sub_agents=[trend_researcher, audience_researcher, competitor_researcher],
)
```

Note:
Three researchers, three unique output keys. They run in parallel. The {topic} key comes from the initial user input — the runner seeds session.state with the first user message. Point this out: the very first user message becomes available in state.

--

## The orchestra: drafting (sequential) + refining (loop)

```python
outliner = LlmAgent(
    name="Outliner", model=MODEL,
    instruction=(
        "Build a 5-section outline for an article about {topic}.\n"
        "Trends: {trends}\nAudience: {audience}\nCompetitors: {competitors}"
    ),
    output_key="outline",
)

drafter = LlmAgent(
    name="Drafter", model=MODEL,
    instruction="Write a first draft from this outline:\n{outline}",
    output_key="draft",
)

def exit_loop(tool_context: ToolContext) -> dict:
    """Call ONLY when the draft is publish-ready."""
    tool_context.actions.escalate = True
    return {}

reviser = LlmAgent(
    name="Reviser", model=MODEL,
    instruction="Revise:\n{draft}\n\nApply critique:\n{critique?}\n\n"
                "Output only the revised article.",
    output_key="draft",   # overwrites on each iteration
)

critic = LlmAgent(
    name="Critic", model=MODEL,
    instruction="Critique:\n{draft}\n\n"
                "If clear, accurate, and well-structured for {audience}, "
                "call exit_loop. Otherwise output 2-3 specific improvements.",
    tools=[exit_loop], output_key="critique",
)

refinement_loop = LoopAgent(
    name="RefinementLoop", max_iterations=3,
    sub_agents=[reviser, critic],
)
```

Note:
Point at output_key="draft" on the Reviser — it OVERWRITES the draft key each iteration. That's intentional. The Critic always reads the latest version. The critic's instruction uses {audience} from the parallel research phase — data from one part of the orchestra flows into another.

--

## The orchestra: root assembly

```python
root_agent = SequentialAgent(
    name="ContentOrchestra",
    sub_agents=[research_team, outliner, drafter, refinement_loop],
)
```

Run it:

```bash
pip install google-adk
export GOOGLE_API_KEY=your_key   # from aistudio.google.com
adk web
# pick "orchestra" from the dropdown
# type: "AI developer tools in 2026"
```

Note:
Four sub-agents. That's the whole root. The SequentialAgent ensures research → outline → draft → refine. Show the audience that 80 lines of Python composes a research + drafting + quality loop system. Open adk web live, submit a topic, then switch to the Events tab.

---

<!-- .slide: style="font-size: 0.8em;" -->

## Patterns cheat sheet

| Pattern                    | Primitive                                | When to use                                    |
| -------------------------- | ---------------------------------------- | ---------------------------------------------- |
| **Sequential pipeline**    | `SequentialAgent`                        | Fixed order, each step reads previous output   |
| **Fan-out / gather**       | `ParallelAgent` inside `SequentialAgent` | Independent tasks, then synthesize             |
| **Iterative refinement**   | `LoopAgent` + exit tool                  | Self-correction, quality loops                 |
| **Dynamic router**         | `LlmAgent` + `sub_agents`                | Model decides which specialist handles it      |
| **Synchronous specialist** | `AgentTool`                              | Call an agent like a function, get result back |
| **Generator-critic**       | Two `LlmAgent`s + `output_key`           | Any quality-assurance need                     |

--

<!-- .slide: style="font-size: 0.8em;" -->

## Common pitfalls

1. **Forgetting `output_key`** — downstream `{key}` templates render as the literal string `{key}`
<!-- .element: class="fragment" -->

2. **Wrong callback param name** — must be exactly `callback_context` or `tool_context` — ADK passes by keyword
<!-- .element: class="fragment" -->

3. **Coordinator never delegates** — sub-agent `description` is missing or too generic
<!-- .element: class="fragment" -->

4. **Parallel race condition** — two children writing the same state key — one silently wins
<!-- .element: class="fragment" -->

5. **No `max_iterations` on `LoopAgent`** — runaway loop, runaway costs
<!-- .element: class="fragment" -->

6. **Using `{key}` not `{key?}` on first loop iteration** — KeyError before any output exists
<!-- .element: class="fragment" -->

Note:
Go through these quickly. Each one is a real failure mode you've either hit or watched someone hit. #3 is the most insidious — the coordinator answers the user directly instead of delegating because its instruction says "help the user" instead of "route to the right specialist." Write coordinator instructions as routing policies, not capabilities.

---

<!-- .slide: style="font-size: 0.8em;" -->

## What's next

**In the framework:**

- `callbacks` — `before_/after_agent`, `before_/after_model`, `before_/after_tool` for observability and guardrails
<!-- .element: class="fragment" -->

- `McpToolset` — plug in any MCP server (GitHub, Slack, filesystem, Airbnb...)
<!-- .element: class="fragment" -->

- `AgentTool` — call agents synchronously, like functions
<!-- .element: class="fragment" -->

- ADK 2.0 Beta — graph-based workflows, agent teams
<!-- .element: class="fragment" -->

**In production:**

- `adk deploy cloud_run` — one command to Cloud Run
<!-- .element: class="fragment" -->

- Vertex AI Agent Engine — managed sessions, eval framework, tracing
<!-- .element: class="fragment" -->

Note:
Don't spend more than 90 seconds here. Name each thing, say one sentence, move on. The audience came for multi-agent patterns, not a product roadmap. The key takeaway is: everything you built today is deployable as-is with one extra command.

--

## Resources

<!-- .slide: style="font-size: 0.8em;" -->

![QR Code](assets/images/zero-orchestra/qr-code.png)

Note:
All free, all working today. The AhsanAyaz repo has numbered modules matching exactly the progression in this talk — marketing campaign agent, tools, multi-model, structured output, sessions, deploying, callbacks. Good homework after today.

---

## The one thing to remember

<!-- .slide: style="font-size: 0.8em;" -->

<div style="font-size:1.2em;text-align:center;margin-top:2rem;line-height:1.8">

Agents aren't magic.<br/>
They're **specialized functions**<br/>
with a model as their runtime.

<br/>

**`SequentialAgent`** — when order matters<br/>
**`ParallelAgent`** — when tasks are independent<br/>
**`LoopAgent`** — when you need self-correction

<br/>

<small style="opacity:0.6">Combine three primitives. Build anything.</small>

</div>

Note:
This is the close. Pause after each line. The audience should leave knowing: I know what each workflow agent does, I know how output_key wires them together, and I know I can run this today with pip install google-adk.

--

## Thank you

<div style="display:flex;gap:3rem;align-items:center;justify-content:center;margin-top:2rem">

<div>

**Muhammad Ahsan Ayaz**

🌐 codewithahsan.dev<br/>
🐦 @codewith_ahsan<br/>
💼 linkedin.com/in/muhammadahsanayaz

</div>

<div style="font-size:0.9em">

**Code from today:**<br/>
github.com/AhsanAyaz/<br/>ai-agents-google-adk

<br/>

<small>Q&A — ask me anything</small>

</div>

</div>

Note:
Keep this slide up during Q&A. Don't replace it with a "Questions?" slide — that's dead air. Let people scan the repo URL and socials while walking up to the mic.
