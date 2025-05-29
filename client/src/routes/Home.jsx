import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import GraphView from '../components/GraphView';
import api from '../services/api';

// Função para marcar arestas da rota (aceita ambas as direções)
function marcarArestasDaRota(elements, rota, classe) {
  if (!rota || rota.length < 2) return elements;
  const newElements = elements.map(el => ({ ...el }));
  for (let i = 0; i < rota.length - 1; i++) {
    const source = rota[i];
    const target = rota[i + 1];
    for (const el of newElements) {
      if (
        el.data &&
        (
          (el.data.source === source && el.data.target === target) ||
          (el.data.source === target && el.data.target === source)
        )
      ) {
        el.classes = classe;
      }
    }
  }
  return newElements;
}

// Função para extrair subgrafo (apenas nós/arestas da rota)
function extrairSubgrafo(elements, rota) {
  if (!rota || rota.length < 2) return [];
  // IDs dos nós na rota
  const nodeIds = new Set(rota);
  // Pares de nós que formam as arestas da rota
  const edgeSet = new Set();
  for (let i = 0; i < rota.length - 1; i++) {
    edgeSet.add(`${rota[i]}-${rota[i + 1]}`);
    edgeSet.add(`${rota[i + 1]}-${rota[i]}`); // caso não-direcional
  }
  // Filtra os nós presentes na rota
  const nodes = elements.filter(el => el.data?.id && nodeIds.has(el.data.id));
  // Filtra as arestas presentes no caminho da rota
  const edges = elements.filter(el =>
    el.data?.source && el.data?.target &&
    (edgeSet.has(`${el.data.source}-${el.data.target}`) ||
     edgeSet.has(`${el.data.target}-${el.data.source}`))
  );
  return [...nodes, ...edges];
}

// Função para limpar classes das linhas
function limparClassesDasArestas(elements) {
  return elements.map(el =>
    el.data?.source && el.data?.target
      ? { ...el, classes: undefined }
      : el
  );
}

function Home() {
  const [cidades, setCidades] = useState([]);
  const [idCidadeSelecionada, setIdCidadeSelecionada] = useState(null);
  const [rotaTsp, setRotaTsp] = useState([]);
  const [rotaDijkstra, setRotaDijkstra] = useState([]);
  const [elementsTsp, setElementsTsp] = useState([]);
  const [elementsDijkstra, setElementsDijkstra] = useState([]);
  const [elementsGeral, setElementsGeral] = useState([]);
  const [loadingGrafos, setLoadingGrafos] = useState(false);

  useEffect(() => {
    async function fetchCidades() {
      try {
        const response = await api.get('/cidades');
        setCidades(response.data);
      } catch (e) {
        setCidades([]);
      }
    }
    fetchCidades();
  }, []);

  useEffect(() => {
    async function fetchGrafosRota() {
      if (!idCidadeSelecionada) return;
      setLoadingGrafos(true);
      try {
        const response = await api.post('/grafo_rota', { id_cidade: idCidadeSelecionada });
        const allElements = response.data.elements;
        const tsp = response.data.tsp;
        const dijkstra = response.data.dijkstra;

        // Grafo geral: todos os elementos (sem marcação)
        setElementsGeral(limparClassesDasArestas(allElements));

        // Grafo TSP: marca arestas do TSP
        const elementsTsp = marcarArestasDaRota(allElements, tsp, "tsp");
        setElementsTsp(elementsTsp);

        // Grafo Dijkstra: marca arestas do Dijkstra
        const elementsDijkstra = marcarArestasDaRota(allElements, dijkstra, "dijkstra");
        setElementsDijkstra(elementsDijkstra);

        setRotaTsp(tsp);
        setRotaDijkstra(dijkstra);
      } catch (e) {
        setElementsTsp([]);
        setElementsDijkstra([]);
        setElementsGeral([]);
        setRotaTsp([]);
        setRotaDijkstra([]);
      } finally {
        setLoadingGrafos(false);
      }
    }
    fetchGrafosRota();
  }, [idCidadeSelecionada]);

  function rotaComoTexto(rota) {
    if (!rota || !rota.length) return "";
    return rota.join(" \u2192 ");
  }

  return (
    <main className="h-full w-full mb-4">
      <NavBar />
      <div className='px-4 md:px-20 mt-5'>
        <h1 className='font-bold text-xl'>Rotas</h1>
        <p>Selecione a sua cidade:</p>
        <div className="flex flex-wrap gap-4 my-4">
          {cidades.map((cidade) => (
            <button
              key={cidade.id_cidade}
              className={`px-4 py-2 cursor-pointer rounded shadow ${idCidadeSelecionada === cidade.id_cidade ? 'bg-[#386641] text-white' : 'bg-white text-[#386641]'}`}
              onClick={() => setIdCidadeSelecionada(cidade.id_cidade)}
            >
              {cidade.nome}
            </button>
          ))}
        </div>
        {idCidadeSelecionada && (
          <div className="mt-8">
            <h2 className="font-semibold text-lg mb-2">
              Cidade de {cidades.find(c => c.id_cidade === idCidadeSelecionada)?.nome}
            </h2>
            <div className="flex flex-col gap-8">
              {/* Grafo Geral */}
              <div>
                <h3 className="font-semibold text-md mb-1">Mapa Geral</h3>
                <div className='w-full h-[60vh] md:h-[85vh] border rounded bg-white shadow'>
                  <GraphView elements={elementsGeral} />
                </div>
              </div>
              {/* Grafo TSP */}
              <div>
                <h3 className="font-semibold text-md mb-1 text-[#386641]">Rota de Coleta (TSP)</h3>
                <div className="mb-2 text-gray-800 text-sm">{rotaComoTexto(rotaTsp)}</div>
                <div className='w-full h-[60vh] md:h-[85vh] border rounded bg-white shadow'>
                  <GraphView elements={extrairSubgrafo(elementsTsp, rotaTsp)} />
                </div>
              </div>
              {/* Grafo Dijkstra */}
              <div>
                <h3 className="font-semibold text-md mb-1 text-blue-700">Rota de Retorno (Dijkstra)</h3>
                <div className="mb-2 text-gray-800 text-sm">{rotaComoTexto(rotaDijkstra)}</div>
                <div className='w-full h-[60vh] md:h-[85vh] border rounded bg-white shadow'>
                  <GraphView elements={extrairSubgrafo(elementsDijkstra, rotaDijkstra)} />
                </div>
              </div>
            </div>
            {loadingGrafos && <div className="text-gray-500 mt-4">Carregando grafos...</div>}
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
