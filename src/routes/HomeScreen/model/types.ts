import { Dispatch, SetStateAction } from 'react';

import { Note } from '@/models/note/types';

export interface NoteItemProps {
  itemData: Note;
}

export interface SearchBarProps {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

export interface NotfoundProps {
  keyword?: string;
  onCreateNew: () => void;
}
