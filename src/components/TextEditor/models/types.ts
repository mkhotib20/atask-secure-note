import { StyleProp, TextStyle } from 'react-native';

export type FontStyle = 'bold' | 'italic';

export interface Block {
  id: number;
  type: 'text';
  style?: StyleProp<TextStyle>;
  content: string;
  fontStyles: FontStyle[];
}

export interface EditorState {
  activeBlockIndex: number;
  blocks: Block[];
}
