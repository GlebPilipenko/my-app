import {NotesType} from 'src/widgets/notes/typings';

export type PropsType = {
  city?: string;
  filteredNotesByCountry: NotesType[];
  removeNote: (title: string) => void;
};
