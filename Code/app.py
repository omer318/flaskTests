from flask import Flask, render_template, request, redirect
import json
from markupsafe import escape

app = Flask(__name__)
days = {"Sunday": "off",
        "Monday": "off",
        "Tuesday": "off",
        "Wednesday": "off",
        "Thursday": "off"}


@app.route("/table/")
def table():
    return render_template("table.html", data=days)


@app.route("/submit_days/", methods=["POST"])
def submit():
    global days
    data = request.data.decode()
    print(data)
    days = json.loads(data)
    return redirect("/table/", code=308)


@app.route("/")
def index():
    return render_template("index.html")
