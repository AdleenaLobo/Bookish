from flask import jsonify, request
from datetime import datetime, timedelta

from models.history import History
from models.books import Books


def register_history_routes(app, db):

    # Get all history
    @app.route("/api/history", methods=["GET"])
    def get_history():
        history = History.query.all()
        return jsonify([h.to_dict() for h in history]), 200


    # Get history of one user
    @app.route("/api/history/<user_id>", methods=["GET"])
    def get_user_history(user_id):
        history = History.query.filter_by(user_id=user_id).all()

        response = []

        for item in history:
            book = Books.query.get(item.book_id)

            response.append({
                "id": item.id,
                "leased_at": item.leased_at,
                "due_date": item.due_date,
                "returned": item.returned,
                "returned_at": item.returned_at,
                "book": book.to_dict() if book else None
            })

        return jsonify(response), 200


    # Create history
    @app.route("/api/history", methods=["POST"])
    def create_history():
        data = request.get_json()

        if not data:
            return jsonify({"error": "Request body must be JSON"}), 400

        if not data.get("user_id") or not data.get("book_id"):
            return jsonify({
                "error": "user_id and book_id are required"
            }), 400

        leased_at = datetime.utcnow()

        history = History(
            user_id=data["user_id"],
            book_id=data["book_id"],
            leased_at=leased_at,
            due_date=leased_at + timedelta(days=30),
            returned=False,
            returned_at=None
        )

        db.session.add(history)
        db.session.commit()

        return jsonify(history.to_dict()), 201


    # Return a leased book
    @app.route("/api/history/<history_id>/return", methods=["PUT"])
    def return_book(history_id):
        history = History.query.get(history_id)

        if not history:
            return jsonify({"error": "History not found"}), 404

        if history.returned:
            return jsonify({"error": "Book already returned"}), 400

        history.returned = True
        history.returned_at = datetime.utcnow()

        book = Books.query.get(history.book_id)

        if book:
            book.status = True

        db.session.commit()

        return jsonify({
            "message": "Book returned successfully",
            "history": history.to_dict()
        }), 200