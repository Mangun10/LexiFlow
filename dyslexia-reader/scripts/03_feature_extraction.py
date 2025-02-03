import spacy
import pandas as pd
from tqdm import tqdm
from textstat import textstat
from config.paths import PROCESSED_DATA_PATH

nlp = spacy.load("en_core_web_sm")

def extract_features(text):
    doc = nlp(text)
    features = {
        # Lexical Diversity
        "ttr": len(set(token.text for token in doc)) / len(doc),  # Type-Token Ratio
        "avg_word_length": sum(len(token.text) for token in doc) / len(doc),
        
        # Syntactic Complexity
        "mean_tree_depth": sum([s._.parse_tree_depth for s in doc.sents]) / len(list(doc.sents)),
        "np_per_clause": len([nc for nc in doc.noun_chunks]) / max(1, len(list(doc.sents))),
        
        # Discourse Features
        "coref_density": len(doc._.coref_chains) / len(doc),
        
        # Readability Metrics
        "flesch_kincaid": textstat.flesch_kincaid_grade(text),
        "coleman_liau": textstat.coleman_liau_index(text)
    }
    return features

def generate_features():
    df = pd.read_parquet(PROCESSED_DATA_PATH / "clear_processed.parquet")
    tqdm.pandas(desc="Extracting features")
    feature_df = df["Text"].progress_apply(extract_features).apply(pd.Series)
    final_df = pd.concat([df, feature_df], axis=1)
    final_df.to_csv(PROCESSED_DATA_PATH / "clear_features.csv", index=False)
    final_df.to_parquet(PROCESSED_DATA_PATH / "clear_features.parquet")
