import React, {useState} from 'react';
import './animationStyle.css';
import {PropsType} from './typings';
import style from './AccordionItem.module.css';
import {getCapitalizedString} from 'src/utils';
import {DescriptionForEmptyCity} from './enums';
import {NotesType} from 'src/widgets/notes/typings';
import {CSSTransition} from 'react-transition-group';

export const AccordionItem: React.FC<PropsType> = ({
  city,
  foundCity,
  removeNote,
  filteredNotesByCountry,
}) => {
  const [cityForNotes, setCityForNotes] = useState<string[]>([]);
  const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(false);

  const showFilteredNotes = (city: string) => {
    setCityForNotes((prev: string[]) => {
      if (prev.includes(city)) {
        return prev.filter(el => el !== city);
      } else {
        return [...prev, city];
      }
    });

    setIsOpenAccordion(!isOpenAccordion);
  };

  const renderNoteItem = () => {
    return (
      <div>
        {
          (!city || !foundCity.includes(city)) && (
            filteredNotesByCountry
              .filter((note: NotesType) => note.city === foundCity)
              .map(({title = '', description}, index: number) => {
                return (
                  cityForNotes.includes(foundCity) && (
                    <div
                      key={index}
                      className={style.info__container}
                    >
                      <div className={style.title__container}>
                        <p className={style.title}>• {title}</p>
                        <span onClick={() => removeNote(title)}>✕</span>
                      </div>
                      <div className={style.description__container}>
                        <p className={style.description}>{description}</p>
                      </div>
                    </div>
                  )
                );
              })
          )
        }
      </div>
    );
  };

  if (city) {
    if (!foundCity.includes(city)) {
      return null;
    }
  }

  return (
    <React.Fragment>
      <div className={style.city__container}>
        {
          foundCity
          ? getCapitalizedString(foundCity)
          : DescriptionForEmptyCity.NotesWithOutCity
        }
        <span onClick={() => showFilteredNotes(foundCity)}>
            {!isOpenAccordion ? '▼' : '▲'}
        </span>
      </div>
      <CSSTransition
        in={isOpenAccordion}
        timeout={1000}
        classNames='accordion__item'
      >
        {renderNoteItem()}
      </CSSTransition>
    </React.Fragment>
  );
};
