# VectorShift Frontend Technical Assessment

This project implements the workflow-builder assessment with React Flow and a FastAPI backend.

## Features

- Reusable node abstraction for all node types.
- Input, LLM, Output, Text, API, Database, Filter, Email, and Condition nodes.
- Text node dynamically creates input handles for variables written as `{{variableName}}`.
- Drag-and-drop workflow canvas with connectable handles.
- Submit action sends the pipeline to the backend and displays node count, edge count, and DAG status.

## Run Locally

From the repository root:

```bash
source .venv/bin/activate
uvicorn backend.main:app --reload --port 8000
```

In a second terminal:

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000`.

The workflow canvas intentionally starts empty. Drag nodes from the toolbar into the canvas, connect their handles, then click **Submit Pipeline**.

## Verify

```bash
cd frontend
npm run build
```

```bash
python3 -m py_compile backend/main.py
```
