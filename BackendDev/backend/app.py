from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
#import datetime

app = Flask(__name__)
cors = CORS(app)

""" if __name__ == '__main__':
    app.debug = True
    app.run() """



app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:d3ctech@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
"""viejo metodo cors app.config['CORS_HEADERS'] = 'Content-Type'"""

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Films(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    ccNumber = db.Column(db.Integer)
    imgUrl = db.Column(db.String(200))
    title = db.Column(db.String(100))
    year = db.Column(db.Integer)
    origin = db.Column(db.String(100))
    director = db.Column(db.String(100))
    score = db.Column(db.Float)
    host = db.Column(db.String(30))
    date = db.Column(db.Date)
    #date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, ccNumber, imgUrl, title, year, origin, director, score, host, date):
        self.ccNumber = ccNumber
        self.imgUrl = imgUrl
        self.title = title
        self.year = year
        self.origin = origin
        self.director = director
        self.score = score
        self.host = host
        self.date = date


class FilmSchema(ma.Schema):
    class Meta:
        fields = ('ccNumber', 'imgUrl', 'title', 'year', 'origin', 'director', 'score', 'host', 'date')

film_schema = FilmSchema()
films_schema = FilmSchema(many=True)

"""viejo metodo cors@app.route("/get", methods = ["GET"])
def helloWorld():
      if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
      elif request.method == "GET":
          all_films = Films.query.all()
          results = films_schema.dump(all_films)
          return _corsify_actual_response(jsonify(results))"""
            

@app.route('/get', methods = ['GET'])
def get_films():
    all_films = Films.query.all()
    results = films_schema.dump(all_films)
    return jsonify(results)

@app.route('/get/<id>/', methods = ['GET'])
def post_details(id):
    film = Films.query.get(id)
    return film_schema.jsonify(film)


@app.route('/add', methods = ['POST'])
def add_film():
    ccNumber = request.json['ccNumber']
    imgUrl = request.json['imgUrl']
    title = request.json['title']
    year = request.json['year']
    origin = request.json['origin']
    director = request.json['director']
    score = request.json['score']
    host = request.json['host']
    date = request.json['date']

    films = Films(ccNumber, imgUrl, title, year, origin, director, score, host, date)
    db.session.add(films)
    db.session.commit()
    return film_schema.jsonify(films)

@app.route('/update/<id>', methods = ['PUT'])
def update_film(id):
    film = Films.query.get(id)

    ccNumber = request.json['ccNumber']
    imgUrl = request.json['imgUrl']
    title = request.json['title']
    year = request.json['year']
    origin = request.json['origin']
    director = request.json['director']
    score = request.json['score']
    host = request.json['host']
    date = request.json['date']

    film.ccNumber = ccNumber
    film.imgUrl = imgUrl
    film.title = title
    film.year = year
    film.origin = origin
    film.director = director
    film.score = score
    film.host = host
    film.date = date

    db.session.commit()
    return film_schema.jsonify(film)

@app.route('/delete/<id>', methods = ['DELETE'])
def film_delete(id):
    film = Films.query.get(id)
    db.session.delete(film)
    db.session.commit()

    return film_schema.jsonify(film)

"""viejo metodo cors 
##cosas del CORS
def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response """
