<!--
title: Every AI Can Build Flappy Bird. So I Gave Them a Game With Zero Training Data.
date: 2026-09-03
venue: YouTube - Code with Ahsan
tags: AI, Agentic, Kimi K3, Benchmarks, Coding Agents
description: Three AI coding agents, one identical prompt, and a 3D browser game of Pittu Garam that exists in nobody's training set. Kimi K3, Claude Fable 5 and Gemini 3.8 Flash get two phases, raw errors only, three correction attempts, and a stopwatch.
-->

## 🎬 Cold open

<small>Footage: the finished 3D Pittu Garam game, full screen, 5 seconds, no talking.</small>

Note:
*No voiceover on this. Five seconds of the finished game running full screen, ball hitting the stack, stones scattering. Let the audio from the game carry it. Cut to the title card the moment it starts to feel long.*

*This is the thumbnail moment. Pick the best-looking of the three builds for these five seconds.*

---

# Every AI Can Build Flappy Bird.

## So I Gave Them a Game With Zero Training Data.

<small>Muhammad Ahsan Ayaz · Google Developer Expert in AI & Angular</small>

<small>Sponsored by Kimi. They approved every word of the verdict, including the bad parts.</small>

Note:
That thing you just watched does not exist on GitHub. There is no tutorial for it, no clone repo, no Stack Overflow thread. Which is exactly why I picked it.

I gave three AI coding agents the same short prompt and asked them to build it in 3D, in the browser. Then I asked them to make it multiplayer.

Kimi sponsored this video, and I want to be straight with you about what that means. They paid for it, they get the link in the description, and they signed off in writing on me saying where their model fell over. You are going to see it fall over.

One more disclosure, because one of the three contestants is Google's: I'm a Google Developer Expert. So the only way this video works is if the method is airtight and you can check every step of it. That is the deal.

*Under 30 seconds. Do not read the title. Hit the promise and move.*

---

## Flappy Bird. Snake. Vampire Survivors.

Every model has seen thousands of these.

"Build Flappy Bird" tests memory, not reasoning.

<!-- .element: class="fragment" -->

Note:
Every AI coding demo you have ever seen uses the same handful of games. Flappy Bird. Snake. Some Vampire Survivors knock off.

These models have ingested thousands of implementations of each one. Full source, with comments, with the physics constants already tuned.

So when you say "build Flappy Bird" and it one shots it, you have not learned anything about the model. You have learned that it memorised well. That is principle number one for evaluating any coding agent: training data contamination makes most demos meaningless.

---

## 🎬 The contamination, on screen

<small>Footage: GitHub search for "flappy bird clone", result count visible on screen.</small>

Note:
*Cut to the browser. Search GitHub for "flappy bird clone", let the result count sit on screen for a beat. Zoom the count in the edit.*

That is how many implementations are sitting in the open. That is the answer key.

So I picked a game that doesn't exist in any training set.

*Short beat, then cut back to slides.*

---

## Pittu Garam

### (Seven Stones, Lagori, Satoliya)

Knock the stack down.

Rebuild it before you get hit.

<!-- .element: class="fragment" -->

Note:
Pittu Garam. Depending on where you grew up you might know it as Seven Stones, or Lagori, or Satoliya.

It is a street game. Every kid in Pakistan and India has played it. And almost none of it is written down as code anywhere, which is the entire point.

---

## 🎬 The rules, in 15 seconds

<small>Footage: rules explainer played over the Gemini 3.7 Flash build of the game.</small>

Note:
Seven flat stones, stacked in the middle. One player throws a tennis ball and knocks the stack over. From that moment they have to rebuild all seven stones, while the other team grabs the ball and tries to hit them with it.

Hit, and you are out. Rebuild all seven before that happens, and you win, and you shout Pittu Garam.

That is the whole game. Simple to explain, genuinely awkward to implement: throwing physics, a stack that has to collapse believably, and opponent AI that has to decide between chasing the ball and throwing it at you.

*This footage is a Gemini 3.7 Flash build I made separately, before the test, purely so I had something to show the rules over. Say out loud on camera: this build is 3.7 Flash and it is not in the comparison; the contestant is Gemini 3.8 Flash, in a fresh session, same prompt as everyone else. Nobody gets a head start.*

