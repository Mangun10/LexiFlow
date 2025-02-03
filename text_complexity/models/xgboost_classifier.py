import xgboost as xgb
import shap
import numpy as np
from sklearn.model_selection import train_test_split

class XGBoostReadabilityClassifier:
    def __init__(self, params):
        self.model = xgb.XGBClassifier(**params)
        self.explainer = None
    
    def train(self, X, y):
        # Split data
        X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2)
        
        # Train with early stopping using eval_set
        self.model.fit(
            X_train, 
            y_train,
            eval_set=[(X_val, y_val)],
            verbose=True
        )
        
        # Initialize SHAP explainer
        self.explainer = shap.TreeExplainer(self.model)
        
    def predict(self, X):
        return self.model.predict(X)
    
    def explain(self, X):
        if self.explainer is None:
            raise ValueError("Model must be trained before generating explanations")
        shap_values = self.explainer.shap_values(X)
        return shap_values
