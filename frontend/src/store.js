import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
  const nodes = get().nodes;

  const usedNumbers = nodes
    .filter((n) => n.id.startsWith(type + "-"))
    .map((n) => Number(n.id.replace(`${type}-`, "")))
    .filter((n) => !isNaN(n));

  let next = 1;
  while (usedNumbers.includes(next)) {
    next++;
  }

  return `${type}-${next}`;
},
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "deletable",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges,
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
  setEdges: (updater) => {
    set((state) => ({
      edges: typeof updater === "function" ? updater(state.edges) : updater,
    }));
  },
}));
