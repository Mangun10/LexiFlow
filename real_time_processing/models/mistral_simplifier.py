# from transformers import AutoModelForCausalLM, AutoTokenizer
# import torch

# class TextSimplifier:
#     def __init__(self, config):
#         self.config = config
#         print("Loading model and tokenizer...")
#         try:
#             # Simplified 4-bit loading
#             self.model = AutoModelForCausalLM.from_pretrained(
#                 self.config["mistral"]["model_id"],
#                 device_map="auto",
#                 load_in_4bit=True,
#                 torch_dtype=torch.float16
#             )
            
#             self.tokenizer = AutoTokenizer.from_pretrained(
#                 self.config["mistral"]["model_id"]
#             )
#             print("Model loaded successfully!")
            
#         except Exception as e:
#             print(f"Error loading model: {str(e)}")
#             raise

#     def simplify_text(self, text):
#         prompt = f"Simplify this text for dyslexic readers: {text}"
#         inputs = self.tokenizer(
#             prompt, 
#             return_tensors="pt",
#             truncation=True,
#             max_length=self.config["mistral"]["max_length"]
#         ).to(self.model.device)
        
#         with torch.no_grad():
#             outputs = self.model.generate(
#                 **inputs,
#                 max_new_tokens=self.config["mistral"]["max_length"],
#                 temperature=self.config["mistral"]["temperature"],
#                 repetition_penalty=self.config["mistral"]["repetition_penalty"]
#             )
        
#         return self.tokenizer.decode(outputs[0], skip_special_tokens=True)


import json
import requests

class TextSimplifier:
    def __init__(self, config):
        self.config = config
        self.api_url = f"{config['api_base']}/chat/completions"
        
    def simplify_text(self, text):
        try:
            payload = {
                "model": "mistral-7b-instruct",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a text simplification assistant. Simplify text while preserving meaning."
                    },
                    {
                        "role": "user",
                        "content": f"Simplify this text for dyslexic readers, making it easier to read and understand: {text}"
                    }
                ],
                "temperature": self.config['temperature'],
                "max_tokens": self.config['max_tokens']
            }
            
            response = requests.post(
                self.api_url,
                headers={"Content-Type": "application/json"},
                json=payload
            )
            
            if response.status_code == 200:
                return response.json()['choices'][0]['message']['content']
            else:
                raise Exception(f"API request failed with status {response.status_code}")
                
        except Exception as e:
            print(f"Error in simplification: {str(e)}")
            return text
