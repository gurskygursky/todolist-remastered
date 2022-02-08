import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '7933de6b-6016-40ed-bd74-54247c2003f2',
    },
}

export const todolistAPI = {
    getTodolists() {
        const promise = axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/`, settings)
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/`, {title: title}, settings)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise
    },
}
