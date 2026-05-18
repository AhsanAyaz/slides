gentic Orchestra with Google ADK — Research Dossier

This dossier consolidates the research you need to build the 20-minute conference talk **"Zero to Agentic Orchestra with Google ADK"**. It covers the Agent Development Kit (ADK) Python multi-agent primitives, working code patterns using `gemini-flash-latest`, the structure of Ahsan Ayaz's `ai-agents-google-adk` repository, the official Google `adk-samples` repository, and best-practice patterns that make a great narrative arc for a live demo talk.

All code samples below follow current ADK Python API conventions (verified against `google.github.io/adk-docs`, `adk.dev`, and `github.com/google/adk-python`). ADK is on a roughly bi-weekly release cadence (currently shipping the 1.x series with an ADK Python 2.0 Beta in preview that adds graph-based workflows and "agent teams"). Where the docs cite `gemini-2.5-flash`, the alias `gemini-flash-latest` is interchangeable and is the convention used throughout the official multi-agent docs.

## 1. ADK mental model — the four building blocks

ADK is Google's open-source, code-first framework for building, evaluating, and deploying production-grade AI agents. It powers Google's own Agentspace and Customer Engagement Suite (CES) agents and was announced at Google Cloud NEXT 2025. The Python SDK lives at `github.com/google/adk-python` and is installed with `pip install google-adk`.

ADK organizes everything around **`BaseAgent`** and three concrete agent categories:

- **LLM Agents** (`LlmAgent`, aliased as `Agent`) — language-model–driven, non-deterministic, reason about tools and delegation.
- **Workflow Agents** (`SequentialAgent`, `ParallelAgent`, `LoopAgent`) — deterministic orchestrators that schedule sub-agents but use no LLM themselves.
- **Custom Agents** — anything else, built by subclassing `BaseAgent` and implementing `_run_async_impl`.

The architectural primitive that ties everything together is the **agent hierarchy**: any agent can take a `sub_agents=[...]` list at construction time. ADK enforces a single-parent rule (an agent instance may have at most one parent — passing it to two parents raises `ValueError`). You can navigate the tree at runtime via `agent.parent_agent` and `agent.find_agent(name)`.

```python
from google.adk.agents import LlmAgent, BaseAgent

greeter = LlmAgent(name="Greeter", model="gemini-flash-latest")
task_doer = BaseAgent(name="TaskExecutor")

coordinator = LlmAgent(
    name="Coordinator",
    model="gemini-flash-latest",
    description="I coordinate greetings and tasks.",
    sub_agents=[greeter, task_doer],
)
# Framework sets: greeter.parent_agent == coordinator
```

Agents talk to each other through three mechanisms, which is the conceptual hinge of your talk:

1. **Shared session state** (`session.state`) — passive, key-value "whiteboard" carried inside the `InvocationContext`.
2. **LLM-driven delegation** — when an `LlmAgent` has `sub_agents`, ADK's default `AutoFlow` exposes a `transfer_to_agent(agent_name=...)` function call so the parent LLM can dynamically hand off control. Targets are chosen using each sub-agent's `description`.
3. **Explicit invocation via `AgentTool`** — wrap any agent in `agent_tool.AgentTool(agent=...)` and put it in a parent's `tools=[...]`; the LLM then calls it like any other function and gets the sub-agent's final response back as a tool result.

## 2. The LlmAgent constructor in depth

`LlmAgent` is the single most important class to introduce on stage. The constructor takes a lot of arguments — the ones you should explain in the talk are:

| Parameter | Purpose |
|---|---|
| `name` | Python-identifier-style unique name within the agent tree. Cannot be `"user"`. |
| `model` | Model string (e.g. `"gemini-flash-latest"`) or a `LiteLlm(...)` wrapper for Claude/GPT/Llama/etc. |
| `description` | One-line capability summary. Used by *other* LLMs deciding whether to delegate to this agent. Make it precise. |
| `instruction` | The system prompt. Can use `{state_key}` templating to interpolate session state at runtime (e.g. `"Summarize {article_text}."`). |
| `tools` | List of Python callables (auto-wrapped as `FunctionTool`), `BaseTool` instances, `AgentTool`s, or built-ins like `google_search`. |
| `sub_agents` | Children for delegation/orchestration. |
| `output_key` | If set, ADK automatically writes the agent's final text (or structured Pydantic output) to `session.state[output_key]`. This is how data flows between agents in workflows. |
| `output_schema` / `input_schema` | Optional Pydantic `BaseModel`s for forced structured I/O. |
| `before_agent_callback` / `after_agent_callback` | Lifecycle hooks; see callbacks section. |
| `before_model_callback` / `after_model_callback` | Inspect/modify the LLM request/response. |
| `before_tool_callback` / `after_tool_callback` | Inspect/modify tool calls (great for guardrails). |
| `disallow_transfer_to_parent`, `disallow_transfer_to_peers` | Lock down delegation scope. |

A minimal LlmAgent with a tool:

