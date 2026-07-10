import pandas as pd

# Read the dataset
df = pd.read_csv("dataset/daily_call_list_yelp.csv")

# Print first 5 rows
print(df.head())

# Print column names
print("\nColumns:")
print(df.columns.tolist())

# Print total number of businesses
print("\nTotal Businesses:", len(df))