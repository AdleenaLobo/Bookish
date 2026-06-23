from flask import jsonify
from models.history import History


def register_history_routes(app, db):
    @app.route("/api/history")
    def get_history():
        history = History.query.all()
        return jsonify([h.to_dict for h in history])
