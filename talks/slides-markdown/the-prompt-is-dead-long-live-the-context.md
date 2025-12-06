# The Prompt is Dead!

# Long Live the Context! 👑

**Muhammad Ahsan Ayaz**

<!-- .element: class="fragment" -->

_Google Developer Expert (GDE) in AI & Angular_

<!-- .element: class="fragment" -->

---

<img src="assets/images/context-engineering/qr-code-devfest-2025.png" alt="Session QR"/>

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

--

Your dashboard is crawling. Users are complaining.

![dashboard crawling](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW1ka3drN3E1dTMzeWR0dTJwbnc0aTByeDFucGVhemVhZGQ1amJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ec6NBIBgWsrSMLSBVu/giphy.gif)

--

## Your AI coding assistant offers to help.

You type: **"Optimize the slow dashboard query. You know how to fix it"**

<!-- .element: class="fragment" -->

A few moments later...

<!-- .element: class="fragment" -->

---

# The AI Reports Back ✅

## "Mission accomplished! I refactored the query, added proper indexes, eliminated N+1 queries."

<!-- .element: class="fragment" -->

### "Also, reduced query time from 2s to 50ms. Ready to deploy!"

<!-- .element: class="fragment" -->

--

## You deploy. You refresh the dashboard.

## Still crawling at 2 seconds.

_What happened?_ 🤔

<!-- .element: class="fragment" -->

---

# The Unanticipated Twist 🔍

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

- **The Obsession**: Prompt engineering became _the_ skill. Few-shot, chain-of-thought, role assignment...
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

When AI agents move from demos to production, prompts alone aren't enough.

<!-- .element: class="fragment" -->

--

## Why Our Dashboard Fix Failed

- **No Codebase Awareness**: AI couldn't see which files are actually imported vs legacy files
<!-- .element: class="fragment" -->

- **No Memory**: Didn't know we migrated from SQL to Prisma in 2023
<!-- .element: class="fragment" -->

- **No Tools**: Couldn't check which queries are actually executed at runtime
<!-- .element: class="fragment" -->

- **Isolated**: Had no way to validate the fix worked before reporting success
<!-- .element: class="fragment" -->

--

## The Universal Problems

- **Hallucination**: Up to **27%** error rate. Perfect prompts can't fix missing knowledge.
<!-- .element: class="fragment" -->

- **Context Loss**: Even with 1M+ token windows, relevant info gets buried or forgotten.
<!-- .element: class="fragment" -->

- **Ambiguity**: "Dashboard query" could mean 5 different files. Without context, AI guesses.
<!-- .element: class="fragment" -->

- **The Fragility Factor**: What works in testing breaks in production with slight changes.
<!-- .element: class="fragment" -->

---

# The Realization: The Prompt is Dead

--

<img src="assets/memes/one-does-not-1.jpg" class="w-2/3" />

We were just "debugging without gradient descent." We needed an architectural approach.

<!-- .element: class="fragment" -->

---

# The New Paradigm: Context Engineering

--

## What is Context Engineering?

It's the discipline of designing systems that give an LLM everything it needs to **think effectively**.

<!-- .element: class="fragment" -->

We shift from "how to ask" to "**what does the AI need to know?**"

<!-- .element: class="fragment" -->

Prompt engineering is just one small part of the entire context window.

<!-- .element: class="fragment" -->

_"It's about building the environment for intelligence."_

<!-- .element: class="fragment" -->

--

## The CPU & RAM Analogy

Andrej Karpathy gave us the perfect mental model:

- **LLM = CPU** (The processor)
<!-- .element: class="fragment" -->

- **Context Window = RAM** (The working memory)
<!-- .element: class="fragment" -->

Our job as **Context Engineers** is to be the Operating System, loading the right data into RAM at the right time.

<!-- .element: class="fragment" -->

---

# 🏗️ The Three Pillars of Context

<img src="https://media1.tenor.com/m/hNKtx3B6JIYAAAAC/distracted-boyfriend-distracted-boyfriend-meme.gif" class="w-2/3 mt-4" />

<!-- .element: class="fragment" -->

--

## The Context Universe

![three-pillars](assets/images/context-engineering/three-pillars.png)

--

## 📚 Pillar 1: Retrieval (RAG)

