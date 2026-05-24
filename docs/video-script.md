# Screen Recording Script

## 1. Start The Recording

Say:

Hi, my name is Ayush, and this is my final submission for the VectorShift frontend technical assessment.

In this video, I will walk through the final product, explain the main functionality and design, and then briefly show the code architecture for both the frontend and backend.

## 2. Open The Web App

Action:

Open the browser and go to:

`http://localhost:3000`

Say:

I am starting with the running web app. This is an AI workflow builder built with React, React Flow, Zustand, and a FastAPI backend.

The main interface has a toolbar at the top and a workflow canvas below it. The canvas starts empty intentionally, but I added this empty-state message so the user knows they can click or drag nodes into the workflow.

## 3. Show The Toolbar And Node Types

Action:

Point to or hover over the toolbar nodes.

Say:

At the top, I have several node types: Input, LLM, Output, Text, API, Database, Filter, Email, and Condition.

Each of these nodes uses the same reusable node architecture, but each one has its own configuration for title, description, fields, handles, default values, and color.

## 4. Add Nodes To The Canvas

Action:

Click Input, LLM, and Output from the toolbar. You can also drag them if you want to demonstrate drag-and-drop.

Say:

Now I will add a few nodes. Nodes can be added by dragging them onto the canvas, and I also added click-to-add support to make the product easier and clearer to use.

Here I am adding an Input node, an LLM node, and an Output node. These nodes can be moved around on the canvas and connected using their handles.

## 5. Show Node Fields And Handles

Action:

Click into or point at the fields inside a node.

Say:

Each node has fields that are generated from configuration. For example, the Input node has a name and type, the LLM node has model and temperature fields, and the Output node has output name and output type.

The handles on the left and right sides are used to connect nodes and build the pipeline flow.

## 6. Show The Text Node Dynamic Variables

Action:

Add a Text node. In the Text node textarea, type:

`Hello {{customer_name}}, your order {{order_id}} is ready.`

Say:

One important feature is the Text node. It supports dynamic variables using double curly braces.

For example, if I type `{{customer_name}}` and `{{order_id}}`, the app detects those variables and automatically creates input handles for them. This makes the Text node flexible because the handles are generated based on the text content instead of being hardcoded.

## 7. Connect Nodes

Action:

Connect at least one node handle to another handle.

Say:

Now I can connect nodes together using React Flow. The edges are smooth, animated, and directional, so the user can clearly understand the pipeline flow.

## 8. Submit The Pipeline

Action:

Click Submit Pipeline.

Say:

Now I will submit the pipeline.

When I click Submit Pipeline, the frontend sends the current nodes and edges to the backend endpoint at `/pipelines/parse`.

The backend returns three values: the number of nodes, the number of edges, and whether the graph is a DAG, which means a directed acyclic graph.

The result appears in this modal, showing the node count, edge count, and whether the workflow is valid as a DAG.

## 9. Open VS Code

Action:

Now open VS Code with the project folder:

`/Users/ayush/Desktop/frontend_technical_assessment`

Say:

Now I will open VS Code and briefly explain the code structure.

The project has a `frontend` folder for the React app and a `backend` folder for the FastAPI server.

## 10. Show App.js

Action:

Open:

`frontend/src/App.js`

Say:

This is the main app component. It renders three major pieces: the toolbar, the workflow canvas, and the submit button.

Keeping these pieces separate makes the app easier to understand and maintain.

## 11. Show store.js

Action:

Open:

`frontend/src/store.js`

Say:

State is managed using Zustand in `store.js`.

This store keeps track of the nodes, edges, node IDs, and update functions. React Flow events such as node movement, edge changes, and new connections update this centralized store.

This is where new nodes are added, edges are created, and node field values are updated.

## 12. Show ui.js

Action:

Open:

`frontend/src/ui.js`

Say:

This file renders the main React Flow canvas.

It maps node type names to actual React components, handles drag-and-drop behavior, and renders the background, controls, minimap, nodes, and edges.

This is also where the empty-state message is shown when there are no nodes yet.

## 13. Show toolbar.js And draggableNode.js

Action:

Open:

`frontend/src/toolbar.js`

Then open:

`frontend/src/draggableNode.js`

Say:

The toolbar renders all available node types from configuration.

In addition to drag-and-drop, I added click-to-add behavior here, so clicking a toolbar item creates a node at a clean default position on the canvas.

The `draggableNode.js` file defines the toolbar button and stores the node type in the drag event so React Flow knows what kind of node to create when it is dropped.

## 14. Show BaseNode.js

Action:

Open:

`frontend/src/components/BaseNode.js`

Say:

This is the most important part of the frontend architecture.

Instead of building every node separately, I created a reusable `BaseNode` component. It receives a config object and uses that config to render the node header, fields, and handles.

This keeps the architecture scalable. To add a new node, I mostly add a new config instead of duplicating a lot of component code.

This file also handles the dynamic Text node variables. If a node config enables `variableHandles`, the text is scanned and extra handles are created automatically.

## 15. Show nodeConfigs.js

Action:

Open:

`frontend/src/config/nodeConfigs.js`

Say:

This file defines all the node types.

Each node config includes its title, description, accent color, fields, default values, and handles.

For example, the Text node has a textarea field and `variableHandles: true`, while the LLM node has model and temperature fields plus multiple handles.

This config-driven approach is what makes the node system reusable and easy to extend.

## 16. Show nodeVariables.js

Action:

Open:

`frontend/src/utils/nodeVariables.js`

Say:

This utility extracts variables from the Text node.

It uses a regular expression to find values written like `{{variableName}}`, removes duplicates using a Set, and returns the variables as an array. Those variables are then converted into dynamic input handles.

## 17. Show submit.js

Action:

Open:

`frontend/src/submit.js`

Say:

This file handles submission.

It reads the current nodes and edges from the store, sends them to the FastAPI backend using `fetch`, and then displays the backend response in a modal.

If the request fails, it shows an error message instead.

## 18. Show Backend main.py

Action:

Open:

`backend/main.py`

Say:

This is the backend server.

It uses FastAPI and defines a `/pipelines/parse` endpoint. The endpoint receives the nodes and edges from the frontend.

The backend counts the number of nodes and edges, then checks whether the graph is acyclic using a topological sort approach.

It builds an adjacency list, calculates indegrees, starts with nodes that have no incoming edges, and visits nodes through a queue. If every node can be visited, then the graph is a DAG. Otherwise, it contains a cycle.

## 19. Mention Verification

Action:

Optionally open terminal or mention results.

Say:

I verified the frontend with a production build using `npm run build`, and I checked the backend syntax with `python3 -m py_compile backend/main.py`.

I also tested the app locally by adding nodes, editing a Text node with variables, submitting a pipeline, and confirming the backend returned the correct analysis.

## 20. Closing

Action:

Return to the browser and show the final app again.

Say:

So overall, this project is a complete workflow builder with a reusable node architecture, multiple node types, dynamic Text node handles, visual pipeline connections, backend DAG validation, and a polished user interface.

That is my final submission. Thank you.
