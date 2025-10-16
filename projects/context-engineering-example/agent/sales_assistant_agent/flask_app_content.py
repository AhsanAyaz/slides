from flask import Flask, jsonify, request
from pydantic import BaseModel, ValidationError

app = Flask(__name__)

# In-memory data store
PRODUCT_CATALOG = {
    "SP3000": {
        "name": "Starlight Projector 3000",
        "description": "A 4K laser projection system with 16 nebula effects and Bluetooth speaker integration. Perfect for outdoor movie nights!",
        "price": 299.99,
        "category": "projector",
        "brightness_lumens": 3500,
        "features": [
            "4K Resolution",
            "16 Nebula Effects",
            "Bluetooth Speaker",
            "Remote Control",
            "Weather Resistant IP65",
            "3500 Lumens Brightness",
            "Battery Compatible"
        ],
        "stock": 114
    },
    "AB5000": {
        "name": "Aurora Beam 5000",
        "description": "High-brightness indoor projector with 4200 lumens and smart home integration. Designed for dedicated home theaters.",
        "price": 449.99,
        "category": "projector",
        "brightness_lumens": 4200,
        "features": [
            "4K Resolution",
            "4200 Lumens Brightness",
            "WiFi Enabled",
            "Smart Home Compatible",
            "Voice Control",
            "App Control",
            "Indoor Use Only"
        ],
        "stock": 23
    },
    "GG500": {
        "name": "Galaxy Globe 500",
        "description": "A desk-sized sphere that projects the entire Milky Way onto your ceiling. Perfect educational tool for kids!",
        "price": 149.50,
        "category": "globe",
        "features": [
            "HD Projection",
            "Rotating Base",
            "Educational App Integration",
            "Constellation Guide",
            "USB Powered"
        ],
        "stock": 0
    },
    "CR100": {
        "name": "Cosmic Rug 100",
        "description": "A rug that looks like a galaxy. Adds cosmic charm to any room!",
        "price": 79.99,
        "category": "decor",
        "features": [
            "Non-slip",
            "Machine washable",
            "Glow-in-the-dark fibers",
            "5ft x 7ft",
            "Soft plush material"
        ],
        "stock": 250
    },
    "NS200": {
        "name": "Nebula Smart Light 200",
        "description": "Smart LED bulb that projects nebula patterns on walls and ceilings. WiFi-enabled with voice control.",
        "price": 39.99,
        "category": "lighting",
        "features": [
            "WiFi Enabled",
            "16M Colors",
            "Music Sync",
            "Voice Control",
            "App Control",
            "Standard E26 Base"
        ],
        "stock": 342
    }
}

# Pydantic Models for response validation
class Product(BaseModel):
    name: str
    description: str
    price: float
    features: list[str]
    category: str | None = None
    brightness_lumens: int | None = None


class Inventory(BaseModel):
    product_id: str
    stock: int
    available: bool


class ProductIn(BaseModel):
    name: str
    description: str
    price: float
    features: list[str]
    stock: int
    category: str | None = None
    brightness_lumens: int | None = None


@app.route("/products/<product_id>", methods=["GET"])
def get_product(product_id: str):
    """Get a single product's details."""
    product = PRODUCT_CATALOG.get(product_id)
    if not product:
        return jsonify({"detail": "Product not found"}), 404

    try:
        # Create a copy without 'stock' for Product validation
        product_data_dict = {k: v for k, v in product.items() if k != 'stock'}
        product_data = Product(**product_data_dict)
        return jsonify(product_data.model_dump()), 200
    except ValidationError as e:
        return jsonify({"detail": e.errors()}), 500


@app.route("/inventory/<product_id>", methods=["GET"])
def get_inventory(product_id: str):
    """Get a single product's inventory level."""
    product = PRODUCT_CATALOG.get(product_id)
    if not product:
        return jsonify({"detail": "Product not found"}), 404

    try:
        stock_level = product["stock"]
        inventory_data = Inventory(
            product_id=product_id,
            stock=stock_level,
            available=(stock_level > 0)
        )
        return jsonify(inventory_data.model_dump()), 200
    except ValidationError as e:
        return jsonify({"detail": e.errors()}), 500


@app.route("/products", methods=["GET"])
def list_products():
    """List all products with optional category filter."""
    category = request.args.get('category')

    if category:
        # Filter by category
        filtered = {
            pid: p for pid, p in PRODUCT_CATALOG.items()
            if p.get("category") == category
        }
        return jsonify(filtered), 200

    # Return all products
    return jsonify(PRODUCT_CATALOG), 200


@app.route("/products/search", methods=["GET"])
def search_products():
    """Search products by name or description."""
    query = request.args.get('q', '').lower()

    if not query:
        return jsonify({"detail": "Query parameter 'q' is required"}), 400

    # Search in name and description
    results = {
        pid: p for pid, p in PRODUCT_CATALOG.items()
        if query in p['name'].lower() or query in p['description'].lower()
    }

    return jsonify(results), 200


@app.route("/products", methods=["POST"])
def add_product():
    """Add a new product to the catalog."""
    try:
        new_product_data = ProductIn(**request.json)
    except ValidationError as e:
        return jsonify({"detail": e.errors()}), 400

    # Generate a new product ID
    new_product_id = f"NEW{len(PRODUCT_CATALOG) + 1}"
    PRODUCT_CATALOG[new_product_id] = new_product_data.model_dump()

    return jsonify({"product_id": new_product_id}), 201


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3000)
