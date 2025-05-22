import React, { useEffect, useState } from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import api from '../services/api'; // seu arquivo de configuração do axios

// Função utilitária para converter o grafo do backend para nodes e edges do ReactFlow
function graphToFlow(cidade) {
  const nodes = [];
  const edges = [];
  const addedEdges = new Set();

  Object.keys(cidade).forEach((node, idx) => {
    nodes.push({
      id: node,
      data: { label: node },
      position: { x: 100 + idx * 150, y: 100 + (idx % 5) * 100 }, // simples, pode ajustar
    });
    Object.entries(cidade[node]).forEach(([target, weight]) => {
      const edgeKey = [node, target].sort().join('-');
      if (!addedEdges.has(edgeKey)) {
        edges.push({
          id: `${node}-${target}`,
          source: node,
          target: target,
          label: String(weight),
          data: { weight },
          animated: true,
        });
        addedEdges.add(edgeKey);
      }
    });
  });

  return { nodes, edges };
}

export default function GraphView({ idCidade }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchGraph() {
      setLoading(true);
      setErro('');
      try {
        const response = await api.get(`/grafo/${idCidade}`);
        const { nodes, edges } = graphToFlow(response.data);
        setNodes(nodes);
        setEdges(edges);
      } catch (e) {
        setErro('Não foi possível carregar o grafo.');
      } finally {
        setLoading(false);
      }
    }
    if (idCidade) fetchGraph();
  }, [idCidade]);

  if (loading) return <div>Carregando grafo...</div>;
  if (erro) return <div>{erro}</div>;
  if (nodes.length === 0) return <div>Nenhum nó encontrado.</div>;

  return (
    <div style={{ width: '100vw', height: '80vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      />
    </div>
  );
}
