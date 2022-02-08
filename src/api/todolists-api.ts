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

export const todolistAPI = {
    getTodolists() {
        return instance.get(`todo-lists`);
    },
    createTodolist(title: string) {
        return instance.post(`todo-lists`, {title: title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title: title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`);
    },
}
