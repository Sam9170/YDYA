from pymongo import MongoClient


client = MongoClient('mongodb://localhost:27017')
db = client['YDYA']
# create_collections(db)

# Initialize collections
user_collection = db['UserData']
cred_collection = db['UserCredentials']
contact_us_collection = db['ContactUs_Details']


def create_schema():
    """Define schemas for the collections in the database."""
    credentials_schema = {
        '$jsonSchema': {
            'bsonType': 'object',
            'required': ['username', 'password', 'security', 'uniqueCode'],
            'properties': {
                'username': {
                    'bsonType': 'string',
                    'description': 'must be a string and is required'
                },
                'password': {
                    'bsonType': 'string',
                    'description': 'must be a string and is required'
                },
                'security': {
                    'bsonType': 'object',
                    'required': ['question', 'answer'],
                    'properties': {
                        'question': {
                            'bsonType': 'string',
                            'description': 'must be a string and is required'
                        },
                        'answer': {
                            'bsonType': 'string',
                            'description': 'must be a string and is required'
                        }
                    }
                },
                'uniqueCode': {
                    'bsonType': 'string',
                    'description': 'must be a string and is required'
                }
            }
        }
    }

    user_data_schema = {
        '$jsonSchema': {
            'bsonType': 'object',
            'required': ['name', 'dob', 'gender', 'email', 'phoneNo', 'photo'],
            'properties': {
                'name': {
                    'bsonType': 'string',
                    'description': 'must be a string and is required'
                },
                'dob': {
                    'bsonType': 'string',
                    'description': 'must be a string representing a date and is required'
                },
                'gender': {
                    'bsonType': 'string',
                    'description': 'must be a string and is required'
                },
                'email': {
                    'bsonType': 'string',
                    'description': 'must be a string and is required'
                },
                'phoneNo': {
                    'bsonType': 'string',
                    'description': 'must be a string and is required'
                },
                'photo': {
                    'bsonType': 'string',
                    'description': 'must be a string (or binary in production) and is required'
                }
            }
        }
    }

    contact_us_schema = {
        '$jsonSchema': {
            'bsonType': 'object',
            'required': [ 'email', 'message'],
            'properties': {
                'email': {
                    'bsonType': 'string',
                    'description': 'must be a valid email string and is required'
                },
                'message': {
                    'bsonType': 'string',
                    'description': 'must be a string and is required'
                }
            }
        }
    }

    return credentials_schema, user_data_schema, contact_us_schema

def insert_document(document, collection):
    """Inserts a document into a given MongoDB collection."""
    try:
        collection.insert_one(document)
        print(f"Data inserted into {collection.name} collection successfully.")
    except Exception as e:
        print(f"An error occurred when inserting data: {e}")

def generate_unique_id(username, password):
    """Generates a unique ID based on the username and password."""
    return username + password

def create_collections(db):
    """Create collections with their respective schemas."""
    schemas = create_schema()
    collection_names = ['UserCredentials', 'UserData', 'ContactUs_Details']
    for name, schema in zip(collection_names, schemas):
        try:
            db.create_collection(name, validator= schema)
            print(f"{name} collection created and schema assigned.")
        except Exception as error:
            print(f"Error occurred when creating {name} collection: {error}")

def get_user_input():
    """Prompts user for input and returns selected security question and answer."""
    questions = [
        "What's the strangest thing you've ever eaten for breakfast that is not breakfast food?",
        "If you could have an unlimited supply of one thing for the rest of your life, but it has to fit in your pocket, what would it be?",
        "What's the title of the imaginary movie about your life?",
        "If you were a villain or criminal mastermind, what would your calling card be?",
        "What would you do if you found a penguin in your freezer?"
    ]
    print("Answer one of the following questions:\n")
    for i, question in enumerate(questions, 1):
        print(f"{i}. {question}\n")

    question_number = int(input("Enter the number of the question you want to answer: "))
    answer = input("Your answer: ")
    return questions[question_number - 1], answer

def select_query(username):
    pwd= cred_collection.find_one({"username": username})["password"]
    
    return pwd
 
def main():

    # Get user input
    question, answer = get_user_input()
    security = {"question": question, "answer": answer}

    # Prepare documents
    username, password = "BadBoi", "Qwerty123"
    user_id = generate_unique_id(username, password)
    user_document = {
        "_id": user_id,
        "name": "Sambhram Satapathy",
        "dob": "2002-08-31",
        "gender": "Male",
        "email": "sambhram.10@gmail.com",
        "phoneNo": "9777437919",
        "photo": "url_photo"
    }
    cred_document = {
        "_id": user_id,
        "username": username,
        "password": password,
        "security": security,
        "uniqueCode": "2002"
    }

    # Insert data into collections
    insert_document(cred_document, cred_collection)
    insert_document(user_document, user_collection)

if __name__ == "__main__":
    pass
