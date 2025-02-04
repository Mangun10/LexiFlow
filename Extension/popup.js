// popup.js
// Update value displays

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded event fired for settings");

    const sliders = document.querySelectorAll('.slider');
    const themeButtons = document.querySelectorAll('.theme-toggle button');
    const previewBox = document.getElementById('preview-box');
    const fontSelect = document.getElementById('font-select');
    const backgroundPicker = document.querySelectorAll('.color-picker')[0];
    const textColorPicker = document.querySelectorAll('.color-picker')[1];
    const applyButton = document.getElementById('apply-button');
    const cancelButton = document.getElementById('cancel-button');
    const resetButton = document.getElementById('resetButton');

    const updateSlider = (e) => {
        const value = e.target.value;
        const min = e.target.min;
        const max = e.target.max;
        const progress = ((value - min) / (max - min)) * 100;

        const settingType = e.target.id; // Get the slider's ID
        let unit = '';

        
            unit = 'px';
        

        console.log('Slider value:', value);
        console.log('Slider min:', min);
        console.log('Slider max:', max);
        console.log('Progress:', progress);

        // Update progress bar
        const progressBar = e.target.nextElementSibling;
        progressBar.style.width = `${progress}%`;
        console.log(`Progress bar width set to: ${progress}%`);

        // Update value display
        const valueDisplay = e.target.parentElement.parentElement.querySelector('.value');
        console.log('Value display element:', valueDisplay);
        if (valueDisplay) {
            const unit = e.target.parentElement.parentElement.querySelector('.setting-header span').textContent.includes('Font Size') ? 'px' : 
                        e.target.parentElement.parentElement.querySelector('.setting-header span').textContent.includes('Word Spacing') ? 'px' : '';
            valueDisplay.textContent = value + unit;
            console.log('Value display text set to:', value + unit);
        }

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                setting: settingType,
                value: value + unit,
            });
        });
    };

    sliders.forEach(slider => {
        console.log('Initializing slider position for:', slider);
        updateSlider({ target: slider });
        slider.addEventListener('input', updateSlider);
        console.log('Added input event listener to slider:', slider);
    });
    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Theme button clicked:', button);
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            console.log('Active class added to button:', button);

            if (button.textContent === 'Dark') {
                document.body.classList.add('dark-theme');
                console.log('Dark theme applied');
            } else {
                document.body.classList.remove('dark-theme');
                console.log('Dark theme removed');
            }
        });
    });

    fontSelect.addEventListener('change', (e) => {
        previewBox.style.fontFamily = e.target.value;
        console.log('Font family changed to:', e.target.value);
    });

    backgroundPicker.addEventListener('input', (e) => {
        previewBox.style.backgroundColor = e.target.value;
        console.log('Background color changed to:', e.target.value);
    });

    textColorPicker.addEventListener('input', (e) => {
        previewBox.style.color = e.target.value;
        console.log('Text color changed to:', e.target.value);
    });

    applyButton.addEventListener('click', () => {
        console.log('Apply button clicked');

        const font = fontSelect.value;
        const textColor = textColorPicker.value;
        const bgColor = backgroundPicker.value;

        chrome.storage.sync.set({ font, textColor, bgColor }, function () {
            console.log("Settings saved");
        });

        chrome.tabs.query({ active: true, currentWindow: true },(tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: applyChanges,
                args: [font, textColor, bgColor]
            });
        });

        console.log('Applying changes...');
    });

    function applyChanges(font, textColor, bgColor) {

        if(font=="Atkinson Hyperlegible"){
            if (font.includes(" ")) {
                const fontName = font.replace(/ /g, "+"); // Convert spaces to '+'
                const fontLink = document.createElement("link");
                fontLink.rel = "stylesheet";
                fontLink.href = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`;
                document.head.appendChild(fontLink);
            }
        }

        if (font === "Open Dyslexic") {
            document.body.style.fontFamily = "'Open Dyslexic', sans-serif";
        }
        

        document.body.style.setProperty("background-color", bgColor, "important");
        document.body.style.setProperty("color", textColor, "important");
        document.body.style.setProperty("font-family", font, "important");

        document.querySelectorAll("*").forEach(el => {
            el.style.setProperty("background-color", bgColor, "important");
            el.style.setProperty("color", textColor, "important");
            el.style.setProperty("font-family", font, "important");
        });
    }

    cancelButton.addEventListener('click', () => {
        console.log('Cancel button clicked');
        console.log('Canceling changes...');
    });

    window.addEventListener('load', () => {
        console.log('Window load event fired');
        sliders.forEach(slider => {
            const event = new Event('input');
            slider.dispatchEvent(event);
            console.log('Dispatched input event for slider:', slider);
        });
    });

    chrome.storage.sync.get({
        fontSize: '16',
        lineSpacing: '1.5',
        fontFamily: 'OpenDyslexic',
        wordSpacing: '0.1em',
        focusMode: false,
        isEnabled: true
    }, function(settings) {
        console.log("Retrieved settings from storage:", settings);

        document.getElementById('fontSize').value = settings.fontSize;
        document.getElementById('lineSpacing').value = settings.lineSpacing;
        document.getElementById('wordSpacing').value = settings.wordSpacing;
        document.getElementById('font-select').value = settings.fontFamily;
        document.getElementById('backgroundColor').value = settings.backgroundColor;
        document.getElementById('textColor').value = settings.textColor;
        document.getElementById('wordSpacing').value = settings.wordSpacing;
        // document.getElementById('focusMode').checked = settings.focusMode;
        // document.getElementById('enableToggle').checked = settings.isEnabled;

        console.log("Updated UI elements with settings");
        updatePreview(settings);
    });

    const saveSettings = () => {
        console.log("saveSettings function called");

        const settings = {
            fontSize: document.getElementById('fontSize').value,
            lineSpacing: document.getElementById('lineSpacing').value,
            wordSpacing: document.getElementById('wordSpacing').value,
            fontFamily: document.getElementById('font-select').value,
            backgroundColor: document.getElementById('backgroundColor').value,
            textColor: document.getElementById('textColor').value,
            wordSpacing: document.getElementById('wordSpacing').value,
            // focusMode: document.getElementById('focusMode').checked,
            // isEnabled: document.getElementById('enableToggle').checked
        };

        console.log("Settings to be saved:", settings);

        chrome.storage.sync.set(settings, function() {
            console.log("Settings saved to storage");
            updatePreview(settings);

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                console.log("Sending message to content script to update settings");
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'updateSettings',
                    settings: settings
                });
            });
        });
    };

    const resetSettings = () => {
        console.log("resetSettings function called");

        const defaultSettings = {
            fontSize: '16',
            lineSpacing: '1.5',
            fontFamily: 'OpenDyslexic',
            wordSpacing: '0.1em',
            focusMode: false,
            isEnabled: true
        };

        console.log("Default settings:", defaultSettings);

        document.getElementById('fontSize').value = defaultSettings.fontSize;
        document.getElementById('lineSpacing').value = defaultSettings.lineSpacing;
        document.getElementById('wordSpacing').value = defaultSettings.wordSpacing;
        document.getElementById('font-select').value = defaultSettings.fontFamily;
        document.getElementById('backgroundColor').value = defaultSettings.backgroundColor;
        document.getElementById('textColor').value = defaultSettings.textColor;
        document.getElementById('wordSpacing').value = defaultSettings.wordSpacing;
        // document.getElementById('focusMode').checked = defaultSettings.focusMode;
        // document.getElementById('enableToggle').checked = defaultSettings.isEnabled;

        console.log("UI elements updated with default settings");

        chrome.storage.sync.set(defaultSettings, function() {
            console.log("Default settings saved to storage");
            updatePreview(defaultSettings);

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                console.log("Sending message to content script to reset settings");
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'updateSettings',
                    settings: defaultSettings
                });
            });
        });
    };

    const updatePreview = (settings) => {
        console.log("updatePreview function called with settings:", settings);

        const previewText = document.getElementById('preview-box');
        if (previewText) {
            previewText.style.fontSize = settings.fontSize + 'px';
            previewText.style.lineHeight = settings.lineSpacing;
            previewText.style.wordSpacing = settings.wordSpacing + 'px';
            previewText.style.fontFamily = settings.fontFamily;
            previewText.style.backgroundColor = settings.backgroundColor;
            previewText.style.color = settings.textColor;
            previewText.style.wordSpacing = settings.wordSpacing;
            console.log("Preview text updated with settings");
        } else {
            console.log("Preview text element not found");
        }
    };

    // const toggleFocusMode = () => {
    //     console.log("toggleFocusMode function called");

    //     const isEnabled = document.getElementById('focusMode').checked;
    //     console.log(Focus mode ${isEnabled ? 'enabled' : 'disabled'});

    //     chrome.storage.sync.set({ focusMode: isEnabled }, function() {
    //         console.log("Focus mode setting saved to storage");

    //         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //             console.log("Sending message to content script to toggle focus mode");
    //             chrome.tabs.sendMessage(tabs[0].id, {
    //                 action: 'toggleFocusMode',
    //                 enabled: isEnabled
    //             });
    //         });
    //     });
    // };

    document.getElementById('fontSize').addEventListener('change', saveSettings);
    document.getElementById('lineSpacing').addEventListener('change', saveSettings);
    document.getElementById('wordSpacing').addEventListener('change', saveSettings);
    document.getElementById('font-select').addEventListener('change', saveSettings);
    document.getElementById('backgroundColor').addEventListener('change', saveSettings);
    document.getElementById('textColor').addEventListener('change', saveSettings);
    document.getElementById('wordSpacing').addEventListener('change', saveSettings);
    // document.getElementById('focusMode').addEventListener('change', toggleFocusMode);
    // document.getElementById('enableToggle').addEventListener('change', saveSettings);
    resetButton.addEventListener('click', resetSettings);

    
    const themeButton = document.querySelectorAll('.theme-toggle-two button');
    themeButton.forEach(button => {
        button.addEventListener('click', () => {
            themeButton.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
        });
    });



});