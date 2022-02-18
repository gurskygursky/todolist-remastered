import {Dispatch} from "redux";
import {TasksFilterValueType, todolistAPI, TodolistType} from "../api/todolists-api";
import {setAppErrorAC, setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "./app-reducer";

//actions
export const removeTodolistAC = (todolistID: string) => ({
    type: 'REMOVE_TODOLIST',
    id: todolistID,
} as const)
export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD_TODOLIST',
    todolist,
} as const)
export const changeTodolistTitleAC = (todolistID: string, newTodolistTitle: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    id: todolistID,
    todolistTitle: newTodolistTitle,
} as const)
export const changeTodolistFilterAC = (todolistID: string, changeTaskStatus: TasksFilterValueType) => ({
    type: 'CHANGE_TODOLIST_FILTER',
    id: todolistID,
    changeTaskStatus: changeTaskStatus,
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
    return (dispatch: Dispatch<ActionsType | setAppStatusActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
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
                }
                if (response.data.resultCode !== 0) {
                    dispatch(setAppErrorAC(response.data.messages[0]))
                    dispatch(setAppStatusAC('succeeded'))
                }
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
                }
                if (response.data.resultCode !==0) {
                    dispatch(setAppErrorAC(response.data.messages[0]))
                    dispatch(setAppStatusAC('succeeded'))
                }
            })
    }
}

export type TodolistDomainType = TodolistType & {
    tasksFilterValue: TasksFilterValueType
}
const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD_TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, tasksFilterValue: "all"}
            return [...state, newTodolist];
        }
        case 'CHANGE_TODOLIST_TITLE': {
            let todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.title = action.todolistTitle;
            }
            return [...state]
        }
        case 'CHANGE_TODOLIST_FILTER': {
            let todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.tasksFilterValue = action.changeTaskStatus;
            }
            return [...state]
        }
        case 'SET_TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                todolistTitle: tl.title,
                id: tl.id,
                tasksFilterValue: "all",
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

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>;