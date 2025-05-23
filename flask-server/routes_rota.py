from flask import Blueprint, request, jsonify
from models import db
from graphs import gerar_grafo_por_cidade, marcar_edges_com_classe
from dijkstra import dijkstra
from prim import rota_dfs_mst, calcular_custo_rota

rota_routes = Blueprint('rota_routes', __name__)

def get_edges_from_path(path):
    # Retorna lista de tuplas (origem, destino) para o caminho
    return [(path[i], path[i+1]) for i in range(len(path)-1)]

@rota_routes.route("/grafo_rota", methods=["POST"])
def grafo_rota():
    data = request.get_json()
    id_cidade = data.get("id_cidade")
    if not id_cidade:
        return jsonify({"erro": "ID da cidade não fornecido"}), 400

    grafo_cytoscape = gerar_grafo_por_cidade(id_cidade)
    nodes = grafo_cytoscape["nodes"]
    edges = grafo_cytoscape["edges"]

    # Monta grafo denso para Prim/Dijkstra
    # grafo_denso: {nome: {vizinho: peso, ...}, ...}
    grafo_denso = {}
    for edge in edges:
        origem = edge["data"]["source"]
        destino = edge["data"]["target"]
        peso = edge["data"]["weight"]
        grafo_denso.setdefault(origem, {})[destino] = peso
        grafo_denso.setdefault(destino, {})[origem] = peso

    inicio = 'Central de Transportes'
    if inicio not in grafo_denso:
        return jsonify({"erro": f"Ponto inicial '{inicio}' não encontrado na cidade"}), 400

    # Prim route
    rota_prim = rota_dfs_mst(grafo_denso, inicio)
    ultimo_ponto_prim = rota_prim[-1]
    # Dijkstra route
    menor_caminho, _ = dijkstra(grafo_denso, ultimo_ponto_prim, inicio)

    # Converte rotas para lista de edges (tuplas)
    edges_prim = get_edges_from_path(rota_prim)
    edges_dijkstra = get_edges_from_path(menor_caminho)

    # Marca as edges destacadas
    nodes, edges = marcar_edges_com_classe(nodes, edges, edges_prim, edges_dijkstra)

    # Junta nodes + edges para Cytoscape
    elements = nodes + edges

    return jsonify({
        "elements": elements,
        "prim": rota_prim,
        "dijkstra": menor_caminho
    })
