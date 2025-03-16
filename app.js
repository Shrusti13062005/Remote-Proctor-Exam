async function sendBehaviorData() {
    const behaviorData = {
        mouse_speed: behaviorTrackerRef.current.getMouseSpeed(),
        keystroke_delay: behaviorTrackerRef.current.getKeystrokeDelay(),
        tab_switches: behaviorTrackerRef.current.getTabSwitchCount(),
        inactivity_time: behaviorTrackerRef.current.getInactivityTime(),
        focus_changes: behaviorTrackerRef.current.getFocusChangeCount(),
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/predict/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(behaviorData)
        });

        const result = await response.json();
        console.log("Risk Level:", result.risk_level);
        
        if (result.risk_level === "High") {
            alert("High-risk behavior detected! Terminating exam.");
            location.reload();
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call this function every 5 seconds
setInterval(sendBehaviorData, 5000);