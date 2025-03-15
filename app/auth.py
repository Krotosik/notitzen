from flask import Blueprint, request, redirect, url_for,render_template, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from .models import db, User
from app.modules.clearFlashes import clear_flask_flashes


auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form.get("email")
        username = request.form.get("username")
        password = request.form.get("password")
        
        if User.query.filter_by(email=email).first():
            clear_flask_flashes()
            flash("Email already exists","error")
            return redirect(url_for("auth.register"))
        
        new_user = User(email=email, username=username, password_hash=generate_password_hash(password))
        
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return redirect(url_for("main.index"))
    return render_template("register.html")

@auth.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        
        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            clear_flask_flashes()
            flash("Invalid email or password", "error")
            return redirect(url_for("auth.login"))
        
        login_user(user)
        return redirect(url_for("main.index"))
    return render_template("login.html")

@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("auth.login"))