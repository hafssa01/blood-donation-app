from db import users

# Seed data for testing
def update_users():
    users.update_one(
        {"email": "donor@example.com"},
        {
            "$set": {
                "blood_type": "B-",
                "location": "Rabat",
                "user_type": "recipient",
                "phone_number": "+212600112233"
            }
        },
        upsert=True,  # Create a new document if one doesn't exist
    )

    users.update_one(
        {"email": "hafsa.lozzi@gmail.com"},
        {
            "$set": {
                "blood_type": "A+",
                "location": "Casablanca",
                "user_type": "donor",
                "phone_number": "+212617299388"
            }
        },
        upsert=True,
    )

if __name__ == "__main__":
    update_users()
    print("Database updated successfully!")
