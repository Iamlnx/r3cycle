
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [rotaPrim, setRotaPrim] = useState([]);
  const [custoPrim, setCustoPrim] = useState(0);
  const [caminhoDijkstra, setCaminhoDijkstra] = useState([]);
  const [custoDijkstra, setCustoDijkstra] = useState(0);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');

  const buscarDados = (cidade) => {
    setCidadeSelecionada(cidade);

    axios.post('https://r3cycle.onrender.com/rota', { cidade })
      .then(response => {
        setRotaPrim(response.data.prim.rota);
        setCustoPrim(response.data.prim.custo);
        setCaminhoDijkstra(response.data.dijkstra.menor_caminho);
        setCustoDijkstra(response.data.dijkstra.custo);
      })
      .catch(error => console.error('Erro ao buscar dados:', error));
  };

  return (
    <div>
      <h1>Selecionar Cidade</h1>
      <button onClick={() => buscarDados("cidade1")}>Cidade 1</button>
      <button onClick={() => buscarDados("cidade2")}>Cidade 2</button>
      <button onClick={() => buscarDados("cidade3")}>Cidade 3</button>

      {cidadeSelecionada && (
        <>
          <h2>Rota Prim (Ida) - {cidadeSelecionada}</h2>
          <p>Custo: {custoPrim}</p>
          <ul>
            {rotaPrim.map((ponto, index) => (
              <li key={index}>{ponto}</li>
            ))}
          </ul>

          <h2>Menor Caminho Dijkstra (Volta)</h2>
          <p>Custo: {custoDijkstra}</p>
          <ul>
            {caminhoDijkstra.map((ponto, index) => (
              <li key={index}>{ponto}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;

