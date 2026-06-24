from app import db
from sqlalchemy import ForeignKey
import uuid
class Payment(db.Model):
    __tablename__= "payment"

    id = db.Column(db.String(100), primary_key=True, default=lambda:str(uuid.uuid4()))
    total_payment_pending = db.Column(db.Integer, default=0)
    user_id = db.Column(db.String(100), ForeignKey('users.id'), nullable =False)


    def to_dict(self):
        return{"total_payment_pending":self.total_payment_pending}