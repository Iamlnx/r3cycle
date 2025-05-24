
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
from config import Config
from extensions import db, bcrypt  
from routes_crud import routes
from routes_rota import rota_routes
from routes_grafo import grafo_routes
from routes_auth import auth_routes

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)
CORS(app, supports_credentials=True, origins=["https://localhost:5173", "https://r3cycle-portal.onrender.com"])
app.register_blueprint(routes)
app.register_blueprint(rota_routes)
app.register_blueprint(grafo_routes)
app.register_blueprint(auth_routes)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

