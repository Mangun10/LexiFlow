import sys
from pathlib import Path
import spacy
import pandas as pd
from tqdm import tqdm
from textstat import textstat

# Add project root to Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

from config.paths import PROCESSED_DATA_PATH

def extract_features(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    
    features = {
        # Lexical Diversity
        "type_token_ratio": len(set(token.text.lower() for token in doc)) / len(doc),
        "avg_word_length": sum(len(token.text) for token in doc) / len(doc),
        
        # Syntactic Complexity
        "sentence_count": len(list(doc.sents)),
        "words_per_sentence": len(doc) / len(list(doc.sents)),
        
        # Readability Metrics
        "flesch_kincaid": textstat.flesch_kincaid_grade(text),
        "coleman_liau": textstat.coleman_liau_index(text),
        "automated_readability": textstat.automated_readability_index(text)
    }
    return features

def generate_features():
    try:
        # Create processed directory if it doesn't exist
        PROCESSED_DATA_PATH.mkdir(parents=True, exist_ok=True)
        
        # Read processed text data
        df = pd.read_parquet(PROCESSED_DATA_PATH / "clear_processed.parquet")
        
        # Extract features with progress bar
        tqdm.pandas(desc="Extracting features")
        feature_df = df["Excerpt"].progress_apply(extract_features).apply(pd.Series)
        
        # Combine with original data
        final_df = pd.concat([df, feature_df], axis=1)
        
        # Save features
        final_df.to_csv(PROCESSED_DATA_PATH / "clear_features.csv", index=False)
        final_df.to_parquet(PROCESSED_DATA_PATH / "clear_features.parquet")
        print("Feature extraction completed successfully!")
        
    except Exception as e:
        print(f"Error during feature extraction: {str(e)}")

if __name__ == "__main__":
    generate_features()
