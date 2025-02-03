CLEAR_CORPUS_PATH = "data/clear_corpus"
PROCESSED_DATA_PATH = "data/processed"
MODEL_SAVE_PATH = "models/saved"

# Model parameters
XGBOOST_PARAMS = {
    'max_depth': 6,
    'learning_rate': 0.1,
    'n_estimators': 100,
    'tree_method': 'hist',
    'device': 'cuda'
}

BERT_PARAMS = {
    'num_labels': 5,  # Reading difficulty levels
    'learning_rate': 2e-5,
    'batch_size': 16,
    'max_length': 512
}
