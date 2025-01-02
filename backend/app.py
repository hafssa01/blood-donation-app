from flask import Flask, jsonify, request, session, redirect, url_for
import requests
from pymongo import MongoClient
import bcrypt
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests
from datetime import timedelta
from flask_jwt_extended import JWTManager,jwt_required, get_jwt_identity,create_access_token

app = Flask(__name__)
CORS(app)

# JWT Configurations
app.config['JWT_SECRET_KEY'] = 'F3b!C8e@2A4d#5X6f$7B6a%9C0d^1E4f*9G4h1'  # Change this to a random secret key
app.config['JWT_TOKEN_LOCATION'] = ['headers']

# Initialize JWT Manager
jwt = JWTManager(app)

MONGO_URI = "mongodb+srv://hafsalozzi:7eQ5SQksemc56r6D@cluster0.hyqsx.mongodb.net/"
client = MongoClient(MONGO_URI)
db = client["blood_donation_db"] 

# Home page
@app.route('/home')
def home():
    return "Welcome to the Blood Donation App!"

# googleOath endpoint
@app.route('/google-login', methods=['POST'])
def google_login():
    token = request.json.get('token')
    try:
        # Verify the token using Google API
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), "631991351745-ajb9fr252d7qt7e5p4hn0ht3fdirrqt6.apps.googleusercontent.com")
        # Example: Extract user's email
        email = idinfo.get('email')
        return jsonify({"message": "Login successful!", "email": email}), 200
    except ValueError:
        return jsonify({"error": "Invalid token"}), 400

# Register endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.json

    # Check if email already exists
    user = db.users.find_one({"email": data['email']})
    if user:
        return jsonify({"error": "User already exists"}), 400

    # Check if passwords match
    if data['password'] != data['confirmPassword']:
        return jsonify({"error": "Passwords do not match"}), 400

    # Hash the password
    hashed_pw = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    # Insert the new user into the database
    db.users.insert_one({
        "email": data['email'],
        "password": hashed_pw,
        "firstName": data.get('firstName', ""),
        "lastName": data.get('lastName', ""),
        "birthDate": data.get('birthDate', ""),
        "sex": data.get('sex', ""),
        "phone": data.get('phone', ""),
        "location": data.get('location', "")
    })

    return jsonify({"message": "User registered successfully!"})


# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = db.users.find_one({"email": data['email']})
    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        return jsonify({"error": "Invalid credentials"}), 401
    

    # Create a new access token
    access_token = create_access_token(identity=user['email'], expires_delta=False)  # Use email as the identity
    return jsonify({"access_token": access_token}), 200  # Return the token in the response

    

# Logout endpoint
@app.route('/logout', methods=['GET'])
def logout():
    # Clear the user's session
    session.clear()
    return redirect(url_for('home'))

# Submit form endpoint
@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.json
    db.forms.insert_one(data)
    return jsonify({"message": "Form submitted successfully!"})

# Get donors/recipients endpoint
@app.route('/list', methods=['GET'])
def get_list():
    user_type = request.args.get('user_type')  # 'donor' or 'recipient'
    bloodGroup = request.args.get('bloodGroup')  # Updated key for blood group
    location = request.args.get('location')  # Location filter
    query = {"user_type": user_type}

    if bloodGroup:
        query["bloodGroup"] = bloodGroup  # Use updated key for blood group
    if location:
        query["location"] = location  # Add location to query filter

    records = list(db.forms.find(query, {"_id": 0}))
    return jsonify(records)

# Profile Endpoint
@app.route('/profile', methods=['GET', 'PUT'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = db.users.find_one({"email": current_user})

    if request.method == 'GET':
        if user:
            return jsonify({
                "firstName": user["firstName"],
                "lastName": user["lastName"],
                "email": user["email"],
                "phone": user["phone"],
                "location": user["location"]
            })
        return jsonify({"error": "User not found"}), 404

    if request.method == 'PUT':
        data = request.json
        db.users.update_one({"email": current_user}, {"$set": data})
        return jsonify({"message": "Profile updated successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)