import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

def load_env(filepath='.env'):
    if os.path.exists(filepath):
        with open(filepath) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()

load_env()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from models.books import Books
from models.user import Users
from models.members import Members
from models.author import Authors
from models.review import Review
from models.history import History
from models.payment import Payment

from routes.books import register_books_routes
from routes.users import register_users_routes
from routes.members import register_member_routes
from routes.author import register_author_routes
from routes.review import register_reviews_routes
from routes.history import register_history_routes
from routes.payment import register_payment_routes


register_books_routes(app, db)
register_users_routes(app, db)
register_member_routes(app, db)
register_author_routes(app, db)
register_reviews_routes(app, db)
register_history_routes(app, db)
register_payment_routes(app, db)

with app.app_context():
    db.create_all()