import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    city?: string;
    country?: string;
};

type TasksType = {
    title: string;
    description: string;
    city: string;
    country: string;
};

export const Notes: React.FC<PropsType> = ({country, city}) => {
        let [tasks, setTasks] = useState<TasksType[]>([]);
        const lsObject = JSON.parse(localStorage.getItem('tasks')!);
        const findCity = lsObject.filter((obj: any) => obj.city === city);
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
            const newTasks = {title, description, country, city};

            localStorage.setItem('tasks', JSON.stringify([...tasks, newTasks]));
            setTasks([...lsObject, newTasks]);
            setShowForm(false);
        };

        if (!tasks.length) {
            tasks = lsObject;
        }

        if (!findCity.length) {
            return <div>{city}</div>;
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
    }
;
