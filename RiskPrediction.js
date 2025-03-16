async function getRiskPrediction(behaviorData) {
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(behaviorData),
        });

        if (!response.ok) {
            throw new Error('Failed to get prediction');
        }

        const data = await response.json();
        console.log('Risk Level:', data.risk_level);

        // Display the risk level on the page
        const riskDisplay = document.getElementById('riskLevelDisplay');
        if (riskDisplay) {
            riskDisplay.innerText = `Risk Level: ${data.risk_level}`;
        }
    } catch (error) {
        console.error('Prediction Error:', error);
    }
}

// Example usage: Send behavior data every 30 seconds
setInterval(() => {
    const behaviorData = {
        "Mouse Speed": Math.random() * 100,
        "Keystroke Delay": Math.random(),
        "Tab Switches": Math.floor(Math.random() * 10),
        "Inactivity Time": Math.floor(Math.random() * 50),
        "Focus Changes": Math.floor(Math.random() * 5)
    };

    getRiskPrediction(behaviorData);
}, 30000);
