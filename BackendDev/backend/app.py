from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from dotenv import load_dotenv
load_dotenv

import os
SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
delete_key = os.getenv("delete_key")

#import datetime

app = Flask(__name__)
##cors = CORS(app, resources={r"/*/*": {"origins": "*"}})
CORS(app)

""" if __name__ == '__main__':
    app.debug = True
    app.run() """



###localhost app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:d3ctech@localhost/flask'
###external 
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
"""viejo metodo cors app.config['CORS_HEADERS'] = 'Content-Type'"""
##app.config['CORS_HEADERS'] = 'Content-Type'


db = SQLAlchemy(app)
ma = Marshmallow(app)

class Films(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ccNumber = db.Column(db.Integer)
    imgUrl = db.Column(db.String(200))
    title = db.Column(db.String(100))
    year = db.Column(db.Integer)
    origin = db.Column(db.String(100))
    director1 = db.Column(db.String(100))
    director1Genre = db.Column(db.String(10))
    director2 = db.Column(db.String(100))
    director2Genre = db.Column(db.String(10))
    director3 = db.Column(db.String(100))
    director3Genre = db.Column(db.String(10))
    director4 = db.Column(db.String(100))
    director4Genre = db.Column(db.String(10))
    score = db.Column(db.Float)
    host = db.Column(db.String(30))
    date = db.Column(db.Date)
    #date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, ccNumber, imgUrl, title, year, origin, director1, director1Genre, director2, director2Genre, director3, director3Genre, director4, director4Genre, score, host, date):
        self.ccNumber = ccNumber
        self.imgUrl = imgUrl
        self.title = title
        self.year = year
        self.origin = origin
        self.director1 = director1
        self.director1Genre = director1Genre
        self.director2 = director2
        self.director2Genre = director2Genre
        self.director3 = director3
        self.director3Genre = director3Genre
        self.director4 = director4
        self.director4Genre = director4Genre
        self.score = score
        self.host = host
        self.date = date


class FilmSchema(ma.Schema):
    class Meta:
        fields = ('id', 'ccNumber', 'imgUrl', 'title', 'year', 'origin', 'director1', 'director1Genre', 'director2', 'director2Genre', 'director3', 'director3Genre', 'director4', 'director4Genre', 'score', 'host', 'date')

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
    ###all_films = Films.query.all()
    ###results = films_schema.dump(all_films)
    ###return jsonify(results)
    ###all_films = Films.query.all()
    all_films_by_ccNumber = Films.query.order_by(Films.ccNumber).all()
    results = films_schema.dump(all_films_by_ccNumber)
    return jsonify(results)



@app.route('/adv-get/<field>/<contains>', methods = ['GET'])
def get_films_by_field_contains(field, contains):
    ###only if searching by director, so it searches all columns director1, director2, etc.
    if (field == 'director1'):
        all_films_contains_director_case = Films.query.filter(getattr(Films,('director1')).contains(contains) | getattr(Films,('director2')).contains(contains) | getattr(Films,('director3')).contains(contains) | getattr(Films,('director4')).contains(contains)).order_by(Films.ccNumber).all()
        results = films_schema.dump(all_films_contains_director_case)
    else:
        ###idem for directors genre.
        if (field == 'director1Genre'):
            all_films_contains_directorGenre_case = Films.query.filter(getattr(Films,('director1Genre')).contains(contains) | getattr(Films,('director2Genre')).contains(contains) | getattr(Films,('director3Genre')).contains(contains) | getattr(Films,('director4Genre')).contains(contains)).order_by(Films.ccNumber).all()
            results = films_schema.dump(all_films_contains_directorGenre_case)
        else:
            ###general case
            all_films_contains = Films.query.filter(getattr(Films,field).contains(contains)).order_by(Films.ccNumber).all()
            results = films_schema.dump(all_films_contains)
    return jsonify(results)

@app.route('/adv-get/<field1>/<contains1>/<field2>/<contains2>/', methods = ['GET'])
def get_films_by_multiple_field_contains(field1, contains1, field2, contains2):
    if (contains1 == ' '):
        contains1 = '%'
    if (contains2 == ' '):
        contains2 = '%'

    all_films_contains1 = Films.query.filter(getattr(Films,field1).contains(contains1), getattr(Films,field2).contains(contains2)).order_by(Films.ccNumber).all()
    ###all_films_contains2 = Films.filter()
    """ for film in all_films_contains1:
        if film(getattr(Films,field2).contains(contains2)):
            all_films_contains2.append(film) """
    ###all_films_contains2 = all_films_contains1.filter(getattr(all_films_contains1, field2).contains(contains2)).all()
    results = films_schema.dump(all_films_contains1)
    return jsonify(results)

@app.route('/adv-get/<field1>/<contains1>/<field2>/<contains2>/<field3>/<contains3>/<field4>/<contains4>/<field5>/<contains5>/<field6>/<contains6>/<field7>/<contains7>/<field8>/<contains8>/', methods = ['GET'])
def get_films_by_multiple_field_contains(field1, contains1, field2, contains2, field3, contains3, field4, contains4, field5, contains5, field6, contains6, field7, contains7, field8, contains8):
    if (contains1 == ' '):
        contains1 = '%'
    if (contains2 == ' '):
        contains2 = '%'
    if (contains3 == ' '):
        contains3 = '%'
    if (contains4 == ' '):
        contains4 = '%'
    if (contains5 == ' '):
        contains5 = '%'
    if (contains6 == ' '):
        contains6 = '%'
    if (contains7 == ' '):
        contains7 = '%'
    if (contains8 == ' '):
        contains8 = '%'    

    all_films_contains1 = Films.query.filter(getattr(Films,field1).contains(contains1), getattr(Films,field2).contains(contains2), getattr(Films,field3).contains(contains3), getattr(Films,field4).contains(contains4), getattr(Films,field5).contains(contains5), getattr(Films,field6).contains(contains6), getattr(Films,field7).contains(contains7), getattr(Films,field8).contains(contains8)).order_by(Films.ccNumber).all()
    ###all_films_contains2 = Films.filter()
    """ for film in all_films_contains1:
        if film(getattr(Films,field2).contains(contains2)):
            all_films_contains2.append(film) """
    ###all_films_contains2 = all_films_contains1.filter(getattr(all_films_contains1, field2).contains(contains2)).all()
    results = films_schema.dump(all_films_contains1)
    return jsonify(results)

@app.route('/simp-get/<contains>/', methods = ['GET'])
def get_films_by_multiple_field_simp_contains(contains):
    all_films_contains = Films.query.filter(getattr(Films, 'ccNumber' | 'imgUrl' | 'title' | 'year' | 'origin' | 'director1' | 'host' | 'date').contains(contains)).order_by(Films.ccNumber).all()
    results = films_schema.dump(all_films_contains)
    return jsonify(results)


"""     if(field == 'director'):
        all_films_director_contains = Films.query.filter(Films.director.contains(contains)).order_by(Films.ccNumber).all()
        results = films_schema.dump(all_films_director_contains)
        return jsonify(results)
    if(field == 'title'):
        all_films_title_contains = Films.query.filter(Films.title.contains(contains)).order_by(Films.ccNumber).all()
        results = films_schema.dump(all_films_title_contains)
        return jsonify(results)
    if(field == 'year'):
        all_films_year_contains = Films.query.filter(Films.year.contains(contains)).order_by(Films.ccNumber).all()
        results = films_schema.dump(all_films_year_contains)
        return jsonify(results)
    if(field == 'host'):
        all_films_host_contains = Films.query.filter(Films.host.contains(contains)).order_by(Films.ccNumber).all()
        results = films_schema.dump(all_films_host_contains)
        return jsonify(results)
    if(field == 'date'):
        all_films_date_contains = Films.query.filter(Films.date.contains(contains)).order_by(Films.ccNumber).all()
        results = films_schema.dump(all_films_date_contains)
        return jsonify(results)
    if(field == 'origin'):
        all_films_origin_contains = Films.query.filter(Films.origin.contains(contains)).order_by(Films.ccNumber).all()
        results = films_schema.dump(all_films_origin_contains)
        return jsonify(results) """

    ###general advanced method:
    ###if(field == ''):
    ###    all_films__contains = Films.query.filter(Films..contains(contains)).order_by(Films.ccNumber).all()
    ###    results = films_schema.dump(all_films__contains)
    ###    return jsonify(results)


@app.route('/get/<id>', methods = ['GET'])
def post_details(id):
    film = Films.query.get(id)
    return film_schema.jsonify(film)


@app.route('/add', methods = ['POST'])
def add_film():
    ccNumber = request.json['ccNumber']
    """ if (request.json['imgUrl'] != ''):
        imgUrl = request.json['imgUrl']
    else:
        imgUrl = ' ' """
    imgUrl = request.json['imgUrl']
    title = request.json['title']
    if (request.json['year'] != ''):
        year = request.json['year']
    else:
        year= '0'
    origin = request.json['origin']
    director1 = request.json['director1']
    director1Genre = request.json['director1Genre']
    director2 = request.json['director2']
    director2Genre = request.json['director2Genre']
    director3 = request.json['director3']
    director3Genre = request.json['director3Genre']
    director4 = request.json['director4']
    director4Genre = request.json['director4Genre']
    if (request.json['score'] != ''):
        score = request.json['score']
    else:
        score= '1'
    host = request.json['host']
    if (request.json['date'] != ''):
        date = request.json['date']
    else:
        date = '1989-12-13'
    

    films = Films(ccNumber, imgUrl, title, year, origin, director1, director1Genre, director2, director2Genre, director3, director3Genre, director4, director4Genre, score, host, date)
    db.session.add(films)
    db.session.commit()
    return film_schema.jsonify(films)

@app.route('/update/<id>', methods = ['PUT'])
##@cross_origin()
def update_film(id):
    ##if request.method == "OPTIONS": # CORS preflight
        ##return _build_cors_preflight_response()
    ##elif request.method == "PUT":
        film = Films.query.get(id)
        ccNumber = request.json['ccNumber']
        imgUrl = request.json['imgUrl']
        title = request.json['title']
        year = request.json['year']
        origin = request.json['origin']
        director1 = request.json['director1']
        director1Genre = request.json['director1Genre']
        director2 = request.json['director2']
        director2Genre = request.json['director2Genre']
        director3 = request.json['director3']
        director3Genre = request.json['director3Genre']
        director4 = request.json['director4']
        director4Genre = request.json['director4Genre']
        score = request.json['score']
        host = request.json['host']
        date = request.json['date']

        film.ccNumber = ccNumber
        film.imgUrl = imgUrl
        film.title = title
        film.year = year
        film.origin = origin
        film.director1 = director1
        film.director1Genre = director1Genre
        film.director2 = director2
        film.director2Genre = director2Genre
        film.director3 = director3
        film.director3Genre = director3Genre
        film.director4 = director4
        film.director4Genre = director4Genre
        film.score = score
        film.host = host
        film.date = date

        db.session.commit()
        return film_schema.jsonify(film)
        ##return _corsify_actual_response(results)


@app.route('/delete/<id>/<deleteKey>', methods = ['DELETE'])
def film_delete(id, deleteKey):
    if(deleteKey == delete_key):
        film = Films.query.get(id)
        db.session.delete(film)
        db.session.commit()
        return film_schema.jsonify(film)
    else:
        print('contraseña incorrecta')

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
