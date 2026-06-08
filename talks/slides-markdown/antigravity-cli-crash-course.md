<!--
title: Antigravity CLI Crash Course
date: 2026-06-20
venue: GDG / DevFest — Community Talk
tags: AI, Agentic, CLI, Antigravity
description: From `gemini-cli` to `agy` — a 20-minute crash course on Google's agent-first terminal, the migration story, and how to not blow your foot off with YOLO mode.
-->
# Antigravity CLI Crash Course

### From `gemini-cli` to `agy` — the agent-first terminal

<small>Muhammad Ahsan Ayaz · GDE in AI & Angular</small><br/>
<small>GDG / DevFest · 2026</small>

Note:
20 minutes. By the end you'll know what `agy` is, why your `gemini` CLI is being yanked out from under you on June 18, and the three slash commands and keyboard shortcuts that matter. Slides-only — I'll keep the live demos for the workshop track. No "agentic future is exciting" filler. We're shipping the migration today.

---

<img src="assets/images/antigravity-cli-crash-course/qr-code.png" alt="Session QR"/>
<!-- .element style="height: 400px" -->

- All links related to this session
- Feedback form
- My socials

Note:
Scan this now. Slides, install scripts, the `AGENTS.md` template I use, and the migration checklist are all behind this code. TODO Ahsan: generate `qr-code.png` (currently missing from the asset folder).

---

## Who here likes AI? 🙋

--

### Who here uses AI for just coding? 🙋

--

### Do you know what I try to use AI for?

--

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
Five seconds. Don't read the slide. Just say: "I'm Ahsan, GDE in AI and Angular, I've been daily-driving `agy` since the beta, and I want the next 20 minutes back if you don't ship something with it this week." Move on.

---

## Your `gemini` CLI is being deprecated

### On **June 18, 2026**

<small>That's three days after this talk.</small>

<!-- .element: class="fragment" -->

Note:
This is the cold open. The legacy Python `gemini-cli` sunset for consumers and free tier is June 18, 2026 — confirmed in the migration docs. Enterprise API-key users keep going, everyone else has to move. Don't editorialize — just set the stakes. Ask the audience: who's still on the legacy `gemini-cli`? Show of hands.

---

## The litmus test

> _"Refactor this folder of services to use the new API client, run the tests, and fix anything that breaks."_

What we want: <!-- .element: class="fragment" -->

1. Read the codebase, propose a plan <!-- .element: class="fragment" -->

2. Edit files in parallel, not one-at-a-time <!-- .element: class="fragment" -->

3. Run the tests, read the output, course-correct <!-- .element: class="fragment" -->

4. Let me approve diffs without blocking the next step <!-- .element: class="fragment" -->

❌ What we get from legacy `gemini-cli`: it can do all of this — but synchronously. Your terminal locks while it works. <!-- .element: class="fragment" -->

Note:
This is the one-sentence stress test. Gemini CLI can technically do this — it has subagents since April 2026, it can edit multiple files, it can run tests. The catch: it does it synchronously. Your terminal locks until the whole job finishes. Ask: how many people have submitted a multi-file refactor on `gemini-cli` and watched the prompt freeze for four minutes? Land the "this is why async matters" beat here.

---

## The mental model

<div style="display:flex;gap:2rem;align-items:center;margin-top:1rem">
<div style="flex:1;text-align:center;padding:1.5rem;border:2px solid #EA4335;border-radius:8px">
<strong style="color:#EA4335">Gemini CLI</strong><br/>
<small>Subagents — but synchronous.<br/>Your terminal locks while they run.<br/>Python/Node, host-OS shell.</small>
</div>
<div style="flex:0;font-size:2rem;opacity:0.4">→</div>
<div style="flex:1;text-align:center;padding:1.5rem;border:2px solid #34A853;border-radius:8px">
<strong style="color:#34A853">Antigravity CLI (<code>agy</code>)</strong><br/>
<small>Async subagents — main thread stays live.<br/>Go runtime, 1M context, OS-native sandbox.<br/>Unified harness with Antigravity 2.0 desktop.</small>
</div>
</div>

