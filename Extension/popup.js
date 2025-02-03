// popup.js

document.addEventListener('DOMContentLoaded', function() {
    // Get saved settings when popup opens
    chrome.storage.sync.get({
        fontSize: '16',
        lineSpacing: '1.5',
        fontFamily: 'OpenDyslexic',
        backgroundColor: '#FFFFF0',
        textColor: '#000000',
        isEnabled: true
    }, function(settings) {
        // Update UI elements with saved settings
        document.getElementById('fontSize').value = settings.fontSize;
        document.getElementById('lineSpacing').value = settings.lineSpacing;
        document.getElementById('fontFamily').value = settings.fontFamily;
        document.getElementById('backgroundColor').value = settings.backgroundColor;
        document.getElementById('textColor').value = settings.textColor;
        document.getElementById('enableToggle').checked = settings.isEnabled;
        
        // Update preview text with current settings
        updatePreview(settings);
    });

    // Event listeners for settings changes
    document.getElementById('fontSize').addEventListener('change', saveSettings);
    document.getElementById('lineSpacing').addEventListener('change', saveSettings);
    document.getElementById('fontFamily').addEventListener('change', saveSettings);
    document.getElementById('backgroundColor').addEventListener('change', saveSettings);
    document.getElementById('textColor').addEventListener('change', saveSettings);
    document.getElementById('enableToggle').addEventListener('change', saveSettings);
    
    // Reset button listener
    document.getElementById('resetButton').addEventListener('click', resetSettings);
});

function saveSettings() {
    const settings = {
        fontSize: document.getElementById('fontSize').value,
        lineSpacing: document.getElementById('lineSpacing').value,
        fontFamily: document.getElementById('fontFamily').value,
        backgroundColor: document.getElementById('backgroundColor').value,
        textColor: document.getElementById('textColor').value,
        isEnabled: document.getElementById('enableToggle').checked
    };

    // Save to Chrome storage
    chrome.storage.sync.set(settings, function() {
        // Update preview
        updatePreview(settings);
        
        // Send message to content script to update page
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'updateSettings',
                settings: settings
            });
        });
    });
}

function resetSettings() {
    const defaultSettings = {
        fontSize: '16',
        lineSpacing: '1.5',
        fontFamily: 'OpenDyslexic',
        backgroundColor: '#FFFFF0',
        textColor: '#000000',
        isEnabled: true
    };

    // Update UI elements
    document.getElementById('fontSize').value = defaultSettings.fontSize;
    document.getElementById('lineSpacing').value = defaultSettings.lineSpacing;
    document.getElementById('fontFamily').value = defaultSettings.fontFamily;
    document.getElementById('backgroundColor').value = defaultSettings.backgroundColor;
    document.getElementById('textColor').value = defaultSettings.textColor;
    document.getElementById('enableToggle').checked = defaultSettings.isEnabled;

    // Save default settings
    chrome.storage.sync.set(defaultSettings, function() {
        // Update preview
        updatePreview(defaultSettings);
        
        // Send message to content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'updateSettings',
                settings: defaultSettings
            });
        });
    });
}

function updatePreview(settings) {
    const previewText = document.getElementById('previewText');
    if (previewText) {
        previewText.style.fontSize = settings.fontSize + 'px';
        previewText.style.lineHeight = settings.lineSpacing;
        previewText.style.fontFamily = settings.fontFamily;
        previewText.style.backgroundColor = settings.backgroundColor;
        previewText.style.color = settings.textColor;
    }
}

// Text-to-speech functionality
document.getElementById('readAloud').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'readAloud'
        });
    });
});

// Word spacing control
document.getElementById('wordSpacing').addEventListener('change', function(e) {
    const wordSpacing = e.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'updateWordSpacing',
            spacing: wordSpacing
        });
    });
});

// Focus mode toggle
document.getElementById('focusMode').addEventListener('change', function(e) {
    const isEnabled = e.target.checked;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'toggleFocusMode',
            enabled: isEnabled
        });
    });
});
