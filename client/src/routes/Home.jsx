import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import GraphView from '../components/GraphView';
import GraphViewCyto from '../components/GraphViewD3'
import api from '../services/api';

function Home() {
  const [cidades, setCidades] = useState([]);
  const [idCidadeSelecionada, setIdCidadeSelecionada] = useState(null);

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

  return (
    <main className="bg-[#E8EEF2] h-screen w-screen">
      <NavBar />
      <div className='mx-20 mt-5'>
        <h1 className='font-bold text-xl'>Rotas</h1>
        <p>Selecione a sua cidade:</p>
        <div className="flex flex-wrap gap-4 my-4">
          {cidades.map((cidade) => (
            <button
              key={cidade.id_cidade}
              className={`px-4 py-2 cursor-pointer rounded shadow ${idCidadeSelecionada === cidade.id_cidade ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'}`}
              onClick={() => setIdCidadeSelecionada(cidade.id_cidade)}
            >
              {cidade.nome}
            </button>
          ))}
        </div>
        {idCidadeSelecionada && (
          <div className="mt-8">
            <h2 className="font-semibold text-lg mb-2">Cidade de {cidades.find(c => c.id_cidade === idCidadeSelecionada)?.nome}</h2>
            <GraphViewCyto idCidade={idCidadeSelecionada} /> 
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
