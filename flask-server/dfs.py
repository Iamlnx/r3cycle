def dfs_visit_all(grafo, inicio):
    visitado = set()
    rota = []

    def dfs(atual):
        visitado.add(atual)
        rota.append(atual)
        for vizinho in grafo[atual]:
            if vizinho not in visitado:
                dfs(vizinho)
                # Se quiser que o caminhoneiro volte pelo mesmo caminho:
                rota.append(atual)

    dfs(inicio)
    return rota

def calcular_custo_rota(grafo, rota):
    custo_total = 0
    for i in range(len(rota) - 1):
        origem = rota[i]
        destino = rota[i + 1]
        custo_total += grafo[origem].get(destino, 0)
    return custo_total
