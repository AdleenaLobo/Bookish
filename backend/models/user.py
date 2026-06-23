from app import db
import uuid

class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(100), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer , nullable=False)
    email = db.Column(db.String(50), unique=True)
    phone_no = db.Column(db.Integer , nullable=False)
    password = db.Column(db.String(50), nullable=False)
    address= db.Column(db.String(300) , nullable=False)


    def to_dict(self):
        return {"id": self.id, "name": self.name, "email": self.email, "phone_no": self.phone_no , "address": self.address}