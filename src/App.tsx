import React, {useState} from 'react';
import './App.css';
import {TaskStatusType, Todolist} from "./Todolist";

export function App() {

    let [tasks, setTask] = useState([
        {id: 1, taskTitle: "HTML & CSS", isDone: true},
        {id: 2, taskTitle: "Javascript", isDone: false},
        {id: 3, taskTitle: "Typescript", isDone: true},
        {id: 4, taskTitle: "React", isDone: true},
        {id: 5, taskTitle: "Rest API", isDone: true},
        {id: 6, taskTitle: "Redux", isDone: true},
    ]);
    // let todolist2 = [
    //     {id: 1, taskTitle: "1984", isDone: true},
    //     {id: 2, taskTitle: "The Financier", isDone: true},
    //     {id: 3, taskTitle: "The Stoic", isDone: true},
    //     {id: 4, taskTitle: "The Titan", isDone: true},
    //     {id: 5, taskTitle: "The Double", isDone: true},
    //     {id: 6, taskTitle: "The Master and Margarita", isDone: false},
    // ]

    const removeTask = (id: number) => {
        const FilteredTask = tasks.filter(task => task.id !== id)
        setTask(FilteredTask);
        console.log(tasks)
    }
    const tasksStatusFilter = (taskStatus: TaskStatusType) => {
        setTaskStatus(taskStatus)
    }

    const [taskStatus, setTaskStatus] = useState<'all' | 'active' | 'completed'>('all');

    let FilteredTasksStatus = tasks;

    if (taskStatus === 'active') {
        FilteredTasksStatus = tasks.filter(task => !task.isDone)
    }
    if (taskStatus === 'completed') {
        FilteredTasksStatus = tasks.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <Todolist todolistTitle={'What to learn'}
                      tasks={FilteredTasksStatus}
                      removeTask={removeTask}
                      tasksStatusFilter={tasksStatusFilter}/>
            {/*<Todolist todolistTitle={'Reading list'} tasks={tasks} removeTask={removeTask}/>*/}
        </div>
    );
}

