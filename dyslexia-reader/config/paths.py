from pathlib import Path

# Get absolute path to project root
PROJECT_ROOT = Path(__file__).resolve().parent.parent
PROCESSED_DATA_PATH = PROJECT_ROOT / "data" / "processed"
RAW_DATA_PATH = PROJECT_ROOT / "data" / "raw"
