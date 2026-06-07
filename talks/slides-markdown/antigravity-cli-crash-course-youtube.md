<!--
title: Antigravity CLI Crash Course (YouTube)
date: 2026-06-20
venue: YouTube — codewithahsan
tags: AI, Agentic, CLI, Antigravity, YouTube
description: YouTube-format tutorial on Google's Antigravity CLI (`agy`) — install, inner loop, subagents, MCP, safety, and migration from `gemini-cli`, with terminal demos cut in.
-->
> _"Refactor this folder of services to use the new API client, run the tests, and fix anything that breaks."_

**Your old `gemini-cli` does all of it — synchronously. Terminal locked, you wait.**

<!-- .element: class="fragment" -->

**`agy` does the same work in parallel — main thread stays live.**

<!-- .element: class="fragment" -->

Note:
Narration: "This is the one-sentence test. The old `gemini-cli` can actually do this — it has subagents, it can edit multiple files. But it does it synchronously: your terminal locks while the work happens, and you wait. `agy` runs the same work asynchronously — subagents in the background, main thread stays responsive, you keep prompting. In the next 20 minutes you'll see why that single architectural shift matters. Install, inner loop, subagents, safety, migration. Stay till the end for the pitfalls — there are six, and at least one will save your weekend."

---

# Antigravity CLI Crash Course

### The agent-first terminal — install, demo, and migrate in 20 minutes

<small>Muhammad Ahsan Ayaz · GDE in AI & Angular</small><br/>
<small>YouTube · codewithahsan</small>

Note:
Narration: "I'm Ahsan. This video is the crash course I wish I'd had when `agy` dropped. By the end you'll have it installed, you'll know the five shortcuts that matter, and you'll have moved your `gemini-cli` workflow over before the June 18 deadline. Chapters are in the description if you want to jump around."

---

## Your `gemini` CLI is being deprecated

### On **June 18, 2026**

<small>If you're still on the legacy Python CLI, you have weeks, not months.</small>

<!-- .element: class="fragment" -->

Note:
Narration: "The legacy `gemini-cli` sunsets June 18, 2026 for consumers and free-tier accounts. Enterprise API-key users keep going. Everyone else is on the clock. That's not me editorializing — it's in the migration docs. The good news is `agy` is a real upgrade, not a rename, and the migration is mostly automatic. We'll cover both."

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
Narration: "Here's the whole pitch in one slide. Gemini CLI also has subagents — that landed in April 2026 — but the architecture is synchronous: subagent work blocks your terminal until it finishes. `agy` runs the same kind of subagents asynchronously: they work in the background, your main thread stays live, you keep prompting. Same model family underneath; Go runtime, async harness, and a shared backend with the Antigravity 2.0 desktop on top. If you take one frame from this video, take this one."

--

## The Concurrency Model in Action

<video data-autoplay controls loop src="assets/videos/concurrency-model.mp4" width="800" height="450" style="margin: 0 auto; border-radius: 8px; border: 1px solid #334155;"></video>

--

## You are not the typist anymore

You're the **orchestrator**.

<!-- .element: class="fragment" -->

The agent plans. The agent edits. The agent runs your test suite.

<!-- .element: class="fragment" -->

You approve diffs, course-correct, and pick the next ticket.

<!-- .element: class="fragment" -->

Note:
Narration: "The mistake everyone makes the first day is treating `agy` like a faster chatbot. It isn't. You're not the typist anymore — you're the orchestrator. Hand off the ticket, watch the work happen, approve the diff, pick the next one. The rest of this video is just the keyboard shortcuts and slash commands that let you do that without friction."

---

# Part 1

## Get it running

Note:
Narration: "Part one. Install, auth, and the one gotcha that will eat your first SSH session if you don't know about it. Two minutes."

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
Narration: "One line per platform. The binary is a statically compiled Go executable — no Python runtime, no `pip install`, no virtualenv hell. It lands in your local user path. If you've ever debugged a Python CLI on a fresh laptop, this is the upgrade you didn't know you needed."

