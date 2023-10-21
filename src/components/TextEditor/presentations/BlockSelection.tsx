import { Text } from 'react-native';

import { Block } from '../models/types';

interface BlockSelectionProps {
  block: Block;
}
const BlockSelection = ({ block }: BlockSelectionProps) => {
  switch (block.type) {
    case 'text':
      return <Text>{block.content}</Text>;

    default:
      break;
  }
  return null;
};

export default BlockSelection;
