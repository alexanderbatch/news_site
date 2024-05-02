from flask import Flask
from flask_cors import CORS
from settings import get_config


def create_app():
    app = Flask(__name__)
    
    # Load configuration from settings.py
    app.config.from_object(get_config())
    
    CORS(app)
    
    from .routes import main
    app.register_blueprint(main)
    
    return app