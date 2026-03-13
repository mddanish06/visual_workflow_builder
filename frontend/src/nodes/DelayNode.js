import BaseNode from "./BaseNode";
import { FiClock } from "react-icons/fi";

const DelayNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Delay"
      icon={FiClock}
      inputs={[{ id: "input" }]}
      outputs={[{ id: "output" }]}
      width={230}
    >
      {/* Type row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: 12, color: "#475569" }}>Type</span>
        <span
          style={{
            fontSize: 11,
            padding: "2px 6px",
            borderRadius: 4,
            background: "#eef2ff",
            color: "#4338ca",
          }}
        >
          Time
        </span>
      </div>
      <input
        type="number"
        placeholder="Delay (ms)"
        style={{
          width: "92%",
          padding: "6px 8px",
          borderRadius: 6,
          border: "1px solid #e5e7eb",
          fontSize: 13,
          background: "#f8fafc",
        }}
      />
    </BaseNode>
  );
};

export default DelayNode;
