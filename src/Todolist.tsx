import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';

type TodolistPropsType = {
    id: string,
    todolistTitle: string;
    tasks: Array<TaskType>;
    removeTask: (id: string) => void;
    tasksStatusFilter: (taskStatus: TaskStatusType, todolistID: string) => void;
    taskStatusIsChecked: (taskID: string, isDone: boolean) => void;
    addTask: (newTaskTitle: string) => void;
    taskStatus: TaskStatusType;
}
export type TodolistType = {
    id: string;
    title: string;
    taskStatus: TaskStatusType;
}
export type TaskStatusType = 'all' | 'active' | 'completed';

export type TaskType = {
    id: string;
    taskTitle: string;
    isDone: boolean;
}

export const Todolist = (props: TodolistPropsType) => {

    let [inputValue, setInputValue] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setInputValue(event.currentTarget.value);
    }

    const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (inputValue.trim() !== '') {
                props.addTask(inputValue.trim());
                setInputValue('');
            } else {
                setError("Title is required!")
            }
        }
    }

    const addTask = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue.trim());
            setInputValue('');
        } else {
            setError("Title is required!")
        }
    }

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <div>
                <input value={inputValue}
                       onChange={onChangeInputValueHandler}
                       onKeyPress={keyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id)
                        }
                        const onChangeTaskIsChecked = (event: ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = event.currentTarget.checked;
                            props.taskStatusIsChecked(task.id, newIsDoneValue);
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
                        onClick={() => props.tasksStatusFilter('all', props.id)}>All
                </button>
                <button className={props.taskStatus === 'active' ? "active-filter" : ""}
                        onClick={() => props.tasksStatusFilter('active', props.id)}>Active
                </button>
                <button className={props.taskStatus === 'completed' ? "active-filter" : ""}
                        onClick={() => props.tasksStatusFilter('completed', props.id)}>Completed
                </button>
            </div>
        </div>
    );
}