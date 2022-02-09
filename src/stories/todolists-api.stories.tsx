import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((response) => {
                setState(response.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const title = 'Create with api'
    useEffect(() => {
        todolistAPI.createTodolist(title)
            .then((response) => {
                setState(response.data)
            })
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '65f2e749-c7e6-442d-bc70-38a3f3082011';
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '96b2ef0c-f890-45c5-89a5-180ef325b35f';
    const title = 'Create with api333';
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '96b2ef0c-f890-45c5-89a5-180ef325b35f';
    useEffect(() => {
        todolistAPI.getTasks(todolistId)
            .then((response) => {
                setState(response.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '96b2ef0c-f890-45c5-89a5-180ef325b35f';
    const title = 'task2';
    useEffect(() => {
        todolistAPI.createTask(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '96b2ef0c-f890-45c5-89a5-180ef325b35f';
    const taskId = 'f13defd0-6e93-44c6-b3f7-5c20e44c3d3c'
    const title = 'task222';
    useEffect(() => {
        todolistAPI.updateTaskTitle(todolistId, taskId, title)
            .then((response) => {
                setState(response.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '96b2ef0c-f890-45c5-89a5-180ef325b35f';
    const taskId = 'f13defd0-6e93-44c6-b3f7-5c20e44c3d3c'
    useEffect(() => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((response) => {
                setState(response.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, []);
    return <div> {JSON.stringify(state)}</div>
}