Note:
Make this metaphor concrete. "You're not typing into a chat box anymore. You're handing off a ticket and watching the agent work." Gemini CLI got subagents in April 2026 — `agy`'s diff is the runtime: Go, async, OS-native sandbox, unified with Antigravity 2.0 desktop. Don't dwell. 60 seconds and move.

--

## You are not the typist anymore

You're the **orchestrator**.

<!-- .element: class="fragment" -->

The agent plans. The agent edits. The agent runs your test suite.

<!-- .element: class="fragment" -->

You approve diffs, course-correct, and pick the next ticket.

<!-- .element: class="fragment" -->

Note:
This is the paradigm-shift slide. The audience needs this before any of the slash commands make sense. If you treat `agy` like a synchronous turn-by-turn CLI, you fight it. If you treat it like a junior dev with a Jira ticket who works in the background while you keep prompting, it flies. State it plainly — no metaphor stack-up.

---

# Part 1

## Get it running

Note:
2 minutes. Install, auth, the one headless-SSH gotcha that bites everyone the first time. Don't dwell on install — name the curl command and move.

--

## Install — one line per OS

```bash
# macOS / Linux
curl -fsSL https://antigravity.google/cli/install.sh | bash
```

```powershell
# Windows (PowerShell)
irm https://antigravity.google/cli/install.ps1 | iex
```

<small>Statically compiled Go binary. No Python runtime. No `pip install`.</small>

Note:
Point at "no Python runtime". That's the headline difference — the old `gemini-cli` was a Python dependency hell. `agy` ships as one binary into your local user path. Run `agy` in any project root, approve "Workspace Trust" once, you're in.

--

## Auth lives in your OS keyring

| Platform | Keyring backend |
|----------|-----------------|
| macOS | Apple Keychain |
| Linux | D-Bus / secret-service |
| Windows | Credential Manager |

Headless SSH? `agy` detects it and prints an out-of-band OAuth URL — finish login on your laptop.

<!-- .element: class="fragment" -->

To sign out and purge the token: `/logout`.

<!-- .element: class="fragment" -->

Note:
The keyring detail matters because of the next slide's pitfall. Be honest about macOS reality: `agy` v1.0.5 writes the OAuth token to `~/.gemini/antigravity-cli/antigravity-oauth-token` (mode 0600) and stores an encryption key in Keychain under `Antigravity Safe Storage`. So it's file-perms + Keychain — not Keychain-only. Linux and Windows use full secret-service / Credential Manager. Either way, no token committed to a dotfile. The headless OAuth fallback is the line that makes remote development workable. <TODO Ahsan: confirm the exact OAuth-URL flow on your remote box and demo it if there's time>.

--

## ⚠️ The headless SSH pitfall

**On Linux over SSH without a D-Bus session, `agy` cannot read the keyring — it crashes.**

<!-- .element: class="fragment" -->

```bash
# BAD: bare SSH session, no D-Bus
$ agy
# → keyring: secure lock out: dbus exception: connection failed

# GOOD: wrap in a D-Bus session
$ dbus-run-session agy
```

<!-- .element: class="fragment" -->

Note:
This is the single most common install-day failure on Linux remote boxes. The error message is unhelpful — it just says `dbus`. The fix is `dbus-run-session agy` every time, or unlock the daemon at session start. Point at this slide and say "save this one for your bashrc."

---

# Part 2

## The inner loop

Note:
3-4 minutes. This is the daily-driver section. Exploration, planning, execution. The four keyboard shortcuts and three slash commands that earn the price of admission.

--

## Three phases, one conversation

1. **Explore** — agent reads the codebase, you talk in plain English
<!-- .element: class="fragment" -->

2. **Plan** *(opt-in via `/planning`)* — agent proposes an implementation plan, you redirect if wrong
<!-- .element: class="fragment" -->

3. **Execute** — agent edits, runs tests, reports back; you approve diffs
<!-- .element: class="fragment" -->

The TUI is the thing in the middle that lets you stay in flow.

<!-- .element: class="fragment" -->

