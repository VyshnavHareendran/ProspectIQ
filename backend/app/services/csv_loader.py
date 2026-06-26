import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent

def load_businesses():
    csv_path = BASE_DIR / "docs" / "businesses.csv"
    return pd.read_csv(csv_path)