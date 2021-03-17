import {NotesType} from 'src/widgets/notes/typings';

export type PropsType = {
  city?: string;
  country: string;
  foundCity: string;
  notes: NotesType[];
  removeNote: (title?: string) => void;
};