*Fifteen seconds. Tight. Cut on the word "Pittu Garam".*

---

## Fair does not mean detailed.

## Fair means identical.

Same short prompt. Fresh session. Native agent.

<!-- .element: class="fragment" -->

Note:
Here is where most model comparisons quietly cheat. Somebody writes a beautiful thousand word spec, tunes it until one model looks great, and calls that a benchmark.

I went the other way. One short prompt. Deliberately short, because I want to see what the model does with the ambiguity, not how well I can hand hold it.

Rules of the test: fresh session for every model, prompt pasted verbatim, nothing added. When something breaks I paste the raw error and nothing else. No hints, no diagnosis. Three correction attempts per phase, maximum. Stopwatch running the whole time. And everything screen recorded, including the runs that went badly.

Principle two: fair means identical input, not detailed input.

---

## 🎬 The prompt goes in

<small>Footage: Phase 1 prompt on screen, read aloud, pasted into the first agent.</small>

Note:
*Full screen the prompt. Read this line off it out loud, deliberately.*

"Choose whatever stack you think is right."

That sentence is doing a lot of work. Every decision from here is the model's, not mine. Renderer, physics, project structure, all of it.

*Then paste, hit enter, and start the stopwatch on camera.*

---

## What I actually measured

- Time to a working build
<!-- .element: class="fragment" -->

- Human interventions
<!-- .element: class="fragment" -->

- Self-recovery from raw errors
<!-- .element: class="fragment" -->

- Total cost
<!-- .element: class="fragment" -->

- Cost per completed task
<!-- .element: class="fragment" -->

Note:
Five numbers.

Time to a working build, on a stopwatch, not vibes.

Human interventions, meaning every single time I had to touch the keyboard for anything other than pasting an error.

Self recovery, which is the interesting one: I paste the raw error, does it fix the actual cause.

Total cost in dollars.

And then the one that almost nobody publishes: cost per completed task.

---

## K3 in Kimi Code. Fable 5 in Claude Code. Flash in Antigravity.

This compares model + agent, not model alone.

<!-- .element: class="fragment" -->

That is how you actually use them.

<!-- .element: class="fragment" -->

Note:
Three contestants. Kimi K3 running in Kimi Code. Claude Fable 5 running in Claude Code. Gemini 3.8 Flash running in Antigravity CLI. Each one in its own native harness.

And before the comments write it for me: yes, Flash is Google's fast tier and K3 is Kimi's flagship. I picked 3.8 Flash because it just launched and it is what Antigravity runs by default, meaning it is what you would actually get. And the cost per task number at the end is exactly where that tier difference gets interesting, in both directions.

Now, somebody in the comments is already typing that this is not a clean model comparison. They are right. The harness matters enormously: how it plans, how it edits files, how it recovers, how aggressively it reads the codebase back.

I am not pretending otherwise. This is model plus agent, and I am telling you that up front, which is principle six. You are always testing the pair, and that is fine as long as you say so out loud. It is also how you actually use these things. Nobody ships a raw model.

---

# Phase 1: Build it

Note:
Phase one. Single player, against two AI opponents. Same prompt, three fresh sessions, stopwatch running.

*Chapter marker in the description goes here.*

---

## 🎬 Kimi K3 in Kimi Code

<small>Footage beats: planning response · one architecture decision · first failure with the raw error pasted · working state.</small>

Note:
*Four beats, edit them tight. Do not show the full session.*

*Beat one: its planning response, the part where it decides what it is building.*

*Beat two: the architecture decision - it skipped the build tool entirely and loaded three.js plus cannon-es from a CDN import map. Plain JavaScript, no npm until Phase 2 forced it.*

*Beat three: the first thing that broke, and you pasting the raw error with nothing else. Say on camera: "raw error, no hint, that is the whole message."*

*Beat four: the moment it is playable. Stop the stopwatch on camera.*

*Commentary line: the first failure was not the game at all - a raw WebGL context error caused by my own broken NVIDIA driver. Kimi ran diagnostics on the machine before touching a line of game code. Credit where due, and say on camera that the GPU messages are not counted against it.*

--

### Kimi K3 <small>Phase 1</small>

