import {Dispatch} from "redux";
import {TasksFilterValueType, todolistAPI, TodolistType} from "../api/todolists-api";
import {
    RequestStatusType,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {getTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = [];

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC: (state, action: PayloadAction<{ todolistID: string }>) => {
            state.filter(tl => tl.id !== action.payload.todolistID);
        },
        addTodolistAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({...action.payload.todolist, tasksFilterValue: "all", appStatus: "idle"})
        },
        changeTodolistTitleAC: (state, action: PayloadAction<{ todolistID: string, newTodolistTitle: string }>) => {
            state.map(td => td.id === action.payload.todolistID ? {...td, title: action.payload.newTodolistTitle} : td)
        },
        changeTodolistFilterAC: (state, action: PayloadAction<{ todolistID: string, changeTaskStatus: TasksFilterValueType }>) => {
            state.map(td => td.id === action.payload.changeTaskStatus ? {
                ...td,
                tasksFilterValue: action.payload.changeTaskStatus
            } : td)
        },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{ todolistID: string, appStatus: RequestStatusType }>) => {
            state.map(td => td.id === action.payload.todolistID ? {...td, appStatus: action.payload.appStatus} : td)
        },
        setTodolistsAC: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
           return action.payload.todolists.map(tl => ({
                ...tl,
                todolistTitle: tl.title,
                id: tl.id,
                tasksFilterValue: "all",
                appStatus: 'idle',
            }))
        },
        logoutClearDataAC: () => { return [] },
    },
});

export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    setTodolistsAC,
    logoutClearDataAC
} = todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;

//actions
// export const removeTodolistAC = (todolistID: string) => ({
//     type: 'REMOVE_TODOLIST',
//     todolistID,
// } as const)
// export const addTodolistAC = (todolist: TodolistType) => ({
//     type: 'ADD_TODOLIST',
//     todolist,
// } as const)
// export const changeTodolistTitleAC = (todolistID: string, newTodolistTitle: string) => ({
//     type: 'CHANGE_TODOLIST_TITLE',
//     todolistID,
//     todolistTitle: newTodolistTitle,
// } as const)
// export const changeTodolistFilterAC = (todolistID: string, changeTaskStatus: TasksFilterValueType) => ({
//     type: 'CHANGE_TODOLIST_FILTER',
//     todolistID,
//     changeTaskStatus: changeTaskStatus,
// } as const)
// export const changeTodolistEntityStatusAC = (id: string, appStatus: RequestStatusType) => ({
//     type: 'CHANGE_TODOLIST_ENTITY_STATUS',
//     id,
//     appStatus,
// } as const)
// export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET_TODOLISTS', todolists} as const)
// export const logoutClearDataAC = () => ({type: 'LOGOUT_CLEAR_DATA'} as const)

//thunks
export const getTodolistsTC = () => {
    // return (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppStatusActionType>) => {
    return (dispatch: any) => {
        dispatch(setAppStatusAC({appStatus: 'loading'}));
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC({todolists: res.data}));
                dispatch(setAppStatusAC({appStatus: 'succeeded'}));
                return res.data;
            })
            .then((td) => {
                td.forEach((tl) => {
                    dispatch(getTasksTC(tl.id))
                });
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<RemoveTodolistActionType | SetAppStatusActionType | SetAppErrorActionType | ChangeTodolistEntityStatusActionType>) => {
        dispatch(setAppStatusAC({appStatus: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({todolistID: todolistId, appStatus: 'loading'}))
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC({todolistID: todolistId}))
                dispatch(setAppStatusAC({appStatus: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTodolistEntityStatusAC({todolistID: todolistId, appStatus: 'failed'}))
            })
    }
}
export const addTodolistTC = (todolistTitle: string) => {
    return (dispatch: Dispatch<AddTodolistActionType | SetAppStatusActionType | SetAppErrorActionType>) => {
        dispatch(setAppStatusAC({appStatus: 'loading'}))
        todolistAPI.createTodolist(todolistTitle)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(addTodolistAC({todolist: response.data.data.item}))
                    dispatch(setAppStatusAC({appStatus: 'succeeded'}))
                } else {
                    handleServerAppError(response.data, dispatch)
                    dispatch(setAppStatusAC({appStatus: 'failed'}))
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                dispatch(setAppStatusAC({appStatus: 'failed'}))
            })
    }
}
export const changeTodolistTitleTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch<ChangeTodolistTitleActionType | SetAppStatusActionType | SetAppErrorActionType>) => {
        dispatch(setAppStatusAC({appStatus: 'loading'}))
        todolistAPI.updateTodolist(todolistID, title)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC({todolistID, newTodolistTitle: title}))
                    dispatch(setAppStatusAC({appStatus: 'succeeded'}))
                } else {
                    handleServerAppError(response.data, dispatch)
                    dispatch(changeTodolistEntityStatusAC({todolistID, appStatus: 'failed'}))
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTodolistEntityStatusAC({todolistID, appStatus: 'failed'}))
            })
    }
}

// export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case "REMOVE_TODOLIST": {
//             return state.filter(tl => tl.id !== action.todolistID)
//         }
//         case "ADD_TODOLIST": {
//             const newTodolist: TodolistDomainType = {...action.todolist, tasksFilterValue: "all", appStatus: "idle"}
//             return [...state, newTodolist];
//         }
//         case "CHANGE_TODOLIST_TITLE": {
//             return state.map(td => td.id === action.todolistID ? {...td, title: action.todolistTitle} : td)
//         }
//         case "CHANGE_TODOLIST_FILTER": {
//             return state.map(td => td.id === action.changeTaskStatus ? {
//                 ...td,
//                 tasksFilterValue: action.changeTaskStatus
//             } : td)
//         }
//         case "CHANGE_TODOLIST_ENTITY_STATUS": {
//             return state.map(td => td.id === action.id ? {...td, appStatus: action.appStatus} : td)
//         }
//         case "SET_TODOLISTS": {
//             return action.todolists.map(tl => ({
//                 ...tl,
//                 todolistTitle: tl.title,
//                 id: tl.id,
//                 tasksFilterValue: "all",
//                 appStatus: 'idle',
//             }))
//         }
//         case 'LOGOUT_CLEAR_DATA':
//             return [];
//         default:
//             return state;
//     }
// }

//types
export type TodolistDomainType = TodolistType & {
    tasksFilterValue: TasksFilterValueType
    appStatus: RequestStatusType
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
export type LogoutClearDataActionType = ReturnType<typeof logoutClearDataAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

// type ActionsType = RemoveTodolistActionType
//     | AddTodolistActionType
//     | SetTodolistsActionType
//     | ChangeTodolistEntityStatusActionType
//     | ReturnType<typeof changeTodolistTitleAC>
//     | ReturnType<typeof changeTodolistFilterAC>
//     | LogoutClearDataActionType;