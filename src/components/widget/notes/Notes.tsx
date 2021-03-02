import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';

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
        return <div>Error</div>
    }

    return (
        <div>
            <div>
                <button onClick={changeVisibilityForm}>ADD</button>
                {tasks.map((obj: TasksType, index: number) => {
                    return (
                        <div key={index}>
                            <p>{obj.title}</p>
                            <p>{obj.description}</p>
                            <button>X</button>
                        </div>
                    );
                })}
                {
                    !showForm ? null :
                        <div>
                            <input type="text" value={title}
                                   onChange={changeInputValue} />
                            <textarea cols={30} rows={10}
                                      value={description}
                                      onChange={changeTxtAreaValue}>
                                </textarea>
                            <button onClick={saveNotes}>SAVE</button>
                        </div>
                }
            </div>
        </div>
    );
};