```python
from google.adk.agents import LlmAgent
from google.adk.tools import google_search

researcher = LlmAgent(
    name="researcher",
    model="gemini-flash-latest",
    description="An assistant that can search the web.",
    instruction="You help users research topics thoroughly using Google Search when needed.",
    tools=[google_search],
)
```

**Tools as plain functions.** ADK auto-wraps Python functions in a `FunctionTool` by reading the type hints and docstring. The docstring is *not* decorative — the LLM reads it to decide when and how to call the tool. Always return a `dict` with a `status` field:

```python
def get_weather(city: str) -> dict:
    """Retrieves the current weather report for a specified city.

    Args:
        city (str): The name of the city to look up.

    Returns:
        dict: status and result or error msg.
    """
    if city.lower() == "new york":
        return {"status": "success",
                "report": "Sunny, 25°C in New York."}
    return {"status": "error",
            "error_message": f"No data for '{city}'."}
```

**Output keys = the wiring of your orchestra.** This is the single concept that unlocks every workflow pattern below. When `output_key="capital_city"` is set, ADK writes the agent's final response into `session.state["capital_city"]`, and any downstream agent's `instruction` can interpolate it with `{capital_city}`.

```python
agent_a = LlmAgent(name="AgentA",
                   model="gemini-flash-latest",
                   instruction="Find the capital of France.",
                   output_key="capital_city")
agent_b = LlmAgent(name="AgentB",
                   model="gemini-flash-latest",
                   instruction="Tell me about the city stored in {capital_city}.")
```

## 3. SequentialAgent — the assembly line

`SequentialAgent` runs its `sub_agents` strictly in list order, sharing the same `InvocationContext` (and therefore the same `session.state`) so each step can read what the previous one wrote.

**When to use:** any "Plan → Execute" pipeline where the order is fixed: validate → process → report; fetch → summarize → translate; write → review → refactor.

**Canonical "code-writer / reviewer / refactorer" example from the official docs:**

```python
from google.adk.agents import SequentialAgent, LlmAgent

GEMINI_MODEL = "gemini-flash-latest"

code_writer_agent = LlmAgent(
    name="CodeWriterAgent",
    model=GEMINI_MODEL,
    instruction="Write an initial Python implementation for the user's spec. "
                "Output only code in a ```python``` block.",
    description="Writes initial code from a spec.",
    output_key="generated_code",
)

code_reviewer_agent = LlmAgent(
    name="CodeReviewerAgent",
    model=GEMINI_MODEL,
    instruction="Review this code:\n```python\n{generated_code}\n```\n"
                "List issues, or say 'No major issues found.'",
    description="Reviews code and provides feedback.",
    output_key="review_comments",
)

code_refactorer_agent = LlmAgent(
    name="CodeRefactorerAgent",
    model=GEMINI_MODEL,
    instruction="Refactor:\n```python\n{generated_code}\n```\n"
                "Apply these review comments:\n{review_comments}\n"
                "Output only the final code.",
    description="Refactors code based on review comments.",
    output_key="refactored_code",
)

code_pipeline = SequentialAgent(
    name="CodePipelineAgent",
    sub_agents=[code_writer_agent, code_reviewer_agent, code_refactorer_agent],
)
root_agent = code_pipeline
```

Because the agents share state, `{generated_code}` and `{review_comments}` resolve automatically inside instructions. This is exactly the pattern Ahsan Ayaz uses in his `1-marketing_campaign_agent` (research → messaging → ad copy → visuals → format brief), and it's the easiest live demo to run via `adk web`.

**Talk-track tip:** SequentialAgent is *not* an LLM — it's deterministic glue. Workflow agents themselves never reason; they orchestrate.

## 4. ParallelAgent — fan-out / gather

`ParallelAgent` runs its `sub_agents` **concurrently** in separate `InvocationContext.branch`es while still sharing one `session.state`. Use it when you have independent, latency-bound tasks — typically multiple research fetches, multiple analyses of the same input, or multiple API calls.

**Critical pitfall to put on a slide:** parallel children share state. Each child must write to a *different* `output_key` to avoid race conditions, and they cannot read each other's outputs during execution — only a downstream "gather" agent can.

**Canonical "fan-out / gather" pattern (climate research):**

