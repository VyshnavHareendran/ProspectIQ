from app.services.csv_loader import load_businesses

df = load_businesses()

print(df.head())
print(f"\nTotal Businesses: {len(df)}")