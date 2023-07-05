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
import { Paper } from "@mui/material";

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

  setNodes; //does nothing but prevent error of not using setNodes

  return (
    <Paper variant="outlined" style={{ padding: "20px" }}>
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
    </Paper>
  );
}
