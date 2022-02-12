import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TasksStateType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistAC, addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC,
    fetchTodolistsThunkCreator,
    removeTodolistAC, removeTodolistTC,
    TodolistDomainType,
} from "./state/todolists-reducer";
import {
    addTaskAC, addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC, changeTaskTitleTC,
    removeTaskTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Header} from "./components/header/Header";
import {Container, Grid} from "@material-ui/core";
import {TasksFilterValueType, TaskStatuses, TodolistType} from "./api/todolists-api";

export function AppWithRedux() {
    console.log("App is called");

    useEffect(() => {
        dispatch(fetchTodolistsThunkCreator());
    }, []);

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    // const addTask = useCallback((todolistID: string, newTaskTitle: string) => {
    //     dispatch(addTaskAC(todolistID, newTaskTitle));
    // }, [dispatch]);
    const addTask = useCallback((todolistID: string, newTaskTitle: string) => {
        dispatch(addTaskTC(todolistID, newTaskTitle));
    }, [dispatch]);
    // const addTodolist = useCallback((todolistTitle: string) => {
    //     dispatch(addTodolistAC(todolistTitle));
    // }, [dispatch]);
    const addTodolist = useCallback((todolistTitle: string) => {
        dispatch(addTodolistTC(todolistTitle));
    }, [dispatch]);
    // const removeTask = useCallback((todolistID: string, taskID: string) => {
    //     const action = removeTaskAC(todolistID, taskID);
    //     dispatch(action);
    // }, [dispatch]);
    const removeTask = useCallback((todolistID: string, taskID: string) => {
        const thunk = removeTaskTC(todolistID, taskID);
        dispatch(thunk);
    }, [dispatch]);
    // const removeTodolist = useCallback((todolistID: string) => {
    //     dispatch(removeTodolistAC(todolistID));
    // }, [dispatch]);
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID));
    }, [dispatch]);
    const tasksFilter = useCallback((todolistID: string, tasksFilter: TasksFilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistID, tasksFilter));
    }, [dispatch]);
    const taskStatusIsChecked = useCallback((todolistID: string, taskID: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, status));
    }, [dispatch]);
    // const onChangeTaskTitle = useCallback((todolistID: string, taskID: string, newTaskTitle: string) => {
    //     dispatch(changeTaskTitleAC(todolistID, taskID, newTaskTitle));
    // }, [dispatch]);
    const onChangeTaskTitle = useCallback((todolistID: string, taskID: string, newTaskTitle: string) => {
        dispatch(changeTaskTitleTC(todolistID, taskID, newTaskTitle));
    }, [dispatch]);
    // const onChangeTodolistTitle = useCallback((todolistID: string, newTodolistTitle: string) => {
    //     dispatch(changeTodolistTitleAC(todolistID, newTodolistTitle));
    // }, [dispatch]);
    const onChangeTodolistTitle = useCallback((todolistID: string, newTodolistTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistID, newTodolistTitle));
    }, [dispatch]);

    return (
        <div className="app">
            <Header/>
            <div className={"content"}>
                <Container fixed>
                    <Grid container>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={5}>
                        {
                            todolists.map(td => {
                                let tasksForTodolist = tasks[td.id];

                                return (<Grid item key={td.id}>
                                        <Todolist
                                            id={td.id}
                                            todolistTitle={td.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            removeTodolist={removeTodolist}
                                            tasksFilterValue={td.tasksFilterValue}
                                            tasksFilter={tasksFilter}
                                            addTask={addTask}
                                            taskStatusIsChecked={taskStatusIsChecked}
                                            onChangeTaskTitle={onChangeTaskTitle}
                                            onChangeTodolistTitle={onChangeTodolistTitle}
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>

            </div>
        </div>
    );
}