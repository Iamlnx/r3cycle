from models import PontoColeta, Conexao

def gerar_grafo_por_cidade(id_cidade):
    pontos = PontoColeta.query.filter_by(cidade_id=id_cidade).all()
    grafo = {ponto.nome: {} for ponto in pontos}

    # Mapeia rapidamente os pontos por ID para evitar múltiplas queries
    pontos_por_id = {p.id_ponto: p.nome for p in pontos}

    conexoes = Conexao.query.filter(
        Conexao.ponto_origem_id.in_(pontos_por_id.keys()),
        Conexao.ponto_destino_id.in_(pontos_por_id.keys())
    ).all()

    for conexao in conexoes:
        origem_nome = pontos_por_id.get(conexao.ponto_origem_id)
        destino_nome = pontos_por_id.get(conexao.ponto_destino_id)

        if origem_nome and destino_nome:
            grafo[origem_nome][destino_nome] = conexao.peso
            grafo[destino_nome][origem_nome] = conexao.peso

    return grafo

