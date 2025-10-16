"""
Sales Assistant Agent using Google ADK Framework with RAG

This agent demonstrates Context Engineering by combining:
- Function Calling (Tools): Real-time data from API endpoints
- RAG (Retrieval): Domain knowledge from product documentation

The agent can:
- Get real-time product info and inventory (via API tools)
- Retrieve expert knowledge from RAG corpus (guides, reviews, troubleshooting)
- Provide complete, expert-level sales assistance
"""

import os
from typing import List, Optional
import httpx
import vertexai
from vertexai import rag
from google.adk.agents import Agent

# Configuration
PROJECT_ID = os.environ.get("PROJECT_ID", "io-connect-berlin-464013")
LOCATION = os.environ.get("LOCATION", "europe-west3")
REMOTE_URL = "https://idx-sales-api-17312158-o5aatwqcrq-ew.a.run.app"
RAG_CORPUS_NAME = "projects/io-connect-berlin-464013/locations/europe-west3/ragCorpora/2305843009213693952"

# Initialize Vertex AI
vertexai.init(project=PROJECT_ID, location=LOCATION)


# ============================================================================
# TOOLS LAYER: Real-time data from API
# ============================================================================

def get_product_info(product_id: str) -> dict:
    """
    Searches the company product database to get details like name, description,
    price, and features for a given product ID.

    Args:
        product_id: The unique identifier for the product (e.g., "SP3000")

    Returns:
        Dictionary containing product details including name, description, price, and features
    """
    try:
        # Make GET request to the products endpoint
        response = httpx.get(f"{REMOTE_URL}/products/{product_id}", timeout=10.0)
        response.raise_for_status()  # Raise exception for 4xx/5xx status codes

        print(f"[TOOL EXECUTED] get_product_info for product_id: {product_id}")
        return response.json()

    except httpx.HTTPStatusError as e:
        return {
            "error": f"HTTP error occurred: {e.response.status_code}",
            "message": "Product not found or API error"
        }
    except httpx.RequestError as e:
        return {
            "error": f"Request failed: {str(e)}",
            "message": "Unable to connect to product database"
        }
    except Exception as e:
        return {
            "error": f"Unexpected error: {str(e)}",
            "message": "Failed to retrieve product information"
        }


def get_inventory_status(product_id: str) -> dict:
    """
    Checks the real-time stock level for a given product ID.

    Args:
        product_id: The unique identifier for the product (e.g., "SP3000")

    Returns:
        Dictionary containing inventory status including stock level and availability
    """
    try:
        # Make GET request to the inventory endpoint
        response = httpx.get(f"{REMOTE_URL}/inventory/{product_id}", timeout=10.0)
        response.raise_for_status()  # Raise exception for 4xx/5xx status codes

        print(f"[TOOL EXECUTED] get_inventory_status for product_id: {product_id}")
        return response.json()

    except httpx.HTTPStatusError as e:
        return {
            "error": f"HTTP error occurred: {e.response.status_code}",
            "message": "Inventory data not found or API error"
        }
    except httpx.RequestError as e:
        return {
            "error": f"Request failed: {str(e)}",
            "message": "Unable to connect to inventory system"
        }
    except Exception as e:
        return {
            "error": f"Unexpected error: {str(e)}",
            "message": "Failed to retrieve inventory status"
        }

def list_all_products(category: Optional[str] = None) -> dict:
    """
    Lists all products in the catalog, with an option to filter by category.

    Args:
        category: The category to filter by (e.g., "projector", "lighting")

    Returns:
        A dictionary of all products, or products within the specified category.
    """
    try:
        params = {"category": category} if category else {}
        response = httpx.get(f"{REMOTE_URL}/products", params=params, timeout=10.0)
        response.raise_for_status()

        print(f"[TOOL EXECUTED] list_all_products with category: {category}")
        return response.json()

    except httpx.HTTPStatusError as e:
        return {"error": f"HTTP error: {e.response.status_code}", "message": "API error"}
    except httpx.RequestError as e:
        return {"error": f"Request failed: {e}", "message": "Cannot connect to product database"}
    except Exception as e:
        return {"error": f"Unexpected error: {e}", "message": "Failed to list products"}


def search_products_by_name(query: str) -> dict:
    """
    Searches for products by name or description.

    Args:
        query: The search query.

    Returns:
        A dictionary of products that match the search query.
    """
    try:
        response = httpx.get(f"{REMOTE_URL}/products/search", params={"q": query}, timeout=10.0)
        response.raise_for_status()

        print(f"[TOOL EXECUTED] search_products_by_name with query: {query}")
        return response.json()

    except httpx.HTTPStatusError as e:
        return {"error": f"HTTP error: {e.response.status_code}", "message": "API error"}
    except httpx.RequestError as e:
        return {"error": f"Request failed: {e}", "message": "Cannot connect to product database"}
    except Exception as e:
        return {"error": f"Unexpected error: {e}", "message": "Failed to search for products"}


