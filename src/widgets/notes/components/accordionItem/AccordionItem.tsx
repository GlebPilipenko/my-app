import React, {useState} from 'react';
import {PropsType} from './typings';
import {NotesType} from '../../typings';
import style from './AccordionItem.module.css';

export const AccordionItem: React.FC<PropsType> = ({
    key,
    city,
    notes,
    country,
    findedCity,
    removeNote,
}) => {
    const [cityForNotes, setCityForNotes] = useState<string[]>([]);
    const showFilteredNotes = (city: string) => {
        setCityForNotes((prev: string[]) => {
            if (prev.includes(city)) {
                return prev.filter(el => el !== city);
            } else {
                return [...prev, city];
            }
        });
    };

    if (city) {
        if (!findedCity.includes(city)) {
            return null;
        }
    }

    const filteredNotesByCountry = notes
        .filter((notes: NotesType) => notes.country === country);

    return (
        <React.Fragment key={key}>
            <div onClick={() => showFilteredNotes(findedCity)}>
                {findedCity}
            </div>
            <div>
                {(!city || !findedCity.includes(city)) && (
                    filteredNotesByCountry
                        .filter((note: NotesType) => note.city === findedCity)
                            .map(({title, description}) => {

                            return (
                                cityForNotes.includes(findedCity) && (
                                    <div key={title}
                                         className={style.info__container}>
                                        <p className={style.title}>• {title}</p>
                                        <div className={style.description__container}>
                                            <p className={style.description}>
                                                {description}
                                            </p>
                                            <button
                                                className={style.remove__btn}
                                                onClick={() => removeNote(title)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            );
                        })
                )}
            </div>
        </React.Fragment>
    );
};


// export const AccordionItem: React.FC<PropsType> = ({
//                                                        key,
//                                                        city,
//                                                        notes,
//                                                        findedCity,
//                                                        removeNote,
//                                                    }) => {
//     const [cityForNotes, setCityForNotes] = useState<string[]>([]);
//     const showFilteredNotes = (city: string) => {
//         setCityForNotes((prev: string[]) => {
//             if (prev.includes(city)) {
//                 return prev.filter(el => el !== city);
//             } else {
//                 return [...prev, city];
//             }
//         });
//     };
//
//     if (city) {
//         if (!findedCity.includes(city)) {
//             return null;
//         }
//     }
//
//     const qqqqqqq = notes.filter((note: NotesType) => note.city === findedCity).map(el => el)
//     console.log(qqqqqqq);
//
//     debugger
//
//     return (
//         <React.Fragment key={key}>
//             <div onClick={() => showFilteredNotes(findedCity)}>
//                 {findedCity}
//             </div>
//             <div>
//                 {(!city || !findedCity.includes(city)) && (
//                     notes.filter((note: NotesType) => note.city === findedCity)
//                         .map(({title, description}) => {
//
//                             return (
//                                 cityForNotes.includes(findedCity) && (
//                                     <div key={title}
//                                          className={style.info__container}>
//                                         <p className={style.title}>• {title}</p>
//                                         <div className={style.description__container}>
//                                             <p className={style.description}>
//                                                 {description}
//                                             </p>
//                                             <button
//                                                 className={style.remove__btn}
//                                                 onClick={() => removeNote(title)}>
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )
//                             );
//                         })
//                 )}
//             </div>
//         </React.Fragment>
//     );
// };