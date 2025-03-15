import flask
from .models import db, Note, User

from flask_login import current_user, login_required


main = flask.Blueprint("main", __name__)

@main.route("/")
@login_required
def index():
    if not current_user.is_authenticated:
        return flask.redirect(flask.url_for("auth.login"))
    if current_user.is_authenticated:
        notes_new = Note.query.filter_by(user_id=current_user.id, status="NEW").order_by(Note.created_at.desc()).all()
        notes_done = Note.query.filter_by(user_id=current_user.id, status="DONE").order_by(Note.created_at.desc()).all()
        notes_archived = Note.query.filter_by(user_id=current_user.id, status="ARCHIVED").order_by(Note.created_at.desc()).all()
        name = User.query.filter_by(id=current_user.id).first().username
    else:
        notes_new = notes_done = notes_archived = []
    return flask.render_template("index.html", notes_new=notes_new, notes_done=notes_done, notes_archived=notes_archived, name=name)

@main.route("/add_note", methods=["POST"])
def add_note():
    content = flask.request.form.get("content")
    if content and current_user.is_authenticated:
        new_note = Note(content=content, status="NEW", user_id=current_user.id)
        db.session.add(new_note)
        db.session.commit()
    return flask.jsonify({"message": "Hinweis hinzugefügt"}), 200

@main.route("/update_status/<int:note_id>", methods=["POST"])
def update_status(note_id):
    note = Note.query.get_or_404(note_id)
    data = flask.request.get_json()
    
    if "status" not in data or data["status"] not in ["NEW", "DONE"]:
        return flask.jsonify({"error": "Falscher Status"}), 400
    
    note.status = data["status"]
    db.session.commit()
    
    return flask.jsonify({"message": "Status aktualisiert"}), 200

@main.route("/delete_note/<int:note_id>", methods=["POST"])
def delete_note(note_id):
    note = Note.query.get_or_404(note_id)
    db.session.delete(note)
    db.session.commit()
    return flask.jsonify({"message": "Notatka została usunięta"}), 200

@main.route("/archive_note/<int:note_id>", methods=["POST"])
def archive_note(note_id):
    note = Note.query.get_or_404(note_id)
    note.status = "ARCHIVED"
    db.session.commit()
    return flask.jsonify({"message": "Notatka została zarchiwizowana"}), 200