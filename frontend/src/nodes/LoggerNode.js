import BaseNode from "./BaseNode";
import { FiFileText } from "react-icons/fi";

const LoggerNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Logger"
      icon={FiFileText}
      inputs={[{ id: "input" }]}
      width={220}
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
        Logs value
      </div>
    </BaseNode>
  );
};

export default LoggerNode;