Note:
`agy` boots in `/fast` — explore plus execute, plan skipped by design. For ambiguous or wide-blast-radius work, type `/planning` first — agent drafts a plan and waits for redirect before editing. Plan is the optional middle step, not the default. Tell the audience: stay in default mode for mechanical edits; flip to `/planning` when you'd want a code review.

--

## Feeding context to the agent

```bash
# In the prompt box:
@                       # interactive path picker, inserts absolute paths
ctrl+v                  # paste a screenshot — multimodal context
```

<small>`@talks/demos/inner-loop/slide-stats.js` is more useful than "the slide stats file" — the agent doesn't have to guess.</small>

<small>Live demo scenario lives in this repo at `talks/demos/inner-loop/` — buggy `countBreaks` + failing test. Prompt agy to plan + fix + run.</small>

Note:
Point at the `@` autocomplete — that's the single feature that makes `agy` feel different from a chat box. The screenshot paste is the one Windows users always discover late: drag a UI bug screenshot in, ask "why is this misaligned", get a working CSS diff. <TODO Ahsan: insert your story about the time `ctrl+v` solved a CSS bug in one shot>.

--

## Approving and reverting

| Key / Command | What it does |
|---------------|--------------|
| `ctrl+r` | Open the **Artifact Review** panel — view unified diff, press `y` to apply |
| `/rewind` (or `/undo`) | Roll the conversation back to the last stable checkpoint |
| `/fork` | Branch into a parallel session to test a speculative change |

Note:
The `/rewind` command is the safety net. When the agent breaks your build, you don't argue with it — you rewind. `/fork` is for "what if I tried this differently" without trashing the working thread. Demo `ctrl+r` on stage if the live demo is on: open a diff, point at the +/- gutter, press `y`. <TODO Ahsan: confirm `/undo` is the alias and not a separate command>.

--

## Default = `/fast`. `/planning` = opt-in deliberation

```bash
# agy boots here — execute immediately
> rename this variable across the file

# Switch in when you want plan-first
/planning
> refactor the auth folder to use the new client
```

<small>`agy` boots in `/fast`. `/planning` flips to plan-first mode for ambiguous or wide work.</small>

Note:
Read the room before showing this one. `agy` boots in `/fast` — execute mode, no planning ceremony. For ambiguous refactors, flip to `/planning` first; flip back when you're on mechanical work. Plan-first is opt-in by design — Google's bet is most of your day is small edits.

--

## ⚠️ Forgetting `/planning` for big refactors

**Default is `/fast` — execute now. Wide-blast-radius work needs `/planning` first.**

<!-- .element: class="fragment" -->

```bash
# BAD: ambiguous wide refactor under default /fast
> refactor the auth folder to use the new client and update docs
# → agent jumps in, edits three places, you scramble for /rewind

# GOOD: /planning first for ambiguous or wide work
/planning
> refactor the auth folder to use the new client and update docs
# → agent drafts plan, names files, waits for redirect
```

<!-- .element: class="fragment" -->

Note:
Pitfall cuts both ways but the common one is forgetting `/planning` for ambiguous work. `agy` defaults to `/fast` — it will jump in, edit three files, and leave you scrambling for `/rewind`. Rule of thumb: stay in `/fast` for mechanical; flip to `/planning` for anything where you'd want a code review.

---

# Part 3

## Going parallel

Note:
3 minutes. This is the section that converts skeptics. Subagents, dashboard, fast-approval keys. End on the token-burn pitfall.

--

## Subagents, in plain English

The primary agent spawns **concurrent subagents** for documentation lookups, tests, and discrete file edits — in the background, while you keep prompting.

<!-- .element: class="fragment" -->

You don't schedule them. The agent does.

<!-- .element: class="fragment" -->

<small>Gemini CLI has subagents too — but synchronous. `agy`'s differentiator is **async**: your main thread keeps going while they run.</small>

<!-- .element: class="fragment" -->

Note:
Don't oversell this. Subagents themselves aren't new — Gemini CLI shipped them in April 2026. What's new is **async**: in `agy`, two or three subagents run in the background while your main prompt stays live. In Gemini CLI, the terminal locks until they return. Make that the punchline.

--

