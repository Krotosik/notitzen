# Notitzen – Personal Note and TODO Management Application

## Übersicht (Deutsch)

Notitzen ist eine persönliche Notizen- und Aufgabenverwaltungsanwendung, die mit Flask, SQLAlchemy und PostgreSQL entwickelt wurde. Die Anwendung unterstützt eine lokale Benutzerauthentifizierung per E-Mail und Passwort. Benutzer können ihre persönlichen Notizen erstellen, aktualisieren, löschen und archivieren.

### Funktionen

- **Benutzerauthentifizierung**:  
  - Lokale Registrierung und Anmeldung mit E-Mail und Passwort.
- **Notizverwaltung**:  
  - Notizen erstellen, aktualisieren, löschen und archivieren.
- **Responsives Design**:  
  - Modernes Benutzerinterface, das sich an verschiedene Geräte anpasst.
- **Datenbank**:  
  - Verwendet PostgreSQL für eine zuverlässige Datenspeicherung.
- **RESTful API**:  
  - Endpunkte zur Verwaltung von Notizen.

### Installation

1. **Repository klonen:**

   ```bash
   git clone <repository_url>
   cd notitzen
   ```

2. **Virtuelle Umgebung erstellen und aktivieren:**

   - Unter Linux/macOS:
     ```bash
     python -m venv .venv
     source .venv/bin/activate
     ```
   - Unter Windows:
     ```bash
     python -m venv .venv
     .\.venv\Scripts\activate
     ```

3. **Abhängigkeiten installieren:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Erstelle eine Datei `secret.py`:**

   Lege im Stammverzeichnis des Projekts (dort, wo auch `run.py` liegt) eine Datei namens **secret.py** an und füge folgenden Inhalt ein (fülle die Werte für Benutzername, Passwort und Cookies aus):

   ```python
   secret = {
       "username": "",    # PostgreSQL-Benutzername
       "password": "",    # PostgreSQL-Passwort
       "database": "notitzen",
       "cookies": ""      # Flask-Geheimschlüssel für Cookies
   }
   ```

5. **Datenbank initialisieren:**

   ```bash
   python create_db.py
   ```

### Anwendung ausführen

Starte die Anwendung mit:

```bash
python run.py
```

Öffne anschließend deinen Browser und navigiere zu [http://localhost:5000](http://localhost:5000).

### Lizenz

Dieses Projekt steht unter der MIT-Lizenz.

---

## Overview (English)

Notitzen is a personal note and TODO management application built with Flask, SQLAlchemy, and PostgreSQL. It supports local user authentication with email and password. Users can create, update, delete, and archive their personal notes.

### Features

- **User Authentication**:  
  - Local registration and login using email and password.
- **Note Management**:  
  - Create, update, delete, and archive notes.
- **Responsive Design**:  
  - Modern user interface that adapts to different devices.
- **Database**:  
  - Uses PostgreSQL for reliable data storage.
- **RESTful API**:  
  - Endpoints for managing notes.

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd notitzen
   ```

2. **Create and activate a virtual environment:**

   - On Linux/macOS:
     ```bash
     python -m venv .venv
     source .venv/bin/activate
     ```
   - On Windows:
     ```bash
     python -m venv .venv
     .\.venv\Scripts\activate
     ```

3. **Install the dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Create a `secret.py` file:**

   In the project root (the same folder as `run.py`), create a file named **secret.py** and add the following content (fill in the values for username, password, and cookies):

   ```python
   secret = {
       "username": "",    # PostgreSQL username
       "password": "",    # PostgreSQL password
       "database": "notitzen",
       "cookies": ""      # Flask secret key for cookies
   }
   ```

5. **Initialize the Database:**

   ```bash
   python create_db.py
   ```

### Running the Application

Start the application by running:

```bash
python run.py
```

Then open your browser and navigate to [http://localhost:5000](http://localhost:5000).

### License

This project is licensed under the MIT License.

---

