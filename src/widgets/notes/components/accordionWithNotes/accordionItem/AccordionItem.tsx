import React, {useState} from 'react';
import {PropsType} from './typings';
import {NotesType} from 'src/widgets/notes/typings';

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

    const filteredNotesByCountry = notes
        .filter((notes: NotesType) => notes.country === country);

    const renderNoteItem = () => {
        return (
            <div>
                {(!city || !findedCity.includes(city)) && (
                    filteredNotesByCountry
                        .filter((note: NotesType) => note.city === findedCity)
                        .map(({title, description}) => {

                            return (
                                cityForNotes.includes(findedCity) && (
                                    <div
                                        className='modal-content'
                                        style={{marginBottom: '10px'}}
                                    >
                                        <div className='modal-header'>
                                            <h5 className='modal-title'>
                                                {title}
                                            </h5>
                                                <span
                                                    aria-hidden='true'
                                                    onClick={() => {
                                                        removeNote(title)
                                                    }}
                                                    style={{cursor: 'pointer'}}
                                                >
                                                ×
                                                </span>
                                        </div>
                                        <div className='modal-body'>
                                            <p>{description}</p>
                                        </div>
                                    </div>
                                )
                            );
                        })
                    )
                }
            </div>
        )
    }

    if (city) {
        if (!findedCity.includes(city)) {
            return null;
        }
    }

    return (
        <React.Fragment key={key}>
            <div
                id='accordionExample'
                className='accordion'
            >
                <div className='accordion-item'>
                    <h2
                        id='headingOne'
                        className='accordion-header'
                        onClick={() => showFilteredNotes(findedCity)}
                    >
                        <button
                            type='button'
                            aria-expanded='true'
                            data-bs-toggle='collapse'
                            aria-controls='collapseTwo'
                            data-bs-target='#collapseOne'
                            className='accordion-button collapsed'
                        >
                            {findedCity}
                        </button>
                    </h2>
                    <div
                        id='collapseOne'
                        aria-labelledby='headingOne'
                        data-bs-parent='#accordionExample'
                        className='accordion-collapse collapse hide'
                    >
                        <div
                            style={{'padding': '0'}}
                            className='accordion-body'
                        >
                            {renderNoteItem()}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
