import {TasksStateType} from "../features/TodolistList/Todolist/Todolist";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppErrorAC, setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "./app-reducer";

//actions
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
    type: 'SET_TASKS',
    tasks,
    todolistID
} as const)

//thunks
export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | setAppStatusActionType>,) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionsType | setAppStatusActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTaskTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch<ActionsType | setAppStatusActionType | setAppErrorActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTask(todolistID, title)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(addTaskAC(response.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                }
                if (response.data.resultCode !== 0) {
                    dispatch(setAppErrorAC(response.data.messages[0]))
                    dispatch(setAppStatusAC('succeeded'))
                }
            })
    }
}
export const updateTaskTC = (todolistID: string, taskID: string, domainModel: UpdateTaskDomainType) => {
    return (dispatch: Dispatch<ActionsType | setAppStatusActionType | setAppErrorActionType>, getState: () => AppRootStateType) => {
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
            .then((response) => {
                dispatch(setAppStatusAC('loading'))
                if (response.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistID, taskID, domainModel))
                    dispatch(setAppStatusAC('succeeded'))
                }
                if (response.data.resultCode !== 0) {
                    dispatch(setAppErrorAC(response.data.messages[0]))
                    dispatch(setAppStatusAC('succeeded'))
                }
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
        case 'ADD_TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolist.id] = [];
            return stateCopy;
        }
        case 'REMOVE_TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'SET_TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET_TASKS': {
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