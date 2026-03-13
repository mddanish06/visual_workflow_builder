import { FiHash } from "react-icons/fi";
import BaseNode from "./BaseNode";
import CustomDropdown from "../customDropdown";
import { useState } from "react";

const MathNode = ({ id, data }) => {
  const [type, setType] = useState(data?.inputType || "Add");

  return (
    <BaseNode
      id={id}
      title="Math"
      icon={FiHash}
      inputs={[{ id: "a" }, { id: "b" }]}
      outputs={[{ id: "result" }]}
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
          Dropdown
        </span>
      </div>
      <CustomDropdown
        value={type}
        onChange={setType}
        options={["Add", "Subtract", "Multiply", "Divide"]}
      />
    </BaseNode>
  );
};

export default MathNode;
