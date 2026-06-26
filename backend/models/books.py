import uuid

from app import db
from sqlalchemy import ForeignKey


class Books(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.String(100), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    author_name = db.Column(db.String(50), nullable=False)
    author_id = db.Column(db.String(100), ForeignKey('authors.id'), nullable=False)
    author_book_description = db.Column(db.String(300), nullable=True)
    status = db.Column(db.Boolean , nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(500), nullable=True)
    stars = db.Column(db.Float, default=4.5)


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "author_name": self.author_name,
            "author_id": self.author_id,
            "author_book_description": self.author_book_description,
            "status": self.status,
            "price": self.price,
            "image":self.image,
            "stars":self.stars
        }