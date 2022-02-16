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

export type TodolistType = {
    id: string,
    addedDate: string,
    order: number,
    title: string,
}
export type TasksFilterValueType = 'all' | 'active' | 'completed';

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft,
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later,
}
export type TaskType = {
    addedDate: string,
    deadline: string,
    description: string,
    id: string,
    order: number,
    priority: TaskPriorities,
    startDate: string,
    status: TaskStatuses,
    title: string,
    todoListId: string,
}
export type UpdateTaskType = {
    title: string,
    description: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
}
type ResponseType<D = {}> = {
    data: D,
    fieldsErrors: string[],
    messages: string[],
    resultCode: number,
}
type GetTasksResponseType = {
    items: TaskType[],
    totalCount: number,
    error: string,
}


export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>(`todo-lists`);
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`, {title: title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{item: TodolistType}>>(`todo-lists/${todolistId}`, {title: title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title: title});
    },
    updateTask(todolistId: string, taskId: string, updateModel: UpdateTaskType) {
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, updateModel);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
}