**The Agent's Library** - Grounding AI in _your_ reality

<!-- .element: class="fragment" -->

- Access to company docs, codebases, product catalogs
<!-- .element: class="fragment" -->

- **Vertex AI RAG Engine** grounds LLMs in your company's knowledge
<!-- .element: class="fragment" -->

- Reduces hallucinations by **67%** with advanced RAG
<!-- .element: class="fragment" -->

- For our dashboard: Could identify which files are actively imported
<!-- .element: class="fragment" -->

--

## 🧠 Pillar 2: Memory

**The Agent's Notebook** - Curing the amnesia

<!-- .element: class="fragment" -->

- Remember past conversations and user preferences
<!-- .element: class="fragment" -->

- Track the current state of multi-step tasks
<!-- .element: class="fragment" -->

- Store context like "We migrated to Prisma in 2023"
<!-- .element: class="fragment" -->

- For our dashboard: Would remember the tech stack evolution
<!-- .element: class="fragment" -->

--

## 🛠️ Pillar 3: Tools (Function Calling)

**The Agent's Hands** - The game-changer

<!-- .element: class="fragment" -->

- Call APIs, query databases, execute commands
<!-- .element: class="fragment" -->

- Check which queries are actually running in production
<!-- .element: class="fragment" -->

- Validate changes before reporting success
<!-- .element: class="fragment" -->

- For our dashboard: Could run tests or check actual query performance
<!-- .element: class="fragment" -->

---

# 🎯 Making It Work in Practice

--

## It's Not Just What, But How

Context isn't just dumping data into the prompt. It's architecture.

<!-- .element: class="fragment" -->

- **Select**: Only load what's relevant _right now_
<!-- .element: class="fragment" -->

- **Structure**: Format data (JSON, markdown) so the model can parse it efficiently
<!-- .element: class="fragment" -->

- **Compress**: Summarize long histories, keep context window clean
<!-- .element: class="fragment" -->

Think of it like RAM management for your AI.

<!-- .element: class="fragment" -->

--

## RAG: The Reality Check

**Retrieval-Augmented Generation** = Your AI's fact-checker

<!-- .element: class="fragment" -->

- Searches _your_ knowledge base before answering
<!-- .element: class="fragment" -->

- Reduces hallucinations dramatically (up to **67%** with advanced RAG)
<!-- .element: class="fragment" -->

- For our dashboard: Could fetch "Files currently imported in production"
<!-- .element: class="fragment" -->

**The difference**: AI cites sources instead of making things up

<!-- .element: class="fragment" -->

---

# ⚠️ The Hidden Enemy: Context Rot

--

## When Context Goes Bad

<img src="https://media1.tenor.com/m/n4RKdkLyRHYAAAAC/doctor-strange-stephen-strange.gif" class="w-2/3" />

In long conversations, the context window becomes a junk drawer.

<!-- .element: class="fragment" -->

--

## Three Ways Context Rots

- **Poisoning**: One wrong fact ("we use SQL") contaminates all future responses
<!-- .element: class="fragment" -->

- **Distraction**: Important info ("Prisma ORM") drowns in noise from unrelated conversations
<!-- .element: class="fragment" -->

- **Clash**: Conflicting data ("users.sql" vs "user-queries.ts") leads to confused answers
<!-- .element: class="fragment" -->

This is why our dashboard agent failed. Legacy file mentions polluted the context.

<!-- .element: class="fragment" -->

--

## The Fix: Context Hygiene

Actively manage what stays in the context window.

<!-- .element: class="fragment" -->

1. **Select**: Only load what's relevant to the current task
<!-- .element: class="fragment" -->

2. **Compress**: Summarize old conversations, keep recent context fresh
<!-- .element: class="fragment" -->

3. **Isolate**: Separate tasks get separate context (no cross-contamination)
<!-- .element: class="fragment" -->

Like cleaning your RAM so your AI doesn't thrash.

<!-- .element: class="fragment" -->

---

# 📊 Does This Actually Work?

--

## The Data Says Yes

Companies who adopted Context Engineering over prompt-only approaches:

- **4x cost reduction** while maintaining accuracy[^1] 💰
<!-- .element: class="fragment" -->

