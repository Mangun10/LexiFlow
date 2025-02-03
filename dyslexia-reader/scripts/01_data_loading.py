import pandas as pd
from config.paths import RAW_DATA_PATH, PROCESSED_DATA_PATH

def load_clear_corpus():
    # First check available columns
    test_df = pd.read_excel(RAW_DATA_PATH / "CLEAR_corpus_final.xlsx", sheet_name=0, nrows=0)
    print("Actual columns in Excel:", test_df.columns.tolist())
    
    # Now read full data with correct columns
    df = pd.read_excel(
        RAW_DATA_PATH / "CLEAR_corpus_final.xlsx",
        sheet_name=0,  # First sheet
        usecols=["Excerpt", "Flesch-Kincaid-Grade-Level", "BT_easiness"],  # Actual columns from data
        engine='openpyxl'
    )
    df.to_parquet(PROCESSED_DATA_PATH / "clear_raw.parquet")
    return df

if __name__ == "__main__":
    load_clear_corpus()
