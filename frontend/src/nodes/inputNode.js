import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import BaseNode from "./BaseNode";
import CustomDropdown from "../customDropdown";

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [type, setType] = useState(data?.inputType || "Text");

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={FiLogIn}
      outputs={[{ id: "value" }]}
      width={230}
    >
      {/* Input name */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          textAlign: "center",
          width: "92%",
          padding: "6px 8px",
          borderRadius: 6,
          border: "1px solid #e5e7eb",
          background: "#eef2ff",
          color: "#4338ca",
          fontSize: 13,
          marginBottom: 12,
        }}
      />

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

      {/* Type dropdown */}
      <CustomDropdown
        value={type}
        onChange={setType}
        options={["Text", "Boolean", "Integer", "Decimal", "File"]}
      />
    </BaseNode>
  );
};
