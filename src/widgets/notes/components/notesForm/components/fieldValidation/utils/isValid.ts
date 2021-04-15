import {minLength} from 'src/widgets/notes/components/notesForm/constants'

export const isValid = (valueLength: number, maxValueLength: number) => {
  return (valueLength >= minLength) && (valueLength <= maxValueLength);
};
