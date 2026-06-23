from app import db
import uuid
from sqlalchemy import ForeignKey

class Members(db.Model):
    __tablename__ = 'members'

    id = db.Column(db.String(100), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(100), db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return{"user_id": self.user_id}