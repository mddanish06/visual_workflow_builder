import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const optionsDefault = [];

const CustomDropdown = ({
  value,
  options = optionsDefault,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Selected box */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 10px",
          borderRadius: 5,
          border: "0.5px solid #a4a2a2",
          background: "#ffffff",
          fontSize: 13,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <span>{value}</span>
        <FiChevronDown size={16} color="#6366f1" />
      </div>

      {/* Dropdown */}
      {open && (
        <ul
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            right: 0,
            margin: 0,
            padding: 4,
            listStyle: "none",
            background: "#ffffff",
            borderRadius: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            border: "1px solid #e5e7eb",
            zIndex: 50,
          }}
        >
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  fontSize: 13,
                  cursor: "pointer",
                  background: selected ? "#eef2ff" : "transparent",
                  color: "#111827",
                }}
                onMouseEnter={(e) => {
                  if (!selected)
                    e.currentTarget.style.background = "#e5e7eb";
                }}
                onMouseLeave={(e) => {
                  if (!selected)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {opt}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