```python
from google.adk.agents import LlmAgent, ParallelAgent, SequentialAgent
from google.adk.tools import google_search

GEMINI_MODEL = "gemini-flash-latest"

renewable_researcher = LlmAgent(
    name="RenewableEnergyResearcher",
    model=GEMINI_MODEL,
    instruction="Research 'renewable energy sources'. Use google_search. "
                "Output a 1-2 sentence summary only.",
    description="Researches renewable energy.",
    tools=[google_search],
    output_key="renewable_energy_result",
)

ev_researcher = LlmAgent(
    name="EVResearcher",
    model=GEMINI_MODEL,
    instruction="Research 'electric vehicle technology'. Use google_search. "
                "Output a 1-2 sentence summary only.",
    description="Researches EV technology.",
    tools=[google_search],
    output_key="ev_technology_result",
)

carbon_researcher = LlmAgent(
    name="CarbonCaptureResearcher",
    model=GEMINI_MODEL,
    instruction="Research 'carbon capture methods'. Use google_search. "
                "Output a 1-2 sentence summary only.",
    description="Researches carbon capture.",
    tools=[google_search],
    output_key="carbon_capture_result",
)

# FAN-OUT: run all three in parallel
parallel_research = ParallelAgent(
    name="ParallelResearch",
    sub_agents=[renewable_researcher, ev_researcher, carbon_researcher],
)

# GATHER: synthesize the results
synthesizer = LlmAgent(
    name="Synthesizer",
    model=GEMINI_MODEL,
    instruction=(
        "Combine these summaries into a single structured report.\n"
        "- Renewable: {renewable_energy_result}\n"
        "- EVs: {ev_technology_result}\n"
        "- Carbon capture: {carbon_capture_result}"
    ),
)

# Wrap in a SequentialAgent so synthesis happens AFTER parallel fetch completes
root_agent = SequentialAgent(
    name="ResearchAndSynthesize",
    sub_agents=[parallel_research, synthesizer],
)
```

**When to use ParallelAgent:**

- Multiple independent web searches or API fan-outs.
- Multiple lenses on the same input (security audit + style audit + perf audit on a pull request).
- Multi-model cross-check (run the same prompt through 3 models and have a synthesizer vote).

**When not to use it:** any time agent B depends on agent A's output — use Sequential there. Race conditions on the same state key will silently overwrite each other.

## 5. LoopAgent — iterative refinement

`LoopAgent` runs its `sub_agents` sequentially **in a loop** until one of two conditions terminates it:

1. **`max_iterations`** is reached (you should always set this as a safety net).
2. A sub-agent yields an `Event` whose `EventActions.escalate=True` — this is ADK's universal "break" statement.

The `InvocationContext` is the same on every iteration, so loop counters, flags, and accumulating state survive across rounds.

**Two ways to terminate** (covered on Mete Atamel's and Guillaume Laforge's ADK blogs):

- **Tool-based:** the critic agent has an `exit_loop` tool which sets `tool_context.actions.escalate = True`.
- **Custom checker agent:** a tiny `BaseAgent` reads state and yields `Event(actions=EventActions(escalate=is_done))`.

**Iterative writer / critic example (from official LoopAgent docs):**

```python
from google.adk.agents import LoopAgent, LlmAgent
from google.adk.tools.tool_context import ToolContext
from google.adk.agents.callback_context import CallbackContext

GEMINI_MODEL = "gemini-flash-latest"
STATE_CURRENT_DOC = "current_document"
STATE_CRITICISM = "criticism"
COMPLETION_PHRASE = "No major issues found."

def exit_loop(tool_context: ToolContext):
    """Call ONLY when no further changes are needed — ends the loop."""
    tool_context.actions.escalate = True
    if tool_context.state.get("_exit_loop_called"):
        return {"status": "noop", "message": "Already called. Output Approved and stop."}
    tool_context.state["_exit_loop_called"] = True
    return {"status": "loop_exited", "message": "Loop terminated. Output Approved and stop."}

def init_topic(callback_context: CallbackContext):
    if STATE_CURRENT_DOC not in callback_context.state:
        callback_context.state[STATE_CURRENT_DOC] = (
            callback_context.user_content.parts[0].text
        )

writer = LlmAgent(
    name="Writer",
    model=GEMINI_MODEL,
    instruction=("Rewrite or improve the document in state:\n"
                 "{current_document}\n"
                 "Address any criticism in {criticism?}."),
    output_key=STATE_CURRENT_DOC,
)

critic = LlmAgent(
    name="Critic",
    model=GEMINI_MODEL,
    instruction=(
        f"Critique:\n{{current_document}}\n"
        f"If no major issues, call the exit_loop tool. "
        f"Otherwise, output specific suggestions."
    ),
    tools=[exit_loop],
    output_key=STATE_CRITICISM,
)

refinement_loop = LoopAgent(
    name="RefinementLoop",
    max_iterations=5,
    sub_agents=[writer, critic],
)

root_agent = LlmAgent(
    name="DocRefiner",
    model=GEMINI_MODEL,
    instruction="Run the refinement_loop on the user's document.",
    sub_agents=[refinement_loop],
    before_agent_callback=init_topic,
)
```

**Recommended live demo:** an "image-count corrector" or a "story polish" loop — both make the iteration visible in the ADK Web UI's Events tab.

**Talk-track pitfall to call out:** the `after_agent_callback` cannot escalate. The supported pattern is a dedicated checker sub-agent or an `exit_loop` tool. (This is a frequently asked question on the `adk-python` discussions.)

## 6. Agent-to-agent delegation (LLM-driven transfer + AgentTool)

For dynamic, non-deterministic routing you give a parent `LlmAgent` a list of `sub_agents` and *let the LLM decide* who to hand off to. Behind the scenes, ADK's `AutoFlow` injects a `transfer_to_agent(agent_name=...)` function declaration and routes execution accordingly. The LLM uses each sub-agent's **`description`** to choose.

