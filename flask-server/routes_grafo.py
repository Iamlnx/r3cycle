from flask import Blueprint, jsonify
from graphs import gerar_grafo_por_cidade

grafo_routes = Blueprint('grafo_routes', __name__)

@grafo_routes.route('/grafo/<int:id_cidade>', methods=['GET'])
def get_grafo(id_cidade):
    grafo = gerar_grafo_por_cidade(id_cidade)
    if not grafo:
        return jsonify({'erro': 'Grafo não encontrado para esta cidade'}), 404
    return jsonify(grafo)