<div style="display:flex;gap:1.5rem;justify-content:center;margin-top:2rem">
<div style="flex:1;padding:1.5rem;border:2px solid #4285F4;border-radius:8px">
<small style="opacity:0.6">Build · with fixes</small><br/>
<strong style="font-size:1.5em">26 · 107 min</strong>
</div>
<div style="flex:1;padding:1.5rem;border:2px solid #4285F4;border-radius:8px">
<small style="opacity:0.6">Interventions</small><br/>
<strong style="font-size:1.5em">3 <small>+3 env</small></strong>
</div>
<div style="flex:1;padding:1.5rem;border:2px solid #4285F4;border-radius:8px">
<small style="opacity:0.6">Stack chosen</small><br/>
<strong style="font-size:1.1em">three.js + cannon-es<br/>CDN, no build tool</strong>
</div>
</div>

Note:
Twenty six minutes to a first build, a hundred and seven with the fixes. Three gameplay corrections, plus three messages that were my own GPU driver acting up, which I am not counting against it.

And look at the stack: no build tool at all. Plain JavaScript, three.js and cannon-es pulled straight off a CDN with an import map.

*Ten seconds. Do not compare yet, the comparison comes later.*

---

## 🎬 Claude Fable 5 in Claude Code

<small>Footage beats: planning response · one architecture decision · first failure with the raw error pasted · working state.</small>

Note:
*Same four beats, same edit rhythm. Consistency here is what makes the comparison read as fair.*

*Beat one: planning response. Call out where it differed from K3: Claude scaffolded a real project - Vite, strict TypeScript, npm install - where Kimi went zero-tooling.*

*Beat two: the architecture decision.*

*Beat three: first failure, raw error pasted, nothing else.*

*Beat four: playable, stopwatch stops on camera.*

--

### Claude Fable 5 <small>Phase 1</small>

<div style="display:flex;gap:1.5rem;justify-content:center;margin-top:2rem">
<div style="flex:1;padding:1.5rem;border:2px solid #EA4335;border-radius:8px">
<small style="opacity:0.6">Build · with fixes</small><br/>
<strong style="font-size:1.5em">21 · 26 min</strong>
</div>
<div style="flex:1;padding:1.5rem;border:2px solid #EA4335;border-radius:8px">
<small style="opacity:0.6">Interventions</small><br/>
<strong style="font-size:1.5em">2</strong>
</div>
<div style="flex:1;padding:1.5rem;border:2px solid #EA4335;border-radius:8px">
<small style="opacity:0.6">Stack chosen</small><br/>
<strong style="font-size:1.1em">three.js + cannon-es<br/>Vite + TypeScript</strong>
</div>
</div>

Note:
Twenty one minutes to a first build, twenty six all in. Two corrections. And it is the only one of the three that reached for TypeScript - strict mode, Vite, a proper scaffold.

*Ten seconds. Resist commenting on the gap yet.*

---

## 🎬 Gemini 3.8 Flash in Antigravity CLI

<small>Footage beats: planning response · one architecture decision · first failure with the raw error pasted · working state.</small>

Note:
*Same four beats one more time.*

*Beat one: planning response.*

*Beat two: architecture decision.*

*Beat three: first failure and the raw error going in.*

*Beat four: it got there, but only after all three corrections - inverted camera, hidden player, unusable controls. Show the moment it finally plays.*

--

### Gemini 3.8 Flash <small>Phase 1</small>

<div style="display:flex;gap:1.5rem;justify-content:center;margin-top:2rem">
<div style="flex:1;padding:1.5rem;border:2px solid #34A853;border-radius:8px">
<small style="opacity:0.6">Build · with fixes</small><br/>
<strong style="font-size:1.5em">8 · 15 min</strong>
</div>
<div style="flex:1;padding:1.5rem;border:2px solid #34A853;border-radius:8px">
<small style="opacity:0.6">Interventions</small><br/>
<strong style="font-size:1.5em">3</strong>
</div>
<div style="flex:1;padding:1.5rem;border:2px solid #34A853;border-radius:8px">
<small style="opacity:0.6">Stack chosen</small><br/>
<strong style="font-size:1.1em">three.js + cannon-es<br/>Vite, plain JS</strong>
</div>
</div>

