import React, { useRef } from 'react';
import { TextInput, View } from 'react-native';

import { DEFAULT_WHITE } from '@/styles/colors';

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
        style={{ fontSize: 24, padding: 20 }}
        placeholder="Title"
        textAlignVertical="top"
        onSubmitEditing={() => {
          editorRef.current?.focus();
        }}
      />
      <TextInput
        multiline
        ref={editorRef}
        value={noteContent}
        onChangeText={handleChangeContent}
        style={{ height: '100%', lineHeight: 24, padding: 20, paddingBottom: 52 }}
        placeholder="Pur your thoughts"
        textAlignVertical="top"
      />
    </View>
  );
};

export default EditorScreen;
