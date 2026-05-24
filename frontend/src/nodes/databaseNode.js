import { BaseNode } from '../components/BaseNode';
import { nodeConfigs } from '../config/nodeConfigs';

export const DatabaseNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={nodeConfigs.database} />;
};