Note:
Eight minutes to a first build. Fastest, by a lot. Fifteen with the fixes, and it needed all three corrections to become playable - you saw what those were.

*Ten seconds, then straight into the raw error slide.*

---

## The raw-error test

Paste only the error.

<!-- .element: class="fragment" -->

No hint. No diagnosis.

<!-- .element: class="fragment" -->

Does it find the cause, or guess?

<!-- .element: class="fragment" -->

Note:
This is the part of the test I care most about, so I want to slow down on it.

When something broke, I pasted the raw error. The stack trace, or the console output, and literally nothing else. No "I think it is the collision code". No file name. Nothing.

Because the moment you say "check the physics loop", you have done the reasoning and the model just did the typing. And that is what most people are unknowingly measuring when they say a model is good at debugging.

Give it only the error and you find out fast. A model that reasons goes and reads the code around the failure. A model that guesses pattern matches the error string and starts changing things that look related.

*The split, from the session logs: Gemini read the relevant files before almost every edit. Claude wrote a root-cause explanation citing its own code, patched immediately, then proved the fix by driving the game in a headless browser with Playwright - it tested itself. Kimi was mixed: careful diagnostics on the WebGL crash, but on the big gameplay feedback it started rewriting files without reading anything first. Pick the screen recording that shows your favourite of those three moments. This is the strongest teaching moment in the video, do not rush it.*

---

# Phase 2: Make it multiplayer

Note:
Phase two. Same three sessions, still alive, still holding everything they built an hour ago. Now make it multiplayer over the internet.

---

## Long-horizon means holding a plan

### across a codebase that keeps growing

Multiplayer forces: WebSockets, state sync, who owns the truth.

<!-- .element: class="fragment" -->

On top of code written an hour ago.

<!-- .element: class="fragment" -->

Note:
Everybody says "long horizon" and nobody defines it. Here is what I mean by it.

Long horizon is not a big context window. It is holding a plan across a codebase that keeps growing under you.

Multiplayer is a good forcing function for that, because it is not a feature you bolt on. It forces real decisions: WebSockets or something else, how state syncs between clients, and the hard one, who owns the truth. Is the server authoritative, or is each browser simulating its own physics and hoping they agree.

And it has to do all of that on top of code it wrote an hour ago, which it now has to remember it wrote. That is principle three.

---

## 🎬 Phase 2 goes in

<small>Footage: the Phase 2 prompt entering each session. Watch for renames, reintroduced bugs, forgotten decisions.</small>

Note:
*Cut between the three sessions as the same prompt goes in. Keep it fast.*

The thing I am watching for here is whether each model still remembers its own architecture, or starts contradicting it.

Renaming things it already named. Reintroducing a bug it fixed in phase one. Forgetting a decision it argued for forty minutes earlier. That is context degradation, and this is where you can actually see it happen instead of reading about it in a benchmark chart.

*The clearest one is Gemini at 23:04 local: after a context compaction mid Phase 2, the game crashed with "startSoloMatch is not a function" - the compaction had eaten methods it wrote minutes earlier, and it had to grep its own codebase to rediscover them. Claude's version is subtler: multiplayer added a ghost third fielder to the solo mode that worked fine an hour before. Show both if the edit allows.*

---

## 🎬 Two browsers, one game

<small>Footage: split screen, two browser windows, multiplayer running. Thumbnail grade.</small>

Note:
*Split screen, two windows, both playing. Let it run in silence for a few seconds like the cold open.*

*This is the second thumbnail candidate. Shoot it clean.*

Two browsers, two players, one ball. From a prompt that never used the word WebSocket.

*All three got here. Same split screen, three different architectures underneath: two host-authoritative relays and one peer-to-peer setup where each browser simulates its own physics and hopes they agree. Say that in one sentence - it sets up the transport line on the scorecards.*

---

## Phase 2 scorecards

Note:
Same three numbers, second phase.

*Straight into the verticals, no preamble.*

--

### Kimi K3 <small>Phase 2</small>

