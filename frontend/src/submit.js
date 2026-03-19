import { useState } from "react";
import { useStore } from "./store";
import { FiX } from "react-icons/fi";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      setResult({ empty: true });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://visual-workflow-builder-8n0i.onrender.com/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}
      >
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="submit-btn"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {/* Modal */}
      {result && (
        <div className="modal-backdrop" onClick={() => setResult(null)}>
          <div className="modal-card">
            {/* Header */}
            <div className="modal-header">
              <h3>Pipeline Summary</h3>
              <button
                className="modal-close-icon"
                onClick={() => setResult(null)}
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Empty pipeline */}
            {result.empty && (
              <p style={{ color: "#dc2626" }}>
                Pipeline is empty. Please add at least one node.
              </p>
            )}

            {/* API error */}
            {result.error && (
              <p style={{ color: "#dc2626" }}>Failed to submit pipeline</p>
            )}

            {/* Success */}
            {!result.empty && !result.error && (
              <div className="summary-grid">
                <SummaryItem label="Nodes" value={result.num_nodes} />
                <SummaryItem label="Edges" value={result.num_edges} />
                <SummaryItem
                  label="DAG"
                  value={result.is_dag ? "Yes" : "No"}
                  status={result.is_dag}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const SummaryItem = ({ label, value, status }) => (
  <div
    className="summary-item"
    style={{
      background:
        status === undefined ? "#f8fafc" : status ? "#ecfdf5" : "#fef2f2",
      color: status === undefined ? "#111827" : status ? "#065f46" : "#991b1b",
    }}
  >
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);
