from pymongo import MongoClient

# Connect to the MongoDB server
client = MongoClient("mongodb+srv://hafsalozzi:7eQ5SQksemc56r6D@cluster0.hyqsx.mongodb.net/")

# Access the database and collection
db = client.blood_donation_db
users = db.users
