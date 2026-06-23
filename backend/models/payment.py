from app import db


class Payment(db.Model):
    __tablename__= "payment"

    id = db.Column(db.String(100), primary_key=True, default=lambda:str(uuid.uuid4()))
    total_payment_pending = db.Column(db.Integer, default=0)


    def to_dict(self):
        return{"total_pending_payment":self.total_payment_pending}