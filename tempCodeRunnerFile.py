from flask import Flask, request, jsonify, render_template
import pickle
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

# Load the trained model
try:
    with open("risk_model.pkl", "rb") as model_file:
        model = pickle.load(model_file)
except FileNotFoundError:
    print("Error: risk_model.pkl not found. Make sure the model file is in the project directory.")
    model = None

# Route to serve the index.html page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle predictions
@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({'error': 'Model not loaded. Check server logs for details.'}), 500

    try:
        # Get JSON data from frontend
        data = request.json
        print("Received data:", data)

        # Convert input data to DataFrame
        df = pd.DataFrame([data])

        # Make prediction
        prediction = model.predict(df)[0]

        # Send prediction back to frontend
        return jsonify({'risk_level': prediction})
    
    except Exception as e:
        print("Prediction error:", e)
        return jsonify({'error': str(e)}), 500

# Run the appsss
if __name__ == '__main__':
    app.run(debug=True)
