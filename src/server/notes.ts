import { NotesService, Note } from "../shared/NotesService";

const loadAll = async (): Promise<Note[]> => {
  return [{ id: "1", content: "Some content", createdAt: new Date() }];
};

const add = async (note: Note) => {
  // TODO
  return note;
};

const remove = async (id: string) => {
  // TODO
  return;
};

const notes: NotesService = { loadAll, add, remove };

export default notes;
