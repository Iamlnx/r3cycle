def prim(grafo, inicio):
    visitado = set([inicio])
    mst = {n: [] for n in grafo}

    while len(visitado) < len(grafo):
        menor = None
        for u in visitado:
            for v, peso in grafo[u].items():
                if v not in visitado and (menor is None or peso < menor[2]):
                    menor = (u, v, peso)
        if menor:
            u, v, _ = menor
            mst[u].append(v)
            mst[v].append(u)
            visitado.add(v)

    return mst

def rota_dfs_mst(grafo, inicio):
    mst = prim(grafo, inicio)
    visitado = []

    def dfs(atual):
        visitado.append(atual)
        for vizinho in mst[atual]:
            if vizinho not in visitado:
                dfs(vizinho)

    dfs(inicio)
    return visitado


def calcular_custo_rota(grafo, rota):
    custo_total = 0
    for i in range(len(rota) - 1):
        origem = rota[i]
        destino = rota[i + 1]
        custo_total += grafo[origem].get(destino, 0)
    return custo_total