<div style="display:flex;gap:1.5rem;justify-content:center;margin-top:2rem">
<div style="flex:1;padding:1.5rem;border:2px solid #4285F4;border-radius:8px">
<small style="opacity:0.6">Build · with fixes</small><br/>
<strong style="font-size:1.5em">112 · 127 min</strong>
</div>
<div style="flex:1;padding:1.5rem;border:2px solid #4285F4;border-radius:8px">
<small style="opacity:0.6">Interventions</small><br/>
<strong style="font-size:1.5em">1</strong>
</div>
<div style="flex:1;padding:1.5rem;border:2px solid #4285F4;border-radius:8px">
<small style="opacity:0.6">Transport chosen</small><br/>
<strong style="font-size:1.1em">ws relay<br/>host-authoritative</strong>
</div>
</div>

Note:
A hundred and twelve minutes for the initial multiplayer build. One single turn. I checked the logs twice. It got there with one correction, and the host owns the physics - the server is a pure relay.

*Ten seconds each on these three slides. The table two slides from now is where the comparison actually happens.*

--

### Claude Fable 5 <small>Phase 2</small>

<div style="display:flex;gap:1.5rem;justify-content:center;margin-top:2rem">
<div style="flex:1;padding:1.5rem;border:2px solid #EA4335;border-radius:8px">
<small style="opacity:0.6">Build · with fixes</small><br/>
<strong style="font-size:1.5em">15 · 17 min</strong>
</div>
<div style="flex:1;padding:1.5rem;border:2px solid #EA4335;border-radius:8px">
<small style="opacity:0.6">Interventions</small><br/>
<strong style="font-size:1.5em">1</strong>
</div>
<div style="flex:1;padding:1.5rem;border:2px solid #EA4335;border-radius:8px">
<small style="opacity:0.6">Transport chosen</small><br/>
<strong style="font-size:1.1em">ws · host snapshots<br/>20 Hz</strong>
</div>
</div>

Note:
Fifteen minutes to working multiplayer. One correction - the ghost fielder. Host-authoritative snapshots at twenty hertz.

--

### Gemini 3.8 Flash <small>Phase 2</small>

<div style="display:flex;gap:1.5rem;justify-content:center;margin-top:2rem">
<div style="flex:1;padding:1.5rem;border:2px solid #34A853;border-radius:8px">
<small style="opacity:0.6">Build · with fixes</small><br/>
<strong style="font-size:1.5em">9 · 18 min</strong>
</div>
<div style="flex:1;padding:1.5rem;border:2px solid #34A853;border-radius:8px">
<small style="opacity:0.6">Interventions</small><br/>
<strong style="font-size:1.5em">3 <small>at cap</small></strong>
</div>
<div style="flex:1;padding:1.5rem;border:2px solid #34A853;border-radius:8px">
<small style="opacity:0.6">Transport chosen</small><br/>
<strong style="font-size:1.1em">ws · peer-to-peer<br/>no authority</strong>
</div>
</div>

Note:
Nine minutes to a first multiplayer build, and then it needed the full three corrections - the cap - to stay standing. And its architecture is the risky one: no authoritative host. Each browser runs its own physics and hopes they agree.

---

## A cheap model that needs 4 correction rounds

## costs more than a pricier one that works first time 💸

Cost per completed task is the number that matters.

<!-- .element: class="fragment" -->

Note:
Now the money. And I want to kill the dumbest metric in this entire space, which is price per million tokens.

A cheap model that needs four rounds of correction costs you more than an expensive one that works first time. More tokens, because every retry drags the whole conversation along with it. And more of your afternoon, which is the expensive part.

So the number is cost per completed task. Total spend, divided by the things that actually work at the end. That is principle five, and it is the one that changes which model you pick.

---

## The numbers

<!-- .slide: style="font-size: 0.8em;" -->

| | Kimi K3 | Claude Fable 5 | Gemini 3.8 Flash |
| --- | --- | --- | --- |
| Phase 1 time | 26 · 107 min | 21 · 26 min | 8 · 15 min |
| Phase 1 cost | $6.57 | $11.92 | $2.35 |
| Phase 2 time | 112 · 127 min | 15 · 17 min | 9 · 18 min |
| Phase 2 cost | $5.98 | $7.67 | $4.57 |
| Interventions | 4 (+3 env) | 3 | 6 |
| Bugs that came back | 2 | 1 | 2 |
| **Cost per task** | **$6.28** | **$9.79** | **$3.46** |

