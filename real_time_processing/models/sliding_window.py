import torch

class SlidingWindowAttention:
    def __init__(self, window_size=4096):
        self.window_size = window_size
        self.cache = []
        
    def process(self, text_tokens):
        # Implement sliding window for long texts
        if len(text_tokens) <= self.window_size:
            return text_tokens
            
        # Keep most recent tokens in cache
        self.cache = text_tokens[-self.window_size:]
        
        # Process with overlap
        chunks = []
        for i in range(0, len(text_tokens), self.window_size // 2):
            chunk = text_tokens[i:i + self.window_size]
            chunks.append(chunk)
            
        return chunks
