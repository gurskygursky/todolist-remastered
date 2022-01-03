import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export function App() {
    let todolist1=[
        {id:1, title:'HTML&CSS', isDone:false},
        {id:2, title:'JS', isDone:true},
        {id:3, title:'React', isDone:false},
    ]

    let todolist2=[
        {id:1, title:'HTML&CSS22222', isDone:true},
        {id:2, title:'JS22222', isDone:false},
        {id:3, title:'React222222', isDone:true},
    ]
    return (
        <div className="App">
            <Todolist todolistTitle={'What to learn 111'} lists={todolist1}/>
            <Todolist todolistTitle={'What to learn 222'} lists={todolist2}/>
        </div>
    );
}

