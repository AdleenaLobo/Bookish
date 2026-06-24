from flask import jsonify, request
from models.books import Books


def register_books_routes(app, db):

    # GET /api/books — list all books
    @app.route('/api/books', methods=['GET'])
    def get_books():
        books = Books.query.all()
        return jsonify([b.to_dict() for b in books])

    # GET /api/books/<book_id> — get a single book
    @app.route('/api/books/<book_id>', methods=['GET'])
    def get_book(book_id):
        book = Books.query.get(book_id)
        if not book:
            return jsonify({'error': 'Book not found'}), 404
        return jsonify(book.to_dict())

    # POST /api/books — create a new book
    @app.route('/api/books', methods=['POST'])
    def create_book():
        data = request.get_json()

        if not data:
            return jsonify({'error': 'Request body must be JSON'}), 400

        # Required fields
        required = ['name', 'description', 'author_name', 'author_id', 'status', 'price']
        for field in required:
            if not data.get(field):
                return jsonify({'error': f'Field "{field}" is required'}), 400

        book = Books(
            name=data.get('name'),
            description=data.get('description'),
            author_name=data.get('author_name'),
            author_id=data.get('author_id'),
            author_book_description=data.get('author_book_description'),
            status=data.get('status'),
            price=data.get('price'),
        )

        db.session.add(book)
        db.session.commit()
        return jsonify(book.to_dict()), 201

    # PUT /api/books/<book_id> — update any field(s)
    @app.route('/api/books/<book_id>', methods=['PUT'])
    def update_book(book_id):
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body must be JSON'}), 400

        book = Books.query.get(book_id)
        if not book:
            return jsonify({'error': 'Book not found'}), 404

        for field in ['name', 'description', 'author_name', 'author_id',
                      'author_book_description', 'status', 'price']:
            if field in data:
                setattr(book, field, data[field])

        db.session.commit()
        return jsonify(book.to_dict())

    # DELETE /api/books/<book_id> — delete a book
    @app.route('/api/books/<book_id>', methods=['DELETE'])
    def delete_book(book_id):
        book = Books.query.get(book_id)
        if not book:
            return jsonify({'error': 'Book not found'}), 404

        db.session.delete(book)
        db.session.commit()
        return jsonify({'message': 'Book deleted successfully'}), 204
