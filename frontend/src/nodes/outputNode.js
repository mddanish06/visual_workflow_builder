import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import BaseNode from "./BaseNode";
import CustomDropdown from "../customDropdown";

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [type, setType] = useState(data?.outputType || "Text");

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={FiLogOut}
      inputs={[{ id: "value" }]}
      width={230}
    >
      {/* Output name */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          textAlign: "center",
          width: "92%",
          padding: "6px 8px",
          borderRadius: 6,
          border: "1px solid #e5e7eb",
          background: "#f8fafc",
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

      <CustomDropdown
        value={type}
        onChange={setType}
        options={["Text", "Image", "File"]}
      />
    </BaseNode>
  );
};