- **30% accuracy improvement** year-over-year[^2] 📈
<!-- .element: class="fragment" -->

- **70% of customer inquiries** resolved autonomously[^3] ✅
<!-- .element: class="fragment" -->

From chatbots that kinda work → autonomous agents that _actually_ work.

<!-- .element: class="fragment" -->

--

## Beyond Text: Multimodal Context

Context isn't just text anymore. Modern AI agents need:

<!-- .element: class="fragment" -->

- **Images**: Screenshot analysis for debugging
<!-- .element: class="fragment" -->

- **Code**: AST parsing, not just text matching
<!-- .element: class="fragment" -->

- **Live Data**: Real-time metrics, logs, database state
<!-- .element: class="fragment" -->

- **Sensors**: For robotics and autonomous systems
<!-- .element: class="fragment" -->

For our dashboard: Could parse the actual import graph, not guess from filenames.

<!-- .element: class="fragment" -->

---

# 🎉 The Paradigm Shift

--

## Context is King 👑

The quality of your AI's output = The quality of its context.

<!-- .element: class="fragment" -->

**"Bad context in, bad answer out."**

<!-- .element: class="fragment" -->

Context gives agents **situational awareness**. Without it, they're just guessing.

<!-- .element: class="fragment" -->

Our dashboard agent didn't need better prompts. It needed to know which files matter.

<!-- .element: class="fragment" -->

--

## What to Do Tomorrow

1. **Context Audit**: What does your AI need to know? Codebase structure? User preferences? API state?
<!-- .element: class="fragment" -->

2. **Add Retrieval**: Build a **RAG corpus** with Vertex AI - give your AI domain expertise
<!-- .element: class="fragment" -->

3. **Add Tools**: Give it **Function Calling** - let it validate and check before responding
<!-- .element: class="fragment" -->

4. **Always Verify**: Treat AI output like a junior dev's first PR. Review it.
<!-- .element: class="fragment" -->

---

# ⚖️ Before & After: The Context Difference

--

## ❌ Before: Prompt-Only Approach

**User**: "Is the Starlight Projector 3000 in stock?"

<!-- .element: class="fragment" -->

**AI (No Context)**: "The Starlight Projector 3000 is a popular item! It typically features advanced projection technology. However, I don't have access to real-time inventory data. I recommend checking our website or calling the store for current stock levels."

<!-- .element: class="fragment" -->

**Result**: Generic, unhelpful, wastes customer's time ❌

<!-- .element: class="fragment" -->

--

## ✅ After: Context Engineering

**User**: "Is the Starlight Projector 3000 in stock?"

<!-- .element: class="fragment" -->

**AI (With Tools)**:

1. Calls `get_product_info("SP3000")` → Gets specs
2. Calls `get_inventory_status("SP3000")` → Gets stock: 114 units

<!-- .element: class="fragment" -->

**Response**: "Yes! The Starlight Projector 3000 features 4K laser projection with 16 nebula effects and Bluetooth integration. We have 114 units in stock. Would you like to order one?"

<!-- .element: class="fragment" -->

**Result**: Accurate, actionable, closes the sale ✅

<!-- .element: class="fragment" -->

--

## The Difference is Context

<img src="assets/images/context-engineering/night-day.png" alt="Context makes all the difference" class="w-2/3" />

--

Without context: AI hallucinates or deflects

With context: AI acts like an expert sales assistant

<!-- .element: class="fragment" -->

**Same model. Same prompt. Different context = Different world.**

<!-- .element: class="fragment" -->

---

# 🚀 Let's Build It Right: Live Demo

<img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXo5aXlrYWpwNDhnNTN6c2VicDJiZDY5aXh6MmlvaTEwdW80eDBkdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JC8KjsrmHToq4BhF5t/giphy.gif" alt="Let's get dangerous" class="w-1/2" />

--

## Context-Aware Sales Assistant

Let's fix what went wrong with our dashboard and build it properly.

<!-- .element: class="fragment" -->

**Scenario**: User asks about product availability

<!-- .element: class="fragment" -->

**The Right Way**: Give the agent the context it needs

<!-- .element: class="fragment" -->

--

## Step 1: Give the Agent Knowledge 📚

