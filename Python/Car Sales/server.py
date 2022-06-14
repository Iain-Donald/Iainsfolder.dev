from flask_bcrypt import Bcrypt
from flask import Flask, render_template, request, redirect, session
from mysqlconnection import connectToMySQL
from user import User
from car import Car
app = Flask(__name__)
app.secret_key = 'password123verysecure'
SESSION_TYPE = 'redis'
bcrypt = Bcrypt(app)

@app.route("/users")
def read_all():
    users = User.get_all()
    return render_template("read.html", users = users)

@app.route("/")
def new_user():
    
    return render_template("index.html")

@app.route("/save", methods=['POST', 'GET'])
def save():
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    data = {
        "first_name": request.form.get("first_name"),
        "last_name" : request.form.get("last_name"),
        "email" : request.form.get("email"),
        "password" : pw_hash
    }

    error = ""
    if (User.validate_pw(request.form.get("password"), request.form.get("confPass"))):
        error = ""
        User.save(data)
    else:
        error = "Error: Passwords don't match"
    return redirect("/")

@app.route("/saveCar/<id>", methods=['POST', 'GET'])
def saveCar(id):
    data = {
        "make": request.form.get("make"),
        "model" : request.form.get("model"),
        "year" : request.form.get("year"),
        "description" : request.form.get("description"),
        "price" : request.form.get("price"),
        "user_id" : id
    }
    Car.disableChecks()
    Car.save(data)
    linkText = "/mainPage/" + id
    return redirect(linkText)

@app.route("/delete<i>")
def delete(i: int):
    Car.delete(i)
    linkText = "/mainPage/" + i
    return redirect(linkText)
            

@app.route("/login", methods=['POST', 'GET'])
def login():
    users = User.get_all()
    error = ""
    for i in range(len(users)):
        userHashedPW = users[i].password
        if(users[i].email == request.form.get("email") and bcrypt.check_password_hash(userHashedPW, request.form['pw'])):
            session['loggedin'] = True
            session['userID'] = users[i].id
            session['dictIndex'] = i
            redirectStr = ("/mainPage/" + str(session['userID']))
            return redirect(redirectStr)

    error = "Error: User not found"
    return redirect("/")

@app.route("/logout")
def logout():
    session['loggedin'] = False
    return redirect("/")

@app.route("/mainPage/<id>")
def mainPage(id):
    users = User.get_all()
    cars = Car.get_all()
    return render_template("mainPage.html", users = users, cars = cars)

@app.route("/createCar/<id>")
def createCar(id):
    return render_template("createCar.html", id=id)

@app.route("/editCar/<user_id>")
def editCar(user_id):
    cars = Car.get_all()
    return render_template("editCar.html", id=user_id, cars = cars)

@app.route("/showCar/<id>")
def showCar(id):
    users = User.get_all()
    cars = Car.get_all()
    return render_template("show.html", id=id, cars = cars, users = users)

@app.route("/updateCar/<id>", methods=['POST', 'GET'])
def updateCar(id):
    data = {
        "make": request.form.get("make"),
        "model" : request.form.get("model"),
        "year" : request.form.get("year"),
        "description" : request.form.get("description"),
        "price" : int(request.form.get("price")),
        "user_id" : id
    }
    Car.disableChecks()
    Car.update(id, data)
    linkText = "/mainPage/" + id
    return redirect(linkText)

if __name__ == "__main__":
    app.run(debug=True)

