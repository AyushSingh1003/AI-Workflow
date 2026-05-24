export const nodeConfigs = {
  customInput: {
    title: 'Input',
    description: 'Accept data from a workflow trigger.',
    accent: '#2563eb',
    defaults: (id) => ({
      inputName: id.replace('customInput-', 'input_'),
      inputType: 'Text',
    }),
    fields: [
      { name: 'inputName', label: 'Name', type: 'text' },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'File', 'JSON'],
      },
    ],
    handles: [{ type: 'source', position: 'right', id: 'value' }],
  },
  llm: {
    title: 'LLM',
    description: 'Generate a response from system and prompt inputs.',
    accent: '#7c3aed',
    fields: [
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        defaultValue: 'GPT-4',
        options: ['GPT-4', 'Claude', 'Llama 3'],
      },
      {
        name: 'temperature',
        label: 'Temp',
        type: 'select',
        defaultValue: '0.7',
        options: ['0.2', '0.7', '1.0'],
      },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'system', top: 34 },
      { type: 'target', position: 'left', id: 'prompt', top: 66 },
      { type: 'source', position: 'right', id: 'response' },
    ],
  },
  customOutput: {
    title: 'Output',
    description: 'Send the final result out of the workflow.',
    accent: '#059669',
    defaults: (id) => ({
      outputName: id.replace('customOutput-', 'output_'),
      outputType: 'Text',
    }),
    fields: [
      { name: 'outputName', label: 'Name', type: 'text' },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'Image', 'JSON'],
      },
    ],
    handles: [{ type: 'target', position: 'left', id: 'value' }],
  },
  text: {
    title: 'Text',
    description: 'Compose text and expose template variables as inputs.',
    accent: '#db2777',
    defaults: () => ({ text: '{{input}}' }),
    fields: [
      {
        name: 'text',
        label: 'Template',
        type: 'textarea',
        autoResize: true,
        minRows: 2,
      },
    ],
    handles: [{ type: 'source', position: 'right', id: 'output' }],
    variableHandles: true,
  },
  api: {
    title: 'API',
    description: 'Call an external HTTP endpoint.',
    accent: '#0284c7',
    fields: [
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'GET',
        options: ['GET', 'POST', 'PUT', 'PATCH'],
      },
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        defaultValue: 'https://api.example.com',
      },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'payload' },
      { type: 'source', position: 'right', id: 'response' },
    ],
  },
  database: {
    title: 'Database',
    description: 'Read or write structured records.',
    accent: '#0f766e',
    fields: [
      {
        name: 'operation',
        label: 'Action',
        type: 'select',
        defaultValue: 'Select',
        options: ['Select', 'Insert', 'Update', 'Delete'],
      },
      { name: 'table', label: 'Table', type: 'text', defaultValue: 'users' },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'query' },
      { type: 'source', position: 'right', id: 'rows' },
    ],
  },
  filter: {
    title: 'Filter',
    description: 'Keep only records that match a rule.',
    accent: '#ea580c',
    fields: [
      { name: 'field', label: 'Field', type: 'text', defaultValue: 'status' },
      {
        name: 'operator',
        label: 'Rule',
        type: 'select',
        defaultValue: 'equals',
        options: ['equals', 'contains', 'greater than', 'less than'],
      },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'items' },
      { type: 'source', position: 'right', id: 'filtered' },
    ],
  },
  email: {
    title: 'Email',
    description: 'Send a templated message.',
    accent: '#4f46e5',
    fields: [
      { name: 'to', label: 'To', type: 'text', defaultValue: 'team@company.com' },
      { name: 'subject', label: 'Subject', type: 'text', defaultValue: 'Workflow update' },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'body' },
      { type: 'source', position: 'right', id: 'sent' },
    ],
  },
  condition: {
    title: 'Condition',
    description: 'Branch execution by true or false outcomes.',
    accent: '#ca8a04',
    fields: [
      { name: 'expression', label: 'If', type: 'text', defaultValue: 'score > 80' },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'value' },
      { type: 'source', position: 'right', id: 'true', top: 38, label: 'T' },
      { type: 'source', position: 'right', id: 'false', top: 68, label: 'F' },
    ],
  },
};

export const toolbarNodes = [
  { type: 'customInput', label: 'Input' },
  { type: 'llm', label: 'LLM' },
  { type: 'customOutput', label: 'Output' },
  { type: 'text', label: 'Text' },
  { type: 'api', label: 'API' },
  { type: 'database', label: 'Database' },
  { type: 'filter', label: 'Filter' },
  { type: 'email', label: 'Email' },
  { type: 'condition', label: 'Condition' },
];
