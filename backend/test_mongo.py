from pymongo import MongoClient

# Replace with your MongoDB connection string
uri = "mongodb://localhost:27017"  # Use your MongoDB Atlas URI if connecting remotely

try:
    client = MongoClient(uri)
    print("Connected to MongoDB!")
    print("Databases:", client.list_database_names())
except Exception as e:
    print("Error:", e)

