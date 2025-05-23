from flask import Blueprint, request, jsonify
from models import db
from graphs import gerar_grafo_por_cidade, get_nodes_with_positions  # get_nodes_with_positions é uma suposição!
from dijkstra import dijkstra
from prim import rota_dfs_mst, calcular_custo_rota

rota_routes = Blueprint('rota_routes', __name__)

def get_edges_from_path(path):
    # Retorna lista de tuplas (origem, destino) para o caminho
    return [(path[i], path[i+1]) for i in range(len(path)-1)]

def edges_to_set(edges):
    # Normaliza para evitar duplicidade (não direcionado)
    return set(tuple(sorted(edge)) for edge in edges)

def combine_grafo_with_routes(grafo, nodes, prim_path, dijkstra_path):
    prim_edges = edges_to_set(get_edges_from_path(prim_path))
    dijkstra_edges = edges_to_set(get_edges_from_path(dijkstra_path))

    elements = []

    # Adicione os nodes já com posição (supondo nodes já no formato cytoscape)
    for node in nodes:
        elements.append(node)

    # Adicione edges, marcando as da rota prim e dijkstra
    added = set()
    for origem, vizinhos in grafo.items():
        for destino, peso in vizinhos.items():
            key = tuple(sorted((origem, destino)))
            if key in added:
                continue
            added.add(key)

            classes = []
            if key in prim_edges:
                classes.append("prim")
            if key in dijkstra_edges:
                classes.append("dijkstra")

            elements.append({
                "data": {
                    "id": f"{origem}-{destino}",
                    "source": origem,
                    "target": destino,
                    "label": str(peso)
                },
                "classes": " ".join(classes)
            })
    return elements

@rota_routes.route("/grafo_rota", methods=["POST"])
def grafo_rota():
    data = request.get_json()
    id_cidade = data.get("id_cidade")
    if not id_cidade:
        return jsonify({"erro": "ID da cidade não fornecido"}), 400

    grafo = gerar_grafo_por_cidade(id_cidade)
    nodes = get_nodes_with_positions(id_cidade)  

    inicio = 'Central de Transportes'
    if inicio not in grafo:
        return jsonify({"erro": f"Ponto inicial '{inicio}' não encontrado na cidade"}), 400

    rota_prim = rota_dfs_mst(grafo, inicio)
    ultimo_ponto_prim = rota_prim[-1]
    menor_caminho, _ = dijkstra(grafo, ultimo_ponto_prim, inicio)

    elements = combine_grafo_with_routes(grafo, nodes, rota_prim, menor_caminho)

    return jsonify({
        "elements": elements,
        "prim": rota_prim,
        "dijkstra": menor_caminho
    })

