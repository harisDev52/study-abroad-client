# run.py

from flask import Flask
from app.extensions import init_app
from flask_cors import CORS
from app.auth.routes import init_auth_routes
from app.profile.routes import init_profile_routes

app = Flask(__name__)

# Initialize app with extensions and routes
init_app(app)
init_auth_routes(app)
init_profile_routes(app)

CORS(app, origins=['http://localhost:5173'])

if __name__ == '__main__':
    app.run(debug=True)
