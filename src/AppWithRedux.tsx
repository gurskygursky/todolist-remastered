import React from 'react';
import './App.css';
import {TasksStateType, TasksFilterValueType, Todolist, TodolistType} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const addTask = (todolistID: string, newTaskTitle: string) => {
        dispatch(addTaskAC(todolistID, newTaskTitle));
    }
    const addTodolist = (todolistTitle: string) => {
        dispatch(addTodolistAC(todolistTitle));
    }

    const removeTask = (todolistID: string, taskID: string) => {
        const action = removeTaskAC(todolistID, taskID);
        dispatch(action);
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
    }
    const tasksFilter = (todolistID: string, tasksFilter: TasksFilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistID, tasksFilter));
    }
    const taskStatusIsChecked = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone));
    }
    const onChangeTaskTitle = (todolistID: string, taskID: string, newTaskTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, newTaskTitle));
    }
    const onChangeTodolistTitle = (todolistID: string, newTodolistTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTodolistTitle));
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(td => {
                    let filteredTasksStatus = tasks[td.id];
                    if (td.tasksFilterValue === 'active') {
                        filteredTasksStatus = tasks[td.id].filter(task => !task.isDone);
                    }
                    if (td.tasksFilterValue === 'completed') {
                        filteredTasksStatus = tasks[td.id].filter(task => task.isDone);
                    }
                    return (
                        <Todolist key={td.id}
                                  id={td.id}
                                  todolistTitle={td.todolistTitle}
                                  tasks={filteredTasksStatus}
                                  removeTask={removeTask}
                                  removeTodolist={removeTodolist}
                                  tasksFilterValue={td.tasksFilterValue}
                                  tasksFilter={tasksFilter}
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