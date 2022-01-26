import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksStateType, TaskStatusType, Todolist, TodolistType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export function AppWithRedux() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, todolistTitle: 'What to learn', taskStatus: 'all'},
        {id: todolistID2, todolistTitle: 'Reading list', taskStatus: 'all'},
    ]);

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
        dispatchToTasksReducer(addTaskAC(todolistID, newTaskTitle));
    }
    const addTodolist = (todolistTitle: string) => {
        dispatchToTodolistsReducer(addTodolistAC(todolistTitle));
    }

    const removeTask = (todolistID: string, taskID: string) => {
        const action = removeTaskAC(todolistID, taskID);
        dispatchToTasksReducer(action);

    }
    const removeTodolist = (todolistID: string) => {
        dispatchToTodolistsReducer(removeTodolistAC(todolistID));
    }
    const tasksStatusFilter = (todolistID: string, taskStatus: TaskStatusType) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistID, taskStatus));
    }
    const taskStatusIsChecked = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatchToTasksReducer(changeTaskStatusAC(todolistID, taskID, isDone));
    }
    const onChangeTaskTitle = (todolistID: string, taskID: string, newTaskTitle: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(todolistID, taskID, newTaskTitle));
    }
    const onChangeTodolistTitle = (todolistID: string, newTodolistTitle: string) => {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistID, newTodolistTitle));
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
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
                                  removeTodolist={removeTodolist}
                                  taskStatus={td.taskStatus}
                                  tasksStatusFilter={tasksStatusFilter}
                                  addTask={addTask}
                                  taskStatusIsChecked={taskStatusIsChecked}
                                  onChangeTaskTitle={onChangeTaskTitle}
                                  onChangeTodolistTitle={onChangeTodolistTitle}
                                  addTodolist={addTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

