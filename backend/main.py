from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Models ------------------
class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# ------------------ Routes ------------------
@app.get("/")
def read_root():
    return {"Ping": "Pong"}

def is_dag(nodes, edges):
    graph = {node.id: [] for node in nodes}
    indegree = {node.id: 0 for node in nodes}

    for edge in edges:
        graph[edge.source].append(edge.target)
        indegree[edge.target] += 1

    queue = [n for n in indegree if indegree[n] == 0]
    visited = 0

    while queue:
        current = queue.pop(0)
        visited += 1
        for neighbor in graph[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag(pipeline.nodes, pipeline.edges),
    }