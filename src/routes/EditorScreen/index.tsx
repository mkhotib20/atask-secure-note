import React, { useRef } from 'react';
import { TextInput, View } from 'react-native';

import { DEFAULT_WHITE, LIGHTER_BLACK } from '@/styles/colors';

import { styles } from './styles';
import useHeaderOptions from './usecase/useHeaderOptions';
import useNoteContent from './usecase/useNoteContent';

const EditorScreen = () => {
  const editorRef = useRef<TextInput>(null);

  const noteContentResult = useNoteContent();
  // handlers
  const { handleSave, handleChangeContent, handleChangeTitle, deleteThisNote } = noteContentResult;
  // values
  const { isEdit, noteContent, noteTitle } = noteContentResult;

  useHeaderOptions({
    onSave: handleSave,
    isEdit,
    onDelete: deleteThisNote,
  });

  return (
    <View
      style={{
        backgroundColor: DEFAULT_WHITE,
        marginBottom: 72,
      }}
    >
      <TextInput
        autoFocus
        value={noteTitle}
        onChangeText={handleChangeTitle}
        style={styles.editorTitle}
        placeholder="Title"
        textAlignVertical="top"
        placeholderTextColor={LIGHTER_BLACK}
        onSubmitEditing={() => {
          editorRef.current?.focus();
        }}
      />
      <TextInput
        multiline
        ref={editorRef}
        value={noteContent}
        onChangeText={handleChangeContent}
        style={styles.editorText}
        placeholder="Pur your thoughts"
        placeholderTextColor={LIGHTER_BLACK}
        textAlignVertical="top"
      />
    </View>
  );
};

export default EditorScreen;
