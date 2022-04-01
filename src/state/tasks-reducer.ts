import {TasksStateType} from "../features/todolists/todolist/Todolist";
import {
    addTodolistAC,
    AddTodolistActionType, changeTodolistEntityStatusAC,
    ChangeTodolistEntityStatusActionType, logoutClearDataAC, LogoutClearDataActionType, removeTodolistAC,
    RemoveTodolistActionType, setTodolistsAC,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, TodolistType, UpdateTaskType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {};

export const getTasksTC = createAsyncThunk('tasks/getTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({appStatus: 'loading'}))
    return todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            thunkAPI.dispatch(setAppStatusAC({appStatus: 'succeeded'}));
            return {tasks, todolistId}
        });
});
export const removeTaskTC = createAsyncThunk('tasks/deleteTask', async (param: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({appStatus: 'loading'}))
    todolistAPI.deleteTask(param.todolistId, param.taskId)
        .then(() => {
            thunkAPI.dispatch(setAppStatusAC({appStatus: 'succeeded'}));
            return {todolistID: param.todolistId, taskID: param.taskId};
        });
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        // removeTaskAC: (state, action: PayloadAction<{ todolistID: string, taskID: string }>) => {
        //     const tasks = state[action.payload.todolistID];
        //     const index = tasks.findIndex((task) => task.id === action.payload.taskID)
        //     if (index > -1) {
        //         tasks.splice(index, 1)
        //     }
        // },
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC: (state, action: PayloadAction<{ todolistID: string, taskID: string, domainModel: UpdateTaskDomainType }>) => {
            const tasks = state[action.payload.todolistID];
            const index = tasks.findIndex((task) => task.id === action.payload.taskID)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        },
        // setTasksAC: (state, action: PayloadAction<{ tasks: Array<TaskType>, todolistID: string }>) => {
        //     state[action.payload.todolistID] = action.payload.tasks;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC, (state, action: PayloadAction<{ todolistID: string }>) => {
            delete state[action.payload.todolistID];
        });
        builder.addCase(setTodolistsAC, (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(logoutClearDataAC, () => {
            return {}
        });
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks;
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.meta.arg.todolistId];
            const index = tasks.findIndex((task) => task.id === action.meta.arg.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
    },
});

export const {addTaskAC, updateTaskAC} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

//thunks
// export const getTasksTC_ = (todolistId: string) => {
//     return (dispatch: Dispatch<ActionsType | SetAppStatusActionType>,) => {
//         dispatch(setAppStatusAC({appStatus: 'loading'}))
//         todolistAPI.getTasks(todolistId)
//             .then((res) => {
//                 const tasks = res.data.items
//                 dispatch(setTasksAC({tasks, todolistID: todolistId}))
//                 dispatch(setAppStatusAC({appStatus: 'succeeded'}))
//             })
//     }
// }
// export const removeTaskTC_ = (todolistId: string, taskId: string) => {
//     return (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
//         dispatch(setAppStatusAC({appStatus: 'loading'}))
//         todolistAPI.deleteTask(todolistId, taskId)
//             .then(() => {
//                 dispatch(removeTaskAC({todolistID: todolistId, taskID: taskId}))
//                 dispatch(setAppStatusAC({appStatus: 'succeeded'}))
//             })
//     }
// }
export const addTaskTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType | ChangeTodolistEntityStatusActionType>) => {
        dispatch(setAppStatusAC({appStatus: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({todolistID, appStatus: 'loading'}))
        todolistAPI.createTask(todolistID, title)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(addTaskAC({task: response.data.data.item}))
                    dispatch(setAppStatusAC({appStatus: 'succeeded'}))
                    dispatch(changeTodolistEntityStatusAC({todolistID, appStatus: 'succeeded'}))
                } else {
                    handleServerAppError(response.data, dispatch)
                    dispatch(changeTodolistEntityStatusAC({todolistID, appStatus: 'failed'}))
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTodolistEntityStatusAC({todolistID, appStatus: 'failed'}))
            })
    }
}
export const updateTaskTC = (todolistID: string, taskID: string, domainModel: UpdateTaskDomainType) => {
    return (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType | ChangeTodolistEntityStatusActionType>, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistID].find((t: any) => t.id === taskID);
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
                dispatch(setAppStatusAC({appStatus: 'loading'}))
                if (response.data.resultCode === 0) {
                    dispatch(updateTaskAC({todolistID, taskID, domainModel}))
                    dispatch(setAppStatusAC({appStatus: 'succeeded'}))
                } else {
                    handleServerAppError(response.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTodolistEntityStatusAC({todolistID, appStatus: 'failed'}))
            })
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
    | ReturnType<typeof addTaskAC>
    | LogoutClearDataActionType;