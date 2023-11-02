from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
#import datetime

app = Flask(__name__)

""" if __name__ == '__main__':
    app.debug = True
    app.run() """

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:87654123@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Films(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    ccNumber = db.Column(db.Integer)
    imgUrl = db.Column(db.String(200))
    title = db.Column(db.String(100))
    year = db.Column(db.Integer)
    director = db.Column(db.String(100))
    score = db.Column(db.Float)
    host = db.Column(db.String(30))
    date = db.Column(db.Date)
    #date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, ccNumber, imgUrl, title, year, director, score, host, date):
        self.ccNumber = ccNumber
        self.imgUrl = imgUrl
        self.title = title
        self.year = year
        self.director = director
        self.score = score
        self.host = host
        self.date = date


class FilmSchema(ma.Schema):
    class Meta:
        fields = ('ccNumber', 'imgUrl', 'title', 'year', 'director', 'score', 'host', 'date')

film_schema = FilmSchema()
films_schema = FilmSchema(many=True)




@app.route('/get', methods = ['GET'])
def get_articles():
    return jsonify({"Hello":"World"})

@app.route('/add', methods = ['POST'])
def add_film():
    ccNumber = request.json['ccNumber']
    imgUrl = request.json['imgUrl']
    title = request.json['title']
    year = request.json['year']
    director = request.json['director']
    score = request.json['score']
    host = request.json['host']
    date = request.json['date']

    films = Films(ccNumber, imgUrl, title, year, director, score, host, date)
    db.session.add(films)
    db.session.commit()
    return film_schema.jsonify(films)