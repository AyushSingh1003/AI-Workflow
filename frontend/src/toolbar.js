// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeConfigs, toolbarNodes } from './config/nodeConfigs';
import { useStore } from './store';

export const PipelineToolbar = () => {
    const { nodes, getNodeID, addNode } = useStore((state) => ({
        nodes: state.nodes,
        getNodeID: state.getNodeID,
        addNode: state.addNode,
    }));

    const getInitNodeData = (nodeID, type) => {
        const config = nodeConfigs[type];
        const defaults =
            typeof config?.defaults === 'function' ? config.defaults(nodeID) : config?.defaults || {};

        const fieldDefaults = (config?.fields || []).reduce((values, field) => {
            values[field.name] = defaults[field.name] ?? field.defaultValue ?? '';
            return values;
        }, {});

        return { id: nodeID, nodeType: type, ...fieldDefaults };
    };

    const addNodeFromToolbar = (type) => {
        const nodeID = getNodeID(type);
        const column = nodes.length % 4;
        const row = Math.floor(nodes.length / 4);

        addNode({
            id: nodeID,
            type,
            position: {
                x: 120 + column * 300,
                y: 90 + row * 190,
            },
            data: getInitNodeData(nodeID, type),
        });
    };

    return (
        <div className="toolbar">
            <div>
                <p className="toolbar__eyebrow">VectorShift Assessment</p>
                <h1 className="toolbar__title">AI Workflow Builder</h1>
            </div>
            <div className="toolbar__nodes">
                {toolbarNodes.map((node) => (
                    <DraggableNode
                        key={node.type}
                        type={node.type}
                        label={node.label}
                        onClick={() => addNodeFromToolbar(node.type)}
                    />
                ))}
            </div>
        </div>
    );
};
