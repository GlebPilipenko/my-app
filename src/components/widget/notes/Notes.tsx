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
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const changeVisibilityForm = () => setShowForm(true);
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const changeTxtAreaValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value);
    };
    const saveNotes = () => {
        const newTask = {title, description, country, city};
        const lsObject = getLocalStorageObject(newTask);

        localStorage.setItem('tasks', JSON.stringify([...lsObject, newTask]));
        setShowForm(false);
    };
    const getLocalStorageObject = useCallback((newTask?: TasksType) => {
        const lsObject = JSON.parse(localStorage.getItem('tasks') || '[]');
        const findCity = lsObject.filter((obj: TasksType) => obj.city === city);

        if (!newTask) {
            setTasks(findCity);
        } else
            setTasks([...findCity, newTask]);

        return lsObject;
    }, [city]);

    useEffect(() => {
        getLocalStorageObject();
    }, [getLocalStorageObject]);

    if (!city && !country) {
        return <div>Temporary Error</div>;
    }

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

                    return (
                        <div className={style.info__container} key={index}>
                            <p className={style.title}>{title}</p>
                            <p className={style.description}>{description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};