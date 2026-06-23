from app import db
import uuid

class Review(db.Model):
    __tablename__="reviews"

    id = db.Column(db.String(100), primary_key=True , default=lambda:str(uuid.uuid4()))
    stars = db.Column(db.Integer , db.CheckConstraint('stars <=5'), default=0 )
    comments = db.Column(db.JSON , default=list)


    def to_dict(self):
        return {"id": self.id, "title": self.title , "author":self.author, "comments":self.comments or []}