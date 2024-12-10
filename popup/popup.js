// Send a message to the content script
const sendMessageToContentScript = (message) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError.message);
            } else {
                console.log("Response from content script:", response);
            }
        });
    });
};

document.getElementById("start").addEventListener("click", () => {
    sendMessageToContentScript({ action: "start-voice-control" });
});

document.getElementById("stop").addEventListener("click", () => {
    sendMessageToContentScript({ action: "stop-voice-control" });
});