--

## 🎬 Demo — Install and first prompt

<small>Cut to terminal. What viewers see:</small>

1. `curl -fsSL https://antigravity.google/cli/install.sh | bash` — binary lands in `~/.local/bin`
<!-- .element: class="fragment" -->

2. `agy` — workspace trust prompt, approve once
<!-- .element: class="fragment" -->

3. Type `@README.md` then `"summarize this in 3 bullets"`
<!-- .element: class="fragment" -->

4. Cut back to slides when the agent finishes its first response
<!-- .element: class="fragment" -->

Note:
Narration: "Cut to terminal. Two-line install. Watch the binary land in `~/.local/bin` — no sudo, no system pollution. Run `agy` in any project root, approve workspace trust once, and you're in. The first prompt is just `@` a file and ask for a summary. That's the loop you'll repeat all day. Don't speed this up in the edit — let viewers see the install finish naturally before the first response comes back."

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
Narration: "Auth doesn't sit in a dotfile next to your code. On macOS, `agy` drops the OAuth token at `~/.gemini/antigravity-cli/antigravity-oauth-token` with mode 0600 and a `Antigravity Safe Storage` entry in Keychain alongside it. On Linux it's secret-service over D-Bus. On Windows it's Credential Manager. Not bulletproof — if your home directory leaks, the macOS token leaks with it — but it's nothing you'll accidentally commit. If you're SSH'd into a remote box with no browser, `agy` detects that, prints an OAuth URL, and you finish login on your laptop."

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
Narration: "Here's the one that'll bite you on day one if you SSH into Linux boxes. Bare SSH session, no D-Bus, `agy` crashes the first time it tries to read the keyring. The error message just says `dbus` and tells you nothing useful. Fix is one line — wrap your call with `dbus-run-session agy`. Screenshot this if you live on remote servers."

--

## Headless SSH Keyring Resolution

<video data-autoplay controls loop src="assets/videos/dbus-keyring.mp4" width="800" height="450" style="margin: 0 auto; border-radius: 8px; border: 1px solid #334155;"></video>

---

## Whoami

<div style="display:flex;gap:2rem;align-items:center">
<div style="flex:2">

**Muhammad Ahsan Ayaz** — GDE in AI & Angular. Daily-driving `agy` since the beta.

</div>
<div style="flex:1;text-align:center;opacity:0.5">
<small>codewithahsan.dev</small>
</div>
</div>

Note:
Narration: "Quick five seconds on me before we go deeper — I'm a Google Developer Expert in AI and Angular, I've been daily-driving `agy` since the beta, and everything in this video is from production use, not a press release. Now back to work."

---

# Part 2

## The inner loop

Note:
Narration: "Part two. The daily-driver section. Three phases, five keyboard shortcuts, the slash commands that actually earn their keep."

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
Narration: "Three phases — explore, plan, execute. `agy` boots in `/fast` — explore plus execute, plan skipped. For ambiguous or wide-blast-radius work, type `/planning` first — agent slows down, drafts a plan, waits for redirect before editing. Plan is the optional middle step by design, not the default. Everything else is keyboard shortcuts."

--

## 🎬 Demo — The inner loop in action

<small>Cut to terminal. What viewers see:</small>

1. Type `@` — interactive path picker opens, pick `talks/demos/inner-loop/README.md`
<!-- .element: class="fragment" -->

2. Also `@` the source + test: `slide-stats.js` and `slide-stats.test.js` in the same folder
<!-- .element: class="fragment" -->

3. Send: `"read these, plan the fix so separators inside fenced code blocks aren't counted, then apply and run the test"`
<!-- .element: class="fragment" -->

4. Agent reads the three files, runs the failing test, edits `slide-stats.js`, re-runs the test — green
<!-- .element: class="fragment" -->

5. If you want to inspect the diff before apply, `ctrl+r` opens Artifact Review (otherwise agy applies + verifies in one pass)
<!-- .element: class="fragment" -->