```python
def get_product_info(product_id: str) -> dict:
    """
    Searches the company product database to get details like name,
    description, price, and features for a given product ID.

    Args:
        product_id: The unique identifier (e.g., "SP3000")

    Returns:
        Dictionary containing product details
    """
    try:
        response = httpx.get(f"{REMOTE_URL}/products/{product_id}", timeout=10.0)
        response.raise_for_status()
        return response.json()
    except httpx.HTTPStatusError as e:
        return {"error": f"HTTP error: {e.response.status_code}",
                "message": "Product not found or API error"}
```

Now the agent has access to _your_ product catalog, not hallucinated data.

<!-- .element: class="fragment" -->

--

## Step 2: Give the Agent Tools 🛠️

```python
def get_inventory_status(product_id: str) -> dict:
    """
    Checks the real-time stock level for a given product ID.

    Args:
        product_id: The unique identifier (e.g., "SP3000")

    Returns:
        Dictionary with stock level and availability
    """
    try:
        response = httpx.get(f"{REMOTE_URL}/inventory/{product_id}", timeout=10.0)
        response.raise_for_status()
        return response.json()
    except httpx.HTTPStatusError as e:
        return {"error": f"HTTP error: {e.response.status_code}",
                "message": "Inventory data not found or API error"}
```

The agent can now interact with live systems.

<!-- .element: class="fragment" -->

--

## Step 3: Wire It All Together 🔌

```python
from google.adk.agents import Agent

sales_assistant = Agent(
    name="sales_assistant_agent",
    description="Expert sales assistant with product knowledge",
    tools=[
        get_product_info,
        get_inventory_status,
        list_all_products,
        search_products_by_name,
        add_new_product,
    ],
    model="gemini-2.5-flash",
    instruction="""
    You are a helpful sales assistant. When customers ask about products:
    - Use get_product_info to retrieve product details
    - Use get_inventory_status to check stock availability
    - Provide clear, friendly, professional responses
    """
)
```

That's it! The agent now has context through tools.

<!-- .element: class="fragment" -->

--

## Step 4: Watch the Magic ✨

**User**: "Is the Starlight Projector 3000 in stock?"

<!-- .element: class="fragment" -->

--

## Agent's Thought Process

<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjkydGNvcGswMzdjdmluOGRnaWJzYjIyeDF1bnR0OWlneDB1ZGc0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2rqEdFfkMzXmo/giphy.gif" alt="Galaxy brain expanding" class="w-2/3" />

<!-- TODO: Add "Galaxy brain" expanding meme or "Big brain time" -->

--

## How the Agent Thinks

1. **[Thought]**: User needs product info + stock status
<!-- .element: class="fragment" -->

2. **[Action]**: Call `get_product_info("SP3000")`
<!-- .element: class="fragment" -->

3. **[Observation]**: Returns specs, price, features
<!-- .element: class="fragment" -->

4. **[Action]**: Call `get_inventory_status("SP3000")`
<!-- .element: class="fragment" -->

5. **[Observation]**: Returns `{ stock_level: 114, available: true }`
<!-- .element: class="fragment" -->

6. **[Thought]**: I have all the context needed!
<!-- .element: class="fragment" -->

--

## The Response

**Agent**: "Yes! The Starlight Projector 3000 features 4K laser projection with 16 nebula effects and Bluetooth integration. We have 114 units in stock. Would you like to order one?"

<!-- .element: class="fragment" -->

<img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExa24xcTgyYXBvZnF1dnNkamk0YThrNGZseTM2ZG50NHpsMmI1NGpnMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q81NcsY6YxK7jxnr4v/giphy.gif" alt="Success!" class="w-[300px] mt-4 fragment" />

**That's Context Engineering.** We didn't write a complex prompt. We built an environment.

<!-- .element: class="fragment" -->

---

# 🤔 But Wait... There's a Limit

<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW1mNndlN2N4ajNrdzJ2ZnVlNnhnZGgwZXV2ZHQybGhiZW41N25wOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UeT0nnRnkuaUo/giphy.gif" alt="Thinking hard" class="w-1/2" />

<!-- TODO: Add "Thinking hard" or "Confused math lady" meme -->

--

## Tools Alone Aren't Enough

Let's try a more complex question:

<!-- .element: class="fragment" -->

