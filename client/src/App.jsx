import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [rota, setRota] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => setRota(response.data.rota_otimizada))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  return (
    <div>
      <h1>Rota Otimizada</h1>
      <ul>
        {rota.map((ponto, index) => (
          <li key={index}>{ponto}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

