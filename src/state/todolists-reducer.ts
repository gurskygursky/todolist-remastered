import {Dispatch} from "redux";
import {TasksFilterValueType, todolistAPI, TodolistType} from "../api/todolists-api";
import {
    RequestStatusType,
    setAppErrorAC,
    setAppErrorActionType,
    setAppStatusAC,
    setAppStatusActionType
} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

//actions
export const removeTodolistAC = (todolistID: string) => ({
    type: 'REMOVE_TODOLIST',
    todolistID,
} as const)
export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD_TODOLIST',
    todolist,
} as const)
export const changeTodolistTitleAC = (todolistID: string, newTodolistTitle: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    todolistID,
    todolistTitle: newTodolistTitle,
} as const)
export const changeTodolistFilterAC = (todolistID: string, changeTaskStatus: TasksFilterValueType) => ({
    type: 'CHANGE_TODOLIST_FILTER',
    todolistID,
    changeTaskStatus: changeTaskStatus,
} as const)
export const changeTodolistEntityStatusAC = (id: string, appStatus: RequestStatusType) => ({
    type: 'CHANGE_TODOLIST_ENTITY_STATUS',
    id,
    appStatus,
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET_TODOLISTS', todolists} as const)

//thunks
export const getTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType | setAppStatusActionType>) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data));
                dispatch(setAppStatusAC('succeeded'));
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | setAppStatusActionType | setAppErrorActionType | ChangeTodolistEntityStatusActionType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
            })
    }
}
export const addTodolistTC = (todolistTitle: string) => {
    return (dispatch: Dispatch<ActionsType | setAppStatusActionType | setAppErrorActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodolist(todolistTitle)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(addTodolistAC(response.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(response.data, dispatch)
                    dispatch(setAppStatusAC('failed'))
                }
                // if (response.data.resultCode !== 0) {
                //     dispatch(setAppErrorAC(response.data.messages[0]))
                //     dispatch(setAppStatusAC('failed'))
                // }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                dispatch(setAppStatusAC('failed'))
            })
    }
}
export const changeTodolistTitleTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch<ActionsType | setAppStatusActionType | setAppErrorActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodolist(todolistID, title)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(todolistID, title))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(response.data, dispatch)
                    dispatch(changeTodolistEntityStatusAC(todolistID, 'failed'))
                }
                // if (response.data.resultCode !== 0) {
                //     dispatch(setAppErrorAC(response.data.messages[0]))
                //     dispatch(setAppStatusAC('failed'))
                // }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTodolistEntityStatusAC(todolistID, 'failed'))
            })
    }
}

export type TodolistDomainType = TodolistType & {
    tasksFilterValue: TasksFilterValueType
    appStatus: RequestStatusType
}
const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return state.filter(tl => tl.id !== action.todolistID)
        }
        case "ADD_TODOLIST": {
            const newTodolist: TodolistDomainType = {...action.todolist, tasksFilterValue: "all", appStatus: "idle"}
            return [...state, newTodolist];
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map(td => td.id === action.todolistID ? {...td, title: action.todolistTitle} : td)

            // let todolist = state.find(td => td.id === action.todolistID)
            // if (todolist) {
            //     todolist.title = action.todolistTitle;
            // }
            // return [...state]
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map(td => td.id === action.changeTaskStatus ? {...td, tasksFilterValue: action.changeTaskStatus} : td)
            // let todolist = state.find(td => td.id === action.todolistID)
            // if (todolist) {
            //     todolist.tasksFilterValue = action.changeTaskStatus;
            // }
            // return [...state]
        }
        case "CHANGE_TODOLIST_ENTITY_STATUS": {
            return state.map(td => td.id === action.id ? {...td, appStatus: action.appStatus} : td)
        }
        case "SET_TODOLISTS": {
            return action.todolists.map(tl => ({
                ...tl,
                todolistTitle: tl.title,
                id: tl.id,
                tasksFilterValue: "all",
                appStatus: 'idle',
            }))
        }
        default:
            return state;
    }
}

//types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ChangeTodolistEntityStatusActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>;