**User**: "I want to set up outdoor movie nights in my backyard for my kids. Which product should I get under $400?"

<!-- .element: class="fragment" -->

This requires more than just data - it needs **expertise**.

<!-- .element: class="fragment" -->

--

## What Tools-Only Returns

**Agent (using only Tools)**:

<!-- .element: class="fragment" -->

1. **[Action]**: `list_products()` and filter by price < $400
2. **[Observation]**: SP3000 ($299.99), NS200 ($39.99), GG500 ($149.50), CR100 ($79.99)

<!-- .element: class="fragment" -->

**Response**: "The Starlight Projector 3000 is available for $299.99 and we have 114 units in stock. It has 4K resolution, 16 nebula effects, and a Bluetooth speaker."

<!-- .element: class="fragment" -->

--

## The Problem

**What the agent can't tell you:**

- ❌ Is it actually suitable for **outdoor** use?
- ❌ Why is it better than alternatives?
- ❌ How to set it up for best results?
- ❌ What customers say about it?

<!-- .element: class="fragment" -->

**The tools provide data, but lack domain knowledge.**

<!-- .element: class="fragment" -->

This is where the agent needs a second source of context: **RAG**

<!-- .element: class="fragment" -->

---

# 📚 Enter RAG: The Knowledge Layer

--

## What RAG Adds to Your Agent

**RAG (Retrieval-Augmented Generation)** = Your agent's knowledge base

<!-- .element: class="fragment" -->

Tools give us real-time **data**. RAG gives us accumulated **knowledge**.

<!-- .element: class="fragment" -->

**What we need in the corpus:**

- Product manuals & setup guides
- Use-case recommendations
- Customer reviews & testimonials
- Troubleshooting documentation
- Comparison guides

<!-- .element: class="fragment" -->

All the expertise a sales assistant should have!

<!-- .element: class="fragment" -->

--

## Building the RAG Corpus

```python
from vertexai import rag

# Configure embedding model
embedding_model_config = rag.RagEmbeddingModelConfig(
    vertex_prediction_endpoint=rag.VertexPredictionEndpoint(
        publisher_model="publishers/google/models/text-embedding-005"
    )
)

# Create RAG corpus
corpus = rag.create_corpus(
    display_name="product_knowledge_base",
    description="Sales assistant knowledge base with product guides",
    backend_config=rag.RagVectorDbConfig(
        rag_embedding_model_config=embedding_model_config
    )
)
```

This creates our knowledge repository.

<!-- .element: class="fragment" -->

--

## Import Knowledge Documents

```python
# Import product knowledge from markdown files
response = rag.import_files(
    corpus.name,
    [
        "gs://sales-docs/outdoor-entertainment-guide.md",
        "gs://sales-docs/product-comparison-guide.md",
        "gs://sales-docs/bluetooth-troubleshooting.md",
        "gs://sales-docs/customer-reviews-compilation.md",
        "gs://sales-docs/warranty-and-policies.md"
    ],
    transformation_config=rag.TransformationConfig(
        chunking_config=rag.ChunkingConfig(
            chunk_size=512,      # Optimal for Q&A
            chunk_overlap=100    # Maintains context
        )
    ),
    max_embedding_requests_per_min=1000
)
```

Domain expertise, indexed and ready!

<!-- .element: class="fragment" -->

--

## What's in Our Knowledge Base?

**outdoor-entertainment-guide.md:**

- "SP3000 is TOP PICK for outdoor use"
- Weather resistance details (IP65)
- Setup instructions
- Customer success stories

<!-- .element: class="fragment" -->

**product-comparison-guide.md:**

- SP3000 vs AB5000 feature comparison
- Use-case recommendations
- Budget guidance

<!-- .element: class="fragment" -->

--

**bluetooth-troubleshooting.md:**

- "Reset procedure fixes 80% of issues"
- Step-by-step troubleshooting
- Firmware update instructions

<!-- .element: class="fragment" -->

Plus reviews, warranties, and policies!

<!-- .element: class="fragment" -->

--

## Wire RAG to the Agent

