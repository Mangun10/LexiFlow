# test_models.py
import numpy as np
import pandas as pd
from time import time
import spacy
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score, classification_report
from sklearn.model_selection import train_test_split
from transformers import Trainer, TrainingArguments, BertTokenizer
import xgboost as xgb
import shap
import matplotlib.pyplot as plt
import torch

# Import your model modules
# Updated imports matching actual filenames
from xgboost_classifier import XGBoostClassifier  # From xgboost_classifier.py
from bert_classifier import BERTClassifier      # From bert_classifier.py

# Initialize SpaCy for linguistic features
nlp = spacy.load("en_core_web_sm")

def load_clear_corpus():
    """Load and preprocess CLEAR corpus"""
    from datasets import load_dataset
    dataset = load_dataset("scrosseye/CLEAR-Corpus")
    
    # Linguistic feature extraction
    def extract_features(text):
        doc = nlp(text)
        return {
            'lemma': [token.lemma_ for token in doc],
            'pos_tags': [token.pos_ for token in doc],
            'dep_tags': [token.dep_ for token in doc]
        }
    
    return dataset.map(lambda x: {'features': extract_features(x['text'])})

def evaluate_xgboost(model, X_test, y_test):
    """Evaluate XGBoost model with explainability"""
    start_time = time()
    
    # Predictions
    y_pred = model.predict(X_test)
    y_proba = model.predict_proba(X_test)
    
    # Metrics
    metrics = {
        'accuracy': accuracy_score(y_test, y_pred),
        'f1_score': f1_score(y_test, y_pred, average='weighted'),
        'roc_auc': roc_auc_score(y_test, y_proba, multi_class='ovr')
    }
    
    # SHAP explainability
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X_test)
    
    print(f"XGBoost evaluation completed in {time()-start_time:.2f}s")
    return metrics, shap_values

def evaluate_bert(model, tokenizer, test_dataset):
    """Evaluate BERT model with comprehensive metrics"""
    start_time = time()
    
    # Evaluation setup
    trainer = Trainer(
        model=model,
        args=TrainingArguments(
            output_dir='./results',
            per_device_eval_batch_size=16
        )
    )
    
    # Predictions
    predictions = trainer.predict(test_dataset)
    y_pred = np.argmax(predictions.predictions, axis=1)
    y_true = predictions.label_ids
    
    # Metrics
    metrics = {
        'accuracy': accuracy_score(y_true, y_pred),
        'f1_score': f1_score(y_true, y_pred, average='weighted'),
        'classification_report': classification_report(y_true, y_pred)
    }
    
    print(f"BERT evaluation completed in {time()-start_time:.2f}s")
    return metrics

if __name__ == "__main__":
    # Load and prepare data
    dataset = load_clear_corpus()
    texts = dataset['train']['text']
    labels = dataset['train']['label']
    
    # Split data (stratified)
    X_train, X_test, y_train, y_test = train_test_split(
        texts, labels, test_size=0.2, stratify=labels, random_state=42
    )
    
    # Initialize models
    xgb_model = XGBoostClassifier().load_model()  # Implement load method in your class
    bert_model = BERTClassifier().load_model()  # Implement load method
    
    # Evaluate XGBoost
    xgb_metrics, shap_values = evaluate_xgboost(xgb_model, X_test, y_test)
    
    # Evaluate BERT
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    test_encodings = tokenizer(X_test, truncation=True, padding=True)
    bert_metrics = evaluate_bert(bert_model, tokenizer, test_encodings)
    
    # Comparative analysis
    print("\nModel Performance Comparison:")
    print(f"{'Metric':<15} | {'XGBoost':<10} | {'BERT':<10}")
    print("-"*40)
    for metric in ['accuracy', 'f1_score']:
        print(f"{metric:<15} | {xgb_metrics[metric]:<10.4f} | {bert_metrics[metric]:<10.4f}")
    
    # Save SHAP analysis
    shap.summary_plot(shap_values, X_test, show=False)
    plt.savefig('shap_summary.png', bbox_inches='tight')
