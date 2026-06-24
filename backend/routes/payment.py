from flask import jsonify , request
from models.payment import Payment


def register_payment_routes(app, db):

    # get list of payments needed to make
    @app.route("/api/payment", methods=['GET'])
    def get_payments():
        payment = Payment.query.all()
        return jsonify([p.to_dict() for p in payment])
    
    # create new payment
    @app.route("/api/payment", methods=['POST'])
    def create_payments():
        data = request.get_json()
        if not data:
            return jsonify({"error":"Request body must be JSON"}), 400

        payment = Payment(
            total_payment_pending =data.get('total_payment_pending'),
            user_id = data.get('user_id')
        )
        db.session.add(payment)
        db.session.commit()
        return jsonify(payment.to_dict()), 201

    
    #update payment
    @app.route("/api/payment/<payment_id>", methods=["PUT"])
    def update_payments(payment_id):
        data = request.get_json()
        if not data:
            return jsonify({"error":"Request body must be JSON"}), 400
        payment = Payment.query.get(payment_id)
        if not payment:
            return jsonify({'error':'Payment id not found'})

        for feild in ['total_pending_payment' , 'user_id']:
            if feild in data:
                setattr(payment , feild , data[feild])
        
        db.session.commit()
        return jsonify(payment.to_dict()), 200


    #delete
    @app.route("/api/payment/<payment_id>", methods=["DELETE"])
    def delete_payment(payment_id):
        payment = Payment.query.get(payment_id)
        if not payment:
            return jsonify({'error': 'payment id not found'}), 404

        db.session.delete(payment)
        db.session.commit()
        return jsonify({'message': 'payment deleted successfully'}), 204

