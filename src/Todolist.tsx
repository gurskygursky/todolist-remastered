import React from 'react';
import './App.css';

type TodolistPropsType = {
    todolistTitle: string,
    tasks: Array<TaskType>,
}
type TaskType = {
    id: number,
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
                            <li><input type="checkbox" checked={task.isDone}/> <span>{task.taskTitle}</span></li>

                        )
                    }
                )}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}