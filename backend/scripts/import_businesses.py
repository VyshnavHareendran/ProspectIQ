import pandas as pd

from app.database import SessionLocal
from app.models.business import Business

db = SessionLocal()

df = pd.read_csv("dataset/daily_call_list_yelp.csv")

for _, row in df.iterrows():

    business = Business(
        business_name=row["name"],
        category=row["category_grouped"],
        description=None,

        phone_number="Not Available",
        whatsapp_number=None,
        email=None,
        website_url=None,

        address=f"{row['city']}, {row['state']}",
        city=row["city"],
google_maps_link=f"https://maps.google.com/?q={row['name'].replace(' ', '+')}_{row['business_id']}",

        google_rating=row["stars"],
        review_count=row["review_count"],

        business_hours=None,
        remarks=None,

        data_source="Yelp Dataset"
    )

    db.add(business)

db.commit()

print(f"Successfully imported {len(df)} businesses!")

db.close()