```python
from google.adk.agents import LlmAgent

billing_agent = LlmAgent(
    name="Billing",
    model="gemini-flash-latest",
    description="Handles billing inquiries and payment issues.",
    instruction="You answer billing and payment questions.",
)

support_agent = LlmAgent(
    name="Support",
    model="gemini-flash-latest",
    description="Handles technical support and login problems.",
    instruction="You answer technical support questions.",
)

coordinator = LlmAgent(
    name="HelpDeskCoordinator",
    model="gemini-flash-latest",
    instruction=("Route the user request: use Billing for payments, "
                 "Support for technical issues."),
    description="Main help-desk router.",
    sub_agents=[billing_agent, support_agent],
)
root_agent = coordinator
```

When the user says "My payment failed," the coordinator's LLM emits `FunctionCall(name='transfer_to_agent', args={'agent_name':'Billing'})` and ADK switches focus. To lock down delegation, pass `disallow_transfer_to_parent=True` and/or `disallow_transfer_to_peers=True` on a sub-agent.

**Coordinator-as-tool alternative (explicit invocation).** If you want the parent to *call* the specialist synchronously and incorporate its answer rather than handing off, wrap the specialist in `AgentTool`:

```python
from google.adk.tools import agent_tool

artist_agent = LlmAgent(
    name="Artist",
    model="gemini-flash-latest",
    instruction="Write a prompt, then call ImageGen to generate it.",
    tools=[agent_tool.AgentTool(agent=image_gen_agent)],
)
```

Use `sub_agents` for "delegate and the conversation moves there"; use `AgentTool` for "call this specialist like a function and continue."

## 7. Session state, context, and callbacks

Within one invocation, all agents share a `Session` (with `session.state`, `session.events`, and references to artifacts) via the `InvocationContext`. Three ways to write/read state:

- **Implicit via `output_key`** — the cleanest pattern. The agent's final response becomes `session.state[output_key]`.
- **Explicit in tools** — `tool_context.state["my_key"] = value` inside a `FunctionTool`. State writes are committed as part of the event the tool yields.
- **Explicit in callbacks** — `callback_context.state["my_key"] = value` in `before_/after_agent_callback`.

Templating in instructions uses `{key}` (raises if missing) or `{key?}` (silently empty if missing). This is invaluable for LoopAgent first iterations where downstream state hasn't been written yet.

**State prefixes** carry scoping semantics:

| Prefix | Scope |
|---|---|
| `user:` | Per-user, persists across sessions |
| `app:` | Per-app, shared across all users |
| `temp:` | Invocation-only, never persisted |
| *(none)* | Session-scoped |

For local dev, ADK ships `InMemorySessionService`. For production, you swap it for `DatabaseSessionService` or the Vertex AI Agent Engine session service. The session service is what makes "rewind sessions" and `adk web`'s state inspector work — point this out on stage and click the **State** tab to show the JSON whiteboard live.

### Callbacks: observe, override, or block

Every agent that inherits from `BaseAgent` supports six lifecycle hooks:

- `before_agent_callback(callback_context)` — runs before `_run_async_impl`. Return `None` to continue, or return a `types.Content` to short-circuit and use that as the agent's output (great for caching, auth gates).
- `after_agent_callback(callback_context)` — runs after success. Return `None` to keep the original output, or `types.Content` to replace/append it.
- `before_model_callback` / `after_model_callback` — only on `LlmAgent`. Inspect/modify the LLM request or response (guardrails, redaction, profanity filters, response rewriting).
- `before_tool_callback` / `after_tool_callback` — short-circuit a tool call (return a `dict` to act as the mocked tool result) or sanitize tool output.

```python
from google.adk.agents import Agent
from google.adk.agents.callback_context import CallbackContext

def log_before(callback_context: CallbackContext):
    print(f"➡️  Entering {callback_context.agent_name}")
    return None  # continue

def log_after(callback_context: CallbackContext):
    print(f"⬅️  Leaving  {callback_context.agent_name}")
    return None

root_agent = Agent(
    model="gemini-flash-latest",
    name="root_agent",
    description="A helpful assistant.",
    instruction="Answer user questions to the best of your knowledge.",
    tools=[get_weather],
    before_agent_callback=log_before,
    after_agent_callback=log_after,
)
```

