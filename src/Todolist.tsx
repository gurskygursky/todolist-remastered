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

    let [inputValue, setInputValue] = useState('');

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }

    const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(inputValue);
            setInputValue('');
        }
    }

    const addTask = () => {
        props.addTask(inputValue);
        setInputValue('');
    }

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <div>
                <input value={inputValue}
                       onChange={onChangeInputValueHandler}
                       onKeyPress={keyPressHandler}
                />
                <button onClick={addTask}>+
                </button>
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