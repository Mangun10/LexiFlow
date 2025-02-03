navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
    console.log("Webcam access granted.");
    // Placeholder logic for eye-tracking model integration
}).catch((err) => {
    console.error("Webcam access denied.", err);
});