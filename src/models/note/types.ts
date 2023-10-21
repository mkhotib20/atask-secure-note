export interface UpsertNoteDto {
  id?: string;
  title: string;
  content: string;
}

export interface Note {
  id?: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}
