import json
import csv

with open("campaigns.json", "r", encoding="utf-8") as f:
    campaigns = json.load(f)

products = []
product_id_map = {}
next_product_id = 1

campaign_rows = []

for c in campaigns:
    p = c["product"]
    key = (p["name"], p["category"], p["basePrice"])

    if key not in product_id_map:
        product_id_map[key] = next_product_id
        products.append({
            "id": next_product_id,
            "name": p["name"],
            "category": p["category"],
            "base_price": p["basePrice"]
        })
        next_product_id += 1

    campaign_rows.append({
        "id": c["id"],
        "name": c["name"],
        "channel": c["channel"],
        "start_date": c["startDate"],
        "end_date": c["endDate"],
        "cost": c["cost"],
        "revenue": c["revenue"],
        "profit_margin": c["profitMargin"],
        "product_id": product_id_map[key]
    })

# Gem produkter
with open("products.csv", "w", newline='', encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["id", "name", "category", "base_price"])
    writer.writeheader()
    writer.writerows(products)

# Gem kampagner med product_id
with open("campaigns_with_products.csv", "w", newline='', encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=[
        "id", "name", "channel", "start_date", "end_date",
        "cost", "revenue", "profit_margin", "product_id"
    ])
    writer.writeheader()
    writer.writerows(campaign_rows)

print("✅ products.csv og campaigns_with_products.csv gemt.")
