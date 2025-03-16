class BehaviorTracker {
    constructor() {
        this.mouseSpeed = 0;
        this.keystrokeDelay = 0;
        this.tabSwitchCount = 0;
        this.inactivityTime = 0;
        this.focusChangeCount = 0;

        this.lastMouseMove = Date.now();
        this.lastKeyPress = Date.now();

        document.addEventListener("mousemove", (e) => this.trackMouse(e));
        document.addEventListener("keydown", (e) => this.trackKeystrokes(e));
        document.addEventListener("visibilitychange", () => this.trackTabSwitch());
        window.addEventListener("blur", () => this.trackFocusChange());
    }

    trackMouse(e) {
        let now = Date.now();
        let timeDiff = now - this.lastMouseMove;
        this.mouseSpeed = 1000 / timeDiff;
        this.lastMouseMove = now;
    }

    trackKeystrokes(e) {
        let now = Date.now();
        this.keystrokeDelay = now - this.lastKeyPress;
        this.lastKeyPress = now;
    }

    trackTabSwitch() {
        if (document.hidden) {
            this.tabSwitchCount++;
        }
    }

    trackFocusChange() {
        this.focusChangeCount++;
    }

    getMouseSpeed() { return this.mouseSpeed; }
    getKeystrokeDelay() { return this.keystrokeDelay; }
    getTabSwitchCount() { return this.tabSwitchCount; }
    getInactivityTime() { return this.inactivityTime; }
    getFocusChangeCount() { return this.focusChangeCount; }
}

const behaviorTracker = new BehaviorTracker();
export default behaviorTracker;