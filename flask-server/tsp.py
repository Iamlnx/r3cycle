def nearest_neighbor_tsp(grafo, inicio):
    visitado = [inicio]
    atual = inicio

    while len(visitado) < len(grafo):
        # Busca o vizinho mais próximo ainda não visitado
        proximos = [(v, peso) for v, peso in grafo[atual].items() if v not in visitado]
        if not proximos:
            break  # Não há mais vizinhos (grafo desconexo)
        proximo, _ = min(proximos, key=lambda x: x[1])
        visitado.append(proximo)
        atual = proximo

    return visitado

def calcular_custo_rota(grafo, rota):
    custo_total = 0
    for i in range(len(rota) - 1):
        origem = rota[i]
        destino = rota[i + 1]
        custo_total += grafo[origem].get(destino, 0)
    return custo_total
