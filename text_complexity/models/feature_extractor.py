import spacy
from textstat import textstat
from collections import Counter

class TextFeatureExtractor:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.nlp.add_pipe("coreferee")  # For coreference resolution
        
    def extract_features(self, text):
        """Extract 86 linguistic features from text"""
        doc = self.nlp(text)
        
        # Basic statistics
        word_count = len([token for token in doc if not token.is_punct])
        sent_count = len(list(doc.sents))
        char_count = sum(len(token.text) for token in doc if not token.is_punct)
        
        # Readability metrics
        readability_features = {
            'flesch_reading_ease': textstat.flesch_reading_ease(text),
            'flesch_kincaid_grade': textstat.flesch_kincaid_grade(text),
            'smog_index': textstat.smog_index(text),
            'coleman_liau_index': textstat.coleman_liau_index(text),
            'automated_readability_index': textstat.automated_readability_index(text),
            'dale_chall_readability': textstat.dale_chall_readability_score(text)
        }
        
        # Lexical complexity
        words = [token.text.lower() for token in doc if token.is_alpha]
        unique_words = set(words)
        ttr = len(unique_words) / len(words) if words else 0
        
        # Syntactic complexity
        complex_sents = sum(1 for sent in doc.sents if len(sent) > 15)
        avg_sent_length = word_count / sent_count if sent_count else 0
        
        # Discourse features
        coref_chains = doc._.coref_chains
        coref_density = len(coref_chains) / sent_count if sent_count else 0
        
        # POS tagging features
        pos_counts = Counter(token.pos_ for token in doc)
        pos_features = {
            f'pos_{k}': v/word_count for k,v in pos_counts.items()
        }
        
        # Dependency parsing
        dep_counts = Counter(token.dep_ for token in doc)
        dep_features = {
            f'dep_{k}': v/word_count for k,v in dep_counts.items()
        }
        
        # Combine all features
        features = {
            'word_count': word_count,
            'sentence_count': sent_count,
            'avg_word_length': char_count/word_count if word_count else 0,
            'type_token_ratio': ttr,
            'complex_sentence_ratio': complex_sents/sent_count if sent_count else 0,
            'coreference_density': coref_density,
            **readability_features,
            **pos_features,
            **dep_features
        }
        
        return features

if __name__ == "__main__":
    # Test with sample text
    extractor = TextFeatureExtractor()
    sample_text = """When the young people returned to the ballroom, it presented a decidedly changed appearance."""
    features = extractor.extract_features(sample_text)
    print("Extracted Features:")
    for k, v in features.items():
        print(f"{k}: {v:.4f}")
