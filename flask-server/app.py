
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
from config import Config
from models import db
from routes_crud import routes  # Blueprint CRUD
from routes_rota import rota_routes

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
CORS(app)
app.register_blueprint(routes)
app.register_blueprint(rota_routes)  

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

