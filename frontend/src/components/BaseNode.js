import { memo, useMemo } from 'react';
import { useStore } from '../store';
import { extractVariables } from '../utils/nodeVariables';
import { NodeField } from './NodeField';
import { NodeHandles } from './NodeHandles';
import { NodeHeader } from './NodeHeader';

const selector = (state) => state.updateNodeField;

export const BaseNode = memo(({ id, data = {}, config }) => {
  const updateNodeField = useStore(selector);

  const values = useMemo(() => {
    const defaults =
      typeof config.defaults === 'function' ? config.defaults(id) : config.defaults || {};

    return config.fields.reduce((fieldValues, field) => {
      fieldValues[field.name] =
        data[field.name] ?? defaults[field.name] ?? field.defaultValue ?? '';
      return fieldValues;
    }, {});
  }, [config, data, id]);

  const variableHandles = useMemo(() => {
    if (!config.variableHandles) {
      return [];
    }

    return extractVariables(values.text).map((variable, index) => ({
      type: 'target',
      position: 'left',
      id: `var-${variable}`,
      top: 24 + index * 16,
    }));
  }, [config.variableHandles, values.text]);

  const handles = useMemo(
    () => [...variableHandles, ...(config.handles || [])],
    [config.handles, variableHandles]
  );

  const handleFieldChange = (fieldName, fieldValue) => {
    updateNodeField(id, fieldName, fieldValue);
  };

  return (
    <div className="workflow-node" style={{ '--node-accent': config.accent }}>
      <NodeHandles nodeId={id} handles={handles} />
      <NodeHeader
        title={config.title}
        description={config.description}
        accent={config.accent}
      />
      <div className="node-content">
        {config.fields.map((field) => (
          <NodeField
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={handleFieldChange}
          />
        ))}
      </div>
    </div>
  );
});
