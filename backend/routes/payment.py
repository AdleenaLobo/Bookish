from flask import jsonify
from models.payment import Payment


def register_payment_routes(app, db):
    @app.route("/api/payment")
    def get_payments():
        payment = Payment.query.all
        return jsonify([p.to_dict for p in payment])