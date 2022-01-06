import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export function App() {
    let todolist1 = [
            {id: 1, taskTitle: "HTML & CSS", isDone: true},
            {id: 2, taskTitle: "Javascript", isDone: false},
            {id: 3, taskTitle: "Typescript", isDone: true},
            {id: 4, taskTitle: "React", isDone: true},
            {id: 5, taskTitle: "Rest API", isDone: true},
            {id: 6, taskTitle: "Redux", isDone: true},
    ]
    let todolist2 = [
            {id: 1, taskTitle: "1984", isDone: true},
            {id: 2, taskTitle: "The Financier", isDone: true},
            {id: 3, taskTitle: "The Stoic", isDone: true},
            {id: 4, taskTitle: "The Titan", isDone: true},
            {id: 5, taskTitle: "The Double", isDone: true},
            {id: 6, taskTitle: "The Master and Margarita", isDone: false},
    ]
    return (
        <div className="App">
            <Todolist todolistTitle={'What to learn 111'} tasks={todolist1}/>
            <Todolist todolistTitle={'What to learn 222'} tasks={todolist2}/>
        </div>
    );
}

