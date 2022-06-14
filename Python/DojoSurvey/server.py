from flask import Flask, render_template, redirect, session, request
app = Flask(__name__)
app.secret_key = 'password123verysecure'
SESSION_TYPE = 'redis'

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/result')
def resultPage():
    return render_template("result.html")

@app.route('/process', methods=['POST', 'GET'])
def result():
    session['name'] = request.form.get("name")
    session['location'] = request.form.get("location")
    session['language'] = request.form.get("language")
    session['comment'] = request.form.get("comment")

    return redirect('/result')

if __name__=="__main__":
    app.run(debug=True)

