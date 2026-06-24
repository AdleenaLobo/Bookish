from flask import jsonify, request
from models.review import Review


def register_reviews_routes(app, db):
    #GET list of reviews
    @app.route("/api/reviews" , methods=['GET'])
    def get_reviews():
        reviews = Review.query.all()
        return jsonify([r.to_dict() for r in reviews])

    #Create review    
    @app.route("/api/reviews", methods=['POST'])
    def create_reviews():
        data = request.get_json()
        if not data:
            return jsonify({'error':'Request body must be json'}), 400

        review = Review(
            stars = data.get('stars'),
            book_id = data.get('book_id'),
            comments = data.get('comments')
        )

        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()), 201

    #update review
    @app.route("/api/reviews/<reviews_id>", methods=['PUT'])
    def update_reviews(reviews_id):
        data = request.get_json()
        if not data:
            return jsonify({'error':'Request body must be json'}), 400
        
        review = Review.query.get(reviews_id)
        if not review:
            return jsonify({'error':'Review not found'}), 404
        for field in ['stars', 'comments']:
            if field in data:
                setattr(review , field , data[field])
        db.session.commit()
        return jsonify(review.to_dict())
        

    #delete review
    @app.route("/api/reviews/<reviews_id>", methods=['DELETE'])
    def delete_reviews(reviews_id):
        data = request.get_json()
        if not data:
            return jsonify({"error":"Request body must be JSON"}), 400
        
        review = Review.query.get(reviews_id)
        if not review:
            return jsonify({'error':'Review not found'}), 404
        db.session.delete(review)
        db.session.commit()
        return jsonify({'message':'review has been deleted successfully'}), 204