## The three controls that matter

| Key / Command | What it does |
|---------------|--------------|
| `/agents` | Full-screen dashboard — status and logs of every subagent |
| `ctrl+j` (or `alt+j`) | **Teleport** to the next subagent waiting for permission |
| `ctrl+k` | **Fast-approve** the surfaced permission without leaving your thread |

Note:
`ctrl+j` is the keyboard shortcut that makes parallel work feasible. Without it, you'd context-switch through a menu every time a subagent needs approval. `ctrl+k` is for the "yes, that's fine, keep going" case — instant approve, stay in conversation. Demo the dashboard live if the connection's up.

--

## ⚠️ The token burn rate

**Multi-agent swarms consume tokens exponentially. Ten subagents on Flash 3.5 will eat a free-tier quota for breakfast.** 💸

<!-- .element: class="fragment" -->

```bash
# BAD: unbounded parallelism on free tier
> refactor the entire monorepo, run all the tests, write the changelog

# GOOD: scope the work or pin a budget
> refactor the auth/ folder. Don't spawn more than 3 subagents.
# (and configure model + concurrency in settings.json)
```

<!-- .element: class="fragment" -->

Note:
This is the bill-shock pitfall. <TODO Ahsan: insert your token-spend story — the one where parallel subagents burned through your free quota in an afternoon>. Point at the slide and say: scope your prompts, cap your concurrency in settings, watch your billing dashboard. The agent is happy to spend your money.

---

# Part 4

## Make it yours

Note:
3 minutes. Skills, plugins, MCP. The three extensibility surfaces. End on the MCP schema pitfall — that one is fresh and bites every migrator.

--

## Three surfaces for customization

<div style="display:flex;gap:1.5rem;margin-top:2rem">
<div style="flex:1;padding:1rem;border:2px solid #4285F4;border-radius:8px" class="fragment">
<h3 style="color:#4285F4">Skills</h3>
Markdown files with YAML frontmatter. Become slash commands.
</div>
<div style="flex:1;padding:1rem;border:2px solid #EA4335;border-radius:8px" class="fragment">
<h3 style="color:#EA4335">Plugins</h3>
Bundled directories of skills, hooks, and agents. Installable from GitHub.
</div>
<div style="flex:1;padding:1rem;border:2px solid #34A853;border-radius:8px" class="fragment">
<h3 style="color:#34A853">MCP</h3>
Live tool servers — Postgres, GitHub, Linear, your internal APIs.
</div>
</div>

Note:
Most people start with Skills because they're just markdown files. Plugins come next when you want to share a workflow with the team. MCP is the heavy hitter — that's how the agent gets real tools.

--

## A skill is a markdown file

```markdown
<!-- .agents/skills/ship-it/SKILL.md -->
---
name: ship-it
description: Run the test suite, then commit and push if green.
---

# ship-it

Run `npm test`. If exit code is 0:
1. Stage all changes
2. Commit with a conventional-commit message inferred from the diff
3. Push to the current branch

If exit code is non-zero, stop and surface the failing tests.
```

<small>One folder per skill: `.agents/skills/ship-it/SKILL.md`. Invoke as `/ship-it`.</small>

Note:
Point at the frontmatter — the `description` field is what the agent reads to decide when to invoke this skill if you mention it in conversation. Treat it like a tool description. The body is the procedure. <TODO Ahsan: confirm exact frontmatter field names — `name` and `description` from the dump, but the YAML spec may have more>.

--

## Installing plugins and MCP servers

```bash
# Plugin from GitHub
agy plugin install github.com/<org>/<plugin-repo>
# → installs into ~/.gemini/antigravity-cli/plugins/

# MCP manager (visual overlay)
/mcp
```

<small>Plugins ship as directories. MCP servers ship as processes. `/mcp` is the visual control panel.</small>

Note:
The `agy plugin install` flow is the closest thing to `npm install` for agent workflows. Show the directory layout on the next slide. <TODO Ahsan: confirm whether the install path is `~/.gemini/antigravity-cli/plugins/` long-term or if it migrates to `~/.agents/`>.

--

## ⚠️ MCP schema breaking change

