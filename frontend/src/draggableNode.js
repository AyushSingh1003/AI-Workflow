// draggableNode.js

export const DraggableNode = ({ type, label, onClick }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.currentTarget.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <button
        type="button"
        className="draggable-node"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.currentTarget.style.cursor = 'grab')}
        onClick={onClick}
        draggable
      >
          <span>{label}</span>
      </button>
    );
  };
  
