# Context Engineering Example: Sales Assistant with RAG

This project demonstrates **Context Engineering** by combining:
- **Function Calling (Tools)**: Real-time data from API endpoints
- **RAG (Retrieval-Augmented Generation)**: Domain knowledge from documentation

## Quick Start

### 1. Prerequisites

```bash
# Install dependencies
pip install -r agent/requirements_agent.txt

# Set environment variables
export PROJECT_ID="your-gcp-project-id"
export LOCATION="europe-west1"
export GCS_BUCKET_NAME="your-bucket-name"  # Will be created if doesn't exist
```

### 2. Set Up RAG Corpus

Run the setup script to upload knowledge documents and create the RAG corpus:

```bash
python setup_rag_corpus.py
```

This will:
1. Check for markdown files in `rag-corpus/` directory
2. Create a Google Cloud Storage bucket (if needed)
3. Upload the 5 knowledge documents to GCS
4. Create a RAG corpus in Vertex AI
5. Import and index the documents

**What gets indexed:**
- `outdoor-entertainment-guide.md` - Product recommendations for outdoor use
- `product-comparison-guide.md` - Detailed product comparisons
- `bluetooth-troubleshooting.md` - Troubleshooting guides
- `customer-reviews-compilation.md` - Customer testimonials
- `warranty-and-policies.md` - Warranty and return policies

### 3. Run the Agent

The agent automatically uses the RAG corpus once it's set up:

```python
from agent.sales_assistant_agent.agent import root_agent

# Simple query (uses Tools only)
response = root_agent.chat("Is the Starlight Projector 3000 in stock?")
print(response)

# Complex query (uses Tools + RAG)
response = root_agent.chat(
    "I want to set up outdoor movie nights in my backyard. "
    "Which product should I get under $400?"
)
print(response)

# Troubleshooting query (uses RAG)
response = root_agent.chat("My projector won't connect to Bluetooth")
print(response)
```

### 4. Deploy to Vertex AI

```bash
python deploy_agent.py
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Gemini 2.5 Flash Model                   │
│                  (Context Engineering Core)                  │
└────────────┬────────────────────────────────┬───────────────┘
             │                                │
    ┌────────▼─────────┐            ┌────────▼─────────┐
    │   Tools (APIs)   │            │   RAG Corpus     │
    │  Real-time Data  │            │    Knowledge     │
    └──────────────────┘            └──────────────────┘
             │                                │
    ┌────────▼─────────┐            ┌────────▼─────────┐
    │ Flask API Server │            │  5 MD Documents  │
    │ - Products       │            │ - Guides         │
    │ - Inventory      │            │ - Reviews        │
    │ - Search         │            │ - Troubleshoot   │
    └──────────────────┘            │ - Policies       │
                                    └──────────────────┘
```

## Project Structure

```
context-engineering-example/
├── agent/
│   ├── sales_assistant_agent/
│   │   ├── agent.py                 # Main agent with Tools + RAG
│   │   ├── rag_example.py          # RAG example from docs
│   │   └── flask_app_content.py    # Flask API for real-time data
│   └── requirements_agent.txt
├── rag-corpus/
│   ├── outdoor-entertainment-guide.md
│   ├── product-comparison-guide.md
│   ├── bluetooth-troubleshooting.md
│   ├── customer-reviews-compilation.md
│   └── warranty-and-policies.md
├── setup_rag_corpus.py             # Setup script to populate RAG
├── deploy_agent.py                  # Deploy to Vertex AI
├── RAG_IMPLEMENTATION_GUIDE.md     # Detailed documentation
└── README.md                        # This file
```

## How It Works

### Division of Labor

**Tools (Function Calling) - Real-time Data:**
- Current product prices
- Real-time stock levels
- Product specifications from database

**RAG (Retrieval) - Domain Knowledge:**
- Product recommendations
- Setup instructions
- Troubleshooting guides
- Customer reviews
- Warranty information

### Example Queries

**Simple Stock Check (Tools Only):**
```
User: "Is the Starlight Projector 3000 in stock?"

Agent Actions:
1. get_product_info("SP3000")
2. get_inventory_status("SP3000")

Response: "Yes! We have 114 units in stock at $299.99"
```

**Use-Case Recommendation (Tools + RAG):**
```
User: "Which projector is best for outdoor movie nights?"

Agent Actions:
1. RAG retrieval → finds "SP3000 is TOP PICK for outdoor use"
2. get_product_info("SP3000") → price & specs
3. get_inventory_status("SP3000") → stock level
4. RAG retrieval → customer testimonials

Response: Expert recommendation with reasoning and customer quotes
```

**Troubleshooting (RAG Only):**
```
User: "My projector won't connect to Bluetooth"

Agent Actions:
1. RAG retrieval → bluetooth troubleshooting guide

Response: "Try this: Hold power + volume down for 5 seconds (fixes 80% of issues)..."
```

## Troubleshooting

### RAG corpus not found
```bash
# Run setup script
python setup_rag_corpus.py
```

### GCS bucket permissions
```bash
# Grant yourself storage admin role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="user:your-email@example.com" \
  --role="roles/storage.admin"
```

### Vertex AI permissions
```bash
# Grant Vertex AI user role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="user:your-email@example.com" \
  --role="roles/aiplatform.user"
```

## API Products Available

- **SP3000** - Starlight Projector 3000 ($299.99) - Outdoor capable
- **AB5000** - Aurora Beam 5000 ($449.99) - Indoor only
- **GG500** - Galaxy Globe 500 ($149.50) - Educational
- **CR100** - Cosmic Rug 100 ($79.99) - Decor
- **NS200** - Nebula Smart Light 200 ($39.99) - Smart bulb

## Resources

- [RAG Implementation Guide](./RAG_IMPLEMENTATION_GUIDE.md) - Detailed documentation
- [Vertex AI RAG Documentation](https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/rag)
- [Google ADK Guide](https://cloud.google.com/vertex-ai/docs/agent-builder)

## License

This example is for educational purposes as part of the "The Prompt is Dead! Long Live the Context!" talk.
