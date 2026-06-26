import uuid
from app import db
from sqlalchemy import ForeignKey
from datetime import datetime

class History(db.Model):
    __tablename__ = "history"

    id = db.Column(db.String(100), primary_key=True, default=lambda:str(uuid.uuid4()))
    user_id = db.Column(db.String(100), ForeignKey("users.id"), nullable=False)
    book_id = db.Column(db.String(100), ForeignKey("books.id"), nullable=False)
    leased_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    due_date = db.Column(db.DateTime, nullable=False)
    returned = db.Column(db.Boolean, default=False)
    returned_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "book_id": self.book_id,
            "leased_at": self.leased_at,
            "due_date": self.due_date,
            "returned": self.returned,
            "returned_at": self.returned_at
        }