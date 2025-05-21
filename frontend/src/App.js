import React, { useState } from 'react';
import axios from 'axios';
import Mapa from './Mapa';

function App() {
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [resposta, setResposta] = useState(null);

  // Mapeia nomes de cidades para os identificadores do backend
  const cidadesMapeadas = {
    'Mogi das Cruzes': 'cidade1',
    'São Paulo': 'cidade2',
    'Osasco': 'cidade3'
  };

  const testarBackend = async () => {
    if (!cidadeSelecionada) {
      alert("Por favor, selecione uma cidade.");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/rota', {
        cidade: cidadesMapeadas[cidadeSelecionada]
      });
      setResposta(response.data);
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);
      setResposta({ erro: 'Erro ao conectar com o backend: ' + error.message });
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Visualização das Rotas</h1>

      {/* Menu de seleção de cidade */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="cidade">Selecione a cidade:</label>
        <select
          id="cidade"
          value={cidadeSelecionada}
          onChange={(e) => setCidadeSelecionada(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="">-- Escolha uma cidade --</option>
          {Object.keys(cidadesMapeadas).map((nomeCidade) => (
            <option key={nomeCidade} value={nomeCidade}>
              {nomeCidade}
            </option>
          ))}
        </select>
      </div>

      {/* Botão para buscar rota */}
      <button
        onClick={testarBackend} 
        style={{ padding: '10px', fontSize: '16px', marginBottom: '20px' }}
      >
        Buscar rota de coleta
      </button>

      {/* Exibe mapa se houver resposta */}
      {resposta && !resposta.erro && (
        <Mapa
          rotaPrim={resposta.prim.rota}
          rotaDijkstra={resposta.dijkstra.menor_caminho}
          nomeCidade={cidadeSelecionada}
        />
      )}

      {/* Exibe a mensagem de erro, caso ocorra um */}
      {resposta?.erro && (
        <p style={{ color: 'red' }}>{resposta.erro}</p>
      )}
    </div>
  );
}

export default App;
