// const API_ENDPOINT = 'http://127.0.0.1:1234/simplify';
// const BATCH_SIZE = 1;  // Process one node at a time
// const DELAY_MS = 1000; // Delay between requests

// async function processNode(node) {
//     const original = node.textContent.trim();
//     if (!original || original.length < 20) return;
    
//     try {
//         const response = await fetch(API_ENDPOINT, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({text: original})
//         });
        
//         if (!response.ok) throw new Error(`HTTP ${response.status}`);
//         const {simplified} = await response.json();
//         node.textContent = simplified;
//     } catch (error) {
//         console.error('Simplification error:', error);
//     }
// }

// async function processDOM() {
//     const walker = document.createTreeWalker(
//         document.body,
//         NodeFilter.SHOW_TEXT,
//         { acceptNode: node => 
//             node.textContent.trim().length > 0 && 
//             node.parentNode.nodeName !== 'SCRIPT' &&
//             node.parentNode.nodeName !== 'STYLE'
//         }
//     );

//     const nodes = [];
//     while (walker.nextNode()) nodes.push(walker.currentNode);
    
//     for (let i = 0; i < nodes.length; i += BATCH_SIZE) {
//         await Promise.all(
//             nodes.slice(i, i+BATCH_SIZE).map(processNode)
//         );
//         await new Promise(r => setTimeout(r, DELAY_MS));
//     }
// }

// // Init with mutation observer
// const observer = new MutationObserver(processDOM);
// observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//     characterData: true
// });

// processDOM().then(() => console.log('Initial processing complete'));

chrome.storage.sync.get(["font", "textColor", "bgColor"], function (data) {
    if (data.font) document.body.style.fontFamily = data.font;
    if (data.textColor) document.body.style.color = data.textColor;
    if (data.bgColor) document.body.style.backgroundColor = data.bgColor;

    document.querySelectorAll("*").forEach(el => {
        if (data.font) el.style.fontFamily = data.font;
        if (data.textColor) el.style.color = data.textColor;
        if (data.bgColor) el.style.backgroundColor = data.bgColor;
    });
});