Note:
Narration: "Cut to terminal. The scenario is a tiny `countBreaks` function in this same repo at `talks/demos/inner-loop/` — it miscounts `---` lines inside fenced code blocks, and the test catches it. Watch the loop: `agy` reads the three files, runs the failing test itself, edits `slide-stats.js`, re-runs the test — green. You didn't run a single command. That's the whole point. If you want to inspect the diff before apply, `ctrl+r` opens Artifact Review — but with default permissions (workspace files auto-allow), `agy` applies and verifies in one pass. The next four slides are just naming the keys."

--

## Feeding context to the agent

```bash
# In the prompt box:
@                       # interactive path picker, inserts absolute paths
ctrl+v                  # paste a screenshot — multimodal context
```

<small>`@talks/demos/inner-loop/slide-stats.js` is more useful than "the slide stats file" — the agent doesn't have to guess.</small>

Note:
Narration: "The `@` picker is the single feature that makes `agy` feel different from a chat box. You give it absolute paths, not vague references — the agent doesn't have to guess which `login.ts` you meant. The screenshot paste with `ctrl+v` is the underrated one. Drag in a UI bug screenshot, ask why something's misaligned, get a working CSS diff. <TODO Ahsan: insert your story about the time `ctrl+v` solved a CSS bug in one shot>."

--

## Approving and reverting

| Key / Command | What it does |
|---------------|--------------|
| `ctrl+r` | Open the **Artifact Review** panel — view unified diff, press `y` to apply |
| `/rewind` (or `/undo`) | Roll the conversation back to the last stable checkpoint |
| `/fork` | Branch into a parallel session to test a speculative change |

Note:
Narration: "Three keys for the moment you don't trust what the agent did. `ctrl+r` opens Artifact Review — proper unified diff with a `y` to apply, no leap of faith. `/rewind` is the safety net when the agent breaks your build — don't argue with it, just rewind. `/fork` is for `what if I tried this differently` without trashing the working thread. <TODO Ahsan: confirm `/undo` is the alias and not a separate command>."

--

## Default = `/fast` 
## `/planning` = opt-in deliberation

```bash
# agy boots here — execute immediately
> rename this variable across the file

# Switch in when you want plan-first
/planning
> refactor the auth folder to use the new client
```

<small>`agy` boots in `/fast`. `/planning` flips to plan-first mode for ambiguous or wide work.</small>

Note:
Narration: "`agy` boots in `/fast` — execute mode, no planning ceremony, snappy on small edits. When you're touching anything you'd want a code review on, type `/planning` first. Plan-first is opt-in by design — Google's bet is most of your day is small edits, and the planning ceremony just gets in the way. Flip to `/planning` for ambiguous refactors, flip back when you're back on mechanical work."

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
Narration: "Pitfall cuts both ways but the common one is forgetting `/planning` for ambiguous work. `agy` defaults to `/fast` — it will jump in, edit three files, and leave you scrambling to `/rewind`. Rule of thumb: stay in `/fast` for mechanical edits; flip to `/planning` for anything where you'd want a code review."

---

# Part 3

## Going parallel

Note:
Narration: "Part three. This is the section that converts skeptics. Subagents working in parallel, the dashboard that shows you what they're doing, and the one pitfall that will eat your free-tier quota."

--

## Subagents, in plain English

The primary agent spawns **concurrent subagents** for documentation lookups, tests, and discrete file edits — in the background, while you keep prompting.

<!-- .element: class="fragment" -->

You don't schedule them. The agent does.

<!-- .element: class="fragment" -->

<small>Gemini CLI has subagents too — but synchronous. </small>
<!-- .element: class="fragment" -->
<small>`agy`'s differentiator is **async**: your main thread keeps going.</small>
<!-- .element: class="fragment" -->

