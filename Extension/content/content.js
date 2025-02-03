// Add this near the top of content.js
function extractPageContent() {
  const content = {
      url: window.location.href,
      timestamp: new Date(),
      headings: [],
      paragraphs: [],
  };

  // Extract headings
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headings.forEach((heading) => {
      content.headings.push({
          level: heading.tagName.toLowerCase(),
          text: heading.innerText.trim()
      });
  });

  // Extract paragraphs
  const paragraphs = document.querySelectorAll("p");
  paragraphs.forEach((paragraph) => {
    console.log("done");
      content.paragraphs.push({
          text: paragraph.innerText.trim()
      });
  });

  // Send to background script to handle MongoDB interaction
  chrome.runtime.sendMessage({
      action: 'saveToMongoDB',
      content: content,
      
  });
}

// Add this to your existing message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'savePageContent') {
      extractPageContent();
  }
});

chrome.storage.sync.get({
  fontSize: '16',
  lineSpacing: '1.5',
  fontFamily: 'OpenDyslexic',
  backgroundColor: '#FFFFF0',
  textColor: '#000000',
  isEnabled: true,
  wordSpacing: '1',
  focusMode: false
}, applySettings);

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'updateSettings') {
    applySettings(message.settings);
  }
  if (message.action === 'toggleFocusMode') {
    document.documentElement.classList.toggle('dyslexia-focus-mode', message.enabled);
  }
  if (message.action === 'updateWordSpacing') {
    document.documentElement.style.setProperty('--dyslexia-letter-spacing', `${message.spacing}px`);
  }
});

function applySettings(settings) {
  if (settings.isEnabled) {
    document.documentElement.style.setProperty('--dyslexia-font-size', `${settings.fontSize}px`);
    document.documentElement.style.setProperty('--dyslexia-line-spacing', settings.lineSpacing);
    document.documentElement.style.setProperty('--dyslexia-font', settings.fontFamily);
    document.documentElement.style.setProperty('--dyslexia-bg-color', settings.backgroundColor);
    document.documentElement.style.setProperty('--dyslexia-text-color', settings.textColor);
    document.documentElement.classList.add('dyslexia-enhanced');
  } else {
    document.documentElement.classList.remove('dyslexia-enhanced');
  }
}

// Text-to-Speech functionality
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'readAloud') {
    const speech = new SpeechSynthesisUtterance();
    speech.text = document.body.innerText;
    speech.rate = 0.9;
    speech.pitch = 1.2;
    window.speechSynthesis.speak(speech);
  }
});
// --- Existing Functionality: Enhance Readability ---
console.log("LexiFlow content script loaded.");
function enhanceReadability() {
    const bodyStyle = document.body.style;
    bodyStyle.fontFamily = "OpenDyslexic, Arial, sans-serif";
    bodyStyle.lineHeight = "1.8";
    bodyStyle.letterSpacing = "0.05em";
    bodyStyle.backgroundColor = "#FAFAFA";
    bodyStyle.color = "#333";
    console.log("LexiFlow readability adjustments applied.");
}
enhanceReadability();

const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
headings.forEach((heading, index) => {
    console.log(Heading `${index + 1}:`, heading.innerText);
});

const paragraphs = document.querySelectorAll("p");
paragraphs.forEach((paragraph, index) => {
    console.log(Paragraph `${index + 1}:`, paragraph.innerText);
});

// --- New Functionality: Integrate WebGrazer.js for Focus Tracking ---
function loadWebGrazer() {
    const webGrazerScript = document.createElement("script");
    webGrazerScript.src = chrome.runtime.getURL("webgrazer.js");
    webGrazerScript.onload = function () {
        console.log("WebGrazer.js loaded successfully.");
        if (window.WebGrazer) {
            window.webGrazer = new window.WebGrazer();
            createFocusIndicator();
        } else {
            console.error("WebGrazer failed to load.");
        }
    };
    webGrazerScript.onerror = function () {
        console.error("Failed to load WebGrazer.js.");
    };
    document.head.appendChild(webGrazerScript);
}

function createFocusIndicator() {
    const focusIndicator = document.createElement("div");
    focusIndicator.id = "focusDisplay";
    focusIndicator.style.position = "fixed";
    focusIndicator.style.bottom = "10px";
    focusIndicator.style.right = "10px";
    focusIndicator.style.backgroundColor = "rgba(0,0,0,0.7)";
    focusIndicator.style.color = "#FFF";
    focusIndicator.style.padding = "5px";
    focusIndicator.style.borderRadius = "5px";
    focusIndicator.innerText = "Focus Level: N/A";
    document.body.appendChild(focusIndicator);
}

loadWebGrazer();

// Set up the callback to update the UI and log the focus level
window.webGrazer.onFocusChange((focusLevel) => {
    console.log(`Detected focus level: ${focusLevel}%`);
    focusIndicator.textContent = `Focus Level: ${focusLevel}%`;
});

// Start focus tracking if focus mode is enabled
chrome.storage.sync.get("focusMode", (data) => {
    if (data.focusMode) {
        console.log("Starting WebGrazer (focus mode enabled).");
        window.webGrazer.start();
    }
});

// Handle messages from popup.js to enable/disable focus mode
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "toggleFocusMode") {
        if (request.enabled) {
            if (window.webGrazer) {
                console.log("Enabling focus tracking with WebGrazer.");
                window.webGrazer.start();
            } else {
                console.error("WebGrazer instance not found.");
            }
        } else {
            if (window.webGrazer) {
                console.log("Disabling focus tracking.");
                window.webGrazer.stop();
            } else {
                console.error("WebGrazer instance not found.");
            }
        }
    }
});