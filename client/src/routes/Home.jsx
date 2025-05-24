import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import GraphView from '../components/GraphView';
import api from '../services/api';

function marcarArestasDaRota(elements, rota, classe) {
  if (!rota || rota.length < 2) return elements;
  const newElements = elements.map(el => ({ ...el }));
  for (let i = 0; i < rota.length - 1; i++) {
    const source = rota[i];
    const target = rota[i + 1];
    for (const el of newElements) {
      if (
        el.data &&
        el.data.source === source &&
        el.data.target === target
      ) {
        el.classes = classe;
      }
    }
  }
  return newElements;
}

function Home() {
  const [cidades, setCidades] = useState([]);
  const [idCidadeSelecionada, setIdCidadeSelecionada] = useState(null);
  const [rotaTsp, setRotaTsp] = useState([]);
  const [rotaDijkstra, setRotaDijkstra] = useState([]);
  const [elementsTsp, setElementsTsp] = useState([]);
  const [elementsDijkstra, setElementsDijkstra] = useState([]);
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

        const elementsTsp = marcarArestasDaRota(allElements, tsp, "tsp");
        const elementsDijkstra = marcarArestasDaRota(allElements, dijkstra, "dijkstra");

        setElementsTsp(elementsTsp);
        setElementsDijkstra(elementsDijkstra);
        setRotaTsp(tsp);
        setRotaDijkstra(dijkstra);
      } catch (e) {
        setElementsTsp([]);
        setElementsDijkstra([]);
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
              {/* Grafo TSP */}
              <div>
                <h3 className="font-semibold text-md mb-1 text-[#386641]">Rota de Coleta</h3>
                <div className="mb-2 text-gray-800 text-sm">
                  {rotaComoTexto(rotaTsp)}
                </div>
                <div className='w-full h-[60vh] md:h-[85vh] border rounded bg-white shadow'>
                  <GraphView elements={elementsTsp} />
                </div>
              </div>
              {/* Grafo Dijkstra */}
              <div>
                <h3 className="font-semibold text-md mb-1 text-blue-700">Rota de retorno à Central</h3>
                <div className="mb-2 text-gray-800 text-sm">
                  {rotaComoTexto(rotaDijkstra)}
                </div>
                <div className='w-full h-[60vh] md:h-[85vh] border rounded bg-white shadow'>
                  <GraphView elements={elementsDijkstra} />
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
