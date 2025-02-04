from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = FastAPI()

# Model Initialization
model = None
tokenizer = None

def load_model():
    global model, tokenizer
    try:
        model = AutoModelForCausalLM.from_pretrained(
            "mistralai/Mistral-7B-Instruct-v0.3",
            device_map="auto",
            torch_dtype=torch.float16,
            load_in_4bit=True  # Add 4-bit quantization
        )
        tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.3")
    except Exception as e:
        print(f"Model loading failed: {str(e)}")
        raise

load_model()  # Load model at startup

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/simplify")
async def simplify_text(request: dict):
    try:
        prompt = f"<s>[INST]Simplify this text for dyslexic readers: {request['text']}[/INST]"
        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
        
        outputs = model.generate(
            **inputs,
            max_new_tokens=512,
            temperature=0.7,
            top_p=0.9,
            do_sample=True
        )
        
        full_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        simplified = full_text.split("[/INST]")[-1].strip()
        return {"simplified": simplified}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
