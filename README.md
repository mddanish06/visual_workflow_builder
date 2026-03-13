# VectorShift Frontend Technical Assessment

This project is a visual pipeline builder built with React and React Flow.
Users can create nodes, connect them into a workflow, and validate whether the
pipeline forms a Directed Acyclic Graph (DAG).

## Features
- Drag-and-drop node creation
- Dynamic input/output handles
- Text node with {{variable}} parsing
- DAG validation via backend API
- Clean modal-based pipeline summary

## Design Decisions
- A reusable BaseNode component was created to ensure consistent layout,
  styling, and delete behavior across all node types.
- TextNode dynamically generates input handles by parsing {{variables}}
  and updates node internals to keep connections accurate.
- Zustand is used to manage nodes and edges centrally for predictable state updates.

## Running the Project

Frontend:
1. Install dependencies
   npm install
2. Start the dev server
   npm start

Backend:
1. Install Python dependencies
    pip install -r requirements.txt
2. Start the FastAPI server
    uvicorn main:app --reload

- Ensure the pipeline parsing API is running at:
  http://localhost:8000/pipelines/parse