Note:
Narration: "Don't overthink subagents. Most of the time it's two or three running quietly — one writing code, one running tests, one looking up docs. Gemini CLI has subagents too, since April 2026 — but its execution is synchronous, so the same work locks your terminal. `agy`'s architectural diff is async: your main thread doesn't block, you keep prompting while subagents work behind. That, plus the Go runtime and the unified harness with Antigravity 2.0, is why this shipped as a new tool instead of a flag on the old one."

--

## 🎬 Demo — The `/agents` surface

<small>Cut to terminal. What viewers see:</small>

1. Run `/agents` — full-screen panel shows the dashboard surface
<!-- .element: class="fragment" -->

2. **Available Agents** lists `/default` + workspace and global paths for custom agents
<!-- .element: class="fragment" -->

3. When the primary delegates background work, subagents appear here with live status
<!-- .element: class="fragment" -->

4. `ctrl+j` teleports to one awaiting approval; `ctrl+k` fast-approves from the status bar
<!-- .element: class="fragment" -->

Note:
Narration: "Open `/agents` and you see the dashboard surface — your default agent plus the workspace and global paths where custom subagents land. When the primary agent delegates background work — long research, multi-stage validation — subagents show up here with live status. `ctrl+j` teleports you to one waiting on permission, `ctrl+k` fast-approves and drops you back into the main thread. I'm not going to fake a swarm live — async spawn surfaces on specific workloads in `agy` v1.0.6, and on this tier it's not deterministic. What matters is the surface is shipped — Gemini CLI doesn't keep your main thread live while subagents work, `agy` does."

--

## The three controls that matter

| Key / Command | What it does |
|---------------|--------------|
| `/agents` | Full-screen dashboard — status and logs of every subagent |
| `ctrl+j` (or `alt+j`) | **Teleport** to the next subagent waiting for permission |
| `ctrl+k` | **Fast-approve** the surfaced permission without leaving your thread |

Note:
Narration: "Three keys. `/agents` for the dashboard view — open it when you want to see what's actually happening. `ctrl+j` is the teleport — when a subagent needs you, hop to it without scrolling. `ctrl+k` is fast-approve — yes, that's fine, keep going. Screenshot this one if you're going to use parallel work seriously."

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
Narration: "Bill-shock pitfall. The agent is happy to spend your money — that's the price of parallelism. <TODO Ahsan: insert your token-spend story — the one where parallel subagents burned through your free quota in an afternoon>. Scope your prompts, cap concurrency in settings, and check your billing dashboard at least once a week. The first month is when this will surprise you."

---

# Part 4

## Make it yours

Note:
Narration: "Part four. The three customization surfaces — skills, plugins, and MCP. We end on the MCP schema change, because that's the silent killer for migrators."

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
Narration: "Three surfaces, listed in order of how you'll actually adopt them. Skills are just markdown files you drop in a folder — start there. Plugins are bundles of skills plus hooks plus agents that you can share with your team. MCP is the heavy hitter, where the agent talks to real tools like your database or your ticket tracker."

--

## 🎬 Demo — Building and invoking a skill

<small>Cut to terminal + editor. What viewers see:</small>

1. Create `.agents/skills/ship-it/SKILL.md` (folder + file)
<!-- .element: class="fragment" -->

2. Paste the frontmatter + procedure (next slide)
<!-- .element: class="fragment" -->

3. Save, back to `agy`, type `/ship-it`
<!-- .element: class="fragment" -->

4. Agent runs the test suite, drafts a commit, asks to push
<!-- .element: class="fragment" -->

