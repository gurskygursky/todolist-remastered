import {v1} from "uuid";
import {TasksStateType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    id: string,
    taskID: string,
}
type AddTaskActionType = {
    type: 'ADD_TASK',
    task: TaskType,
}
// type ChangeTaskStatusActionType = {
//     type: 'CHANGE_TASK_STATUS',
//     todolistID: string,
//     taskID: string,
//     updateModel: UpdateTaskDomainType,
// }
// type ChangeTaskTitleActionType = {
//     type: 'CHANGE_TASK_TITLE',
//     // task: TaskType,
//     todolistID: string,
//     taskID: string,
//     updateModel: UpdateTaskDomainType,
//     // taskTitle: string,
// }
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
export type UpdateTaskDomainType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    // | ChangeTaskStatusActionType
    // | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType
    | ReturnType<typeof updateTaskAC>;

export const removeTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        id: todolistID,
        taskID,
    }
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        task,
    }
}
// export const changeTaskStatusAC = (todolistID: string, taskID: string, updateModel: UpdateTaskDomainType): ChangeTaskStatusActionType => {
//     return {
//         type: 'CHANGE_TASK_STATUS',
//         todolistID,
//         taskID,
//         updateModel,
//     }
// }
// export const changeTaskTitleAC = (todolistID: string, taskID: string, updateModel: UpdateTaskDomainType): ChangeTaskTitleActionType => {
//     return {
//         type: 'CHANGE_TASK_TITLE',
//         // task,
//         todolistID,
//         taskID,
//         updateModel,
//         // taskTitle,
//     }
// }
export const updateTaskAC = (todolistID: string, taskID: string, domainModel: UpdateTaskDomainType) => ({
    type: 'UPDATE_TASK',
    todolistID,
    taskID,
    domainModel,
} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(() => {
                const action = removeTaskAC(todolistId, taskId)
                dispatch(action)
            })
    }
}
export const addTaskTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistID, title)
            .then((response) => {
                const action = addTaskAC(response.data.data.item)
                dispatch(action)
            })
    }
}
// export const changeTaskTitleTC = (todolistID: string, taskID: string, title: string) => {
//     return (dispatch: Dispatch) => {
//         todolistAPI.updateTaskTitle(todolistID, taskID, title)
//             .then((response) => {
//                 const action = changeTaskTitleAC(response.data.data.item)
//                 dispatch(action)
//             })
//     }
// }
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
                const action = updateTaskAC(todolistID, taskID, domainModel)
                dispatch(action)
            })
    }
}
// export const changeTaskTitleTC = (todolistID: string, taskID: string, title: string) => {
//     return (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const state = getState();
//         const task = state.tasks[todolistID].find(t => t.id === taskID);
//         if (!task) {
//             console.warn('Error');
//             return
//         }
//         const updateModel: UpdateTaskType = {
//             title: title,
//             description: task.description,
//             status: task.status,
//             priority: task.priority,
//             startDate: task.startDate,
//             deadline: task.deadline,
//         }
//         todolistAPI.updateTask(todolistID, taskID, updateModel)
//             .then(() => {
//                 const action = changeTaskTitleAC(todolistID, taskID, updateModel)
//                 dispatch(action)
//             })
//     }
// }
// export const changeTaskStatusTC = (todolistID: string, taskID: string, status: TaskStatuses) => {
//     return (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const state = getState();
//         const task = state.tasks[todolistID].find(t => t.id === taskID);
//         if (!task) {
//             console.warn('Error');
//             return
//         }
//         const updateModel: UpdateTaskType = {
//                 title: task.title,
//                 description: task.description,
//                 status: status,
//                 priority: task.priority,
//                 startDate: task.startDate,
//                 deadline: task.deadline,
//         }
//         todolistAPI.updateTask(todolistID, taskID, updateModel)
//             .then(() => {
//                 const action = changeTaskStatusAC(todolistID, taskID, status)
//                 dispatch(action)
//             })
//     }
// }


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
            // const task: TaskType = {
            //     id: v1(),
            //     title: action.taskTitle,
            //     status: TaskStatuses.New,
            //     addedDate: '',
            //     deadline: '',
            //     description: '',
            //     order: 0,
            //     priority: TaskPriorities.Low,
            //     startDate: '',
            //     todoListId: action.todolistID
            // };
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
        // case 'CHANGE_TASK_STATUS': {
        //     return {
        //         ...state,
        //         [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
        //             ...task,
        //             status: action.updateModel.status
        //         } : task)
        //     }
        // }
        // case 'CHANGE_TASK_TITLE': {
        //     return {
        //         ...state,
        //         [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
        //             ...task,
        //             title: action.updateModel.title
        //         } : task)
        //     }
        // }
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
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        default:
            return state;
    }
}