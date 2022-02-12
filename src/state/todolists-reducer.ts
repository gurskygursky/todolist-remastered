import {v1} from "uuid";

import {Dispatch} from "redux";
import {TasksFilterValueType, todolistAPI, TodolistType} from "../api/todolists-api";
import {changeTaskTitleAC} from "./tasks-reducer";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string;
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType,
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    todolistTitle: string,
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    changeTaskStatus: TasksFilterValueType,
}
type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType;

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistID,
    }
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        todolist,
    }
}
export const changeTodolistTitleAC = (todolistID: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistID,
        todolistTitle: newTodolistTitle,
    }
}
export const changeTodolistFilterAC = (todolistID: string, changeTaskStatus: TasksFilterValueType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistID,
        changeTaskStatus: changeTaskStatus,
    }
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}
// export const fetchTodolistsThunk = (dispatch: Dispatch) => {
//     todolistAPI.getTodolists()
//         .then((res) => {
//             dispatch(setTodolistsAC(res.data))
//         })
// }
export const fetchTodolistsThunkCreator = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
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
                const action = changeTodolistTitleAC(todolistID, title)
                dispatch(action)
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
            // return [...state, {
                // id: action.todolist.id,
                // title: action.todolist.title,
                // tasksFilterValue: 'all',
                // addedDate: '',
                // order: 0,
            // }];
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
        // default:
        //     throw new Error("I don't understand this type")
    }
}