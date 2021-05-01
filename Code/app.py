import http.client

from flask import Flask, render_template, request, redirect, url_for
import json
from markupsafe import escape
import pymongo

from Code.user import User

app = Flask(__name__)


def init_db():
    client = pymongo.MongoClient(
        "mongodb+srv://su:123123123@dutycalls.riq2l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    db = client.get_database("test").get_collection("users")
    return db


db = init_db()
DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]


def get_all_users():
    return list(db.find())


@app.route("/table/")
def table():
    data = get_all_users()
    return render_template("table.html", data=data, DAYS=DAYS, options=calc_options())


@app.route("/submit_days/", methods=["POST"])
def submit():
    data = request.data.decode()
    print(data)
    user = User.from_dict(json.loads(data))
    save(user)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route("/")
def index():
    return render_template("index.html")


def save(user):
    if user.name == "":
        return None
    db.insert_one(user.as_dict())


def get_user_by_name(name):
    return db.find({"name": name})


def calc_options():
    available_on_day_dict = {day: [] for day in DAYS}
    users = get_all_users()
    for user in users:
        for day, is_on in user['days'].items():
            if is_on == "on":
                available_on_day_dict[day].append(user['name'])
    return available_on_day_dict
