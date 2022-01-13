import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';

type TodolistPropsType = {
    id: string,
    todolistTitle: string;
    tasks: Array<TaskType>;
    removeTask: (todolistID: string, taskID: string) => void;
    tasksStatusFilter: (todolistID: string, taskStatus: TaskStatusType) => void;
    taskStatusIsChecked: (todolistID: string, taskID: string, isDone: boolean) => void;
    addTask: (todolistID: string, newTaskTitle: string) => void;
    taskStatus: TaskStatusType;
}
export type TodolistType = {
    id: string;
    todolistTitle: string;
    taskStatus: TaskStatusType;
}
export type TaskStatusType = 'all' | 'active' | 'completed';

export type TaskType = {
    id: string;
    taskTitle: string;
    isDone: boolean;
}
export type TasksStateType = {
    [key: string]: Array<TaskType>;
}
type AddItemFormType = {
    addItem: (title: string) => void;
}

export const AddItemForm = (props: AddItemFormType ) => {

    let [inputValue, setInputValue] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setInputValue(event.currentTarget.value);
    }

    const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (inputValue.trim() !== '') {
                props.addItem(inputValue.trim());
                setInputValue('');
            } else {
                setError("Title is required!")
            }
        }
    }

    const addItem = () => {
        if (inputValue.trim() !== '') {
            props.addItem(inputValue.trim());
            setInputValue('');
        } else {
            setError("Title is required!")
        }
    }

    return (
        <div>
            <input value={inputValue}
                   onChange={onChangeInputValueHandler}
                   onKeyPress={keyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}

export const Todolist = (props: TodolistPropsType) => {

    // let [inputValue, setInputValue] = useState<string>('');
    // let [error, setError] = useState<string | null>(null);

    // const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setError(null);
    //     setInputValue(event.currentTarget.value);
    // }
    //
    // const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         if (inputValue.trim() !== '') {
    //             props.addTask(props.id, inputValue.trim());
    //             setInputValue('');
    //         } else {
    //             setError("Title is required!")
    //         }
    //     }
    // }
    //
    // const addTask = () => {
    //     if (inputValue.trim() !== '') {
    //         props.addTask(props.id, inputValue.trim());
    //         setInputValue('');
    //     } else {
    //         setError("Title is required!")
    //     }
    // }

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>*/}
            {/*    <input value={inputValue}*/}
            {/*           onChange={onChangeInputValueHandler}*/}
            {/*           onKeyPress={keyPressHandler}*/}
            {/*           className={error ? "error" : ""}*/}
            {/*    />*/}
            {/*    <button onClick={addTask}>+</button>*/}
            {/*    {error && <div className={"error-message"}>{error}</div>}*/}
            {/*</div>*/}
            <ul>
                {props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(props.id, task.id)
                        }
                        const onChangeTaskIsChecked = (event: ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = event.currentTarget.checked;
                            props.taskStatusIsChecked(props.id, task.id, newIsDoneValue);
                        }
                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeTaskIsChecked}/>
                                <span>{task.taskTitle}</span>
                                <button onClick={removeTask}>x</button>
                            </li>

                        )
                    }
                )}
            </ul>
            <div>
                <button className={props.taskStatus === 'all' ? "active-filter" : ""}
                        onClick={() => props.tasksStatusFilter(props.id, 'all')}>All
                </button>
                <button className={props.taskStatus === 'active' ? "active-filter" : ""}
                        onClick={() => props.tasksStatusFilter(props.id, 'active')}>Active
                </button>
                <button className={props.taskStatus === 'completed' ? "active-filter" : ""}
                        onClick={() => props.tasksStatusFilter(props.id, 'completed')}>Completed
                </button>
            </div>
        </div>
    );
}