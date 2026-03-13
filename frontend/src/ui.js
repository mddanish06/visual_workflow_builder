import { useState, useRef, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  getBezierPath,
} from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import MathNode from "./nodes/MathNode";
import DelayNode from "./nodes/DelayNode";
import APINode from "./nodes/APINode";
import ConditionNode from "./nodes/ConditionNode";
import LoggerNode from "./nodes/LoggerNode";

import "reactflow/dist/style.css";
import DeletableEdge from "./DeletableEdge";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  delay: DelayNode,
  api: APINode,
  condition: ConditionNode,
  logger: LoggerNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const BezierConnectionLine = ({
  fromX,
  fromY,
  toX,
  toY,
  fromPosition,
  toPosition,
}) => {
  const [path] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
    sourcePosition: fromPosition,
    targetPosition: toPosition,
  });

  return (
    <path
      d={path}
      fill="none"
      stroke="#6366f1"
      strokeWidth={2}
      strokeDasharray="4 6"
      strokeLinecap="round"
    />
  );
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow"),
        );
        const type = appData?.nodeType;

        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const edgeTypes = {
    deletable: DeletableEdge,
  };

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: "100wv", height: "70vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineComponent={BezierConnectionLine}
        >
          <Background color="#aaa" gap={gridSize} />
          <div className="rf-controls-wrapper">
            <Controls />
          </div>

          <div className="rf-minimap-wrapper">
            <MiniMap
              nodeColor="#c7d2fe"
              pannable
              zoomable
            />
          </div>
        </ReactFlow>
      </div>
    </>
  );
};
