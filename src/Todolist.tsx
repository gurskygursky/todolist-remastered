import React from 'react';
import './App.css';

type TodolistPropsType = {
    todolistTitle: string,
    list: Array<ListType>,
}
type ListType = {
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
                {props.list.map(list => {
                        return (
                            <li><input type="checkbox" checked={list.isDone}/> <span>{list.taskTitle}</span></li>

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