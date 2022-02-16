import {TasksStateType} from "../features/TodolistList/Todolist/Todolist";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: 'REMOVE_TASK',
    id: todolistID,
    taskID,
} as const)
export const addTaskAC = (task: TaskType) => ({
    type: 'ADD_TASK',
    task,
} as const)
export const updateTaskAC = (todolistID: string, taskID: string, domainModel: UpdateTaskDomainType) => ({
    type: 'UPDATE_TASK',
    todolistID,
    taskID,
    domainModel,
} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistID: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistID
} as const)

export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}
export const addTaskTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistID, title)
            .then((response) => {
                dispatch(addTaskAC(response.data.data.item))
            })
    }
}
export const updateTaskTC = (todolistID: string, taskID: string, domainModel: UpdateTaskDomainType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistID].find(t => t.id === taskID);
        if (!task) {
            console.warn('Error');
            return
        }
        const apiModel: UpdateTaskType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todolistAPI.updateTask(todolistID, taskID, apiModel)
            .then(() => {
                dispatch(updateTaskAC(todolistID, taskID, domainModel))
            })
    }
}

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            const stateCopy = {...state};
            const tasks = state[action.id];
            stateCopy[action.id] = tasks.filter(task => task.id !== action.taskID);
            return stateCopy;
        }
        case 'ADD_TASK': {
            const stateCopy = {...state};
            const task = action.task;
            stateCopy[task.todoListId] = [task, ...state[task.todoListId]];
            return stateCopy;
        }
        case "UPDATE_TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(task => task.id === action.taskID
                        ? {...task, ...action.domainModel}
                        : task)
            }
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolist.id] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistID] = action.tasks
            return stateCopy
        }
        default:
            return state;
    }
}

//types
export type UpdateTaskDomainType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ActionsType =
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>;