from flask import jsonify , request
from models.history import History


def register_history_routes(app, db):

    # GET list of all the history
    @app.route("/api/history", methods=['GET'])
    def get_history():
        history = History.query.all()
        return jsonify([h.to_dict() for h in history])

    # create history
    @app.route("/api/history", methods=['POST'])
    def create_history():
        data = request.get_json()
        if not data:
            return jsonify({"error":"Request body must be JSON"}), 400

        history = History(
            date = data.get('date'),
            book_id = data.get('book_id'),
        )
        db.session.add(history)
        db.session.commit()
        return jsonify(history.to_dict()), 201