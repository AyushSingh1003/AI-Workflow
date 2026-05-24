import { Handle, Position } from 'reactflow';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const getHandleStyle = (handle, index, total) => {
  if (handle.position === 'left' || handle.position === 'right') {
    const top = handle.top || ((index + 1) * 100) / (total + 1);
    return { top: `${top}%` };
  }

  return undefined;
};

export const NodeHandles = ({ nodeId, handles = [] }) => {
  const handlesByPosition = handles.reduce((groups, handle) => {
    const position = handle.position || 'right';
    return {
      ...groups,
      [position]: [...(groups[position] || []), handle],
    };
  }, {});

  return (
    <>
      {handles.map((handle) => {
        const position = handle.position || 'right';
        const positionHandles = handlesByPosition[position];
        const index = positionHandles.indexOf(handle);

        return (
          <Handle
            key={`${handle.type}-${position}-${handle.id}`}
            className={`node-handle node-handle--${handle.type}`}
            type={handle.type}
            position={positionMap[position]}
            id={`${nodeId}-${handle.id}`}
            style={getHandleStyle(handle, index, positionHandles.length)}
          />
        );
      })}
    </>
  );
};
