from flask import jsonify , request
from models.author import Authors


def register_author_routes(app, db):

    @app.route('/api/authors', methods=['GET'])
    def get_authors():
        authors = Authors.query.all()
        return jsonify([a.to_dict() for a in authors])
    
    @app.route('/api/authors/<author_id>', methods=['GET'])
    def get_author(author_id):
        author = Authors.query.get(author_id)

        if not author:
            return jsonify({
                "message": "Author not found"
            }), 404

        return jsonify({
            "id": author.id,
            "name": author.name,
            "description": author.self_description,
            "image": author.image
        }), 200

    @app.route('/api/authors', methods=['POST'])
    def create_authors():
        data = request.get_json()

        if not data:
            return jsonify({'error':'Request body must be json'}), 400

        if not data.get('name'):
            return jsonify({'error':'Feild name is required'}), 400
        

        author = Authors(
            name= data.get('name'),
            self_description = data.get('self_description'),
        )

        db.session.add(author)
        db.session.commit()
        return jsonify(author.to_dict()), 201

    @app.route('/api/authors/<author_id>', methods=['PUT'])
    def update_author(author_id):
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request must be json'}), 400

        author = Authors.query.get(author_id)
        if not author:
            return jsonify({'error': 'Author not found'}), 404


        for field in ['name', 'self_description']:
            if field in data:
                setattr(author , field , data[field])
        
        db.session.commit()
        return jsonify(author.to_dict())

    
    @app.route('/api/authors/<author_id>', methods=['DELETE'])
    def delete_authors(author_id):
        author = Authors.query.get(author_id)
        if not author:
            return jsonify({'error':'Author not found'}), 404

        db.session.delete(author)
        db.session.commit()
        return jsonify({'message':'Author deleted successfully'}), 204