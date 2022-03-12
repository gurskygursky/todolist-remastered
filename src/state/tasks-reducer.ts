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
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {};
const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ todolistID: string, taskID: string }>) => {
            const stateCopy = {...state};
            const tasks = state[action.payload.taskID];
            stateCopy[action.payload.todolistID] = tasks.filter(task => task.id !== action.payload.taskID);
            return stateCopy;
        },
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            const stateCopy = {...state};
            const task = action.payload.task;
            stateCopy[task.todoListId] = [task, ...state[task.todoListId]];
            return stateCopy;
        },
        updateTaskAC: (state, action: PayloadAction<{ todolistID: string, taskID: string, domainModel: UpdateTaskDomainType }>) => {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(task => task.id === action.payload.taskID
                        ? {...task, ...action.payload.domainModel}
                        : task)
            }
        },
        setTasksAC: (state, action: PayloadAction<{ tasks: Array<TaskType>, todolistID: string }>) => {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistID] = action.payload.tasks
            return stateCopy
        },
    },
    extraReducers: {
        [addTodolistAC.type]:
            (state, action: PayloadAction<{ todolist: TodolistType }>) => {
                const stateCopy = {...state};
                stateCopy[action.payload.todolist.id] = [];
                return stateCopy;
            },
        [removeTodolistAC.type]:
            (state, action: PayloadAction<{ todolistID: string }>) => {
                const stateCopy = {...state};
                delete stateCopy[action.payload.todolistID];
                return stateCopy;
            },
        [setTodolistsAC.type]:
            (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
                const stateCopy = {...state}
                action.payload.todolists.forEach((tl: any) => {
                    stateCopy[tl.id] = []
                })
                return stateCopy;
            },
        [logoutClearDataAC.type]:
            (state, action: PayloadAction) => {
                return {}
            }
    },
});
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

//actions
// export const removeTaskAC = (todolistID: string, taskID: string) => ({
//     type: 'REMOVE_TASK',
//     id: todolistID,
//     taskID,
// } as const)
// export const addTaskAC = (task: TaskType) => ({
//     type: 'ADD_TASK',
//     task,
// } as const)
// export const updateTaskAC = (todolistID: string, taskID: string, domainModel: UpdateTaskDomainType) => ({
//     type: 'UPDATE_TASK',
//     todolistID,
//     taskID,
//     domainModel,
// } as const)
// export const setTasksAC = (tasks: Array<TaskType>, todolistID: string) => ({
//     type: 'SET_TASKS',
//     tasks,
//     todolistID
// } as const)

//thunks
export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | SetAppStatusActionType>,) => {
        dispatch(setAppStatusAC({appStatus: 'loading'}))
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC({tasks, todolistID: todolistId}))
                dispatch(setAppStatusAC({appStatus: 'succeeded'}))
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
        dispatch(setAppStatusAC({appStatus: 'loading'}))
        todolistAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(removeTaskAC({todolistID: todolistId, taskID: taskId}))
                dispatch(setAppStatusAC({appStatus: 'succeeded'}))
            })
    }
}
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

// export const tasksReducer = (state: TasksStateType = initialState, action: any): TasksStateType => {
//     switch (action.type) {
//         case "REMOVE_TASK": {
//             const stateCopy = {...state};
//             const tasks = state[action.id];
//             stateCopy[action.id] = tasks.filter(task => task.id !== action.taskID);
//             return stateCopy;
//         }
//         case "ADD_TASK": {
//             const stateCopy = {...state};
//             const task = action.task;
//             stateCopy[task.todoListId] = [task, ...state[task.todoListId]];
//             return stateCopy;
//         }
//         case "UPDATE_TASK": {
//             return {
//                 ...state,
//                 [action.todolistID]: state[action.todolistID]
//                     .map(task => task.id === action.taskID
//                         ? {...task, ...action.domainModel}
//                         : task)
//             }
//         }
//         case addTodolistAC.type: {
//             const stateCopy = {...state};
//             stateCopy[action.payload.todolist.id] = [];
//             return stateCopy;
//         }
//         case removeTodolistAC.type: {
//             const stateCopy = {...state};
//             delete stateCopy[action.payload.todolistID];
//             return stateCopy;
//         }
//         case setTodolistsAC.type: {
//             const stateCopy = {...state}
//             action.payload.todolists.forEach((tl: any) => {
//                 stateCopy[tl.id] = []
//             })
//             return stateCopy;
//         }
//         case "SET_TASKS": {
//             const stateCopy = {...state}
//             stateCopy[action.todolistID] = action.tasks
//             return stateCopy
//         }
//         case "LOGOUT_CLEAR_DATA":
//             return {}
//         default:
//             return state;
//     }
// }

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
    // | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    // | ReturnType<typeof removeTaskAC>
    // | ReturnType<typeof updateTaskAC>
    | LogoutClearDataActionType;