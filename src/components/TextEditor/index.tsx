import React, { useMemo, useState } from 'react';
import { Button, TextInput, View } from 'react-native';

import { Block, EditorState, FontStyle } from './models/types';
import BlockSelection from './presentations/BlockSelection';

const TextEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    blocks: [
      {
        content: 'kk',
        id: 1,
        type: 'text',
        fontStyles: [],
      },
    ],
    activeBlockIndex: 0,
  });

  const activeBlock = useMemo(() => editorState.blocks[editorState.activeBlockIndex], [editorState]);

  const mutateState = (newState: EditorState) => {};

  const handleChangeFontStyle = (type: FontStyle) => {
    const typeIdx = activeBlock.fontStyles.indexOf(type);
    const mergedBlocks = [...editorState.blocks];

    const isNewBlock = Boolean(activeBlock.content);
    const newBlock: Block = {
      id: activeBlock.id + 1,
      content: '',
      fontStyles: [],
      type: 'text',
      ...(!isNewBlock && mergedBlocks[editorState.activeBlockIndex]),
    };

    if (typeIdx < 0) {
      newBlock.fontStyles.push(type);
    } else {
      newBlock.fontStyles.splice(typeIdx, 1);
    }
    if (isNewBlock) {
      mergedBlocks.push(newBlock);
    } else {
      mergedBlocks[editorState.activeBlockIndex] = newBlock;
    }

    setEditorState((prev) => ({
      ...prev,
      blocks: mergedBlocks,
      activeBlockIndex: prev.activeBlockIndex + Number(isNewBlock),
    }));
  };

  return (
    <View>
      <View style={{ marginVertical: 8, flexDirection: 'row' }}>
        <Button
          onPress={() => handleChangeFontStyle('bold')}
          title="Bold"
          color={activeBlock.fontStyles.includes('bold') ? undefined : 'gray'}
        />
        <Button
          onPress={() => handleChangeFontStyle('italic')}
          title="Italic"
          color={activeBlock.fontStyles.includes('italic') ? undefined : 'gray'}
        />
      </View>
      <TextInput
        onChangeText={(text) => {
          setEditorState((prev) => {
            const mergedBlocks = [...prev.blocks];

            mergedBlocks[prev.activeBlockIndex].content = text;
            return {
              ...prev,
              blocks: mergedBlocks,
            };
          });
        }}
        verticalAlign="top"
        style={{ backgroundColor: '#dbdbdb' }}
        placeholder="Note"
        multiline
      >
        {editorState.blocks.map((item) => (
          <BlockSelection block={item} key={item.id} />
        ))}
      </TextInput>
    </View>
  );
};

export default TextEditor;
