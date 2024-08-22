let recognition;

document.getElementById('start-btn').addEventListener('click', function() {
    startRecognition();
});

document.getElementById('stop-btn').addEventListener('click', function() {
    stopRecognition();
});

function startRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Votre navigateur ne supporte pas la reconnaissance vocale. Essayez avec Google Chrome.");
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
        document.getElementById('start-btn').disabled = true;
        document.getElementById('stop-btn').disabled = false;
        document.getElementById('start-btn').textContent = "Transcription en cours...";
    };

    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
        }
        document.getElementById('transcription').textContent = transcript;
    };

    recognition.onerror = function(event) {
        console.error("Erreur de reconnaissance vocale:", event.error);
    };

    recognition.onend = function() {
        document.getElementById('start-btn').disabled = false;
        document.getElementById('stop-btn').disabled = true;
        document.getElementById('start-btn').textContent = "Commencer la transcription";
    };

    recognition.start();
}

function stopRecognition() {
    if (recognition) {
        recognition.stop();
        document.getElementById('start-btn').disabled = false;
        document.getElementById('stop-btn').disabled = true;
        document.getElementById('start-btn').textContent = "Commencer la transcription";
    }
}
