import { useEffect, useRef } from 'react';

export const NodeField = ({ field, value, onChange }) => {
  const textareaRef = useRef(null);
  const longestLineLength = String(value || '')
    .split('\n')
    .reduce((max, line) => Math.max(max, line.length), 0);
  const textareaWidth = field.autoResize
    ? `${Math.min(Math.max(longestLineLength + 4, 24), 64)}ch`
    : undefined;

  useEffect(() => {
    if (field.type !== 'textarea' || !field.autoResize || !textareaRef.current) {
      return;
    }

    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.width = '100%';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [field, value]);

  const commonProps = {
    id: field.name,
    value,
    onChange: (event) => onChange(field.name, event.target.value),
    placeholder: field.placeholder,
  };

  return (
    <label className="node-field" htmlFor={field.name}>
      <span>{field.label}</span>
      {field.type === 'select' ? (
        <select {...commonProps}>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          {...commonProps}
          ref={textareaRef}
          rows={field.minRows || 2}
          className="node-field__textarea"
          style={{ width: textareaWidth }}
        />
      ) : (
        <input {...commonProps} type={field.type || 'text'} />
      )}
    </label>
  );
};
