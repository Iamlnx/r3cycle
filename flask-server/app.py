
from flask import Flask, request, jsonify
from flask_cors import CORS
from dijkstra import dijkstra
from prim import rota_dfs_mst, calcular_custo_rota
from graphs import cidade1, cidade2, cidade3

app = Flask(__name__)
CORS(app)

# Mapeia nomes para os grafos
cidades = {
    "cidade1": cidade1,
    "cidade2": cidade2,
    "cidade3": cidade3
}

@app.route("/rota", methods=["POST"])
def calcular_rota():
    data = request.get_json()
    nome_cidade = data.get("cidade")

    if nome_cidade not in cidades:
        return jsonify({"erro": "Cidade inválida"}), 400

    cidade = cidades[nome_cidade]
    inicio = 'Central de Transportes'

    # Prim (Ida)
    rota_prim = rota_dfs_mst(cidade, inicio)
    custo_prim = calcular_custo_rota(cidade, rota_prim)
    ultimo_ponto_prim = rota_prim[-1]

    # Dijkstra (Volta)
    origem = ultimo_ponto_prim
    destino = inicio
    menor_caminho, custo_dijkstra = dijkstra(cidade, origem, destino)

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
    app.run()

