from app import db
from sqlalchemy import ForeignKey

class Books(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    author_name = db.Column(db.String(50), nullable=False)
    author_id = db.Column(db.String(100), ForeignKey('authors.id'), nullable=False)
    author_book_description = db.Column(db.String(300), nullable=True)
    status = db.Column(db.Boolean , nullable=False)
    price = db.Column(db.Integer, nullable=False)


    def to_dict(self):
        return {"id": self.id, "title": self.title, "author": self.author}