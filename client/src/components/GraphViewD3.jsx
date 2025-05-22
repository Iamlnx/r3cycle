import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import api from '../services/api';

function convertToCyto(graphData) {
  const elements = [];
  const added = new Set();

  Object.keys(graphData).forEach(node => {
    elements.push({ data: { id: node, label: node } });
  });
  Object.entries(graphData).forEach(([source, targets]) => {
    Object.entries(targets).forEach(([target, weight]) => {
      const key = [source, target].sort().join('-');
      if (!added.has(key)) {
        elements.push({
          data: { source, target, label: String(weight) }
        });
        added.add(key);
      }
    });
  });
  return elements;
}

export default function GraphViewCyto({ idCidade }) {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGraph() {
      setLoading(true);
      const response = await api.get(`/grafo/${idCidade}`);
      setElements(convertToCyto(response.data));
      setLoading(false);
    }
    if (idCidade) fetchGraph();
  }, [idCidade]);

  if (loading) return <div>Carregando grafo...</div>;
  if (elements.length === 0) return <div>Grafo vazio.</div>;

  return (
    <div style={{ width: '100vw', height: '80vh' }}>
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        layout={{ name: 'cose' }}
      />
    </div>
  );
}
