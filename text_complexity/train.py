import pandas as pd
from pathlib import Path
import os
from tqdm import tqdm  # Add this import
from models.xgboost_classifier import XGBoostReadabilityClassifier
from models.bert_classifier import BERTReadabilityClassifier
from utils.preprocessing import TextFeatureExtractor
from config import XGBOOST_PARAMS, BERT_PARAMS

def ensure_directories():
    """Create necessary directories if they don't exist"""
    directories = ['data/clear_corpus', 'data/processed', 'models/saved']
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)

def load_clear_corpus():
    """Load and preprocess the CLEAR corpus data"""
    try:
        # Verify file exists
        data_path = Path("data/clear_corpus/CLEAR_corpus_final.xlsx")
        if not data_path.exists():
            raise FileNotFoundError(
                "CLEAR_corpus_final.xlsx not found. Please place it in data/clear_corpus/ directory"
            )

        print(f"Loading data from {data_path}")
        df = pd.read_excel(data_path, sheet_name="Data")
        
        # Extract required columns
        texts = df["Excerpt"].tolist()
        
        # Convert Flesch-Kincaid Grade Level to difficulty labels (1-5)
        labels = pd.qcut(df["Flesch-Kincaid-Grade-Level"], 
                        q=5, 
                        labels=[0,1,2,3,4]).astype(int)
        
        print(f"Loaded {len(texts)} texts with {len(set(labels))} difficulty levels")
        return texts, labels.tolist()
    
    except Exception as e:
        print(f"Error loading CLEAR corpus: {str(e)}")
        print("\nPlease ensure:")
        print("1. CLEAR_corpus_final.xlsx is in data/clear_corpus/")
        print("2. File has 'Data' sheet")
        print("3. Required columns (Excerpt, Flesch-Kincaid-Grade-Level) exist")
        raise

def main():
    # Setup directories
    ensure_directories()
    
    try:
        # Load data
        texts, labels = load_clear_corpus()
        
        print("\nExtracting features...")
        feature_extractor = TextFeatureExtractor()
        
        # Use tqdm for progress tracking
        features = pd.DataFrame([
            feature_extractor.extract_features(text) 
            for text in tqdm(texts, desc="Processing texts")
        ])
        
        # Save processed features
        features.to_parquet("data/processed/features.parquet")
        
        print("\nTraining XGBoost model...")
        xgb_classifier = XGBoostReadabilityClassifier(XGBOOST_PARAMS)
        xgb_classifier.train(features, labels)
        
        print("\nTraining BERT model...")
        bert_classifier = BERTReadabilityClassifier(BERT_PARAMS)
        bert_classifier.train(texts, labels)
        
        print("\nTraining completed successfully!")
        
    except Exception as e:
        print(f"\nError during training: {str(e)}")
        raise

if __name__ == "__main__":
    main()