Note:
Narration: "Cut to editor. Skills live in their own folder — make `.agents/skills/ship-it/` and create `SKILL.md` inside it. Paste the frontmatter, save. Back to the terminal. Type slash, and the new skill is already in the autocomplete. Invoke it, and the agent follows the procedure you wrote in plain English. That's the whole loop — your own slash commands, no code, no plugin manifest, no restart."

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
Narration: "Look at the frontmatter — `description` is what the agent reads to decide when to invoke this skill, even if you don't type the slash command. Treat it like a tool description, not a comment. The body is plain English. The agent figures out the rest. <TODO Ahsan: confirm exact frontmatter field names — `name` and `description` from the dump, but the YAML spec may have more>."

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
Narration: "`agy plugin install` is the closest thing to `npm install` for agent workflows — point it at a GitHub repo, it pulls down a directory of skills and hooks. MCP servers are different — they're processes that run alongside `agy`. `/mcp` is the control panel for those. <TODO Ahsan: confirm whether the install path is `~/.gemini/antigravity-cli/plugins/` long-term or if it migrates to `~/.agents/`>."

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
Narration: "Silent killer. No error is raised. The legacy `url` and `httpUrl` keys are just ignored, the server never connects, and you spend an hour wondering why the agent can't see your Linear tickets. Notice the `serverUrl` key — if you're migrating an old MCP config, this is the rename that fixes the silent failure. Screenshot this one."

--

## MCP Schema Migration Morph

<video data-autoplay controls loop src="assets/videos/mcp-migration.mp4" width="800" height="450" style="margin: 0 auto; border-radius: 8px; border: 1px solid #334155;"></video>

---

# Part 5

## Don't blow your foot off

Note:
Narration: "Part five. Safety. The sandbox, the permission rules engine, and the one foot-gun that lives at the top of this section's pitfall list."

--

## 🎬 Demo — Permissions and the sandbox

<small>Cut to terminal. What viewers see:</small>

1. `/permissions` → Permission Config Editor → pick **Global** scope
<!-- .element: class="fragment" -->

2. Inside scope: three lists — `allowlist` / `denylist` / `asklist`. ←/→ to switch, `a` to add rule
<!-- .element: class="fragment" -->

3. Add denylist rule: `write_file(/etc)` — format is `action(target)`
<!-- .element: class="fragment" -->

4. Submit: `"write hello world to /etc/foo"` — `Create(/etc/foo)` blocked silently. No prompt. Rule fired.
<!-- .element: class="fragment" -->

5. **Watch the agent route around**: it pivots to `Bash(echo "hello world" | sudo tee /etc/foo)` — now a confirmation prompt appears
<!-- .element: class="fragment" -->

6. Why? `write_file(/etc)` deny doesn't cover `command(sudo)`. Narrow authorization leaks. Flip `enableTerminalSandbox: true` to contain the shell.
<!-- .element: class="fragment" -->

Note:
Narration: "Cut to terminal. Type slash-permissions, the Permission Config Editor opens. Three scopes — Project, Shared with Antigravity, Global. Pick Global, you land in a list view: allowlist, denylist, asklist. Left-right to switch tabs, `a` to add. Rules use action-target syntax. Add a deny rule for `write_file` of `/etc`, then ask the agent to write hello world to `/etc/foo`. Watch the magic — `Create` is denied instantly, no confirmation, the rule fired. But then — and this is the teaching beat — the agent pivots. It says `I encountered a permission denial. I will propose running a command with sudo.` And now a confirmation prompt appears for `sudo tee /etc/foo`. Why? Because the deny rule was for `write_file`, not for `command`. Different action, different rule, escape route open. This is the lesson: authorization rules are narrow, agents will route around them. The fix is the sandbox — `enableTerminalSandbox` true contains every shell command, closes the escape route the rules engine can't. Two layers, both required."

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
Narration: "Underrated feature. The old way was `spin up a Docker VM and pray`. `agy` uses the OS-native sandbox that's already on your machine — `nsjail` on Linux, `sandbox-exec` on macOS, AppContainer on Windows. Zero startup overhead. It ships off by default — one settings flag turns it on. Next slide shows the flip."

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
Narration: "No modes. No presets. It's a rules engine — `action(target)` shape, three lists per scope. The big idea is precedence: Deny beats Ask beats Allow. So you can `allow command(*)` for productivity, then `deny command(rm -rf)` as a safety net and the deny wins. Workspaces are auto-allowed for reads and writes — you don't have to whitelist your own project. URLs default to ask. One trap I want you to internalize before the YOLO slide: rules are scoped to a single action. If you deny `write_file(/etc)` the agent will happily route around via `command(sudo tee /etc/...)` — different action, your rule doesn't apply, prompt appears. Authorization is narrow; containment is broad. That's why the sandbox is a separate setting — `enableTerminalSandbox` true confines every shell command to `sandbox-exec` on macOS, `nsjail` on Linux, AppContainer on Windows. Two layers because one isn't enough."

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
Narration: "The flag is named `--dangerously-skip-permissions` because the people who wrote it want you to know what it does. It bypasses every prompt and lets the agent run unattended. The legitimate use case is CI runners inside containers. The illegitimate use case is `I want it to stop asking me` on your laptop. Watch the next slide before you reach for it."

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
Narration: "This is the strongest pitfall in the deck. YOLO mode plus no sandbox plus a hallucinating agent equals `rm -rf` your home directory. Not theoretical. <TODO Ahsan: insert your YOLO horror story — the time an agent did something destructive without the sandbox, or the cautionary one you heard secondhand>. Every CI runner I trust does the bottom version — container, sandbox enforced, YOLO inside the box. Screenshot this if you only screenshot one slide from the whole video."

