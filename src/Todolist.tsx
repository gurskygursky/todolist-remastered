import React from 'react';
import './App.css';

type TodolistPropsType = {
    todolistTitle: string,
    lists: Array<ListType>,
}
type ListType = {
    id: number,
    title: string,
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
                {props.lists.map((list) => {
                        return (
                            <li><input type="checkbox" checked={list.isDone}/> <span>{list.title}</span></li>

                        )
                    }
                )
                }
                {/*<li><input type="checkbox" checked={props.list[0].isDone}/> <span>{props.list[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.list[1].isDone}/> <span>{props.list[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.list[2].isDone}/> <span>{props.list[2].title}</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}