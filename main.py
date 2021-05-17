from flask import Flask, render_template, request, jsonify, redirect
import json

from flask.helpers import url_for
from sqlite import commit_data, restart

app = Flask(__name__)

#-------------------------------------------
# view controllers
#-------------------------------------------
categorie = "Choose Category" #will change based on user selection

@app.route('/')
def index():
    return render_template('index.html', title=categorie)

    
@app.route('/category/')
def category():
    return render_template("main.html")


@app.route("/customize/")
def customize():
  	return render_template('/customize.html/')

@app.route("/about/")
def about():
    return render_template('/about.html/')

@app.route("/api/choice", methods=["POST"])
def choice():    
    global categorie
    raw = request.get_data()
    data = json.loads(raw)
    commit_data(data)
    categorie = data.capitalize()
    return "success"


#-------------------------------------------
# api section for sending and receiving data
#-------------------------------------------
@app.route('/api/card', methods=['GET'])
def card_click():
    qna = commit_data()
    return jsonify(qna)

@app.route('/api/restart', methods=['GET', 'POST'])
def reset():
    restart()
    return jsonify("restarted questions")

@app.route("/api/add", methods=["POST"])
def add_questions():
    raw = request.get_data()
    data = json.loads(raw)
    database = commit_data(data)
    return jsonify(database)

app.run(debug=True, port=8080)
# add host='0.0.0.0', before debug for replit

'''Notes and possible changes
--------------------------------'''
#api/section/request/parameters
#api/category/{name} [get]
#api/category [post]
#api/category/new [post]
#api/category/{id} [delete]
#api/user/{name} [get]
#api/user/ [post]
#api/user/{id} [delete]