--

## Sandbox Protection Shield

<video data-autoplay controls loop src="assets/videos/sandbox-safety.mp4" width="800" height="450" style="margin: 0 auto; border-radius: 8px; border: 1px solid #334155;"></video>

---

# Part 6

## Coming from `gemini-cli`?

Note:
Narration: "Part six. Migration. If you already have a working setup on the legacy CLI, this section is for you. The good news first."

--

## What ports cleanly

- `GEMINI.md` and `AGENTS.md` context rules — **drop them in, no edits needed**
<!-- .element: class="fragment" -->

- `~/.gemini/settings.json` — auto-imported on first launch
<!-- .element: class="fragment" -->

- Keyring entries — migrated by the onboarding script
<!-- .element: class="fragment" -->

Note:
Narration: "The two files most people care about — `AGENTS.md` and the settings JSON — transition with zero edits. Drop them in, `agy` reads them on first launch. The keyring entries get pulled over by the onboarding script. If you've been using the legacy CLI seriously, this is the line that should make you commit to the move."

--

## 🎬 Demo — Running the migration

<small>Cut to terminal. What viewers see:</small>

1. `agy migrate extensions` — walks legacy `.gemini/extensions/` and rewrites them as plugins
<!-- .element: class="fragment" -->

2. Output: per-extension report, success/skip lines
<!-- .element: class="fragment" -->

3. `mv .gemini/skills/* .agents/skills/` — move custom skills
<!-- .element: class="fragment" -->

4. Restart `agy`, type `/` — old skills now show up in autocomplete
<!-- .element: class="fragment" -->

Note:
Narration: "Cut to terminal. Run `agy migrate extensions` and watch it walk through your old extensions, rewriting each one in the new plugin format. The report shows you which ones converted cleanly and which need manual attention. The skills folder move is a one-liner — your `/foo` skill won't survive if you skip it, but it's not destructive, just inert. Restart `agy`, hit slash, and your old commands are back."

--

## What you have to move

```bash
# Convert legacy extensions to native plugins
agy migrate extensions

# Move skills from .gemini/ to .agents/
mv .gemini/skills/* .agents/skills/
```

<small>`agy migrate extensions` walks your old extensions and rewrites them in the new plugin format. The skills folder rename is manual but mechanical.</small>

Note:
Narration: "Two commands, one per project. The migrate command is idempotent — safe to run twice. The `mv` command is the one people forget — if you don't run it, your old `/foo` skill silently disappears and you blame the new CLI. It's not destructive, just inert."

--

## ⚠️ Migration gotchas

1. **Themes don't survive** — heavily customized color schemes and experimental overlays from `gemini-cli` won't load
<!-- .element: class="fragment" -->

2. **Free-tier quota burns faster** — multi-agent parallelism hits limits sooner than the old synchronous CLI did
<!-- .element: class="fragment" -->

