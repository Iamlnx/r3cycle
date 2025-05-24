import React, { useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

function cytoToReactFlow(elements, spacing = 2.8) {
  const nodes = [];
  const edges = [];
  elements.forEach((el) => {
    console.log(el);
    if (el.data && el.data.id && !el.data.source && !el.data.target) {
      nodes.push({
        id: el.data.id,
        data: { label: el.data.label },
        position: el.position
          ? {
              x: el.position.x * spacing,
              y: el.position.y * spacing,
            }
          : { x: 0, y: 0 },
        style: {
          background: "#386641",
          color: "#fff",
          width: 120,
          height: 70,
          borderRadius: 10,
          fontSize: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "default",
        },
        draggable: false,
      });
    } else if (el.data && el.data.source && el.data.target) {
      // Defina a cor da linha
      let stroke = "#C4C9C5";
      let strokeWidth = 3;
      if (el.classes?.includes("tsp") || el.classes?.includes("dijkstra")) {
        stroke = "#386641";
        strokeWidth = 8;
      }
      edges.push({
        id: el.data.id || `${el.data.source}-${el.data.target}`,
        source: el.data.source,
        target: el.data.target,
        label: el.data.weight ? String(el.data.weight) : undefined,
        type: "straight", // LINHAS RETAS!
        style: {
          strokeWidth,
          stroke,
          cursor: "default",
          zIndex: strokeWidth === 8 ? 9999 : undefined,
        },
        // Removido markerEnd para não mostrar seta
        labelStyle: {
          fill: "#222",
          fontWeight: 600,
          fontSize: 16,
          background: "#fff",
          padding: "2px 6px",
          borderRadius: 4,
          marginTop: -14,
        },
      });
    }
  });
  return { nodes, edges };
}

export default function GraphView({ elements }) {
  const { nodes, edges } = useMemo(() => cytoToReactFlow(elements), [elements]);

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        pannable={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={true}
        panOnDrag={true}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        selectionOnDrag={false}
        proOptions={{ hideAttribution: true }}
        minZoom={0.2}
        maxZoom={2}
      >
        <Background />
        <Controls showZoom={true} showFitView={true} />
      </ReactFlow>
    </div>
  );
}
