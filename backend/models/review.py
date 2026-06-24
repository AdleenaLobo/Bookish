from app import db
import uuid
from sqlalchemy import ForeignKey

class Review(db.Model):
    __tablename__="reviews"

    id = db.Column(db.String(100), primary_key=True , default=lambda:str(uuid.uuid4()))
    stars = db.Column(db.Integer , db.CheckConstraint('stars <=5'), default=0 )
    book_id = db.Column(db.String(100), ForeignKey("books.id"), nullable= False)
    comments = db.Column(db.JSON , default=list)


    def to_dict(self):
        return {"id": self.id, "stars":self.stars , "book_id":self.book_id, "comments":self.comments or []}