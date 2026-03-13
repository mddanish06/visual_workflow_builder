import { Handle, Position, useReactFlow } from "reactflow";
import { useStore } from "../store";
import { FiX } from "react-icons/fi";

const headerStyle = {
  background: "#eef2ff",
  borderRadius: 5,
  border: "1px solid #eef2ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 10px",
  borderBottom: "1px solid #f1f5f9",
};

const titleGroupStyle = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontWeight: 600,
};

const deleteBtnStyle = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: "#94a3b8",
  padding: 2,
};

const BaseNode = ({
  id,
  title,
  icon: Icon,
  inputs = [],
  outputs = [],
  children,
  width = 240,
}) => {
  const { setNodes, setEdges } = useReactFlow();
  const edges = useStore((state) => state.edges);

  const isHandleConnected = (nodeId, handleId) =>
    edges.some(
      (e) =>
        (e.source === nodeId && e.sourceHandle === handleId) ||
        (e.target === nodeId && e.targetHandle === handleId),
    );

  const deleteNode = () => {
    setNodes((nds) => nds.filter((n) => n.id !== id));

    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
  };

  return (
    <div
      style={{
        padding: "5px",
        width,
        background: "#ffffff",
        borderRadius: 5,
        border: "1px solid #eef2ff",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
        fontSize: 13,
        color: "#111827",
      }}
    >
      {/* HEADER */}
      <div style={headerStyle}>
        <div style={titleGroupStyle}>
          {Icon && <Icon size={16} />}
          <span>{title}</span>
        </div>

        <button
          onClick={deleteNode}
          className="node-delete-btn"
          style={deleteBtnStyle}
        >
          <FiX size={14} />
        </button>
      </div>
      

      {inputs.map((input, index) => {
        const connected = isHandleConnected(id, input.id);
        const total = inputs.length;
        const topPercent = ((index + 1) / (total + 1)) * 100;

        return (
          <Handle
            key={input.id}
            type="target"
            position={Position.Left}
            id={input.id}
            style={{
              top: `${topPercent}%`,
              transform: "translateY(-50%)",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: connected ? "#6366f1" : "#ffffff",
              border: "1.5px solid #6366f1",
            }}
          />
        );
      })}

      <div style={{ padding: "10px 12px" }}>{children}</div>

      {outputs.map((output, index) => {
        const connected = isHandleConnected(id, output.id);
        const total = outputs.length;
  const topPercent = ((index + 1) / (total + 1)) * 100;

        return (
          <Handle
            key={output.id}
            type="source"
            position={Position.Right}
            id={output.id}
            style={{
              top: `${topPercent}%`,
              transform: "translateY(-50%)",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: connected ? "#6366f1" : "#ffffff",
              border: "1.5px solid #6366f1",
            }}
          />
        );
      })}
    </div>
  );
};

export default BaseNode;
