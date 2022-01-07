import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';

type TodolistPropsType = {
    todolistTitle: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    tasksStatusFilter: (taskStatus: TaskStatusType) => void,
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

    const onAllClickHandler = () => {
        props.tasksStatusFilter('all');
    }
    const onActiveClickHandler = () => {
        props.tasksStatusFilter('active');
    }
    const onCompletedClickHandler = () => {
        props.tasksStatusFilter('completed');
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
                        return (
                            <li><input type="checkbox" checked={task.isDone}/>
                                <span>{task.taskTitle}</span>
                                <button onClick={removeTask}>x</button>
                            </li>

                        )
                    }
                )}
            </ul>
            <div>
                {/*<button onClick={() => props.tasksStatusFilter('all')}>All</button>*/}
                {/*<button onClick={() => props.tasksStatusFilter('active')}>All</button>*/}
                {/*<button onClick={() => props.tasksStatusFilter('completed')}>All</button>*/}
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}