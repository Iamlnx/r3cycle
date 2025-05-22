
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
from config import Config
from models import db
from graphs import gerar_grafo_por_cidade
from dijkstra import dijkstra
from prim import rota_dfs_mst, calcular_custo_rota


app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

@app.route("/rota", methods=["POST"])
def calcular_rota():
    data = request.get_json()
    id_cidade = data.get("id_cidade")  # Agora recebendo o ID da cidade

    if not id_cidade:
        return jsonify({"erro": "ID da cidade não fornecido"}), 400

    grafo = gerar_grafo_por_cidade(id_cidade)
    inicio = 'Central de Transportes'

    if inicio not in grafo:
        return jsonify({"erro": f"Ponto inicial '{inicio}' não encontrado na cidade"}), 400

    rota_prim = rota_dfs_mst(grafo, inicio)
    custo_prim = calcular_custo_rota(grafo, rota_prim)
    ultimo_ponto_prim = rota_prim[-1]

    menor_caminho, custo_dijkstra = dijkstra(grafo, ultimo_ponto_prim, inicio)

    return jsonify({
        "prim": {
            "rota": rota_prim,
            "custo": custo_prim
        },
        "dijkstra": {
            "menor_caminho": menor_caminho,
            "custo": custo_dijkstra
        }
    })

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)


