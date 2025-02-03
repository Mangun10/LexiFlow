import sys
from pathlib import Path
import spacy
from tqdm import tqdm
import pandas as pd

# Add project root to Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

from config.paths import PROCESSED_DATA_PATH, RAW_DATA_PATH

def preprocess_text(text):
    """Preprocess text using spaCy"""
    nlp = spacy.load("en_core_web_sm", disable=["ner"])
    doc = nlp(text)
    return " ".join([
        token.lemma_.lower() for token in doc
        if not token.is_stop and not token.is_punct
    ])

def process_corpus():
    """Process entire corpus with progress bar"""
    try:
        # Create processed directory if it doesn't exist
        PROCESSED_DATA_PATH.mkdir(parents=True, exist_ok=True)
        
        # Read raw parquet file
        df = pd.read_parquet(PROCESSED_DATA_PATH / "clear_raw.parquet")
        
        # Process texts with progress bar
        tqdm.pandas(desc="Preprocessing texts")
        df["processed_text"] = df["Excerpt"].progress_apply(preprocess_text)
        
        # Save processed data
        df.to_parquet(PROCESSED_DATA_PATH / "clear_processed.parquet")
        print("Preprocessing completed successfully!")
        
    except Exception as e:
        print(f"Error during preprocessing: {str(e)}")

if __name__ == "__main__":
    process_corpus()