3. **Windows PATH refresh** — installer drops the binary in `%LOCALAPPDATA%\agy\bin`, but env vars don't refresh until you restart the terminal
<!-- .element: class="fragment" -->

Note:
Narration: "Three real ones. Themes don't survive — your custom color scheme from the legacy CLI is gone, rebuild it. Free-tier quota burns faster because parallelism is using the model harder, not because pricing changed. And on Windows, close every terminal window after install — env vars don't refresh in open shells, which is why `agy: command not found` is the top Windows support question."

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
Narration: "Screenshot this one. The keyboard shortcuts at the top are the ones you'll use fifty times a day. The slash commands at the bottom are the ones you'll reach for five times a day. The repo in the description has a printable version of this cheat sheet if you want to keep it next to your monitor. <TODO Ahsan: add the printable cheat sheet PDF to the repo>."

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
Narration: "Six pitfalls, ranked by how badly they bite. Number five is the foot-gun — the others are annoyances. Number four is the silent killer for migrators because nothing tells you it failed. If you only remember three from this list, remember one, four, and five. Drop a comment with which one hit you first."

---

<!-- .slide: style="font-size: 0.8em;" -->

## What's next

- **MCP marketplace** — `agy plugin install` from a curated registry, not just GitHub URLs
<!-- .element: class="fragment" -->

- **CI runners** — `--dangerously-skip-permissions` inside sandboxed containers, the actual deployment story
<!-- .element: class="fragment" -->

- **`AGENTS.md`** as a repo convention — same role as `CONTRIBUTING.md`, but for the agent
<!-- .element: class="fragment" -->

Note:
Narration: "Three things to watch. The plugin marketplace will land — when it does, `agy plugin install` becomes as casual as `npm install`. CI runners with YOLO inside containers is the real production story; that's where the safety pitfall stops being a foot-gun and becomes a feature. And `AGENTS.md` as a repo convention is the cultural shift — the same energy as `CONTRIBUTING.md`, but for the agent that's now reading your codebase."

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

<small style="opacity:0.6">June 18 is the deadline. Migrate this week.</small><br/>
<small style="opacity:0.6">Like the video, subscribe, and comment which pitfall bit you.</small>

</div>

Note:
Narration: "The close. `agy` isn't a faster `gemini-cli`. It's a different stance — orchestrator, not typist. Hand off the ticket. Approve the diff. Pick the next one. June 18 is real — don't let the deadline catch you on a Tuesday. And if this video saved you a debugging session, like it, subscribe, and tell me in the comments which pitfall got you first."

---

## Like + Subscribe + Migrate before June 18

<div style="display:flex;gap:3rem;align-items:start;justify-content:center;margin-top:2rem">

<div>

**Code, slides, cheat sheet:**<br/>
github.com/AhsanAyaz/<br/>antigravity-cli-crash-course

🌐 codewithahsan.dev<br/>
🐦 @codewith_ahsan

</div>

<div style="font-size:0.9em">

**Comment below:**<br/>
which pitfall bit you first?

<br/>

**Watch next:**<br/>
&lt;TODO Ahsan: link to follow-up video&gt;

</div>

</div>

Note:
Narration: "If this saved you a debugging session, like and subscribe — the next video walks through building a real `AGENTS.md` for a TypeScript monorepo from scratch. Drop a comment with which pitfall you hit first. Repo link, cheat sheet PDF, and the migration checklist are all in the description and pinned comment. See you in the next one."

<!--
YouTube chapter timestamps (paste into description; adjust to recording):

0:00 The litmus test
0:30 The deadline
1:00 Mental model
2:00 Part 1 — Install
4:00 Part 2 — Inner loop
7:00 Part 3 — Subagents in parallel
10:00 Part 4 — Skills, plugins, MCP
13:00 Part 5 — Don't blow your foot off
16:00 Part 6 — Migration from gemini-cli
18:00 Cheat sheet + pitfalls recap
19:00 The one thing to remember
-->
