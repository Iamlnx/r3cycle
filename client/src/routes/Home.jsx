import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import GraphView from '../components/GraphView';
import api from '../services/api';

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
        // Separar elements para cada grafo:
        const allElements = response.data.elements;
 
        // TSP: só edges com classe tsp
        const elementsTsp = allElements.map(el => {
          if (el.classes === "tsp") return { ...el, classes: "tsp" };
          if (el.position) return el;
          return { ...el, classes: "" };
        });

        // Dijkstra: só edges com classe dijkstra
        const elementsDijkstra = allElements.map(el => {
          if (el.classes === "dijkstra") return { ...el, classes: "dijkstra" };
          if (el.position) return el;
          return { ...el, classes: "" };
        });

        setElementsTsp(elementsTsp);
        setElementsDijkstra(elementsDijkstra);
        setRotaTsp(response.data.tsp);
        setRotaDijkstra(response.data.dijkstra);
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
    return rota.join(" \u2192 "); // seta para direita
  }

  return (
    <main className=" h-full w-full">
      <NavBar />
      <div className='mx-20 mt-5'>
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
            <div className="flex flex-col">
              {/* Grafo TSP */}
              <div>
                <h3 className="font-semibold text-md mb-1 text-orange-700">Rota TSP</h3>
                <div className="mb-2 text-gray-800 text-sm">
                  {rotaComoTexto(rotaTsp)}
                </div>
                <div className='w-full h-[120vh] border rounded bg-white shadow'>
                  <GraphView elements={elementsTsp} />
                </div>
              </div>
              {/* Grafo Dijkstra */}
              <div>
                <h3 className="font-semibold text-md mb-1 text-blue-700">Rota Dijkstra</h3>
                <div className="mb-2 text-gray-800 text-sm">
                  {rotaComoTexto(rotaDijkstra)}
                </div>
                <div className='w-full h-[120vh] border rounded bg-white shadow'>
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

