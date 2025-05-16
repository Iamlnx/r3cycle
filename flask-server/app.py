from flask import Flask, jsonify
from flask_cors import CORS
from dijkstra import dijkstra
from prim import rota_dfs_mst, calcular_custo_rota
from graphs import cidade1, cidade2, cidade3

app = Flask(__name__)
CORS(app)

@app.route("/")
def test():
    cidade = cidade1

    # Função de Prim ( Sair da Central )
    inicio = 'Central de Transportes'
    rota_prim = rota_dfs_mst(cidade, inicio)
    custo_prim = calcular_custo_rota(cidade, rota_prim)
    print(f"Prim - Rota gerada pela árvore geradora mínima: {rota_prim}")
    print(f"Custo da rota Prim: {custo_prim}\n")
    ultimo_ponto_prim = rota_prim[-1]  # O último ponto na sequência gerada por DFS

    # Função de Dijkstra ( Retornar à Central )
    origem = ultimo_ponto_prim
    destino = inicio
    menor_caminho, custo_dijkstra = dijkstra(cidade, origem, destino)
    print(f"Dijkstra - Menor caminho de {origem} a {destino}: {menor_caminho} com custo {custo_dijkstra}")

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

