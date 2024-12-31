from flask import Flask, jsonify, request, session, redirect, url_for
import requests
from pymongo import MongoClient
from bson import ObjectId
import bcrypt
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests
# from database.db import users

app = Flask(__name__)
CORS(app)

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
        "phone": data.get('phone', "")
    })

    return jsonify({"message": "User registered successfully!"})


# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = db.users.find_one({"email": data['email']})
    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        return jsonify({"error": "Invalid credentials"}), 400
    return jsonify({"message": "Login successful!"})

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

# Filter user endpoint
@app.route('/filter', methods=['POST'])
def filter_users():
    filters = {}
    data = request.json

    if data.get('blood_type'):
        filters['blood_type'] = {"$regex": data['blood_type'], "$options": "i"}  # Case-insensitive regex for blood type
    if data.get('location'):
        filters['location'] = {"$regex": data['location'], "$options": "i"}  # Case-insensitive regex for location
    if data.get('user_type'):
        filters['user_type'] = {"$regex": data['user_type'], "$options": "i"}  # Case-insensitive regex for user type


    results = list(db.users.find(filters, {"_id": 0, "email": 1, "user_type": 1, "blood_type": 1, "location": 1, "phone_number": 1}))

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)