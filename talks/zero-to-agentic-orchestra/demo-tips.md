# Demo Tips — Zero to Agentic Orchestra

Quick reference for each live demo. Select the agent in `adk web`, type the prompt, open the right tab.

---

## `single_agent` — weather assistant

**Type:** `What's the weather in Stockholm?` then `What about Tokyo?`

**Watch:** Events tab — see the `get_weather` function call appear with the city argument, then the response. Makes the tool-calling mechanism tangible.

**Gotcha:** Only 7 cities have data — stick to: Stockholm, London, New York, Tokyo, Prishtina, Berlin, Paris.

---

## `sequential_pipeline` — code writer / reviewer / refactorer

**Type:** `Write a function that checks if a number is prime`

**Watch:** State tab — `generated_code` appears first, then `review_comments`, then `refactored_code`. Pause and click each key as it fills in — the sequential order is visually obvious.

**Tip:** A deliberately simple spec works best. The model writes fast and the review is usually "No major issues found", which keeps the demo moving.

---

## `parallel_research` — climate researchers

**Type:** `Research the future of renewable energy`

**Watch:** Events tab — branch events from `RenewableResearcher`, `EVResearcher`, and `CarbonResearcher` arrive interleaved, not one-at-a-time. This is the moment that makes parallelism click visually.

**Tip:** Open the Events tab *before* submitting so the audience sees the interleaving from the start.

---

## `loop_refinement` — writer / critic loop

**Type:** `Write a short blog post about why Python is great for beginners`

**Watch:** State tab — `current_doc` and `critique` update on each iteration. Critique appears, the doc improves, then the critic calls `exit_loop` on iteration 2–3.

**Tip:** For a more dramatic loop, use a vaguer topic: `Write a blog post about machine learning` — easy enough to critique that the loop runs at least twice.

---

## `content_orchestra` — full pipeline

**Type:** `AI developer tools in 2026`

**Watch:** State tab — `trends`, `audience`, `competitors` fill in sequence, then `outline`, then `draft`, then `critique` and the revised `draft` on each loop pass.

**Tip:** Submit the query then switch between State and Events tabs to narrate what's happening. State tells the story; Events shows the mechanics. Having both visible is the "wow" moment.

**Note:** Research runs sequentially (free-tier safe). On a paid quota, swap `SequentialAgent` → `ParallelAgent` on `ResearchTeam` for true fan-out — good moment to callback to the `parallel_research` demo.
