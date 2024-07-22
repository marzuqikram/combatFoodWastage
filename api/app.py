from flask import Flask, request, jsonify
import pickle
import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler, LabelEncoder
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes on your Flask app

# Load the model and other necessary components
with open('model/wastage_food_model_v1.pkl', 'rb') as file:
    model = pickle.load(file)

# Load the columns order from training (important for consistent prediction)
X_columns = joblib.load('model/X_columns.pkl')

# Define a function to preprocess input data
def preprocess(data):
    data["number_of_guests"] = int(data["number_of_guests"] )
    data["quantity_of_food"] = int(data["quantity_of_food"] )
    # Ensure data is in a DataFrame
    df = pd.DataFrame([data])
    
    # One-hot encode specified columns
    df = pd.get_dummies(df, columns=['pricing', 'preparation_method', 'geographical_location'])
    
    # Rename columns to follow a consistent format
    df.rename(columns=lambda x: x.replace(' ', '_').lower(), inplace=True)
    
    # Ensure all expected columns are present (add missing ones with zeros)
    missing_cols = set(X_columns) - set(df.columns)
    for col in missing_cols:
        df[col] = 0
    
    df = df[X_columns]  # Ensure the order of columns is the same as training data
    
    return df

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the data from the request
        data = request.json
        
        # Preprocess the data
        processed_data = preprocess(data)
        
        # Make prediction
        prediction = model.predict(processed_data)

        # Convert prediction to a standard Python float
        prediction_value = float(prediction[0])
        
        # Return the prediction as JSON
        return jsonify({'wastage_food_amount': prediction_value})
    
    except Exception as e:
        return jsonify({'error': str(e)})
if __name__ == '__main__':
    app.run(debug=True)