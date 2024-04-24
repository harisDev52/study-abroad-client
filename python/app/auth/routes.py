# app/auth/routes.py

from flask import jsonify, request, current_app
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, unset_jwt_cookies
from ..extensions import db ,mail
from flask_mail import Message
import datetime

bcrypt = Bcrypt()

def init_auth_routes(app):
    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json()
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = {
            'username': data['username'],
            'email': data['email'],
            'password': hashed_password,
            'created_at': datetime.datetime.utcnow()
        }
        result = db.users.insert_one(user)
        return jsonify({'message': 'User registered successfully', 'user_id': str(result.inserted_id)}), 201

    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        user = db.users.find_one({'email': data['email']})
        if user and bcrypt.check_password_hash(user['password'], data['password']):
            access_token = create_access_token(identity=str(user['_id']))
            return jsonify({'message': 'Logged in successfully', 'access_token': access_token}), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401

    @app.route('/logout', methods=['POST'])
    @jwt_required()
    def logout():
        response = jsonify({'message': 'Logged out successfully'})
        unset_jwt_cookies(response)  # Clear JWT token from client-side
        return response, 200

    @app.route('/forgot-password', methods=['POST'])
    def forgot_password():
        data = request.get_json()
        email = data.get('email')

        user = db.users.find_one({'email': email})
        if user:
            # Generate a password reset token
            reset_token = create_access_token(identity=str(user['_id']), expires_delta=datetime.timedelta(hours=1))

            # Send an email with the password reset link
            send_reset_email(email, reset_token)

            return jsonify({'message': 'Password reset instructions sent to your email'}), 200
        else:
            return jsonify({'error': 'User with provided email not found'}), 404

    @app.route('/reset-password', methods=['POST'])
    def reset_password():
        data = request.get_json()
        email = data.get('email')
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        # Verify if old password matches
        user = db.users.find_one({'email': email})
        if user and bcrypt.check_password_hash(user['password'], old_password):
            # Update user's password
            hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
            db.users.update_one({'_id': user['_id']}, {'$set': {'password': hashed_password}})
            return jsonify({'message': 'Password reset successfully'}), 200
        else:
            return jsonify({'error': 'Invalid email or old password'}), 401

def send_reset_email(email, reset_token):
    msg = Message('Password Reset', recipients=[email])
    msg.body = f'Click the following link to reset your password: {current_app.config["RESET_URL"]}/{reset_token}'
    mail.send(msg)
