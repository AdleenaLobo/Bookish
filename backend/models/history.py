import uuid
from app import db
from sqlalchemy import ForeignKey


class History(db.Model):
    __tablename__ ="history"

    id = db.Column(db.String(100), primary_key=True, default=lambda:str(uuid.uuid4()))
    date = db.Column(db.DateTime, nullable=False)
    book_id = db.Column(db.String(100), ForeignKey('books.id'), nullable=False)

    def to_dict(self):
        return {"id": self.id , "date": self.date, "book_id":self.book_id }