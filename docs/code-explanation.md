# Code And Project Explanation

## What The Assignment Does

The frontend is a visual workflow builder. Users add nodes, configure fields inside each node, connect handles to make a pipeline, then submit the pipeline.

The backend receives the frontend's `nodes` and `edges`, counts them, and checks whether the workflow is a DAG, meaning a directed acyclic graph with no cycles.

## What We Used

Frontend:

- React
- React Flow
- Zustand
- CSS
- Create React App

Backend:

- FastAPI
- Pydantic
- CORSMiddleware
- Python `defaultdict`
- Python `deque`

## What Was Added

Reusable node system:

- `frontend/src/components/BaseNode.js`
- `frontend/src/components/NodeField.js`
- `frontend/src/components/NodeHandles.js`
- `frontend/src/components/NodeHeader.js`

Config-driven node definitions:

- `frontend/src/config/nodeConfigs.js`

Extra node types:

- API
- Database
- Filter
- Email
- Condition

Dynamic Text node variable parsing:

- `frontend/src/utils/nodeVariables.js`

Backend parsing:

- `backend/main.py`

Usability improvements:

- Empty canvas message
- Click-to-add nodes
- Drag-and-drop nodes
- Submit result modal
- Polished styling
- Assignment-specific README

## What Was Deleted Or Replaced

The default Create React App README was replaced with an assignment-specific README:

- `frontend/README.md`

The broken nested `frontend/.git` folder was moved out of the project and backed up at:

- `/private/tmp/frontend-broken-git-backup`

Nothing important from the assignment PDF was deleted.

## Backend Explanation

File: `backend/main.py`

Lines 1-2 import data structures and typing. `defaultdict` stores graph edges, `deque` is used for the queue, and `Any` allows flexible node and edge dictionaries.

Lines 4-6 import FastAPI, CORS support, and Pydantic models.

Lines 9-11 define the request body. The backend expects `nodes` and `edges`, both defaulting to empty lists.

Line 14 creates the FastAPI app.

Lines 16-22 allow the React frontend on `localhost:3000` to call the backend on `localhost:8000`.

Lines 25-27 define a simple health check route returning `{"Ping": "Pong"}`.

Lines 30-57 check if the pipeline is a DAG. It collects node IDs, builds an adjacency list, counts incoming edges, starts with nodes that have zero incoming edges, and performs topological traversal. If it visits all nodes, there is no cycle.

Lines 60-66 define `/pipelines/parse`. It returns `num_nodes`, `num_edges`, and `is_dag`.

## Frontend Main Flow

File: `frontend/src/index.js`

Lines 1-4 import React, ReactDOM, global CSS, and the main App.

Lines 6-11 mount the React app into `public/index.html`.

File: `frontend/src/App.js`

Lines 1-3 import the three main UI pieces: toolbar, workflow canvas, and submit button.

Lines 5-13 render the full app layout.

Line 15 exports App.

## State Management

File: `frontend/src/store.js`

Lines 3-9 import Zustand and React Flow helpers.

Lines 11-14 create global state: `nodes`, `edges`, and `nodeIDs`.

Lines 15-23 generate unique node IDs like `llm-1`.

Lines 24-28 add a node to the canvas.

Lines 29-33 update nodes when dragged, selected, or changed.

Lines 34-38 update edges.

Lines 39-43 create a new animated edge when handles connect.

Lines 44-58 update a field inside a specific node.

## Canvas

File: `frontend/src/ui.js`

Lines 5-20 import React, React Flow, store, configs, node components, and React Flow CSS.

Lines 22-34 define grid size and map node type names to React components.

Lines 36-44 choose the store values this component needs.

Lines 46-57 load nodes, edges, and handlers from Zustand.

Lines 59-70 create default data for a newly added node.

Lines 72-103 handle drag-and-drop onto the canvas.

Lines 105-108 allow drag-over behavior.

Lines 110-137 render the canvas. Lines 112-117 show the empty-state helper text when no nodes exist. Lines 118-136 render React Flow, background, controls, and minimap.

## Toolbar

File: `frontend/src/toolbar.js`

Lines 3-5 import the draggable node button, configs, and store.

Lines 7-12 read current nodes and add-node helpers.

Lines 14-25 create initial node data from config.

Lines 27-41 add a node by clicking toolbar buttons.

Lines 43-60 render the toolbar title and node buttons.

## Draggable Node Button

File: `frontend/src/draggableNode.js`

Lines 3-9 define the toolbar node button and set up drag data for React Flow.

Lines 11-22 render a button that can be clicked or dragged.

## Reusable Node Architecture

File: `frontend/src/components/BaseNode.js`

Lines 1-6 import React helpers, store, variable parser, and child components.

Lines 8-11 get the update function from Zustand.

Lines 13-22 compute field values using node data and config defaults.

Lines 24-35 create dynamic input handles for Text node variables like `{{name}}`.

Lines 37-40 combine dynamic handles with normal config handles.

Lines 42-44 update state when a field changes.

Lines 46-65 render node shell, handles, header, and fields.

File: `frontend/src/components/NodeField.js`

Lines 1-4 import React hooks and create a textarea ref.

Lines 5-10 calculate textarea width for auto-resizing text fields.

Lines 12-21 auto-adjust textarea height when the value changes.

Lines 23-28 define shared props for inputs, selects, and textareas.

Lines 30-53 render a label and choose the correct form control based on the field type.

File: `frontend/src/components/NodeHandles.js`

Lines 1-8 import React Flow handles and map string positions to React Flow positions.

Lines 10-17 calculate where handles should sit on the node.

Lines 19-27 group handles by position.

Lines 28-48 render every handle for the node.

File: `frontend/src/components/NodeHeader.js`

Lines 1-9 render the node header, first-letter icon, title, and description.

## Dynamic Text Variables

File: `frontend/src/utils/nodeVariables.js`

Line 1 defines the regex that detects variables like `{{input}}`.

Lines 3-12 extract unique variable names from text and return them as an array.

## Node Configs

File: `frontend/src/config/nodeConfigs.js`

Lines 1-171 define all node types. Each node config contains title, description, accent color, fields, defaults, and handles.

Lines 2-20 define the Input node.

Lines 21-46 define the LLM node.

Lines 47-65 define the Output node.

Lines 66-82 define the Text node, including `variableHandles: true`.

Lines 83-106 define the API node.

Lines 107-125 define the Database node.

Lines 126-144 define the Filter node.

Lines 145-157 define the Email node.

Lines 158-170 define the Condition node.

Lines 173-183 define which nodes appear in the toolbar.

## Submit Flow

File: `frontend/src/submit.js`

Lines 1-2 import state tools.

Lines 4-11 read nodes and edges and create local modal state.

Lines 13-37 submit pipeline data to the backend.

Lines 39-42 close the modal.

Lines 44-96 render the submit button and result modal.

## Final Summary

The assignment is a complete frontend workflow builder plus backend analyzer. The canvas starts empty intentionally, but now it clearly tells the user to click or drag nodes. The app supports reusable node architecture, multiple node types, dynamic Text node handles, visual pipeline connections, and backend DAG validation.
