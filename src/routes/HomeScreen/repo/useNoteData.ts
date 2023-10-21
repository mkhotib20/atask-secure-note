import { useCallback, useMemo, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import useSecureStorage from '@/hooks/useSecureStorage';
import { NOTE_STORAGE_KEY } from '@/models/note/constants';
import type { Note } from '@/models/note/types';

const useNoteData = () => {
  const [noteData, setNoteData] = useState<Note[]>([]);
  const [keyword, setKeyword] = useState('');

  const { get } = useSecureStorage();

  const fetchData = useCallback(() => {
    const result = get(NOTE_STORAGE_KEY);
    if (!result) {
      return;
    }
    setNoteData(JSON.parse(result));
  }, [get]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
      setKeyword('');
    }, []),
  );

  const parsedData = useMemo(() => {
    if (!keyword) return noteData;
    return noteData.filter(
      (note) => note.title.toLowerCase().includes(keyword) || note.content.toLowerCase().includes(keyword),
    );
  }, [keyword, noteData]);

  return { noteData: parsedData, fetchData, setKeyword, keyword };
};

export default useNoteData;
