from flask import session

def clear_flask_flashes():
    if "_flashes" in session:
        del session["_flashes"]