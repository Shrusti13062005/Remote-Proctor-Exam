from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Load trained model
model = joblib.load("risk_model.pkl")

# Define request format
class UserBehavior(BaseModel):
    mouse_speed: float
    keystroke_delay: float
    tab_switches: int
    inactivity_time: float
    focus_changes: int

# Prediction endpoint
@app.post("/predict/")
async def predict_risk(data: UserBehavior):
    features = np.array([[data.mouse_speed, data.keystroke_delay, data.tab_switches, data.inactivity_time, data.focus_changes]])
    risk_level = model.predict(features)[0]
    return {"risk_level": risk_level}