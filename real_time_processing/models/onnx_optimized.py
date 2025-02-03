import onnxruntime as ort
from pathlib import Path

class ONNXOptimizer:
    def __init__(self, model_path):
        self.model_path = Path(model_path)
        self.optimized_path = self.model_path.parent / f"{self.model_path.stem}_optimized.onnx"
        
    def optimize(self):
        # Create optimization pipeline
        sess_options = ort.SessionOptions()
        sess_options.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
        sess_options.optimized_model_filepath = str(self.optimized_path)
        
        # Create optimization session
        _ = ort.InferenceSession(
            str(self.model_path),
            sess_options,
            providers=['CUDAExecutionProvider', 'CPUExecutionProvider']
        )
        
        return self.optimized_path