**Legacy remote-server keys silently fail. Use `serverUrl`.**

<!-- .element: class="fragment" -->

```json
// BAD: legacy keys from the old gemini-cli MCP format
{
  "mcpServers": {
    "linear": { "url": "https://mcp.linear.app/sse" },
    "github": { "httpUrl": "https://mcp.github.com/sse" }
  }
}

// GOOD: new schema in mcp_config.json
{
  "mcpServers": {
    "linear":  { "serverUrl": "https://mcp.linear.app/sse" },
    "github":  { "serverUrl": "https://mcp.github.com/sse" }
  }
}
```

<!-- .element: class="fragment" -->

Note:
This is the silent killer. No error is raised — the legacy keys are just ignored, the server never connects, and you spend an hour wondering why the agent can't see Linear. Save this slide. Point at `serverUrl` and tell the audience: rename the key, restart `agy`, done.

---

# Part 5

## Don't blow your foot off

Note:
3 minutes. Security and safety controls. The YOLO pitfall is the strongest in the deck — frame it that way. "Save this one" energy.

--

## Sandboxing — built in, OS-native

| OS | Sandbox backend |
|----|-----------------|
| Linux | `nsjail` |
| macOS | `sandbox-exec` |
| Windows | AppContainer |

Zero startup overhead. No Docker. Off by default — enable with one settings flag.

<!-- .element: class="fragment" -->

Note:
This is the underrated feature. The old way was "spin up a Docker VM and pray". `agy` uses what's already in the OS. The performance penalty is effectively zero — but it ships off by default. One settings flag turns it on. Walk through the flip on the next slide.

--

## Permissions — rules engine

```text
/permissions  →  scope: Project / Shared / Global
              →  list:  allowlist / denylist / asklist
              →  rule:  action(target)
```

| Action | Target |
|--------|--------|
| `read_file` / `write_file` | path or `*` |
| `read_url` / `execute_url` | domain or `*` |
| `command` | prefix, regex, or `*` |
| `unsandboxed` | bypass sandbox for prefix |
| `mcp` | `server/tool` or `*` |

Precedence: **Deny > Ask > Allow**. Workspace files auto-allow; URLs ask.

⚠️ Rules are **per action**. `deny write_file(/etc)` does NOT block `command(sudo tee /etc/...)`. Sandbox closes the gap.

<!-- .element: class="fragment" -->

Enforce sandbox globally:

```json
// ~/.gemini/antigravity-cli/settings.json
{ "enableTerminalSandbox": true }
```

Note:
No modes, no presets — it's a rules engine. `action(target)` shape, three lists per scope (Project / Shared with Antigravity / Global). Precedence is the big idea: Deny beats Ask beats Allow. So you can `allow command(*)` for productivity, then `deny command(rm -rf)` as a safety net and the deny wins. Workspace files auto-allow, URLs default to ask. The one trap to internalize: rules are scoped per action. If you deny `write_file(/etc)` the agent will route around via `command(sudo tee /etc/...)` — different action, different rule, no block. Authorization is narrow. That's why the sandbox is a separate axis — `enableTerminalSandbox` true in settings.json confines every shell command to `sandbox-exec` / `nsjail` / AppContainer depending on OS. Two layers: authorization (what may run) + containment (where it can reach).

--

## YOLO mode

```bash
agy --dangerously-skip-permissions
```

Bypasses every authorization prompt. Lets the agent run unattended through massive refactors or CI jobs.

<!-- .element: class="fragment" -->

It is **exactly** what it sounds like.

<!-- .element: class="fragment" -->

Note:
Don't moralize. State what it is and what it's for. The legitimate use is CI runners inside containers — see the "what's next" slide. The illegitimate use is "I want it to stop asking me" on your laptop. Lead the audience to the next slide.

--

## ⚠️ YOLO without sandbox

**`--dangerously-skip-permissions` outside a sandbox lets a hallucinating agent `rm -rf` your home directory.**

<!-- .element: class="fragment" -->

