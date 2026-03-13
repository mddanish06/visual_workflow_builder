import { getBezierPath, EdgeLabelRenderer } from "reactflow";
import { FiX } from "react-icons/fi";
import { useStore } from "./store";

const DeletableEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}) => {
  const setEdges = useStore((state) => state.setEdges);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const deleteEdge = () => {
    setEdges((edges) => edges.filter((e) => e.id !== id));
  };

  return (
    <>
      <path
        d={edgePath}
        stroke="#6366f1"
        strokeWidth={2}
        fill="none"
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <button
            onClick={deleteEdge}
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid #6366f1",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            <FiX size={12} color="#6366f1" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default DeletableEdge;