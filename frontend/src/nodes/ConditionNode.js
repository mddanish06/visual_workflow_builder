import { useState } from "react";
import BaseNode from "./BaseNode";
import { FiGitBranch } from "react-icons/fi";
import CustomDropdown from "../customDropdown";

const ConditionNode = ({ id, data }) => {
  const [type, setType] = useState(data?.inputType || "==");
  return (
    <BaseNode
      id={id}
      title="Condition"
      icon={FiGitBranch}
      inputs={[{ id: "value" }]}
      outputs={[{ id: "true" }, { id: "false" }]}
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
        options={["==", "!=", ">", "<"]}
      />
    </BaseNode>
  );
};

export default ConditionNode;
