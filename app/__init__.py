import flask
from flask_login import LoginManager
from .extensions import db

login_manager = LoginManager()

def create_app():
    app = flask.Flask(__name__)
    app.config.from_object("config.Config")
    
    db.init_app(app)
    login_manager.login_view = "auth.login"
    login_manager.init_app(app)
    
    @login_manager.user_loader
    def load_user(user_id):
        from .models import User
        return User.query.get(int(user_id))
    
    from .auth import auth
    from .routes import main
    
    app.register_blueprint(auth)
    app.register_blueprint(main)
    
    with app.app_context():
        from . import models
        db.create_all()
    
    return app