```bash
# BAD: YOLO on your laptop, sandbox off
agy --dangerously-skip-permissions

# GOOD: YOLO inside a container with sandbox enforced
docker run --rm -v $PWD:/work my-agy-image \
  agy --dangerously-skip-permissions
# (settings.json inside the image has enableTerminalSandbox: true)
```

<!-- .element: class="fragment" -->

Note:
This is the strongest pitfall in the deck. Save this one. <TODO Ahsan: insert your YOLO horror story — the time an agent did something destructive without the sandbox, or the cautionary one you heard secondhand>. Point at the BAD line and say: every CI runner I trust does the GOOD version. Pause. Move on.

---

# Part 6

## Coming from `gemini-cli`?

Note:
2 minutes. Migration. The audience for this section is people who already have a workflow on the legacy CLI. Make it cheap to switch.

--

## What ports cleanly

- `GEMINI.md` and `AGENTS.md` context rules — **drop them in, no edits needed**
<!-- .element: class="fragment" -->

- `~/.gemini/settings.json` — auto-imported on first launch
<!-- .element: class="fragment" -->

- Keyring entries — migrated by the onboarding script
<!-- .element: class="fragment" -->

Note:
Lead with the good news. The two files most people care about — `AGENTS.md` and the settings JSON — transition with zero edits. That's the line that gets the room to commit to the migration.

--

## What you have to move

```bash
# Import legacy extensions as native plugins
agy plugin import gemini   # or: agy plugin import claude
agy plugin list            # verify

# Each custom skill is a folder + SKILL.md
.agents/skills/my-skill/SKILL.md
```

<small>`agy plugin import gemini` walks your old extensions and brings them over as plugins. Skills live one-folder-per-skill under `.agents/skills/`.</small>

Note:
The command is `agy plugin import gemini` — pulls your legacy extensions over as native plugins, same flow works for claude. Run `agy plugin list` to confirm. Skills are separate: folder per skill with a SKILL.md inside, under `.agents/skills`. Tell the audience: "if your old `/foo` doesn't appear after import, it's a skill not an extension — check the skills folder."

--

## ⚠️ Migration gotchas

1. **Themes don't survive** — heavily customized color schemes and experimental overlays from `gemini-cli` won't load
<!-- .element: class="fragment" -->

2. **Free-tier quota burns faster** — multi-agent parallelism hits limits sooner than the old synchronous CLI did
<!-- .element: class="fragment" -->

3. **Windows PATH refresh** — installer drops the binary in `%LOCALAPPDATA%\agy\bin`, but env vars don't refresh until you restart the terminal
<!-- .element: class="fragment" -->

Note:
Three real failure modes. #2 is the one that surprises people most — they upgrade thinking it's "just a new CLI" and discover the bill went up because the new architecture is actually using the model harder. #3 is the most common Windows install-day support question. Tell them: close every terminal window after install, reopen, then try.

---

<!-- .slide: style="font-size: 0.8em;" -->

## Patterns cheat sheet

| Command / Key | Surface | Use when |
|---------------|---------|----------|
| `@<path>` | Prompt box | Inserting absolute file paths into context |
| `ctrl+v` | Prompt box | Pasting a screenshot for multimodal context |
| `ctrl+r` | TUI | Opening the Artifact Review panel to approve diffs |
| `ctrl+j` (`alt+j`) | TUI | Teleporting to the next waiting subagent |
| `ctrl+k` | TUI | Fast-approving a surfaced permission |
| `/agents` | Slash | Opening the subagent dashboard |
| `/mcp` | Slash | Managing MCP server integrations |
| `/permissions` | Slash | Rules editor: `action(target)` allow/deny/ask, scope Project/Shared/Global |
| `/rewind` (`/undo`) | Slash | Rolling back to the last stable checkpoint |
| `/fork` | Slash | Branching into a parallel session |
| `/fast` (default) / `/planning` | Slash | Mode toggle — `/fast` executes immediately, `/planning` plans first |

Note:
This is the slide people screenshot. Don't read it line by line — point out that the keyboard shortcuts are the ones you'll use 50 times a day, and the slash commands are the ones you'll use 5 times a day. The QR on slide 2 has all of this in a printable cheat sheet. <TODO Ahsan: add the printable cheat sheet PDF to the QR target>.

