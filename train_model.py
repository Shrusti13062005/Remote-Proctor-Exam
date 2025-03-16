# train_model.py - Train and Save the ML Model

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn import datasets
import joblib
import os

# Load the dataset (replace with your CSV)
csv_path = os.path.join(os.getcwd(), "risk_behavior_data.csv")
df = pd.read_csv(csv_path)

# Example: Assuming 'risk_level' is the target column
X = df.drop("Risk Label", axis=1)  # Correct column name
y = df["Risk Label"]  # Target variable


# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a pipeline with scaling + RandomForest
model = make_pipeline(StandardScaler(), RandomForestClassifier(n_estimators=100, random_state=42))

# Train the model
model.fit(X_train, y_train)

# Save the trained model to a file
joblib.dump(model, "risk_model.pkl")

print("Model trained and saved as 'risk_model.pkl'")
