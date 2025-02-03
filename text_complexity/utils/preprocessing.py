import spacy
import pandas as pd
from textstat import textstat

class TextFeatureExtractor:
    def __init__(self):
        self.nlp = spacy.load('en_core_web_sm')
    
    def extract_features(self, text):
        doc = self.nlp(text)
        
        features = {
            'flesch_reading_ease': textstat.flesch_reading_ease(text),
            'smog_index': textstat.smog_index(text),
            'sentence_count': len(list(doc.sents)),
            'word_count': len([token for token in doc if not token.is_punct]),
            'avg_word_length': sum(len(token.text) for token in doc if not token.is_punct) / 
                             len([token for token in doc if not token.is_punct]),
            'unique_words': len(set([token.text.lower() for token in doc if not token.is_punct])),
            'complex_words': len([token for token in doc if len(token.text) > 6]),
        }
        return features
