from flask import Flask, render_template, request, redirect, session
from mysqlconnection import connectToMySQL
from user import User
app = Flask(__name__)
app.secret_key = 'password123verysecure'

@app.route("/users")
def read_all():
    users = User.get_all()
    return render_template("read.html", users = users)

@app.route("/", methods=['POST', 'GET'])
def new_user():
    data = {
        "first_name": request.form.get("first_name"),
        "last_name" : request.form.get("last_name"),
        "email" : request.form.get("email"),
        "password" : request.form.get("password")
    }

    error = ""
    if (User.validate_pw(request.form.get("password"), request.form.get("confPass"))):
        error = ""
        User.save(data)
    else:
        error = "Error: Passwords don't match"
    return render_template("index.html", error = error)

@app.route("/delete<i>")
def delete(i: int):
    User.delete(i)
    return redirect("/users")
            

@app.route("/login", methods=['POST', 'GET'])
def login():
    users = User.get_all()
    for i in range(len(users)):
        if(users[i].email == request.form.get("email") and users[i].password == request.form.get("pw")):
            redirectStr = ("/mainPage/" + str(users[i].id))
            session['loggedin'] = True
            return redirect(redirectStr)
        else:
            return redirect("/")

@app.route("/logout")
def logout():
    session['loggedin'] = False
    return redirect("/")

@app.route("/mainPage/<id>")
def mainPage(id):
    return render_template("mainPage.html", id = id)


if __name__ == "__main__":
    app.run(debug=True)

