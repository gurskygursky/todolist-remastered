import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';

type TodolistPropsType = {
    todolistTitle: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    tasksStatusFilter: (taskStatus: TaskStatusType) => void,
    taskStatusChecked: (taskID: string, isDone: boolean) => void,
    addTask: (newTaskTitle: string) => void,
}
export type TaskStatusType = 'all' | 'active' | 'completed';

export type TaskType = {
    id: string,
    taskTitle: string,
    isDone: boolean,
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
                props.addTask(inputValue);
                setInputValue('');
            } else {
                setError("Title is required!")
            }
        }
    }

    const addTask = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue);
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
                        const changeTaskStatusChecked = (event: ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = event.currentTarget.checked;
                            props.taskStatusChecked(task.id, newIsDoneValue);
                        }
                        return (
                            <li><input type="checkbox" checked={task.isDone} onChange={changeTaskStatusChecked}/>
                                <span>{task.taskTitle}</span>
                                <button onClick={removeTask}>x</button>
                            </li>

                        )
                    }
                )}
            </ul>
            <div>
                <button onClick={() => props.tasksStatusFilter('all')}>All</button>
                <button onClick={() => props.tasksStatusFilter('active')}>Active</button>
                <button onClick={() => props.tasksStatusFilter('completed')}>Completed</button>
            </div>
        </div>
    );
}