```python
def create_rag_tool(rag_corpus_name: str):
    """Create a callable RAG retrieval tool from the corpus."""
    def query_knowledge_base(query: str) -> dict:
        """
        Searches the product knowledge base for information.
        Use this tool to answer questions about product features,
        comparisons, troubleshooting, and customer reviews.
        """
        response = rag.retrieval_query(
            rag_resources=[rag.RagResource(rag_corpus=rag_corpus_name)],
            text=query,
        )
        contexts = [f"Source: {c.source}\nText: {c.text}"
                    for c in response.retrieved_contexts]
        return {"retrieved_information": "\n\n".join(contexts)}

    return query_knowledge_base

# Create RAG tool
rag_tool = create_rag_tool(RAG_CORPUS_NAME)

# Create agent with BOTH API tools AND RAG
sales_assistant = Agent(
    name="sales_assistant_agent",
    tools=[get_product_info, get_inventory_status, rag_tool],
    model="gemini-2.5-flash",
    instruction="Use API tools for live data, query_knowledge_base for expertise"
)
```

Now the agent has complete context!

<!-- .element: class="fragment" -->

---

# ✨ The Transformation

--

## Same Query, Complete Answer

**User**: "I want to set up outdoor movie nights in my backyard for my kids. Which product should I get under $400?"

<!-- .element: class="fragment" -->

Now watch what happens with **Tools + RAG** together...

<!-- .element: class="fragment" -->

--

## Agent's Enhanced Thought Process

1. **[RAG]** Retrieves from `outdoor-entertainment-guide.md`:
   - "SP3000 is TOP PICK for outdoor use"
   - "IP65 weather resistance"
   - "Place 10-15 feet from screen"

<!-- .element: class="fragment" -->

2. **[Tool]** `get_product_info("SP3000")` → Price: $299.99

<!-- .element: class="fragment" -->

3. **[Tool]** `get_inventory_status("SP3000")` → Stock: 114 units

<!-- .element: class="fragment" -->

4. **[RAG]** Retrieves from `customer-reviews-compilation.md`:
   - "Perfect for backyard movie nights with kids" - Jennifer K.

<!-- .element: class="fragment" -->

5. **[Thought]** I have real-time data + domain expertise!

<!-- .element: class="fragment" -->

--

## The Complete Expert Response

**Agent**: "For outdoor movie nights with your kids, I highly recommend the **Starlight Projector 3000** at $299.99 (well under your $400 budget)!

🌟 **Why it's perfect for you:**

- Weather-resistant (IP65 rating) - handles dew and light rain
- 3500 lumens brightness works great after sunset
- Built-in Bluetooth speaker (no extra cables!)

🎬 **Quick Setup:**

1. Place 10-15 feet from your projection surface
2. Works best after sunset
3. Built-in speaker great for groups up to 20 people

💬 **What Customers Say:**
'We've had this for 8 months and use it every weekend for family movie nights. The weather-resistant design is real!' - Jennifer K.

We have **114 units** in stock. Would you like to add one to your cart?"

<!-- .element: class="fragment" -->

--

## That's the Difference

<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnUyZWo0ZHQxMHVzYmk2ejJ0ajBjbXNkbTdmazE0M2M2a2l1amc3NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPGcJOAEzFmT3dwvm/giphy.gif" alt="Mind blown" class="w-1/2" />

<!-- TODO: Add "Mind blown" or "Galaxy brain ultimate form" meme -->

**Same model. Same user query. Different context.**

<!-- .element: class="fragment" -->

- Tools = Present (real-time data)
- RAG = Past (accumulated knowledge)
- **Together = Intelligence**

<!-- .element: class="fragment" -->

---

# 🎭 The Perfect Partnership

<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHF1Mzd2NTE5bTd6MmVxam9sbjAyZnA3ZzdyZHByYThuM28xNXl2MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d1E0PT843S3n3Phu/giphy.gif" alt="Power combined" class="w-1/2" />

<!-- TODO: Add "Power Rangers combined" or "Transformers unite" meme -->

--

## Division of Labor: Tools vs RAG

| Question Type                               | Who Answers  | Why                               |
| ------------------------------------------- | ------------ | --------------------------------- |
| "What's the current price?"                 | **Tools** 🛠️ | Real-time data changes frequently |
| "Is it in stock right now?"                 | **Tools** 🛠️ | Inventory updates constantly      |
| "How do I fix Bluetooth issues?"            | **RAG** 📚   | Static knowledge, doesn't change  |
| "Which is better for outdoors?"             | **RAG** 📚   | Domain expertise & use cases      |
| "What do customers say?"                    | **RAG** 📚   | Reviews & testimonials            |
| "Is SP3000 in stock AND good for outdoors?" | **Both** ✨  | Real-time + Knowledge             |

