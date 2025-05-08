import heapq
from collections import defaultdict, deque

class R3Cycle:
    def __init__(self, pontos_coleta):
        self.pontos = pontos_coleta
        self.grafo = self._construir_grafo_completo()
    
    def _calcular_distancia(self, ponto1, ponto2):
        x1, y1 = self.pontos[ponto1]
        x2, y2 = self.pontos[ponto2]
        return ((x1 - x2)**2 + (y1 - y2)**2)*0.5
    
    def _construir_grafo_completo(self):
        grafo = defaultdict(dict)
        pontos = list(self.pontos.keys())
        
        for i in range(len(pontos)):
            for j in range(i+1, len(pontos)):
                distancia = self._calcular_distancia(pontos[i], pontos[j])
                grafo[pontos[i]][pontos[j]] = distancia
                grafo[pontos[j]][pontos[i]] = distancia
                
        return grafo
    
    def _prim_agm(self, ponto_inicial):
        agm = defaultdict(dict)
        visitados = set([ponto_inicial])
        arestas = [
            (dist, ponto_inicial, vizinho)
            for vizinho, dist in self.grafo[ponto_inicial].items()
        ]
        heapq.heapify(arestas)
        
        while arestas:
            dist, u, v = heapq.heappop(arestas)
            if v not in visitados:
                visitados.add(v)
                agm[u][v] = dist
                agm[v][u] = dist
                
                for vizinho, dist_viz in self.grafo[v].items():
                    if vizinho not in visitados:
                        heapq.heappush(arestas, (dist_viz, v, vizinho))
        
        return agm
    
    def _encontrar_circuito_euleriano(self, agm, ponto_inicial):
        grafo_euleriano = defaultdict(deque)
        graus = defaultdict(int)
        
        for u in agm:
            for v in agm[u]:
                grafo_euleriano[u].append(v)
                grafo_euleriano[v].append(u)
                graus[u] += 1
                graus[v] += 1
        
        pilha = [ponto_inicial]
        caminho = []
        
        while pilha:
            vertice = pilha[-1]
            if grafo_euleriano[vertice]:
                proximo = grafo_euleriano[vertice].popleft()
                pilha.append(proximo)
            else:
                caminho.append(pilha.pop())
                
        caminho.reverse()
        return caminho
    
    def _otimizar_rota(self, circuito):
        visitados = set()
        rota = []
        
        for ponto in circuito:
            if ponto not in visitados:
                visitados.add(ponto)
                rota.append(ponto)
        
        rota.append(rota[0])
        return rota
    
    def encontrar_rota_otimizada(self, ponto_inicial):
        agm = self._prim_agm(ponto_inicial)
        
        circuito = self._encontrar_circuito_euleriano(agm, ponto_inicial)
        
        rota = self._otimizar_rota(circuito)
        
        return rota
    
    def calcular_distancia_total(self, rota):
        distancia_total = 0
        for i in range(len(rota)-1):
            distancia_total += self.grafo[rota[i]][rota[i+1]]
        return distancia_total
    
pontos_coleta = {
    'Central': (0, 0),          
    'Praça Verde': (1, 2),
    'Escola Sustentável': (3, 1),
    'Shopping Reciclável': (-2, 3),
    'Parque Ecológico': (4, -1),
    'Condomínio Solar': (-3, -2),
    'Feira Orgânica': (2, -3),
    'Universidade Verde': (5, 2),
    'Hospital Limpo': (-4, 1),
    'Estação de Trem': (1, 4),
    'Mercado Sustentável': (-1, -4),
    'Biblioteca Ecológica': (3, 5),
    'Prefeitura Verde': (-5, 0),
    'Praça da Reciclagem': (0, 5),
    'Terminal de Ônibus': (-2, -3),
    'Centro Comunitário': (4, 4),
    'Lago Artificial': (-3, 4),
    'Aeroporto Sustentável': (6, 0),
    'Zoológico Ecológico': (-6, -1),
    'Ponto de Coleta Norte': (2, 6),
    'Ponto de Coleta Sul': (1, -5)
}

r3cycle = R3Cycle(pontos_coleta)
rota_otimizada = r3cycle.encontrar_rota_otimizada('Central')
distancia_total = r3cycle.calcular_distancia_total(rota_otimizada)

print("Rota otimizada:", rota_otimizada)
print("Distância total:", distancia_total)
