// draggableNode.js
import { useState } from "react";
import {
  FiLogIn,
  FiCpu,
  FiLogOut,
  FiType,
  FiClock,
  FiGlobe,
  FiGitBranch,
  FiFileText,
  FiDatabase,
  FiFolder,
  FiSearch,
  FiFile,
  FiSave,
  FiHash,
} from "react-icons/fi";

const iconMap = {
  customInput: FiLogIn,
  llm: FiCpu,
  customOutput: FiLogOut,
  text: FiType,
  math: FiHash,
  delay: FiClock,
  api: FiGlobe,
  condition: FiGitBranch,
  logger: FiFileText,
  knowledge: FiDatabase,
  kbactions: FiFolder,
  semantic: FiSearch,
  file: FiFile,
  filesave: FiSave,
};

export const DraggableNode = ({ type, label }) => {
  const [active, setActive] = useState(false);
  const Icon = iconMap[type];

  return (
    <div
      className={type}
      onDragStart={(event) => {
        event.dataTransfer.setData(
          "application/reactflow",
          JSON.stringify({ nodeType: type }),
        );
        event.dataTransfer.effectAllowed = "move";
        setActive(true);
      }}
      onDragEnd={() => setActive(false)}
      style={{
        width: 80,
        height: 80,
        background: active ? "#eef2ff" : "#ffffff",
        borderRadius: 12,
        border: active ? "1.5px solid #6366f1" : "1px solid #e5e7eb",
        boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        cursor: "grab",
        userSelect: "none",
        transition: "all 0.15s ease",
      }}
      draggable
    >
      <div className="toolbar-card">
        {Icon && <Icon className="toolbar-icon" size={22} />}
        <div className="toolbar-label">{label}</div>
      </div>
    </div>
  );
};
