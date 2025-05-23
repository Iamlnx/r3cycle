from models import PontoColeta, Conexao

def gerar_grafo_por_cidade(id_cidade):
    pontos = PontoColeta.query.filter_by(cidade_id=id_cidade).all()
    pontos_por_id = {p.id_ponto: p for p in pontos}

    # Nodes para o front: id, label, x, y (pode adicionar outros campos se quiser)
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

