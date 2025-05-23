from models import PontoColeta, Conexao

def gerar_grafo_por_cidade(id_cidade):
    pontos = PontoColeta.query.filter_by(cidade_id=id_cidade).all()
    pontos_por_id = {p.id_ponto: p for p in pontos}

    # Nodes para o front: id, label, x, y
    nodes = [
        {
            "data": {"id": p.nome, "label": p.nome},
            "position": {"x": p.x or 0, "y": p.y or 0}
        }
        for p in pontos
    ]

    conexoes = Conexao.query.filter(
        Conexao.ponto_origem_id.in_(pontos_por_id.keys()),
        Conexao.ponto_destino_id.in_(pontos_por_id.keys())
    ).all()

    # Edges para o front
    edges = []
    adicionadas = set()
    for conexao in conexoes:
        origem_nome = pontos_por_id[conexao.ponto_origem_id].nome
        destino_nome = pontos_por_id[conexao.ponto_destino_id].nome

        # Para não duplicar arestas em grafos não direcionados
        chave = tuple(sorted([origem_nome, destino_nome]))
        if chave in adicionadas:
            continue
        adicionadas.add(chave)

        edges.append({
            "data": {
                "source": origem_nome,
                "target": destino_nome,
                "weight": conexao.peso
            }
        })

    return {"nodes": nodes, "edges": edges}

def marcar_edges_com_classe(nodes, edges, edges_prim=None, edges_dijkstra=None):
    """
    Marca arestas (edges) com classes extras para destaque visual no frontend.

    edges_prim: lista de tuplas (origem, destino) com nomes dos pontos da rota Prim.
    edges_dijkstra: lista de tuplas (origem, destino) com nomes dos pontos da rota Dijkstra.
    """
    edges_prim = set(tuple(sorted(e)) for e in (edges_prim or []))
    edges_dijkstra = set(tuple(sorted(e)) for e in (edges_dijkstra or []))

    new_edges = []
    for edge in edges:
        origem = edge["data"]["source"]
        destino = edge["data"]["target"]
        chave = tuple(sorted([origem, destino]))
        classes = []
        if chave in edges_prim:
            classes.append("prim")
        if chave in edges_dijkstra:
            classes.append("dijkstra")
        new_edge = dict(edge)  # copia
        if classes:
            new_edge["classes"] = " ".join(classes)
        new_edges.append(new_edge)
    return nodes, new_edges

