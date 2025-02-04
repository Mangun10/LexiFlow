from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

class TextSimplifier:
    def _init_(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = AutoModelForCausalLM.from_pretrained(
            "mistralai/Mistral-7B-Instruct-v0.3",
            torch_dtype=torch.float16,
            device_map="auto"
        )
        self.tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.3")

    def simplify_text(self, text):
        prompt = f"<s>[INST]Simplify this text for dyslexic readers: {text}[/INST]"
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.device)
        
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=512,
                temperature=0.7,
                top_p=0.9
            )
            
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True).split("[/INST]")[-1].strip()