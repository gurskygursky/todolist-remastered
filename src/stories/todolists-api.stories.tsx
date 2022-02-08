import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '7933de6b-6016-40ed-bd74-54247c2003f2',
    },
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
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
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
            .then((response) => {
                setState(response.data)
            })
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '92b7799b-db3d-41e4-b3fb-d8e2a154b437';
    useEffect(() => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then((response) => {
                setState(response.data)
            })
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '49709188-a2af-44c3-91bb-2dda54afb9c4';
    const title = 'Create with api1111';
    useEffect(() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
            .then((response) => {
                setState(response.data)
            })
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
