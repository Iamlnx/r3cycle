import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

export default function GraphView({ elements }) {
  const SPACING_FACTOR = 2.8;

  // Ajusta positions (se necessário)
  const adjustedElements = elements.map(el =>
    el.position
      ? { ...el, position: { x: el.position.x * SPACING_FACTOR, y: el.position.y * SPACING_FACTOR } }
      : el
  );

  return (
    <div className="w-full h-full relative">
      <CytoscapeComponent
        elements={adjustedElements}
        style={{ width: '100%', height: '100%' }}
        layout={{
          name: 'preset',
          padding: 20,
        }}
        minZoom={1}
        maxZoom={1}
        userPanningEnabled={false}
        userZoomingEnabled={false}
        boxSelectionEnabled={false}
        autoungrabify={true}
        autounselectify={true}
        cy={cy => {
          cy.nodes().forEach(n => n.ungrabify());
        }}
        stylesheet={[
          {
            selector: 'node',
            style: {
              'label': 'data(label)',
              'background-color': '#386641',
              'color': '#fff',
              'font-size': 12,
              'text-valign': 'center',
              'text-halign': 'center',
              'width': 120,
              'height': 70,
              'cursor': 'default'
            }
          },
          {
            selector: 'edge',
            style: {
              'label': 'data(weight)',
              'width': 3,
              'line-color': '#C4C9C5',
              'target-arrow-color': '#C4C9C5',
              'target-arrow-shape': 'triangle', // <-- seta na aresta
              'curve-style': 'bezier',
              'font-size': 16,
              'text-background-opacity': 1,
              'text-background-color': '#fff',
              'text-background-padding': 2,
              'text-margin-y': -14,
              'arrow-scale': 2,
              'cursor': 'default'
            }
          },
          {
            selector: 'edge.tsp',
            style: {
              'line-color': '#FF9800',
              'target-arrow-color': '#FF9800',
              'width': 8,
              'z-index': 9999
            }
          },
          {
            selector: 'edge.dijkstra',
            style: {
              'line-color': '#2196f3',
              'target-arrow-color': '#2196f3',
              'width': 8,
              'z-index': 9999
            }
          }
        ]}
        className="cyto-custom"
      />
    </div>
  );
}
