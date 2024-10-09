from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from enum import Enum as PyEnum

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class CategoryEnum(PyEnum):
    POLITICS = "Politics"
    SPORT = "Sport"
    GEAR = "Gear"
    TECHNOLOGY = "Technology"
    CULTURE = "Culture"
    PHOTO = "Photo"
    SCIENCE = "Science"
    DESIGN = "Design"
    IDEAS = "Ideas"
    BUSINESS = "Business"


class Form(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(30), nullable=False)
    lastName = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(30), nullable=False)
    newsTitle = db.Column(db.String(50), nullable=False)
    organization = db.Column(db.String(30), nullable=True)
    message = db.Column(db.Text, nullable=False)
    category = db.Column(db.Enum(CategoryEnum), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Form %r>' % self.id

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/create')
def create_form():
    return render_template("create.html")

@app.route('/register')
def register():
    return render_template("register.html")


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
