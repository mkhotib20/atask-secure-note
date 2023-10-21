import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Note } from '@/models/note/types';
import { RootNavigationProp, RootStackRouteProp } from '@/models/router/types';

import useNoteMutation from './useNoteMutation';

const useNoteContent = () => {
  const { params } = useRoute<RootStackRouteProp<'EditorScreen'>>();
  const { reset } = useNavigation<RootNavigationProp>();
  const data: Partial<Note> = params?.data || {};

  const [noteContent, setNoteContent] = useState(data.content || '');
  const [noteTitle, setNoteTitle] = useState(data.title || '');

  const { handleUpsert, handleDelete } = useNoteMutation();

  const handleChangeTitle = (text: string) => {
    setNoteTitle(text);
  };
  const handleChangeContent = (text: string) => {
    setNoteContent(text);
  };

  const handleSave = useCallback(() => {
    handleUpsert({
      content: noteContent,
      id: data.id,
      title: noteTitle,
    });

    reset({
      routes: [
        {
          name: 'HomeScreen',
        },
      ],
    });
  }, [noteContent, noteTitle, data]);

  const deleteThisNote = useCallback(() => {
    Alert.alert('Confirmation', 'Are you sure want to delete this note?', [
      {
        text: 'No',
      },
      {
        onPress: () => {
          if (!data.id) {
            return;
          }
          handleDelete(data.id);

          reset({
            routes: [
              {
                name: 'HomeScreen',
              },
            ],
          });
        },
        text: 'Yes',
      },
    ]);
  }, [noteContent, noteTitle, data]);

  return {
    noteContent,
    noteTitle,
    isEdit: Boolean(data?.id),
    handleChangeContent,
    handleChangeTitle,
    handleSave,
    deleteThisNote,
  };
};

export default useNoteContent;
