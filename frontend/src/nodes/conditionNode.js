import { BaseNode } from '../components/BaseNode';
import { nodeConfigs } from '../config/nodeConfigs';

export const ConditionNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={nodeConfigs.condition} />;
};
