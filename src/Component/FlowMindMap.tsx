import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import { Box } from "./NewProjectTemplate";

//const initialEdges = [];

export default function FlowMindMap({ boxes }: { boxes: Box[] }) {
  const initialNodes = boxes.map((box, index) => {
    const row = Math.floor(index / 3); // Calculate the row index
    const col = index % 3; // Calculate the column index

    const position = {
      x: col * 200 + 100, // Adjust the x position based on the column index and desired spacing
      y: row * 100 + 100, // Adjust the y position based on the row index and desired spacing
    };

    return {
      id: box.name.toString(),
      position: position,
      data: { label: box.name },
    };
  });

  const initialEdges = boxes.flatMap((box) =>
    box.dependencies.map((dependency) => ({
      id: `e${box.name}-${dependency}`,
      source: box.name.toString(),
      target: dependency,
    }))
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  setNodes;

  return (
    <div style={{ width: "70vw", height: "70vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap zoomable pannable />
        <Background gap={16} color="#aaa" size={3} />
      </ReactFlow>
    </div>
  );
}

/*const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  { id: "3", position: { x: 300, y: 0 }, data: { label: "3" } },
  { id: "4", position: { x: 300, y: 100 }, data: { label: "4" } },
  { id: "5", position: { x: 600, y: 0 }, data: { label: "5" } },
  { id: "6", position: { x: 600, y: 100 }, data: { label: "6" } },
  { id: "7", position: { x: 0, y: 200 }, data: { label: "7" } },
  { id: "8", position: { x: 600, y: 200 }, data: { label: "8" } },
];*/

/*const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-2", source: "3", target: "8" },
  { id: "e1-2", source: "5", target: "8" },
  { id: "e1-2", source: "5", target: "2" },
  { id: "e1-2", source: "3", target: "4" },
  { id: "e1-2", source: "7", target: "1" },
];*/
