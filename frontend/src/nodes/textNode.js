import { useEffect, useRef, useState } from "react";
import { FiType } from "react-icons/fi";
import BaseNode from "./BaseNode";
import { useUpdateNodeInternals } from "reactflow";

const VARIABLE_REGEX = /{{\s*([a-zA-Z_$][\w$]*)\s*}}/g;

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
    updateNodeInternals(id);
  }, [variables.length, id, updateNodeInternals]);

  useEffect(() => {
    const matches = [...text.matchAll(VARIABLE_REGEX)];
    setVariables([...new Set(matches.map((m) => m[1]))]);
    updateNodeInternals(id);
  }, [text, id, updateNodeInternals]);

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={FiType}
      inputs={variables.map((v) => ({ id: v }))}
      outputs={[{ id: "output" }]}
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
          Text
        </span>
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text with {{variables}}"
        style={{
          width: "93%",
          resize: "vertical",
          overflow: "hidden",
          padding: "8px",
          fontSize: 13,
          borderRadius: 6,
          border: "1px solid #e5e7eb",
          background: "#f8fafc",
        }}
      />
    </BaseNode>
  );
};
