# Demo Tips — An Orchestra of Agents

Quick reference for each live demo. All demos run against the real system in `~/personal/code-with-ahsan/agent/`.

> **AGNTCon Amsterdam (2026-09-17, 10:50-11:15, Auditorium): the slot is 25 minutes.**
> Use `orchestra-of-agents-agntcon.html`. NO live demos in that slot - the only demo
> beat is an optional pre-recorded 60s Events-tab clip on the "parallel win" slide,
> played only if ahead of schedule. Demos 1-3 below apply to the 60-min master deck.

## Env prep (do this BEFORE the talk, on venue wifi)

- `cd ~/personal/code-with-ahsan/agent && adk web community_assistant` — confirm it loads and the tree shows all 6 root children
- `GOOGLE_API_KEY` set (AI Studio key, `GOOGLE_GENAI_USE_VERTEXAI=FALSE`)
- `GITHUB_TOKEN`: NOT set in prod (verified 2026-09-16) — gh_researcher runs on GitHub's free unauthenticated 60 req/hr and has never come close to it. Same is fine for a demo; do a dry run first. Don't claim 5000 req/hr anywhere.
- `PLATFORM_API_BASE_URL` reachable (mentorship/content tools hit codewithahsan.dev)
- Record fallback clips for all three demos the week before. If any precondition fails on the day, use the clip — don't debug on stage.

---

## Demo 1 (Part 1) — the tree, live

**Type:** `hey, I'm new here, I know some JavaScript and I want to get into AI`

**Watch:** Events tab — `transfer_to_agent` fires to `onboarding_agent`, then the three onboarding agents run in order. Then flip to State tab — `user_skill_level` and `user_goals` appear.

**Point at:** the transfer event first ("the model chose this route, nobody hardcoded it"), then the two state keys ("structured facts extracted silently, welcome message last").

**Gotcha:** if the session already has onboarding state, the root may skip the pipeline. Use a FRESH session for this demo, every time.

---

## Demo 2 (Part 2) — three branches, one millisecond apart

**Type:** `what's trending for Angular on GitHub, and any good recent dev.to articles?`

**Watch:** Events tab — open it BEFORE submitting. `gh_researcher`, `devto_researcher`, `so_researcher` enter events interleave (true concurrency), then `external_knowledge_synthesizer` enters only after all three exit.

**Point at:** the interleaving ("this is what parallel looks like in the stream"), then the synthesizer's late entry ("and this is the merge that owns 10 of the 17 seconds").

**Bonus if time:** repeat the same query within 10 minutes and show the cache... actually no — the tool cache is on `content_agent`, not the researchers. Don't improvise this; skip.

**Gotcha:** this turn takes 15-20 s live. Narrate the stream while it runs; dead air kills the beat.

---

## Demo 3 (Part 6) — the drain-loop repro ⚠️ RISKIEST

**Setup (before the talk):** a local branch of `agent/discord_bot/bot.py` with the old `break` re-introduced in the drain loop (revert of the fix at bot.py:206-222), plus a tiny local driver script that sends one message through the bot's runner path (NOT adk web — that's the whole point).

**Type/run:** the driver with `any good repos for Google's Antigravity CLI?` (or any query whose dev.to tag 404s).

**Watch:** the truncated reply — a leaf's error string surfaces as the answer. Then run the same query on the fixed branch: full synthesis.

**Abort criteria:** if the repro branch isn't rehearsed and green the morning of the talk, use the recorded clip + walk the code on the slide instead. This demo is optional; the slides carry the story without it.

**Why not adk web:** adk web drains the full stream and masks the bug — which is literally the false-positive lesson on the slide. Saying that out loud IS the demo if the live repro is cut.
