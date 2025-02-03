import torch
print(torch.__version__)  # Should show 2.2.2+cu118 or 2.1.0+cu118
print(torch.cuda.is_available())  # Should return True
