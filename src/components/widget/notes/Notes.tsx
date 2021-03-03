import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import style from './Notes.module.css';


type PropsType = {
    city?: string;
    country?: string;
};

type TasksType = {
    title: string | undefined;
    description: string | undefined;
    city: string | undefined;
    country: string | undefined;
};

export const Notes: React.FC<PropsType> = ({country, city}) => {
    let [tasks, setTasks] = useState<TasksType[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showInfo, setShowinfo] = useState<any>(false);
    const [title, setTitle] = useState<string>('');
    const [cityTitle, setCityTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const changeVisibilityForm = () => setShowForm(true);
    const changeVisibilityInfo = () => setShowinfo(!showInfo);
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const changeTxtAreaValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value);
    };
    const changeInputCityValue = (e: ChangeEvent<HTMLInputElement>) => {
        setCityTitle(e.currentTarget.value);
    };
    const saveNotes = () => {

        if (!city) {
            city = cityTitle;
        }

        const newTask = {title, description, country, city};
        const lsObject = getLocalStorageObject(newTask);

        localStorage.setItem('tasks', JSON.stringify([...lsObject, newTask]));
        setTitle('');
        setCityTitle('');
        setDescription('');
        setShowForm(false);
    };
    const removeNote = (title: string) => {
        const filteredTasks = tasks.filter((obj: TasksType) => {
            return obj.title !== title.slice(1).trim();
        });

        setTasks([...filteredTasks]);
        localStorage.setItem('tasks', JSON.stringify([...filteredTasks]));
    };
    const getLocalStorageObject = useCallback((newTask?: TasksType) => {
        const lsObject = JSON.parse(localStorage.getItem('tasks') || '[]');
        const findCity = lsObject.filter((obj: TasksType) => obj.city === city);
        const findCountry = lsObject.filter((obj: TasksType) => obj.country === country);

        if (!newTask) {
            setTasks(findCity);
            if (!city && country) {
                setTasks(findCountry);
            }
        } else {
            setTasks([...findCity, newTask]);
        }

        return lsObject;
    }, [city, country]);

    useEffect(() => {
        getLocalStorageObject();
    }, [getLocalStorageObject]);

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <button className={style.btn} onClick={changeVisibilityForm}>
                    Create note
                </button>
                {
                    !showForm ? null :
                        <div className={style.form__container}>
                            <div className={style.input__container}>
                                <h4>Add your title</h4>
                                <input type="text" value={title} size={20}
                                       className={style.input}
                                       onChange={changeInputValue} />
                            </div>
                            {!city && <div className={style.input__container}>
                                <h4>Add your city</h4>
                                <input type="text" value={cityTitle} size={20}
                                       className={style.input}
                                       onChange={changeInputCityValue} />
                            </div>}
                            <div className={style.textarea__container}>
                                <h4>Add your description</h4>
                                <textarea cols={21} rows={3} value={description}
                                          className={style.textarea}
                                          onChange={changeTxtAreaValue}>
                                </textarea>
                            </div>
                            <button
                                className={`${style.btn} ${style.btn__save}`}
                                onClick={saveNotes}>
                                Save
                            </button>
                        </div>
                }
                {tasks.map((obj: TasksType, index: number) => {
                    const title = `• ${obj.title}`;
                    const description = `${obj.description}`;
                    const country = `${obj.country?.toUpperCase()
                        [0]}${obj.country?.slice(1)}`;
                    const city = `${obj.city?.toUpperCase()
                        [0]}${obj.city?.slice(1)}`;

                    return (
                        <div>
                            <h3>{country}</h3>
                            <h4 onClick={changeVisibilityInfo}>{city}</h4>
                            {showInfo &&
                                <div className={style.info__container} key={index}>
                                    <p className={style.title}>{title}</p>
                                    <p className={style.description}>{description}</p>
                                    <button onClick={() => removeNote(title)}>
                                        Delete
                                    </button>
                                </div>
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    );
};