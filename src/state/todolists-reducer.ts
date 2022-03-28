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
import {createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "./store";

const initialState: Array<TodolistDomainType> = [];

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC: (state, action: PayloadAction<{ todolistID: string }>) => {
            const index = state.findIndex((td) => td.id === action.payload.todolistID)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({...action.payload.todolist, tasksFilterValue: "all", appStatus: "idle"})
        },
        changeTodolistTitleAC: (state, action: PayloadAction<{ todolistID: string, newTodolistTitle: string }>) => {
            const index = state.findIndex((td) => td.id === action.payload.todolistID);
            state[index].title = action.payload.newTodolistTitle;
        },
        changeTodolistFilterAC: (state, action: PayloadAction<{ todolistID: string, changeTaskStatus: TasksFilterValueType}>) => {
            const index = state.findIndex((td) => td.id === action.payload.todolistID);
            state[index].tasksFilterValue = action.payload.changeTaskStatus;
        },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{ todolistID: string, appStatus: RequestStatusType }>) => {
            const index = state.findIndex((td) => td.id === action.payload.todolistID);
            state[index].appStatus = action.payload.appStatus;
        },
        setTodolistsAC: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
           return action.payload.todolists.map(td => ({
                ...td,
                todolistTitle: td.title,
                id: td.id,
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

//thunks
export const getTodolistsTC = (): ThunkAction<void, AppRootStateType, unknown, SetAppStatusActionType | SetTodolistsActionType > => {
    return (dispatch) => {
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

//types
export type TodolistDomainType = TodolistType & {
    tasksFilterValue: TasksFilterValueType
    appStatus: RequestStatusType
}
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>;
export type LogoutClearDataActionType = ReturnType<typeof logoutClearDataAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;