chrome.runtime.onInstalled.addListener(() => {
    console.log("LexiFlow installed successfully.");
});
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "injectFonts") {
      chrome.scripting.insertCSS({
        target: { tabId: sender.tab.id },
        files: ["content/content.css"]
      });
    }
  });
  
// background.js
const MONGODB_URI = 'MONGODB_URI=mongodb+srv://Vishnu-adi:Vishnu234@harmoney-cluster.tdgmi.mongodb.net/?retryWrites=true&w=majority&appName=Harmoney-cluster';
const API_ENDPOINT = 'http://localhost:3000/api/content'; // Your Next.js API endpoint

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'saveToMongoDB') {
      console.log("done");
        fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message.content)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Content saved successfully:', data);
            // Notify content script of success
            chrome.tabs.sendMessage(sender.tab.id, {
                action: 'contentSaved',
                success: true
            });
        })
        .catch(error => {
            console.error('Error saving content:', error);
            // Notify content script of failure
            chrome.tabs.sendMessage(sender.tab.id, {
                action: 'contentSaved',
                success: false,
                error: error.message
            });
        });
    }
    return true;
});