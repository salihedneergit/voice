let recognition;

const startVoiceRecognition = () => {
    if (!recognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.continuous = true;

        recognition.onstart = () => console.log("Voice control started.");
        recognition.onresult = (event) => {
            const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log("Command received:", command);

            // Handle common commands
            if (command === "scroll down") {
                window.scrollBy(0, window.innerHeight);
            } else if (command === "scroll up") {
                window.scrollBy(0, -window.innerHeight);
            } else {
                console.log("Unknown command:", command);
            }
        };

        recognition.onerror = (event) => console.error("Speech recognition error:", event.error);
    }
    recognition.start();
};

const stopVoiceRecognition = () => {
    if (recognition) {
        recognition.stop();
        console.log("Voice control stopped.");
    }
};

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start-voice-control") {
        startVoiceRecognition();
        sendResponse({ status: "started" });
    } else if (message.action === "stop-voice-control") {
        stopVoiceRecognition();
        sendResponse({ status: "stopped" });
    }
});
