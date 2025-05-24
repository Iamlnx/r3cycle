from dijkstra import dijkstra

def tsp(grafo, inicio):
    visitados = set([inicio])
    rota = [inicio]
    atual = inicio

    while len(visitados) < len(grafo):
        # Vizinhos diretos não visitados
        vizinhos_novos = [v for v in grafo[atual] if v not in visitados]
        if vizinhos_novos:
            # Escolhe o vizinho direto mais próximo
            proximo = min(vizinhos_novos, key=lambda v: grafo[atual][v])
            rota.append(proximo)
            visitados.add(proximo)
            atual = proximo
        else:
            # Busca o caminho mais curto até o próximo não visitado usando seu Dijkstra
            candidatos = [v for v in grafo if v not in visitados]
            caminhos = [(dijkstra(grafo, atual, v), v) for v in candidatos]
            # Filtra apenas caminhos possíveis (caminho[0] não vazio)
            caminhos = [(c, v) for c, v in caminhos if c[0] and len(c[0]) > 1]
            if not caminhos:
                break
            # Seleciona o caminho mais curto (menor número de passos)
            caminho_min, proximo = min(caminhos, key=lambda x: len(x[0][0]))
            caminho_seq = caminho_min[0]
            # Adiciona todos os pontos do caminho (exceto o primeiro, que já está na rota)
            for p in caminho_seq[1:]:
                rota.append(p)
                visitados.add(p)
            atual = proximo
    return rota

