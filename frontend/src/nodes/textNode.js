import { BaseNode } from '../components/BaseNode';
import { nodeConfigs } from '../config/nodeConfigs';

export const TextNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={nodeConfigs.text} />;
};