<!-- .element: class="fragment" -->

--

## Tools vs RAG vs Tools+RAG

| Capability                 | Tools Only | RAG Only | Tools + RAG |
| -------------------------- | ---------- | -------- | ----------- |
| Real-time stock levels     | ✅         | ❌       | ✅          |
| Current pricing            | ✅         | ❌       | ✅          |
| Product specifications     | ✅         | ❌       | ✅          |
| Use-case recommendations   | ❌         | ✅       | ✅          |
| Troubleshooting guides     | ❌         | ✅       | ✅          |
| Customer experiences       | ❌         | ✅       | ✅          |
| Setup instructions         | ❌         | ✅       | ✅          |
| Personalized expert advice | ❌         | ❌       | ✅✅✅      |

<!-- .element: class="fragment" -->

**Only Tools + RAG together create a complete sales expert.**

<!-- .element: class="fragment" -->

--

## Why "One Corpus" Is Actually Perfect

You might think: "Only one RAG corpus? That's limiting!"

<!-- .element: class="fragment" -->

**Actually, it's the point:**

<!-- .element: class="fragment" -->

- You don't need multiple corpora
- You need **one well-organized knowledge base**
- Combined with **real-time tools for data**
- That's complete context engineering

<!-- .element: class="fragment" -->

**Tools** = The agent's connection to the present
**RAG** = The agent's accumulated wisdom
**Together** = An expert that knows both what's happening now AND how to advise

<!-- .element: class="fragment" -->

--

## From Prototype to Production

<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHFiODFwenYwM281M2c3NHE2ZmdlOWo0OWd1ZXBmN2VtaDhiNnRoOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mi6DsSSNKDbUY/giphy.gif" alt="Deploy!" class="w-1/2" />

<!-- TODO: Add rocket launch or "Deploy all the things!" meme -->

--

## Deploy to Vertex AI 🚀

```python
from vertexai import agent_engines
from vertexai.preview import reasoning_engines

# Package and deploy the complete agent (Tools + RAG)
app = reasoning_engines.AdkApp(
    agent=root_agent,  # Already includes tools AND rag_tool
    enable_tracing=True
)

remote_app = agent_engines.create(
    agent_engine=app,
    requirements=[
        "google-cloud-aiplatform[adk,agent_engines]",
        "httpx",
        "python-dotenv",
    ],
    extra_packages=["./"]  # Packages the agent code
)

print(f"Remote app created: {remote_app.resource_name}")
```

**Note:** RAG corpus persists separately - agent connects to it automatically via `rag_tool`

<!-- .element: class="fragment" -->

Production-ready with monitoring, versioning, and enterprise security.

<!-- .element: class="fragment" -->

---

# 🤔 Questions & Discussion

## **"The Prompt is Dead! Long Live the Context!"**

_Ready to build the future of AI?_

**Muhammad Ahsan Ayaz**

<!-- .element: class="fragment" -->

Google Developer Expert

<!-- .element: class="fragment" -->

### Connect: @codewith_ahsan

---

### Your feedback matters

![qr-code](assets/images/context-engineering/qr-code-devfest-2025.png)

---

## References

[^1]: Pathway Research. ["Adaptive RAG: cut your LLM costs without sacrificing accuracy"](https://pathway.com/developers/templates/rag/adaptive-rag/). Demonstrates 4x cost reduction of RAG LLM question answering while maintaining good accuracy.
[^2]: Accenture Survey via Galileo AI. ["Optimizing RAG Performance: Key Metrics to Track"](https://galileo.ai/blog/top-metrics-to-monitor-and-improve-rag-performance). 75% of companies implementing continuous RAG optimization improved system accuracy by 30% year-over-year.
[^3]: What's The Big Data. ["AI in Customer Service Statistics 2023 to 2030"](https://whatsthebigdata.com/ai-in-customer-service-statistics/). AI-powered self-service systems resolve up to 70% of customer inquiries without human intervention.
