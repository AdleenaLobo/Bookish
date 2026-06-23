from app import db
import uuid


class Authors(db.Model):
    __tablename__ ='authors'

    id = db.Column(db.String(100), primary_key= True , nullable = False , default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(50), nullable= False)
    self_description = db.Column(db.String(300), nullable=True)


    def to_dict(self):
        return{'name':self.name, 'description':self.self_description}
