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
  
