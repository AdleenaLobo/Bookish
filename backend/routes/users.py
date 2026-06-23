from flask import request, jsonify
from models.user import Users


def register_users_routes(app, db):

    # GET /api/users — list all users
    @app.route('/api/users', methods=['GET'])
    def get_users():
        users = Users.query.all()
        return jsonify([u.to_dict() for u in users])

    # POST /api/users — create a new user
    @app.route('/api/users', methods=['POST'])
    def create_user():
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body must be JSON'}), 400

        # Require at least name
        if not data.get('name'):
            return jsonify({'error': 'Field "name" is required'}), 400

        user = Users(
            name=data.get('name'),
            age=data.get('age'),
            email=data.get('email'),
            phone_no=data.get('phone_no'),
            password=data.get('password'),
            address=data.get('address'),
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201

    # PUT /api/users/<user_id> — update any field(s)
    @app.route('/api/users/<user_id>', methods=['PUT'])
    def update_user(user_id):
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body must be JSON'}), 400

        user = Users.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Update only fields that are provided in the request
        for field in ['name', 'age', 'email', 'phone_no', 'address']:
            if field in data:
                setattr(user, field, data[field])

        db.session.commit()
        return jsonify(user.to_dict())

    # DELETE /api/users/<user_id> — delete a user
    @app.route('/api/users/<user_id>', methods=['DELETE'])
    def delete_user(user_id):
        user = Users.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 204
