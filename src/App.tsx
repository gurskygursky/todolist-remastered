import React, {useState} from 'react';
import './App.css';
import {TaskStatusType, TaskType, Todolist, TodolistType} from "./Todolist";
import {v1} from "uuid";

export function App() {

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: v1(),
            title: 'What to learn',
            taskStatus: 'all'
        },
        {
            id: v1(),
            title: 'Reading list',
            taskStatus: 'all'
        },
    ])

    // let [taskStatus, setTaskStatus] = useState<TaskStatusType>('all');

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), taskTitle: "HTML & CSS", isDone: true},
        {id: v1(), taskTitle: "Javascript", isDone: false},
        {id: v1(), taskTitle: "Typescript", isDone: true},
        {id: v1(), taskTitle: "React", isDone: true},
        {id: v1(), taskTitle: "Rest API", isDone: true},
        {id: v1(), taskTitle: "Redux", isDone: true},
    ]);
    // let todolist2 = [
    //     {id: 1, taskTitle: "1984", isDone: true},
    //     {id: 2, taskTitle: "The Financier", isDone: true},
    //     {id: 3, taskTitle: "The Stoic", isDone: true},
    //     {id: 4, taskTitle: "The Titan", isDone: true},
    //     {id: 5, taskTitle: "The Double", isDone: true},
    //     {id: 6, taskTitle: "The Master and Margarita", isDone: false},
    // ]

    const addTask = (newTaskTitle: string) => {
        const task = {id: v1(), taskTitle: newTaskTitle, isDone: true};
        const newTask = [task, ...tasks];
        setTasks(newTask);
    }

    const removeTask = (id: string) => {
        const FilteredTask = tasks.filter(task => task.id !== id)
        setTasks(FilteredTask);
        console.log(tasks)
    }

    const tasksStatusFilter = (taskStatus: TaskStatusType, todolistID: string) => {
        let todolist = todolists.find(td => td.id === todolistID);
        if (todolist) {
            todolist.taskStatus = taskStatus;
            setTodolists([...todolists]);
        }
        // setTaskStatus(taskStatus);
    }
    const taskStatusIsChecked = (taskID: string, isDone: boolean) => {
        let task = tasks.find(task => task.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }

    }
    // let filteredTasksStatus = tasks;
    //
    // if (taskStatus === 'active') {
    //     filteredTasksStatus = tasks.filter(task => !task.isDone)
    // }
    // if (taskStatus === 'completed') {
    //     filteredTasksStatus = tasks.filter(task => task.isDone)
    // }

    return (
        <div className="App">
            {
                todolists.map(td => {
                    let filteredTasksStatus = tasks;

                    if (td.taskStatus === 'active') {
                        filteredTasksStatus = tasks.filter(task => !task.isDone)
                    }
                    if (td.taskStatus === 'completed') {
                        filteredTasksStatus = tasks.filter(task => task.isDone)
                    }
                    return (
                        <Todolist key={td.id}
                                  id={td.id}
                            // todolistTitle={'What to learn'}
                                  todolistTitle={td.title}
                                  tasks={filteredTasksStatus}
                                  removeTask={removeTask}
                                  taskStatus={td.taskStatus}
                                  tasksStatusFilter={tasksStatusFilter}
                                  addTask={addTask}
                                  taskStatusIsChecked={taskStatusIsChecked}
                        />
                    )
                })
            }
            {/*<Todolist todolistTitle={'What to learn'}*/}
            {/*          tasks={filteredTasksStatus}*/}
            {/*          removeTask={removeTask}*/}
            {/*          taskStatus={taskStatus}*/}
            {/*          tasksStatusFilter={tasksStatusFilter}*/}
            {/*          addTask={addTask}*/}
            {/*          taskStatusIsChecked={taskStatusIsChecked}*/}
            {/*/>*/}
            {/*<Todolist todolistTitle={'Reading list'} tasks={tasks} removeTask={removeTask}/>*/}
        </div>
    );
}

