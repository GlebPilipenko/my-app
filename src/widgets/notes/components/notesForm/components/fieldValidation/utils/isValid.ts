import {minLength} from 'src/widgets/notes/components/notesForm/constants'

export const isValid = (valueLength: number, maxValueLength: number) => (
  (valueLength >= minLength) && (valueLength <= maxValueLength)
);