def add_new_product(
    name: str,
    description: str,
    price: float,
    features: List[str],
    stock: int,
    category: Optional[str] = None,
    brightness_lumens: Optional[int] = None,
) -> dict:
    """
    Adds a new product to the catalog.

    Args:
        name: The name of the product.
        description: A description of the product.
        price: The price of the product.
        features: A list of product features.
        stock: The initial stock level.
        category: The product category.
        brightness_lumens: The brightness in lumens (for projectors).

    Returns:
        A dictionary containing the new product's ID.
    """
    try:
        product_data = {
            "name": name,
            "description": description,
            "price": price,
            "features": features,
            "stock": stock,
            "category": category,
            "brightness_lumens": brightness_lumens,
        }
        # Filter out None values
        product_data = {k: v for k, v in product_data.items() if v is not None}

        response = httpx.post(f"{REMOTE_URL}/products", json=product_data, timeout=10.0)
        response.raise_for_status()

        print(f"[TOOL EXECUTED] add_new_product with name: {name}")
        return response.json()

    except httpx.HTTPStatusError as e:
        return {"error": f"HTTP error: {e.response.status_code}", "message": "API error"}
    except httpx.RequestError as e:
        return {"error": f"Request failed: {e}", "message": "Cannot connect to product database"}
    except Exception as e:
        return {"error": f"Unexpected error: {e}", "message": "Failed to add product"}

# ============================================================================
# RAG LAYER: Domain knowledge from product documentation
# ============================================================================

def create_rag_tool(rag_corpus_name: str):
    """
    Create a callable RAG retrieval tool from the corpus.
    Args:
        rag_corpus_name: The RAG corpus resource name to create the tool from.
    Returns:
        A callable function for RAG retrieval.
    """
    if not rag_corpus_name:
        return None

    try:
        def query_knowledge_base(query: str) -> dict:
            """
            Searches the product knowledge base for information.
            Use this tool to answer questions about product features,
            comparisons, troubleshooting, and customer reviews.
            Args:
                query: The question or topic to search for in the knowledge base.
            Returns:
                A dictionary containing the retrieved information.
            """
            response = rag.retrieval_query(
                rag_resources=[
                    rag.RagResource(
                        rag_corpus=rag_corpus_name,
                    )
                ],
                text=query,
            )
            # Format the response into a dictionary that the agent can process.
            contexts = [
                f"Source: {c.source}\nText: {c.text}"
                for c in response.retrieved_contexts
            ]
            return {"retrieved_information": "\n\n".join(contexts)}

        print("[RAG] Retrieval tool created successfully")
        return query_knowledge_base

    except Exception as e:
        print(f"[RAG ERROR] Failed to create retrieval tool: {str(e)}")
        return None


# ============================================================================
# AGENT CREATION: Combining Tools + RAG
# ============================================================================

# Create RAG tool (will be None if corpus doesn't exist or has errors)
rag_tool = create_rag_tool(RAG_CORPUS_NAME)

# Build tools list
tools = [
    get_product_info,
    get_inventory_status,
    list_all_products,
    search_products_by_name,
    add_new_product,
]
if rag_tool is not None:
    tools.append(rag_tool)
    print("[AGENT] Creating agent with Tools + RAG")
    instruction = """
    You are an expert sales assistant for a company. You have access to both
    real-time data and accumulated knowledge.

    **WHEN TO USE EACH TOOL:**

    **Use get_product_info, get_inventory_status, list_all_products, search_products_by_name, and add_new_product for REAL-TIME DATA:**
    - Current prices (prices can change)
    - Stock levels (inventory changes constantly)
    - Product specifications from the database
    - Listing all available products
    - Searching for a specific product
    - Adding a new product to the catalog

    **Use query_knowledge_base for DOMAIN KNOWLEDGE and EXPERTISE:**
    - Product recommendations based on use cases
    - Setup instructions and troubleshooting
    - Customer reviews and testimonials
    - Product comparisons and buying guides
    - Warranty and policy information

    **BEST PRACTICES:**
    1. Always check real-time inventory before recommending products
    2. Cite customer reviews when relevant (use RAG)
    3. Provide setup instructions for products (use RAG)
    4. Offer troubleshooting help proactively (use RAG)
    5. Be honest about product limitations
    6. Combine real-time data with expert knowledge for complete answers

    **EXAMPLE FLOW:**
    User: "Which projector is best for outdoor use under $400?"
    1. Use RAG to find outdoor recommendations
    2. Use get_product_info to get current prices
    3. Use get_inventory_status to check stock
    4. Use RAG to get customer testimonials
    5. Provide comprehensive, expert answer

    Always be polite, helpful, and customer-focused. Provide clear, friendly,
    and professional responses that combine both real-time data and expertise.
    """
else:
    print("[AGENT] Creating agent with Tools only (RAG not available)")
    instruction = """
    You are a helpful sales assistant for a company. Your role is to help customers
    by answering questions about products and inventory.

    When a customer asks about a product:
    - Use get_product_info to retrieve product details (name, description, price, features)
    - Use get_inventory_status to check stock availability
    - Use list_all_products to see all available products
    - Use search_products_by_name to find a specific product
    - Use add_new_product to add a new product to the catalog
    - Provide clear, friendly, and professional responses
    - If you encounter errors, apologize and explain the issue clearly

    Always be polite, helpful, and customer-focused in your responses.
    """

# Create the Sales Assistant Agent
sales_assistant_agent = Agent(
    name="sales_assistant_agent",
    description="Expert sales assistant with product knowledge and real-time inventory access",
    tools=tools,
    model="gemini-2.5-flash",
    instruction=instruction
)

print(f"[AGENT] Agent created with {len(tools)} tools:")
print(f"[AGENT]   - get_product_info (API)")
print(f"[AGENT]   - get_inventory_status (API)")
print(f"[AGENT]   - list_all_products (API)")
print(f"[AGENT]   - search_products_by_name (API)")
print(f"[AGENT]   - add_new_product (API)")
if rag_tool is not None:
    print(f"[AGENT]   - query_knowledge_base (Knowledge Base)")

# Export as root_agent for ADK framework compatibility
root_agent = sales_assistant_agent
