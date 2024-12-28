from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)

MONGO_URI = "mongodb+srv://hafsalozzi:7eQ5SQksemc56r6D@cluster0.hyqsx.mongodb.net/"
client = MongoClient(MONGO_URI)
db = client["blood_donation_db"] 

@app.route('/donors', methods=['GET'])
def get_donors():
    donors = list(db.donors.find({}, {"_id": 0}))
    return jsonify(donors), 200

@app.route('/donors', methods=['POST'])
def add_donor():
    data = request.json
    db.donors.insert_one(data)
    return jsonify({"message": "Donor added successfully"}), 201

@app.route('/donors/<donor_id>', methods=['DELETE'])
def delete_donor(donor_id):
    """
    Deletes a donor based on their unique ID.
    """
    result = db.donors.delete_one({"_id": ObjectId(donor_id)})

    if result.deleted_count > 0:
        return jsonify({"message": "Donor deleted successfully"}), 200
    else:
        return jsonify({"error": "Donor not found"}), 404
    
if __name__ == '__main__':
    app.run(debug=True)