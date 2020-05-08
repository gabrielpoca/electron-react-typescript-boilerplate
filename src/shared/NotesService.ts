export type Note = {
  id: string;
  content: string;
  createdAt: Date;
};

export interface NotesService {
  loadAll(): Promise<Note[]>;
  add(note: Note): Promise<Note>;
  remove(id: string): Promise<void>;
}