**Important gotcha for the talk:** the Python callback parameter must be named exactly `callback_context` (or `tool_context` for tool callbacks). ADK passes it by keyword — renaming it to `ctx` raises `TypeError` at runtime. And if you write your own `runner.run_async` loop and `break` on `event.is_final_response()`, the `after_agent_callback` may never fire — using `adk run` or `adk web` avoids this. (See `adk-python` Issue #1695.)

## 8. MCP toolsets — plugging in external tool servers

`McpToolset` is ADK's MCP (Model Context Protocol) client. You drop it into an agent's `tools=[...]` list and ADK auto-discovers all tools the MCP server exposes and proxies calls through the protocol.

**Local stdio MCP server (filesystem example from the official docs):**

```python
import os
from google.adk.agents import LlmAgent
from google.adk.tools.mcp_tool import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StdioConnectionParams
from mcp import StdioServerParameters

TARGET_FOLDER = os.path.abspath("./workspace")

root_agent = LlmAgent(
    model="gemini-flash-latest",
    name="filesystem_assistant",
    instruction="Help the user manage their files.",
    tools=[
        McpToolset(
            connection_params=StdioConnectionParams(
                server_params=StdioServerParameters(
                    command="npx",
                    args=["-y", "@modelcontextprotocol/server-filesystem", TARGET_FOLDER],
                )
            ),
            # tool_filter=["read_file", "list_directory"],  # optional whitelist
        ),
    ],
)
```

**Remote MCP server over HTTP/SSE (GitHub example from the official ADK integrations announcement):**

```python
from google.adk.agents import Agent
from google.adk.tools.mcp_tool import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StreamableHTTPServerParams

root_agent = Agent(
    model="gemini-flash-latest",
    name="github_agent",
    instruction="Help users work with GitHub.",
    tools=[
        McpToolset(
            connection_params=StreamableHTTPServerParams(
                url="https://api.githubcopilot.com/mcp/",
                headers={"Authorization": f"Bearer {GITHUB_TOKEN}"},
            ),
        ),
    ],
)
```

`tool_filter=[...]` is your friend here: it shrinks the tool catalog presented to the LLM, which both prevents accidental dangerous actions and reduces tool-selection confusion.

**Key things to mention on stage:**

- MCP is a *protocol*, ADK is a *framework*; `McpToolset` is the bridge.
- Both stdio (subprocess) and HTTP/SSE remote servers are supported.
- MCP sessions are stateful, so for production deployments with many users you must think about session affinity / connection lifecycle.

## 9. The AhsanAyaz/ai-agents-google-adk repository

The repository at `github.com/AhsanAyaz/ai-agents-google-adk` (45 stars, 28 forks at time of writing) is a numbered tutorial-series scaffold paralleling Ahsan's video series. Top-level structure:

```
ai-agents-google-adk/
├── 1-marketing_campaign_agent/
├── 2-tools_agent/
├── 3-multi-model/
├── 4-structured-output/
├── 5-sessions-and-agents/
├── 6-deploying-agents/
├── 7-agents-and-callbacks/
├── Readme.md
└── requirements.txt
```

Each numbered folder is a self-contained ADK package (an `agent.py`, `__init__.py`, and usually an `instruction.py` of prompt strings) you can run with `adk web` from the repo root.

### What each module demonstrates (inferred from the README and folder names)

- **`1-marketing_campaign_agent`** — the flagship example. A `SequentialAgent` that takes a product idea, then runs specialized `LlmAgent`s in order: market-trend research → key messaging → ad-copy variations → visual-concept suggestions → format final brief. Uses Google Search as a built-in tool and passes data between agents through `output_key` / `{state_key}` instructions. This is the cleanest "SequentialAgent narrative" you can demo from the repo.
- **`2-tools_agent`** — introduces `FunctionTool` (custom Python functions) and built-ins. Likely the place to lift a "tool definition" snippet from for your talk.
- **`3-multi-model`** — mixing models, almost certainly via the `LiteLlm(model="...")` wrapper so the same agent code can run against Claude / OpenAI / Ollama in addition to Gemini.
- **`4-structured-output`** — Pydantic `output_schema` on `LlmAgent` to force JSON output for downstream programmatic use.
- **`5-sessions-and-agents`** — session state, `InMemorySessionService`, the `output_key` whiteboard pattern, and probably a coordinator-with-subagents structure.
- **`6-deploying-agents`** — production deployment, almost certainly the `adk deploy cloud_run` path or Agent Engine; useful to namecheck on a "what's next" slide.
- **`7-agents-and-callbacks`** — `before_/after_agent_callback`, `before_/after_model_callback`, `before_/after_tool_callback`. Perfect for the "observability and guardrails" beat of your talk.

The README's stated learning goals for Part 1 are an excellent talk-outline mirror: "Defining specialized `LlmAgent` components → Orchestrating in a specific sequence using `SequentialAgent` → Using built-in tools (Google Search) → Passing state/information between agents → Running locally via `adk run` → Visualizing in the ADK Web UI (`adk web`)."

**Run instructions** (from the README): activate venv, set `GOOGLE_API_KEY` in `.env` in each agent folder, then from the repo root run `adk web` and pick the agent from the dropdown. The repo's MIT licensed and explicitly designed for live-demo use.

> Note: the repository tree was confirmed via the GitHub page fetch (folders 1 through 7). The individual `agent.py` contents could not be inspected directly during this research, so the per-folder descriptions above are inferred from the numbered topic names, the README, and how those topics are typically structured in ADK tutorials. Open each folder before the talk to copy the exact code and credit Ahsan on the title slide.

## 10. Google's adk-samples and other reference patterns

`github.com/google/adk-samples` ships an enormous catalog of reference agents in Python, Go, Java and TypeScript. The Python subtree alone (`python/agents/`) currently contains 30+ examples. The ones most relevant to a multi-agent orchestration talk:

- **`gemini-fullstack`** — production-quality full-stack agent with a React UI; useful as a "this is what a deployed orchestra looks like" closing slide.
- **`marketing-agency`** — a coordinator agent delegating to specialist marketing sub-agents; conceptually overlapping with Ahsan's Module 1 and a good comparison.
- **`academic-research`** and **`deep-search`** — parallel research fan-out / synthesizer patterns.
- **`llm-auditor`** — generator-critic loop pattern; pairs naturally with the LoopAgent section.
- **`data-science`** and **`machine-learning-engineering`** — hierarchical task decomposition.
- **`software-bug-assistant`** — used by Google's own "Tools Make an Agent" blog post, demonstrates `FunctionTool` + `McpToolset` (GitHub) + Google Search tool wrapped via `AgentTool`.
- **`fomc-research`**, **`financial-advisor`**, **`travel-concierge`** — long-form multi-step research pipelines.
- **`customer-service`** — coordinator/dispatcher pattern.

Also worth namechecking on a "where to go next" slide:

- **Google Codelabs — "Build Multi-Agent Systems with ADK"** (`codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk`): a movie-pitch generator that progressively introduces SequentialAgent, ParallelAgent, then LoopAgent — almost exactly the arc of your talk.
- **Google Cloud blog: "Build multi-agentic systems using Google ADK"** — a travel-planner that demonstrates Sequential→Parallel→Sequential fan-out/gather plus a reviewer feedback loop.
- **Developer Blog: "Developer's guide to multi-agent patterns in ADK"** — the post that codified the "code review swarm" example you saw in section 4.
- **`Sri-Krishna-V/awesome-adk-agents`** — community-curated list of 80+ ADK agents from a $50K hackathon, useful for additional inspiration.

## 11. Multi-agent patterns and best practices

From the official multi-agent docs and Google's own developer-blog write-ups, the named patterns you should put on a slide are:

| Pattern | Primitives | Use case |
|---|---|---|
| **Coordinator / Dispatcher** | `LlmAgent` parent + `sub_agents` (LLM-driven transfer) or `AgentTool` | Routing customer requests to specialists |
| **Sequential Pipeline** | `SequentialAgent` + `output_key` + `{state}` templating | Plan→Execute, Draft→Review→Refactor, Validate→Process→Report |
| **Parallel Fan-Out / Gather** | `ParallelAgent` inside a `SequentialAgent` | Independent research, multi-API enrichment, code-review swarm |
| **Hierarchical Task Decomposition** | Nested `sub_agents` trees | Manager → team lead → individual contributor decomposition |
| **Generator-Critic (Review/Critique)** | Two `LlmAgent`s + `output_key` | Quality assurance, hallucination checking |
| **Iterative Refinement** | `LoopAgent` + critic with `escalate` tool | Self-correcting writing, code that must pass tests, "generate N items" loops |
| **Human-in-the-Loop** | Custom `FunctionTool` that pauses and awaits external approval | Compliance gates, content moderation |

### Best practices distilled from the official docs and Google Developer Blog

1. **Start simple.** Build a single LlmAgent, then a 2-step Sequential, *then* introduce Parallel and Loop. Don't open with a nested workflow.
2. **`description` is your delegation API.** When you use `sub_agents` + LLM-driven transfer, the parent LLM picks targets purely from each sub-agent's `description`. Write them precisely.
3. **`output_key` is your wire.** Use descriptive keys like `validation_status`, `draft_v1`, `critique` — they become the contract between agents.
4. **Always set `max_iterations` on `LoopAgent`.** Even with an `escalate` exit tool. It's a safety net against runaway costs.
5. **In `ParallelAgent`, give every child a unique `output_key`.** Shared state plus concurrent writes = silent overwrites.
6. **Use `{key?}` in instructions for keys that may be empty on first pass** (especially common in LoopAgent iteration 1).
7. **Don't put long instructions in coordinators.** A coordinator's instruction should be a small routing policy ("Use Billing for X, Support for Y"). Long instructions trick the LLM into doing the work itself instead of delegating.
8. **Use callbacks for observability, not control flow.** Use `before_model_callback` for guardrails, `after_tool_callback` for sanitization. Don't try to escalate a loop from `after_agent_callback` — it isn't supported.
9. **Validate the agent tree before deploying.** Each agent instance can have only one parent. If you need the same agent in two places, instantiate it twice with different names.
10. **Use the `adk web` UI's Events and State tabs to debug.** The State tab shows the live `session.state` JSON; the Events tab shows every function call, transfer, and tool result.

### Common pitfalls to highlight on stage

- **Forgetting `output_key`** — the next agent's `{key}` template renders as the literal string `{key}` and you wonder why downstream agents are confused.
- **Wrong callback parameter name** — must be exactly `callback_context` or `tool_context`. Renaming raises `TypeError`.
- **Breaking out of `runner.run_async` on first final response** — the official quickstart does this, but it suppresses `after_agent_callback` (see Issue #1695). Prefer `adk run` / `adk web`, or iterate to end-of-stream.
- **Coordinator never delegates** — usually because sub-agent `description` is missing or too generic, or coordinator's instruction tells it to "answer the user" instead of "delegate."
- **ParallelAgent race conditions** — two children writing to the same state key. Always partition the keys.
- **No termination on LoopAgent** — set `max_iterations` *and* design at least one exit condition (escalate tool or checker agent).

## 12. End-to-end demo composition (the "Agentic Orchestra")

Below is a single, copy-pasteable file that exercises **SequentialAgent**, **ParallelAgent**, and **LoopAgent** in one composition — perfect for a 20-minute talk's climactic demo. It builds a content-creation orchestra: parallel research, sequential drafting, then an iterative critic loop.

```python
# orchestra.py — drop into ./orchestra/agent.py and run `adk web` from the parent dir.
from google.adk.agents import (
    LlmAgent,
    SequentialAgent,
    ParallelAgent,
    LoopAgent,
)
from google.adk.tools import google_search
from google.adk.tools.tool_context import ToolContext

MODEL = "gemini-flash-latest"

# -- 1. PARALLEL RESEARCH (fan-out) -------------------------------------------
trend_researcher = LlmAgent(
    name="TrendResearcher",
    model=MODEL,
    description="Researches current trends for a topic.",
    instruction="Use google_search to find 3 current trends about: {topic}. "
                "Output a short bullet list.",
    tools=[google_search],
    output_key="trends",
)

audience_researcher = LlmAgent(
    name="AudienceResearcher",
    model=MODEL,
    description="Researches target audience for a topic.",
    instruction="Use google_search to identify the target audience for: {topic}. "
                "Output 3 concise persona bullets.",
    tools=[google_search],
    output_key="audience",
)

competitor_researcher = LlmAgent(
    name="CompetitorResearcher",
    model=MODEL,
    description="Researches competitors for a topic.",
    instruction="Use google_search to find 3 competing pieces of content about: {topic}. "
                "Output title + one-line summary each.",
    tools=[google_search],
    output_key="competitors",
)

research_team = ParallelAgent(
    name="ResearchTeam",
    sub_agents=[trend_researcher, audience_researcher, competitor_researcher],
)

# -- 2. SEQUENTIAL DRAFT -------------------------------------------------------
outliner = LlmAgent(
    name="Outliner",
    model=MODEL,
    description="Creates an outline from research.",
    instruction=(
        "Build a 5-section outline for an article about {topic}.\n"
        "Use:\n- Trends: {trends}\n- Audience: {audience}\n- Competitors: {competitors}"
    ),
    output_key="outline",
)

drafter = LlmAgent(
    name="Drafter",
    model=MODEL,
    description="Drafts the article.",
    instruction="Write a first draft of the article from this outline:\n{outline}",
    output_key="draft",
)

# -- 3. ITERATIVE CRITIC LOOP --------------------------------------------------
def exit_loop(tool_context: ToolContext) -> dict:
    """Call ONLY when the draft is publish-ready."""
    tool_context.actions.escalate = True
    if tool_context.state.get("_exit_loop_called"):
        return {"status": "noop", "message": "Already called. Output Approved and stop."}
    tool_context.state["_exit_loop_called"] = True
    return {"status": "loop_exited", "message": "Loop terminated. Output Approved and stop."}

reviser = LlmAgent(
    name="Reviser",
    model=MODEL,
    description="Revises the draft based on critique.",
    instruction=(
        "Revise the draft:\n{draft}\n\n"
        "Apply the latest critique:\n{critique?}\n\n"
        "Output only the revised article."
    ),
    output_key="draft",  # overwrites each iteration
)

critic = LlmAgent(
    name="Critic",
    model=MODEL,
    description="Critiques the draft or signals completion.",
    instruction=(
        "Critique this draft:\n{draft}\n\n"
        "If it is clear, accurate, and well-structured for the audience "
        "({audience}), call the exit_loop tool. Otherwise output 2-3 "
        "specific improvements."
    ),
    tools=[exit_loop],
    output_key="critique",
)

refinement_loop = LoopAgent(
    name="RefinementLoop",
    max_iterations=3,
    sub_agents=[reviser, critic],
)

# -- 4. ROOT: SEQUENTIAL ORCHESTRATOR -----------------------------------------
root_agent = SequentialAgent(
    name="ContentOrchestra",
    sub_agents=[research_team, outliner, drafter, refinement_loop],
)
```

Run it locally:

```bash
pip install google-adk
export GOOGLE_API_KEY=...   # from Google AI Studio
adk web        # then pick "orchestra" and type a topic
```

**What to show on stage:**

1. Open the **Events** tab — watch the three researchers fire in parallel (interleaved events with different branch names).
2. Open the **State** tab — point at `trends`, `audience`, `competitors`, then `outline`, then `draft` appearing in turn.
3. Trigger the LoopAgent to run multiple iterations by making the topic deliberately ambiguous so the critic finds issues; then watch it call `exit_loop` once the draft is clean.

This single file demonstrates **every** primitive in the talk title's "Agentic Orchestra": sub-agents, output_key wiring, parallel fan-out/gather, sequential pipeline, and an iterative critic loop with an escalate-style exit tool — all using `gemini-flash-latest`.

## 13. Suggested 20-minute talk structure

Based on what we've covered, here's a recommended 20-minute structure:

| Time | Beat | Concept | Visual / demo |
|---|---|---|---|
| 0:00–2:00 | Hook | "Why orchestras, not soloists?" — monolithic agents vs. multi-agent systems. Modularity, specialization, structured control flow. | Slide: one giant prompt vs. a tree of small ones. |
| 2:00–4:00 | The four building blocks | `BaseAgent`, `LlmAgent`, Workflow agents, Custom agents. The single-parent rule. The three communication mechanisms. | Slide: agent-tree diagram. |
| 4:00–7:00 | `LlmAgent` deep-dive | `name`, `model="gemini-flash-latest"`, `instruction`, `description`, `tools`, `output_key`, callbacks. The "output_key is the wire" mental model. | Live `adk web` of a single agent with `google_search` and a `FunctionTool`. |
| 7:00–10:00 | SequentialAgent | The writer→reviewer→refactorer pattern. Show `{state_key}` templating. Optionally compare against Ahsan's `1-marketing_campaign_agent`. | Live demo. State tab shows `generated_code` → `review_comments` → `refactored_code`. |
| 10:00–13:00 | ParallelAgent | Fan-out / gather. Climate-research or "code-review swarm" example. Call out the unique-output_key pitfall on stage. | Live demo. Events tab shows interleaved branches. |
| 13:00–16:00 | LoopAgent | Iterative refinement with an `exit_loop` tool. Mention `max_iterations` as a safety net. Compare with `LlmAuditor` from `adk-samples`. | Live demo of the critic loop. |
| 16:00–18:30 | Putting it together | Run the `ContentOrchestra` from section 12. Open Events + State side-by-side. | The "wow" moment. |
| 18:30–20:00 | What's next | Callbacks for observability, MCP toolsets, AgentTool, ADK 2.0 graph workflows, deployment to Cloud Run / Agent Engine, A2A protocol. Pointers: `adk-samples`, AhsanAyaz repo, codelabs. | Resource slide. |

### One-slide takeaways for the audience to tweet

- ADK has **three workflow agents**: `SequentialAgent`, `ParallelAgent`, `LoopAgent` — all deterministic glue, none of them call an LLM themselves.
- The **`output_key`** parameter writes the agent's response into `session.state` and is how agents pass data downstream.
- For **dynamic routing** between specialists, pass them as `sub_agents` to an `LlmAgent`; for **synchronous calls**, wrap them in `AgentTool`.
- The two reliable ways to break a `LoopAgent` are **`max_iterations`** and a sub-agent yielding **`EventActions(escalate=True)`** (typically via an `exit_loop` tool).
- Callbacks (`before_/after_agent`, `before_/after_model`, `before_/after_tool`) are your **observability + guardrail** plane.

### Repos and docs to put on the closing slide

- Official docs: `google.github.io/adk-docs/` and `adk.dev/`
- Python SDK: `github.com/google/adk-python`
- Samples (30+ Python agents): `github.com/google/adk-samples`
- Codelab — "Build Multi-Agent Systems with ADK": `codelabs.developers.google.com`
- Ahsan Ayaz's tutorial repo: `github.com/AhsanAyaz/ai-agents-google-adk`
- Community curation: `github.com/Sri-Krishna-V/awesome-adk-agents`
- Developer-blog primer: "Developer's guide to multi-agent patterns in ADK" on `developers.googleblog.com`
- Mete Atamel's callbacks deep-dive: `atamel.dev/posts/2025/11-03_quick_guide_adk_callbacks/`

With this dossier you have: the conceptual architecture, the API for every primitive, a working multi-pattern demo file, the structure of the AhsanAyaz repo you'll reference, and a tight 20-minute pacing plan. Break a leg.

Research dossier for "Zero to Agentic Orchestra with Google ADK" delivered as a 13-section publication-ready report covering: ADK mental model and primitives; the LlmAgent constructor and output_key wiring; full Python code for SequentialAgent, ParallelAgent, and LoopAgent against gemini-flash-latest; agent-to-agent delegation (sub_agents + AgentTool); session state, callbacks, and MCP toolsets; the structure of the AhsanAyaz/ai-agents-google-adk repository; relevant google/adk-samples; named multi-agent patterns and pitfalls; a complete end-to-end "ContentOrchestra" demo file composing all three workflow agents; and a 20-minute talk pacing plan with a closing resource slide.
