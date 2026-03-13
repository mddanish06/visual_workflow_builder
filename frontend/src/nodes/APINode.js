import BaseNode from "./BaseNode";
import { FiGlobe } from "react-icons/fi";

const APINode = ({id}) => {
  return (
    <BaseNode
    id={id}
      title="API Call"
      icon={FiGlobe}
      inputs={[{ id: "payload" }]}
      outputs={[{ id: "response" }]}
      width={260}
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
          URL
        </span>
      </div>
      <input
        type="text"
        placeholder="https://api.example.com"
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

export default APINode;
