from flask import jsonify
from models.review import Review


def register_reviews_routes(app, db):
    @app.route("/api/reviews")
    def get_reviews():
        reviews = Review.query.all
        return jsonify([r.to_dict for r in reviews])