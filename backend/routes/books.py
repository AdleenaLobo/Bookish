from flask import jsonify
from models.books import Books

def register_books_routes(app, db):
    @app.route('/api/books')
    def get_books():
        books = Books.query.all()
        return jsonify([b.to_dict() for b in books])