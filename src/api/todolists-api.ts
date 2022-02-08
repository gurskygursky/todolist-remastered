import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '7933de6b-6016-40ed-bd74-54247c2003f2',
    },
}

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    ...settings,
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateTodolistResponseType = {
    data: {
        item: TodolistType,
    }
    fieldsErrors: string[],
    messages: string[],
    resultCode: number,
}
type UpdateTodolistResponseType = {
    data: {},
    fieldsErrors: string[],
    messages: string[],
    resultCode: number,
}
type DeleteTodolistResponseType = {
    data: {},
    fieldsErrors: string[],
    messages: string[],
    resultCode: number,
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>(`todo-lists`);
    },
    createTodolist(title: string) {
        return instance.post<CreateTodolistResponseType>(`todo-lists`, {title: title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<UpdateTodolistResponseType>(`todo-lists/${todolistId}`, {title: title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<DeleteTodolistResponseType>(`todo-lists/${todolistId}`);
    },
}
