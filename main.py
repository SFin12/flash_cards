from flask import Flask, render_template, request, jsonify
import json
from sqlite import commit_data, restart

app = Flask(__name__)

@app.route('/')
def index():
      
    return render_template('index.html')

@app.route('/card', methods=['GET'])
def card_click():
    if request.method == 'GET':
        qna = commit_data()
        return jsonify(qna)

@app.route('/restart', methods=['GET', 'POST'])
def reset():
    restart()
    return jsonify("restarted questions")

@app.route("/customize/", methods=["GET", "POST"])
def customize():
	if request.method == "POST":
            raw = request.get_data()
            data = json.loads(raw)
            database = commit_data(data)
            return jsonify(database)
	else:
  		return render_template('/customize.html/')

@app.route("/about/")
def about():
    return render_template('/about.html/')

@app.route("/add", methods=["GET", "POST"])
def add_questions():
    return render_template("")

app.run(host='0.0.0.0', debug=True, port=8080)