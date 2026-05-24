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

