import { FiCpu } from "react-icons/fi";
import BaseNode from "./BaseNode";

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={FiCpu}
      inputs={[
        { id: "system" },
        { id: "prompt" },
      ]}
      outputs={[{ id: "response" }]}
      width={230}
    >
      <div
        style={{
          fontSize: 13,
          color: "#475569",
          background: "#f8fafc",
          padding: "8px",
          borderRadius: 6,
          border: "1px solid #e5e7eb",
          textAlign: "center",
        }}
      >
        This is a LLM.
      </div>
    </BaseNode>
  );
};
