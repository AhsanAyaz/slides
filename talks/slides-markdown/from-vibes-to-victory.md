# FROM VIBES TO VICTORY ✌️

## Mastering the AI Coding Spectrum

**Muhammad Ahsan Ayaz**

<!-- .element: class="fragment" -->

_Google Developer Expert (GDE) in AI & Angular_

<!-- .element: class="fragment" -->

---

<img src="assets/images/vibes-to-victory/qr-code.png" alt="Session QR"/>
<!-- .element style="height: 400px" -->

- All links related to this session
- Feedback form
- My socials

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

# Picture This: It's Monday Morning ☕

![Me on Monday morning](https://media.giphy.com/media/13GIgrGdslD9oQ/giphy.gif)

<!-- .element class="fragment" -->

--

### Suddenly

![dashboard crawling](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW1ka3drN3E1dTMzeWR0dTJwbnc0aTByeDFucGVhemVhZGQ1amJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ec6NBIBgWsrSMLSBVu/giphy.gif)

Your dashboard is crawling. Users are complaining.

<!-- .element class="fragment" -->

--

## Your AI coding assistant offers to help.

<br/>

## You type:

<!-- .element: class="fragment" -->

## **"Optimize the slow dashboard query. You know how to fix it"**

<!-- .element: class="fragment" -->

--

![a few moments later](assets/images/vibes-to-victory/few-moments-later.jpeg) <!-- .element style="height: 500px;" -->

--

# The AI Reports Back ✅

## "Mission accomplished! I refactored the query, added proper indexes, eliminated N+1 queries."

<!-- .element: class="fragment" -->

### "Also, reduced query time from 2s to 50ms. Ready to deploy!"

<!-- .element: class="fragment" -->

--

## You deploy.

## You refresh the dashboard.

<!-- .element: class="fragment" -->

## Still crawling at 2 seconds.

<!-- .element: class="fragment" -->

_What happened?_ 🤔

<!-- .element: class="fragment" -->

--

The AI optimized... `users_dashboard.sql`

<!-- .element: class="fragment" -->

A legacy file from 2023. Sitting in `/legacy/`. Never imported.

<!-- .element: class="fragment" -->

Your app uses `dashboard-queries.ts` with **Prisma ORM**.

<!-- .element: class="fragment" -->

<hr style="margin: 24px 0;"/>

#### Perfect prompt (according to you).

<!-- .element: class="fragment" -->

#### Perfect optimization.

<!-- .element: class="fragment" -->

#### Perfectly wrong file. 🤦‍♂️

<!-- .element: class="fragment" -->

---

### This Wasn't a Prompt Problem

## It was a **context** problem.

<!-- .element: class="fragment" -->

--

## We've Been Distracted

- **Simple & Magical**: "Program in prose" felt like the ultimate unlock.

<!-- .element: class="fragment" -->

- **Initial Success**: "Act as a helpful assistant" worked for simple chatbots.

<!-- .element: class="fragment" -->

- **The Obsession**: Prompt engineering became _the_ skill.
<!-- .element: class="fragment" -->

Few-shot, chain-of-thought, role assignment...

<!-- .element: class="fragment" -->

We crafted the perfect key but forgot to check which door it opens.

<!-- .element: class="fragment" -->

---

In general, it became all about

![ask](https://media1.tenor.com/m/GhUChZCIDs0AAAAd/british-cop-screaming-screaming.gif)

<!-- .element: class="fragment" -->

## Asking better questions

<!-- .element: class="fragment" -->

---

# 🔥 The Real Problems

<img src="https://media1.tenor.com/m/MYZgsN2TDJAAAAAC/this-is.gif" class="w-2/3" />

When apps move from demos to production, vibe coding alone isn't enough.

---

# The Shift 🌊

--

> "The hottest new programming language is English."

> — Andrej Karpathy

<!-- .element: class="fragment" -->

--

## Welcome to the Era of "Vibe Coding"

> The act of writing code where the human "gives in to the vibes," letting the AI handle the syntax while they direct the flow.

<!-- .element: class="fragment" -->

--

### The "Code as Waste" Philosophy

<br />

**Old Way**: Code is an asset. We polish it. We maintain it.

<!-- .element: class="fragment" -->

<br/>

**New Way**: Code is a waste product. It's just a compiled binary for human intent.

<!-- .element: class="fragment" -->

<br/>

## "I just want the app. I don't care about the code."

<!-- .element: class="fragment" -->

---

# It Feels Like Magic ✨

You prompt. It builds. You ship.

--

## Until it doesn't. 💥

---

# Pure Vibe-Coding is a Disaster 📉

--

## The "70% Problem"

_Coined by Addy Osmani_

AI gets you **70%** of the way there instantly.

<!-- .element: class="fragment" -->

--

- Boilerplate? Done.

- Basic logic? Done.
<!-- .element: class="fragment" -->

- UI components? Done.
<!-- .element: class="fragment" -->

--

### The Final 30% is the Cliff

--

- Edge cases
<!-- .element: class="fragment" -->

- Security hardening
<!-- .element: class="fragment" -->

- System integration
<!-- .element: class="fragment" -->

- **Business nuance**
<!-- .element: class="fragment" -->

The speed of the first 70% creates an **"Illusion of Competence."**

<!-- .element: class="fragment" -->

--

## The Doom Loop 🔄

1. **Prompt**: "Fix the login bug."
<!-- .element: class="fragment" -->

2. **Patch**: AI fixes it (but breaks the signup flow).
<!-- .element: class="fragment" -->
3. **Prompt**: "Fix the signup flow."
<!-- .element: class="fragment" -->
4. **Patch**: AI fixes it (but breaks the login bug again).
<!-- .element: class="fragment" -->

**Result**: A "Big Ball of Mud" codebase that no one understands.

<!-- .element: class="fragment" -->

---

# The Root Cause 🔍

Why does Vibe Coding fail in production?

--

## It's a Context Problem.

The AI is guessing.

- It doesn't know your legacy constraints.
- It doesn't know "we migrated to Prisma last year."
- It doesn't know which files are actually used.

<!-- .element: class="fragment" -->

**Vibes without Context = Hallucination.**

<!-- .element: class="fragment" -->

---

# The Solution: Context Engineering 🏗️

--

## Morphing Vibes into Victory

We don't stop using AI. We stop **blindly trusting** it.

--

## Context Engineering

> The discipline of designing systems that give the AI everything it needs to think effectively.

<!-- .element: class="fragment" -->

--

> We shift from "how to ask" to "what does the AI need to know?"

> Prompt engineering is just one small part of the entire context window.

--

## 🏗️ The 3 Pillars of Context

<img src="https://media1.tenor.com/m/hNKtx3B6JIYAAAAC/distracted-boyfriend-distracted-boyfriend-meme.gif" class="w-2/3 mt-4" />

<!-- .element style="height: 500px; object-fit: contain;" -->

--

## The Context Universe

![three-pillars](assets/images/context-engineering/three-pillars.png)

--

1.  **RAG (Retrieval)**: The Library. Grounding AI in _your_ codebase and docs.

<!-- .element: class="fragment" -->

2.  **Memory**: The Notebook. Remembering past decisions and tech stack evolution.

<!-- .element: class="fragment" -->

3.  **Tools**: The Hands. Letting the AI verify its own work (run tests, check DB).

<!-- .element: class="fragment" -->

---

# The AI Coding Spectrum 🌈

Where do you stand?

--

- **L0: Manual**: You type every character. (The Past)
- **L1/L2: Autocomplete**: Copilot suggests the next line. (The Present)
- **L3: Intent (Vibe Coding)**: Cursor/Windsurf. "Make a login page." (The Danger Zone)
- **L4: Agents**: Tools + RAG. The AI verifies its work. (The Goal)
- **L5: Autonomous**: Fully independent engineers. (The Future)

<!-- .element: class="fragment" -->

**We need to move from L3 (Vibes) to L4 (Victory).**

<!-- .element: class="fragment" -->

---

# Demo: The Sales Agent 🤖

Let's see L4 in action.

--

## Scenario: "Is the Starlight Projector in stock?"

--

### ❌ The Vibe Coder (L3)

**User**: "Is it in stock?"

**AI**: "I'm sorry, as an AI assistant, I don't have access to real-time inventory information. To check if the Starlight Projector is currently in stock..."

<!-- .element: class="fragment" -->

(Hallucination - it has no data).

<!-- .element: class="fragment" -->

--

### ✅ The Context Engineer (L4)

--

**User**: "Is it in stock?"

**AI (Thinking)**:

1. I need to check inventory.
2. Call tool: `search_products_by_name("Starlight Projector")`
3. Result: `114 units`.

**AI (Response)**: "Yes, the Starlight Projector 3000 is in stock.

<!-- .element: class="fragment" -->

There are 114 units available."

<!-- .element: class="fragment" -->

--

**User**: "Is it in good for indoor usage?"

**AI (Thinking)**:

1. I need to check query_knowledge base.
2. Call tool: `query_knowledge_base()`
3. Result: `...`.

**AI (Response)**: "Yes, absolutely! While the Starlight Projector 3000 is designed

<!-- .element: class="fragment" -->

with outdoor use in mind including weather resistance,

<!-- .element: class="fragment" -->

it works great indoors as well.

<!-- .element: class="fragment" -->

Many customers use it indoors during colder months and move it outside in the summer"

<!-- .element: class="fragment" -->

--

### Why it won?

It didn't just "vibe" the answer. It had **Tools** (Context).

---

# Conclusion: The Master Builder 👷

--

## Victory = Vibes + Context Engineering

Vibe Coding is the **spark**. It gets you started fast.
Context Engineering is the **discipline**. It finishes the job right.

<!-- .element: class="fragment" -->

--

## Your New Role

You are not a "coder" anymore. You are a:

- **Architect**: Defining the Spec (SDD).
- **Orchestrator**: Managing the Context.
- **Verifier**: Reviewing the "Junior Dev's" work.

<!-- .element: class="fragment" -->

--

# From Vibes to Victory. ✌️

**Thank You!**

`@Code With Ahsan` everywhere

![qr-code](assets/images/vibes-to-victory/qr-code.png) <!-- .element style="width: 300px" -->
