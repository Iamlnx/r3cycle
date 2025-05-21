import React, { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

const Mapa = ({ rotaPrim, rotaDijkstra, nomeCidade }) => {
  const cyRef = useRef(null);

  useEffect(() => {
    if (
      Array.isArray(rotaPrim) && rotaPrim.length > 0 &&
      Array.isArray(rotaDijkstra) && rotaDijkstra.length > 0 &&
      cyRef.current
    ) {
      cyRef.current.fit();
    }
  }, [rotaPrim, rotaDijkstra]);

  // Verificação robusta antes de renderizar
  if (
    !Array.isArray(rotaPrim) || rotaPrim.length === 0 ||
    !Array.isArray(rotaDijkstra) || rotaDijkstra.length === 0
  ) {
    return <p>Carregando dados da rota...</p>;
  }

  const pontos = [...new Set([...rotaPrim, ...rotaDijkstra])];
  const elementos = [];

  pontos.forEach((ponto) => {
    elementos.push({
      data: { id: ponto, label: ponto },
      classes: ponto === rotaPrim[0] ? 'start-node' : '',
    });
  });

  for (let i = 0; i < rotaPrim.length - 1; i++) {
    elementos.push({
      data: {
        source: rotaPrim[i],
        target: rotaPrim[i + 1],
        label: 'Prim',
      },
      classes: 'prim',
    });
  }

  for (let i = 0; i < rotaDijkstra.length - 1; i++) {
    elementos.push({
      data: {
        source: rotaDijkstra[i],
        target: rotaDijkstra[i + 1],
        label: 'Dijkstra',
      },
      classes: 'dijkstra',
    });
  }

  return (
    <div>
      {/* Título com o nome da cidade */}
      <h2 style={{ marginBottom: '10px' }}>
        Rota da cidade: {nomeCidade}
      </h2>

      {/* Mapa de rotas */}
      <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(elementos)}
        cy={(cy) => {
          cyRef.current = cy;
        }}
        style={{ width: '800px', height: '600px', border: '1px solid #ccc', marginBottom: '20px' }}
        layout={{ name: 'cose' }}
        stylesheet={[
          {
            selector: 'node',
            style: {
              label: 'data(label)',
              'background-color': '#0074D9',
              color: '#fff',
              'text-valign': 'center',
              'text-halign': 'center',
              'font-size': '12px',
              'text-outline-width': 2,
              'text-outline-color': '#0074D9',
            },
          },
          {
            selector: '.prim',
            style: {
              'line-color': '#2ECC40',
              width: 3,
            },
          },
          {
            selector: '.dijkstra',
            style: {
              'line-color': '#FF4136',
              width: 3,
              'line-style': 'dashed',
            },
          },
          /* Ponto inicial do grafo*/
          {
            selector: '.start-node',
            style: {
              'background-color': '#FFD700',
              width: 50,
              height: 50,
              'text-outline-color': 'black',
              'font-weight': 'bold',
              'border-width': 2,
              'border-color': '#333',
            },
          },
        ]}
      />

      {/* Legenda da Aplicação */}
      <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: '#2ECC40' }}></div>
          <span>Rota de ida (Prim)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div
            style={{
              width: '20px',
              height: '0px',
              borderBottom: '3px dashed #FF4136'
            }}
          ></div>
          <span>Rota de volta (Dijkstra)</span>
        </div>
      </div>
    </div>
  );
};

export default Mapa;
