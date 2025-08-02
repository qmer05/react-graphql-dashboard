import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pprint import pprint

## For at køre skal du først køre dette for at aktivere venv:
## source venv/Scripts/activate
## python fetch_campaigns.py

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)

response = (
    supabase.table('campaigns')
    .select("*, products(*)")
    .execute()
)

for c in response.data:

   campaign_cost = c["cost"]
   campaign_revenue = c["revenue"]

   if campaign_revenue > 0:
     campaign_profit_margin = (campaign_revenue - campaign_cost) / campaign_revenue
     print("Campaign id:", c["id"], "Cost:" ,campaign_cost, "Revenue:", campaign_revenue, "Profit marging:", campaign_profit_margin)