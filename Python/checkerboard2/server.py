from flask import Flask, render_template  # Import Flask to allow us to create our app
app = Flask(__name__)    # Create a new instance of the Flask class called "app"








@app.route('/<x>/<y>')
def printPage(x: int, y: int):
    """x = int(x)
    if(x % 2 == 0):
        x = int(x / 2)
    else:
        x = int((x / 2) + 1)
    
    y = int(y)
    if(y % 2 == 0):
        y = int(y / 2)
    else:
        y = int(y / 2) + 1"""
    x = int(x)
    y = int(y)
    return render_template('index.html', x = x, y = y) 

if __name__=="__main__":   # Ensure this file is being run directly and not from a different module    
    app.run(debug=True)    # Run the app in debug mode.