--

<!-- .slide: style="font-size: 0.8em;" -->

## Common pitfalls

1. **Headless SSH without D-Bus** — keyring crash on Linux remote boxes; wrap with `dbus-run-session agy`
<!-- .element: class="fragment" -->

2. **Forgetting `/planning` for big refactors** — default `/fast` jumps in; flip to `/planning` for wide work
<!-- .element: class="fragment" -->

3. **Unbounded subagent parallelism** — token burn rate eats free-tier quotas 💸
<!-- .element: class="fragment" -->

4. **MCP legacy keys (`url` / `httpUrl`)** — silent failure; rename to `serverUrl`
<!-- .element: class="fragment" -->

5. **YOLO without sandbox** — `rm -rf` waiting to happen; only run YOLO in a container
<!-- .element: class="fragment" -->

6. **Windows PATH not refreshed** — `agy: command not found` until you restart every terminal
<!-- .element: class="fragment" -->

Note:
Go through these fast. Each is a real install-day or production failure. #5 is the one to dwell on for ten seconds — the others are annoyances, that one is a foot-gun. The MCP schema one (#4) is the silent killer for migrators.

---

<!-- .slide: style="font-size: 0.8em;" -->

## What's next

**In the framework:**

- MCP ecosystem maturity — more first-class servers, fewer custom integrations
<!-- .element: class="fragment" -->

- Plugins marketplace — `agy plugin install` from a curated registry, not just GitHub URLs
<!-- .element: class="fragment" -->

- Flash 3.5 economics — better tokens/dollar, viable for unattended subagent swarms
<!-- .element: class="fragment" -->

**In production:**

- CI runners with `--dangerously-skip-permissions` inside sandboxed containers
<!-- .element: class="fragment" -->

- `AGENTS.md` as a repo convention — same role as `CONTRIBUTING.md`, but for the agent
<!-- .element: class="fragment" -->

Note:
Don't spend more than 90 seconds. Name each thing, one sentence, move. The headline for this section is "YOLO mode in a container is the actual deployment story" — that's what the CI section is hinting at. `AGENTS.md` as a convention is the cultural shift, not the technical one.

--

## Resources

<!-- .slide: style="font-size: 0.8em;" -->

![QR Code](assets/images/antigravity-cli-crash-course/qr-code.png)

Note:
Same QR as slide 2. Slides, cheat sheet PDF, the `AGENTS.md` starter template, my dotfiles for `agy`. TODO Ahsan: generate `qr-code.png` and the cheat sheet PDF; both currently missing.

---

## The one thing to remember

<!-- .slide: style="font-size: 0.8em;" -->

<div style="font-size:1.2em;text-align:center;margin-top:2rem;line-height:1.8">

`agy` isn't a faster `gemini-cli`.<br/>
It's a different **stance** — <br/>
**orchestrator, not typist**.

<br/>

You hand off the ticket.<br/>
You approve the diff.<br/>
You pick the next one.

<br/>

<small style="opacity:0.6">June 18 is the deadline. Migrate this week.</small>

</div>

Note:
This is the close. Slow it down. Pause after each line. The audience came in thinking `agy` is a CLI upgrade. They're leaving knowing it's a workflow change. The deadline line is the call to action — don't soften it.

--

## Thank you

<div style="display:flex;gap:3rem;align-items:center;justify-content:center;margin-top:2rem">

<div>

**Muhammad Ahsan Ayaz**

🌐 codewithahsan.dev<br/>
🐦 @codewith_ahsan<br/>
💼 linkedin.com/in/ahsanayaz

</div>

<div style="font-size:0.9em">

**Code & cheat sheet:**<br/>
github.com/AhsanAyaz/<br/>antigravity-cli-crash-course

<br/>

<small>Q&A — ask me anything</small>

</div>

</div>

Note:
Keep this slide up during Q&A. Don't replace it with a "Questions?" slide — that's dead air. Let people scan the repo URL and socials while walking up to the mic. <TODO Ahsan: confirm the repo slug; create the repo if it doesn't exist yet>.
