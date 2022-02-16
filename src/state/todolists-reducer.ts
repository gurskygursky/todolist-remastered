import {Dispatch} from "redux";
import {TasksFilterValueType, todolistAPI, TodolistType} from "../api/todolists-api";
import {setStatusAC, setStatusActionType} from "./app-reducer";

export const removeTodolistAC = (todolistID: string) => ({
    type: 'REMOVE-TODOLIST',
    id: todolistID,
} as const)
export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',
    todolist,
} as const)
export const changeTodolistTitleAC = (todolistID: string, newTodolistTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistID,
    todolistTitle: newTodolistTitle,
} as const)
export const changeTodolistFilterAC = (todolistID: string, changeTaskStatus: TasksFilterValueType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistID,
    changeTaskStatus: changeTaskStatus,
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

export const getTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType | setStatusActionType>) => {
        dispatch(setStatusAC('loading'));
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data));
                dispatch(setStatusAC('succeeded'));
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistTC = (todolistTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(todolistTitle)
            .then((response) => {
                dispatch(addTodolistAC(response.data.data.item))
            })
    }
}
export const changeTodolistTitleTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistID, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(todolistID, title))
            })
    }
}

export type TodolistDomainType = TodolistType & {
    tasksFilterValue: TasksFilterValueType
}
const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, tasksFilterValue: "all"}
            return [...state, newTodolist];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.title = action.todolistTitle;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.tasksFilterValue = action.changeTaskStatus;
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
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