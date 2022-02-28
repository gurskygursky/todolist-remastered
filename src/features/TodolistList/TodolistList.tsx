import React, {useCallback, useEffect} from 'react';
import '../../app/App.css'
import {TasksStateType, Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "../../components/AddItemForm";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    getTodolistsTC,
    removeTodolistTC,
    TodolistDomainType,
} from "../../state/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {Container, Grid} from "@material-ui/core";
import {TasksFilterValueType, TaskStatuses} from "../../api/todolists-api";
import {ErrorSnackbar} from "../../components/ErrorSnackbar/ErrorSnackbar";
import { Navigate } from 'react-router-dom';

export const TodolistList = () => {
    console.log("TodolistList is called");

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, []);

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn);

    const addTask = useCallback((todolistID: string, newTaskTitle: string) => {
        dispatch(addTaskTC(todolistID, newTaskTitle));
    }, [dispatch]);

    const addTodolist = useCallback((todolistTitle: string) => {
        dispatch(addTodolistTC(todolistTitle));
    }, [dispatch]);
    const removeTask = useCallback((todolistID: string, taskID: string) => {
        const thunk = removeTaskTC(todolistID, taskID);
        dispatch(thunk);
    }, [dispatch]);
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID));
    }, [dispatch]);
    const tasksFilter = useCallback((todolistID: string, tasksFilter: TasksFilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistID, tasksFilter));
    }, [dispatch]);
    const taskStatusIsChecked = useCallback((todolistID: string, taskID: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistID, taskID, {status}));
    }, [dispatch]);
    const onChangeTaskTitle = useCallback((todolistID: string, taskID: string, newTaskTitle: string) => {
        dispatch(updateTaskTC(todolistID, taskID, {title: newTaskTitle}));
    }, [dispatch]);
    const onChangeTodolistTitle = useCallback((todolistID: string, newTodolistTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistID, newTodolistTitle));
    }, [dispatch]);

    if (!isLoggedIn) {
        return (
            <Navigate to={'/login'}/>
        )
    }
    return (
        <>
            <div className={"content"}>
                <ErrorSnackbar/>
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
                                            todolist={td}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            removeTodolist={removeTodolist}
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
        </>
    );
}