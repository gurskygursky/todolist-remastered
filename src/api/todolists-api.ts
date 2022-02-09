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
    id: string,
    addedDate: string,
    order: number,
    title: string,
}
type ResponseType<D = {}> = {
    data: D,
    fieldsErrors: string[],
    messages: string[],
    resultCode: number,
}

type TaskType = {
    addedDate: string,
    deadline: string,
    description: string,
    id: string,
    order: number,
    priority: number,
    startDate: string,
    status: number,
    title: string,
    todoListId: string,
}
type GetTasksResponseType = {
    items: TaskType[],
    totalCount: number,
    error: string,
}
type TasksResponseType<T = {}> = {
    data: T,
    resultCode: number,
    messages: string[],
    fieldsErrors: string[],
}


export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>(`todo-lists`);
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`, {title: title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<TasksResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title: title});
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        return instance.put<TasksResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: title});
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TasksResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
}
