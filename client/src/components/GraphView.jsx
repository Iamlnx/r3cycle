import React, { useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

// Converte elementos do Cytoscape para nodes/edges do React Flow
function cytoToReactFlow(elements, spacing = 2.8) {
  const nodes = [];
  const edges = [];

  elements.forEach((el) => {
    if (el.data && el.data.id && !el.data.source && !el.data.target) {
      // Node
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
      // Edge
      edges.push({
        id: el.data.id || `${el.data.source}-${el.data.target}`,
        source: el.data.source,
        target: el.data.target,
        label: el.data.weight ? String(el.data.weight) : undefined,
        type: "default",
        style: {
          strokeWidth:
            el.classes?.includes("tsp") || el.classes?.includes("dijkstra")
              ? 8
              : 3,
          stroke:
            el.classes?.includes("tsp")
              ? "#FF9800"
              : el.classes?.includes("dijkstra")
              ? "#2196f3"
              : "#C4C9C5",
          cursor: "default",
          zIndex:
            el.classes?.includes("tsp") || el.classes?.includes("dijkstra")
              ? 9999
              : undefined,
        },
        markerEnd: {
          type: "arrowclosed",
          color:
            el.classes?.includes("tsp")
              ? "#FF9800"
              : el.classes?.includes("dijkstra")
              ? "#2196f3"
              : "#C4C9C5",
        },
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
  const { nodes, edges } = useMemo(
    () => cytoToReactFlow(elements),
    [elements]
  );

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        pannable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnDrag={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        selectionOnDrag={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls showZoom={false} showFitView={false} />
      </ReactFlow>
    </div>
  );
}
