import {NotesType} from 'src/widgets/notes/typings';

export type PropsType = {
  city?: string;
  foundCity: string;
  filteredNotesByCountry: NotesType[];
  removeNote: (noteID: string) => void;
};
