import { useCallback } from 'react';
import uuid from 'react-native-uuid';

import dayjs from 'dayjs';

import useSecureStorage from '@/hooks/useSecureStorage';
import { NOTE_STORAGE_KEY } from '@/models/note/constants';
import { Note, UpsertNoteDto } from '@/models/note/types';

const useNoteMutation = () => {
  const { get, set } = useSecureStorage();

  /**
   * Return parsed type safe existing data
   */
  const getParsedExisting = (): Note[] => {
    const existingStorage = get(NOTE_STORAGE_KEY);
    if (!existingStorage) {
      return [];
    }
    return JSON.parse(existingStorage);
  };

  /**
   * recursively generate unique uuid
   */
  const getUniqueNewId = useCallback((tried: string[]): string => {
    const existingStorage = getParsedExisting();
    const generated = uuid.v4().toString();
    if (existingStorage.find((note) => note.id === generated)) {
      return getUniqueNewId([...(tried || []), generated]);
    }
    return generated;
  }, []);

  const handleUpsert = (noteData: UpsertNoteDto) => {
    const existingStorage = getParsedExisting();

    const { content, id, title } = noteData;
    const usedId = id || getUniqueNewId([]);

    const existingIndex = existingStorage.findIndex((note) => note.id === usedId);

    // Means exist
    if (existingIndex >= 0) {
      const existingNote = existingStorage[existingIndex];
      existingStorage[existingIndex] = {
        ...existingNote,
        content: content,
        title: title,
      };
    } else {
      // unsift, latest note first
      existingStorage.unshift({
        id: usedId,
        content,
        title,
        created_at: dayjs().toISOString(),
        updated_at: dayjs().toISOString(),
      });
    }

    set(NOTE_STORAGE_KEY, JSON.stringify(existingStorage));
  };

  const handleDelete = (id: string) => {
    const existingStorage = getParsedExisting();
    const deletedIdx = existingStorage.findIndex((note) => note.id === id);
    existingStorage.splice(deletedIdx, 1);

    set(NOTE_STORAGE_KEY, JSON.stringify(existingStorage));
  };

  return { handleUpsert, handleDelete };
};

export default useNoteMutation;
