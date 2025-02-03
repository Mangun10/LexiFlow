import torch
from transformers import BertForSequenceClassification, BertTokenizer
from torch.utils.data import DataLoader, TensorDataset

class BERTReadabilityClassifier:
    def __init__(self, params):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = BertForSequenceClassification.from_pretrained(
            'bert-base-uncased', 
            num_labels=params['num_labels']
        ).to(self.device)
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.max_length = params['max_length']
        self.batch_size = params['batch_size']
        
    def prepare_data(self, texts):
        encodings = self.tokenizer(
            texts,
            truncation=True,
            padding=True,
            max_length=self.max_length,
            return_tensors='pt'
        )
        return encodings
    
    def train(self, texts, labels, epochs=3):
        encodings = self.prepare_data(texts)
        dataset = TensorDataset(
            encodings['input_ids'],
            encodings['attention_mask'],
            torch.tensor(labels)
        )
        loader = DataLoader(dataset, batch_size=self.batch_size, shuffle=True)
        
        optimizer = torch.optim.AdamW(self.model.parameters(), lr=2e-5)
        
        self.model.train()
        for epoch in range(epochs):
            for batch in loader:
                optimizer.zero_grad()
                input_ids, attention_mask, labels = [b.to(self.device) for b in batch]
                
                outputs = self.model(
                    input_ids=input_ids,
                    attention_mask=attention_mask,
                    labels=labels
                )
                
                loss = outputs.loss
                loss.backward()
                optimizer.step()
    
    def predict(self, texts):
        self.model.eval()
        encodings = self.prepare_data(texts)
        with torch.no_grad():
            input_ids = encodings['input_ids'].to(self.device)
            attention_mask = encodings['attention_mask'].to(self.device)
            outputs = self.model(input_ids=input_ids, attention_mask=attention_mask)
            predictions = torch.argmax(outputs.logits, dim=1)
        return predictions.cpu().numpy()