<small>Time = model working time, first build · with fixes, from session logs. Cost = API-equivalent at vendor list rates, Sep 2026; all three ran on subscriptions.</small>

Note:
Here is everything on one screen. Pause it if you want.

*Give them two full seconds of silence to hit pause. Do not read the table row by row.*

The row that matters is the bottom one. Everything above it is just how we got there.

Methodology out loud, because the comments will ask: token counts are measured from each harness's own session logs, and the dollars are API-equivalent at the vendors' published list rates. All three ran on subscriptions, so list rates are the only like-for-like basis. Kimi's environment messages, my broken GPU driver, are counted separately.

And the quotable line: the cheapest run also hit the correction cap. The most expensive one needed the fewest fixes. And Kimi spent a hundred and twelve minutes on one single multiplayer turn.

---

## Where each one disappointed me

- **Kimi K3**: 112 minutes for one multiplayer turn, and the out-of-bounds bug came back twice
<!-- .element: class="fragment" -->

- **Claude Fable 5**: the most expensive run by far, and multiplayer broke the solo mode it had just built
<!-- .element: class="fragment" -->

- **Gemini 3.8 Flash**: hit the correction cap in Phase 2 after a compaction erased its own functions
<!-- .element: class="fragment" -->

Note:
*These three lines are drafted straight from the session logs - rewrite them in your own words if you want, but keep them this concrete. Do not soften the Kimi line. It is the sponsored model and this is the slide that makes the whole verdict believable. They signed off on this in writing.*

Every one of these three let me down somewhere, and I am not going to skip that part just because one of them paid for the video. Same rule for Gemini: I am a Google Developer Expert, and its line stays as honest as the other two.

*One sentence per model, specific and concrete. Name the actual failure, not "it struggled sometimes".*

---

## 🎬 The verdict

<small>Footage: Ahsan on camera. What K3 did well, where it was worse, who you would actually use for what.</small>

Note:
*On camera, not over slides. This is the trust moment of the video, look down the lens.*

*Three beats: what K3 genuinely did better than the other two. Where it was clearly worse. And who you would hand each of these to, for what kind of work.*

*Evidence to draw from: Kimi was thorough but slow, and diagnosed a broken GPU driver before touching code. Claude was the only one that scaffolded properly with TypeScript, tested its own fixes in a headless browser, and needed the fewest corrections - at the highest price. Gemini was fastest and cheapest, read code before editing, but shipped the roughest first build and lost its own functions to a compaction. The who-for-what verdict is yours to say.*

---

## Stop asking AI to build things it has memorised.

Give it something it has never seen.

<!-- .element: class="fragment" -->

Paste the raw error. Count the interventions.

<!-- .element: class="fragment" -->

Then look at cost per task.

<!-- .element: class="fragment" -->

Note:
If you take one thing from this video, take the method, not the leaderboard. The leaderboard changes next month.

Stop asking these models to build things they have memorised. Give them something they have never seen. Doesn't have to be a street game, it can be your own weird internal domain, which is exactly what you would be shipping anyway.

Paste the raw error and nothing else. Count how many times you had to step in.

Then look at cost per completed task, not cost per token.

*Slow down through the three lines. Pause after "cost per task" before the CTA.*

---

## Thanks for watching 🙏

- Kimi K3 link in the description
- Full-stack agentic AI course coming soon
- Subscribe if you want the next one of these
- **YouTube: @codewithahsan** · **X: @codewith_ahsan**

Note:
That is it.

Kimi's link is in the description, they sponsored this one and they let me publish the parts that did not flatter them, which I appreciate.

I have a full stack agentic AI course coming, so subscribe if you want to know when that lands.

And tell me in the comments which game I should use next. It has to be something with zero training data, so make it obscure.

Thanks for watching.

*Ask for the subscribe once. Cut soon after.*

<!--
YouTube chapters (paste into the description, adjust to the final edit):

0:00 The game you have never seen
0:30 Why Flappy Bird proves nothing
1:15 Pittu Garam, the rules
2:00 The rules of the test
3:00 Phase 1: build it
6:30 The raw-error test
7:30 Phase 2: make it multiplayer
11:00 The numbers
12:00 Where each one disappointed me
13:00 The verdict
-->
