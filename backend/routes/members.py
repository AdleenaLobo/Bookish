from flask import request, jsonify
from models.members import Members


def register_member_routes(app, db):

    # GET /api/members — list all members
    @app.route('/api/members', methods=['GET'])
    def get_members():
        members = Members.query.all()
        return jsonify([m.to_dict() for m in members])

    # POST /api/members — create a new member
    @app.route('/api/members', methods=['POST'])
    def create_member():
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body must be JSON'}), 400

        if not data.get('user_id'):
            return jsonify({'error': 'Field "user_id" is required'}), 400

        member = Members(
            user_id=data.get('user_id'),
        )

        db.session.add(member)
        db.session.commit()
        return jsonify(member.to_dict()), 201

    # DELETE /api/members/<member_id> — delete a member
    @app.route('/api/members/<member_id>', methods=['DELETE'])
    def delete_member(member_id):
        member = Members.query.get(member_id)
        if not member:
            return jsonify({'error': 'Member not found'}), 404

        db.session.delete(member)
        db.session.commit()
        return jsonify({'message': 'Member deleted successfully'}), 204
