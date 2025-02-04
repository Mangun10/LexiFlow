from pathlib import Path
import sys
sys.path.append(str(Path(__file__).parent))

from config.model_config import MODEL_CONFIG
from models.mistral_simplifier import TextSimplifier

def main():
    try:
        print("Initializing LexiFlow text simplifier...")
        simplifier = TextSimplifier(MODEL_CONFIG)
        
        # Test simplification
        text = "The quick brown fox jumps over the lazy dog."
        print("\nOriginal text:", text)
        simplified = simplifier.simplify_text(text)
        print("Simplified text:", simplified)
        
    except Exception as e:
        print(f"Error during processing: {str(e)}")

if __name__ == "__main__":
    main()
