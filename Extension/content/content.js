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
