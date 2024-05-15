from flask import Flask, render_template, jsonify,request
from flask_cors import CORS
import google.generativeai as palm
import time
import DB

app = Flask("__name__")
CORS(app)


palm.configure(api_key='AIzaSyCAzPmZmnavHsgJ_VlDmZrGN2l3XPQxi7g')
models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
model = models[0].name


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


@app.route("/chat", methods=["POST"])
def Chat():
    querry = request.get_json()["querry"]

    completion = palm.generate_text(
    model=model,
    prompt=querry,
    temperature=0,
    max_output_tokens=800,
    )

    ans = completion.result

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
    # insert data into contact collection
    return "Contact function"




    

if __name__ == "__main__":
    app.run(debug=True)