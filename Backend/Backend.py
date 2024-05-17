from flask import Flask, render_template, jsonify,request
from flask_cors import CORS
import google.generativeai as genai
import time, json
import DB

app = Flask("__name__")
CORS(app)


def validate_creds(creds:list):
    for i in creds:
        if len(i)>=5 and i.isalpha():
            return True
        else:
            return False

@app.route("/login", methods=["POST"])
def Login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    print(username,password)

    if validate_creds([username,password]):

        fetch_pass= DB.select_query(username)

        if password==fetch_pass:
            response_data = {
                'auth':"1",
                "msg":"Login successfull"
            }
        else:
            response_data = {
                'auth':"0",
                "msg":"Login credentials are wrong"
            }
        time.sleep(5)
    
    else:
        response_data = {
                'auth':"0",
                "msg":"Login credentials are wrong"
            }

    return jsonify(response_data)



@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get('username').lstrip().rstrip()
    password1 = data.get('password1').lstrip().rstrip()
    password2 = data.get('password2').lstrip().rstrip()

    if validate_creds([username,password1,password2]):
        # insert into DB : usercredentials collection
        response_data = {
            'auth':"1",
            "msg":"Registratioin successfull"
        }
    else:
        response_data = {
            'auth':"0",
            "msg":"Given inputs are wrong"
        }
    time.sleep(5)
    return jsonify(response_data)




def load_config():
    with open('config.json', 'r') as file:
        return json.load(file)




def configure_model():
    config = load_config()
    YDYA = config["model_name"]
    Api_Key=config["api_key"]
    system_instruction = '''
            Role: YDYA Medical Assistant

                    Primary Function: Offer medical advice related to common diseases, including suggested medications and tips for managing the condition.

                    User Interaction Protocol:

                    Parameter Inquiry: Upon receiving a query about a specific disease or condition, request the user to provide relevant details using a bulleted list format. This enhances clarity and readability.
                    Ask about the parameters one by one to ensure comprehensive data collection.

                    Advice and Information Delivery: For specific disease inquiries: Provide advice or a suggested diagnosis based on the parameters provided by the user, ensuring the response is detailed yet concise.

                    For general medical or medication-related topics: Provide a brief, pertinent explanation without delving into unrelated medical details.

                    Response Format: Structure responses with clear, spaced paragraphs to enhance readability and comprehension.

                    Handling Off-Topic Queries: Politely decline to answer questions outside the health and medical scope, e.g., "Sorry, I can't provide assistance with [specific non-medical topic]. My expertise is limited to health and medical topics."'''
    
    genai.configure(api_key=Api_Key)
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 0,
        "max_output_tokens": 5000
    }
    safety_settings = []

    model = genai.GenerativeModel(
        model_name=YDYA,
        generation_config=generation_config,
        system_instruction=system_instruction,
        safety_settings=safety_settings
    )
    return model


@app.route("/chat", methods=["POST"])
def Chat():
    model = configure_model()
    chat_history = []

    user_input = request.get_json()
    user_input = user_input.get("query")

    chat_history.append(f"You: {user_input}")
    ans = model.generate_content(user_input).text

    if ans:
        response_data = {
                        'ans':ans
                        }
    else:
        response_data = {
                        'ans':"I could not answer it ? Sorry"
                        }

    print(response_data)
    return jsonify(response_data)




@app.route("/forgot",methods=["POST"])
def forgot_password():
    return "Forgot password function"


@app.route("/contact",methods=["POST"])
def contact():
    data = request.get_json()
    data = data.get()
    # insert data into contact collection
    return "Contact function"




    

if __name__ == "__main__":
    app.run(debug=True)