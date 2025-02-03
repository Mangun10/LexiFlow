from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

class TextSimplifier:
    def __init__(self, config):
        self.config = config
        print("Loading model and tokenizer...")
        try:
            self.model = self._load_model()
            self.tokenizer = self._load_tokenizer()
            print("Model loaded successfully!")
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise
        
    def _load_model(self):
        return AutoModelForCausalLM.from_pretrained(
            self.config["mistral"]["model_id"],
            device_map="auto",
            low_cpu_mem_usage=True,
            torch_dtype=torch.float16
        )
    
    def _load_tokenizer(self):
        return AutoTokenizer.from_pretrained(
            self.config["mistral"]["model_id"]
        )
    
    def simplify_text(self, text):
        prompt = f"Simplify this text for dyslexic readers: {text}"
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.model.device)
        
        outputs = self.model.generate(
            inputs["input_ids"],
            max_length=self.config["mistral"]["max_length"],
            temperature=self.config["mistral"]["temperature"],
            repetition_penalty=self.config["mistral"]["repetition_penalty"],
            do_sample=True
        )
        
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)
