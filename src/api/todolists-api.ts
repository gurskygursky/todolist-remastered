import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '7933de6b-6016-40ed-bd74-54247c2003f2',
    },
}

export const todolistAPI = {
    getTodolists() {
        return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/`, settings);
    },
    createTodolist(title: string) {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/`, {title: title}, settings);
    },
    updateTodolist(todolistId: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings);
    },
    deleteTodolist(todolistId: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings);
    },
}
