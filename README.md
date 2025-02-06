# LexiFlow

LexiFlow is a browser extension that assists dyslexic readers by dynamically restructuring web text simplifying complex sentences with an AI-driven pipeline. The project leverages the Chrome Extensions API, React for the UI, and JS frameworks such as WebGazer.js for webcam-based eye-tracking and Tesseract.js for OCR. The text simplification engine utilizes a Mistral-7B-based model via HuggingFace's pipeline and a fine-tuned Whisper model, with additional support from TensorFlow.js and ONNX for local inference.

## Core Functionality

1. **Dynamic Text Restructuring**
   - Font Adaptation: Automatic switching to OpenDyslexic/Atkinson Hyperlegible fonts
   - Layout Optimization: Adjusts spacing (letter: 1.2x, line: 1.5x), paragraph width (60ch max)
   - Visual Aids: Focus mode with gradient masking

2. **AI-Powered Support**
   - Text Simplification:
     ```python
     from transformers import pipeline
     simplifier = pipeline("text2text-generation", model="mistralai/Mistral-7B-SLIM-Simplification")
     ```
     Reduces lexical density while preserving meaning
   - Pronunciation Feedback: Fine-tuned Whisper model detects/corrects misread words

3. **Webcam Integration**
   - Reading Speed Adjustment:
     ```javascript
     webgazer.setGazeListener((data) => {
       if(data) updateTTSspeed(data.xVelocity);
     }).begin();
     ```
     Uses WebGazer.js (30Hz sampling) with scroll dwell fallback

4. **Multimodal Learning**
   - Text-to-Speech with word highlighting
   - Contextual definitions via hover-triggered tooltips

## Research Basis

Implements findings from:
- Dyslexia Style Guide (BDA, 2023):
  - Optimal contrast ratios (4.5:1 minimum)
  - Left-aligned text with 1.5x spacing
- AI for Dyslexia (NaturalReader, 2024):
  - Multi-sensory feedback loops
  - Error-tolerant pronunciation models
- Early Detection Systems (U. Malta, 2024):
  - Gaze pattern analysis heuristics
  - Reading fluency metrics


## Citation

If using in research, reference this paper: [A large-scaled corpus for assessing text readability (ResearchGate, March 2022)](https://www.researchgate.net/publication/359277397_A_large-scaled_corpus_for_assessing_text_readability)

## Installation

### Prerequisites
- Chrome/Firefox (WebExtensions API)
- Webcam (optional but recommended)

### Steps

Clone repo:
```bash
git clone https://github.com/NoWon1/LexiFlow.git
cd LexiFlow
```

Install dependencies:
```bash
npm install @tensorflow/tfjs @webgazerjs/webgazer
```

Build extension:
```bash
npm run build
```

Load unpacked extension in browser developer mode.

## Usage Guide

### Basic Controls

| Shortcut | Action |
|----------|--------|
| Alt+D    | Toggle dyslexia mode |
| Alt+S    | Open settings panel  |
| Alt+R    | Reset to default webpage styling |

### Advanced Features

- **Adaptive Difficulty:**
  - Automatically adjusts based on CommonLit Ease scores
  - Manual override via settings (1-10 scale)
- **Eye-Calibration:**
  - Click calibration icon
  - Follow 9-point gaze pattern
  - Save profile for personalized tracking
