import React from 'react';
import './App.css';
import {UniversalButton} from "./Button";

type TodolistPropsType = {
    todolistTitle: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    tasksStatusFilter: (taskStatus: TaskStatusType) => void,
}
export type TaskStatusType = 'all' | 'active' | 'completed';

export type TaskType = {
    id: string,
    taskTitle: string,
    isDone: boolean,
}

export const Todolist = (props: TodolistPropsType) => {

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(task => {
                        return (
                            <li><input type="checkbox" checked={task.isDone}/>
                                <span>{task.taskTitle}</span>
                                <UniversalButton task={task}
                                                 removeTask={() => props.removeTask(task.id)}/>
                                {/*<button onClick={() => props.removeTask(task.id)}>x</button>*/}
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