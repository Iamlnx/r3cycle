import heapq

def dijkstra(grafo, origem, destino):
    # Inicializando as estruturas de dados
    distancias = {nodo: float('inf') for nodo in grafo}
    distancias[origem] = 0
    caminhos = {nodo: None for nodo in grafo}
    fila_prioridade = [(0, origem)]

    while fila_prioridade:
        (distancia_atual, nodo_atual) = heapq.heappop(fila_prioridade)

        if distancia_atual > distancias[nodo_atual]:
            continue

        for vizinho, peso in grafo[nodo_atual].items():
            distancia = distancia_atual + peso

            if distancia < distancias[vizinho]:
                distancias[vizinho] = distancia
                caminhos[vizinho] = nodo_atual
                heapq.heappush(fila_prioridade, (distancia, vizinho))

    # Reconstruir o caminho até o destino
    caminho = []
    nodo_atual = destino
    while nodo_atual is not None:
        caminho.append(nodo_atual)
        nodo_atual = caminhos[nodo_atual]
    
    caminho.reverse()
    
    return caminho, distancias[destino]
