import React, {useState} from 'react';
import './App.css';
import {TasksStateType, TaskStatusType, Todolist, TodolistType} from "./Todolist";
import {v1} from "uuid";

export function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, todolistTitle: 'What to learn', taskStatus: 'all'},
        {id: todolistID2, todolistTitle: 'Reading list', taskStatus: 'all'},
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), taskTitle: "HTML & CSS", isDone: true},
            {id: v1(), taskTitle: "Javascript", isDone: false},
            {id: v1(), taskTitle: "Typescript", isDone: true},
            {id: v1(), taskTitle: "React", isDone: true},
            {id: v1(), taskTitle: "Rest API", isDone: true},
            {id: v1(), taskTitle: "Redux", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), taskTitle: "1984", isDone: true},
            {id: v1(), taskTitle: "The Financier", isDone: true},
            {id: v1(), taskTitle: "The Stoic", isDone: true},
            {id: v1(), taskTitle: "The Titan", isDone: true},
            {id: v1(), taskTitle: "The Double", isDone: true},
            {id: v1(), taskTitle: "The Master and Margarita", isDone: false},
        ],
    });

    const addTask = (todolistID: string, newTaskTitle: string) => {
        const task = {id: v1(), taskTitle: newTaskTitle, isDone: true};
        tasks[todolistID] = [task, ...tasks[todolistID]];
        setTasks({...tasks});
    }

    const removeTask = (todolistID: string, taskID: string) => {
        tasks[todolistID] = tasks[todolistID].filter(task => task.id !== taskID)
        setTasks({...tasks});
    }

    const tasksStatusFilter = (todolistID: string, taskStatus: TaskStatusType) => {
        let todolist = todolists.find(td => td.id === todolistID);
        if (todolist) {
            todolist.taskStatus = taskStatus;
            setTodolists([...todolists]);
        }
    }
    const taskStatusIsChecked = (todolistID: string, taskID: string, isDone: boolean) => {
        let task = tasks[todolistID].find(task => task.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }
    const onChangeTaskTitle = (todolistID: string, taskID: string, newTaskTitle: string) => {
        let task = tasks[todolistID].find(task => task.id === taskID);
        if (task) {
            task.taskTitle = newTaskTitle;
            setTasks({...tasks});
        }
    }
    const onChangeTodolistTitle = (todolistID: string, newTodolistTitle: string) => {
        let todolist = todolists.find(td => td.id === todolistID);
        if (todolist) {
            todolist.todolistTitle = newTodolistTitle;
            setTodolists([...todolists]);
        }
    }

    return (
        <div className="App">
            {
                todolists.map(td => {
                    let filteredTasksStatus = tasks[td.id];
                    if (td.taskStatus === 'active') {
                        filteredTasksStatus = tasks[td.id].filter(task => !task.isDone);
                    }
                    if (td.taskStatus === 'completed') {
                        filteredTasksStatus = tasks[td.id].filter(task => task.isDone);
                    }
                    return (
                        <Todolist key={td.id}
                                  id={td.id}
                                  todolistTitle={td.todolistTitle}
                                  tasks={filteredTasksStatus}
                                  removeTask={removeTask}
                                  taskStatus={td.taskStatus}
                                  tasksStatusFilter={tasksStatusFilter}
                                  addTask={addTask}
                                  taskStatusIsChecked={taskStatusIsChecked}
                                  onChangeTaskTitle={onChangeTaskTitle}
                                  onChangeTodolistTitle={onChangeTodolistTitle}
                        />
                    )
                })
            }
        </div>
    );
}

