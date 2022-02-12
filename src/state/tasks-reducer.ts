import {v1} from "uuid";
import {TasksStateType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../api/todolists-api";
import { Dispatch } from "redux";

type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    id: string,
    taskID: string,
}
type AddTaskActionType = {
    type: 'ADD_TASK',
    task: TaskType,
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS',
    id: string,
    taskID: string,
    status: TaskStatuses,
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE',
    id: string,
    taskID: string,
    taskTitle: string,
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType;

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
export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        id: todolistID,
        taskID,
        status,
    }
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, taskTitle: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        id: todolistID,
        taskID,
        taskTitle,
    }
}
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
        case 'CHANGE_TASK_STATUS': {
            return {
                ...state,
                [action.id]: state[action.id].map(task => task.id === action.taskID ? {
                    ...task,
                    status: action.status
                } : task)
            }
        }
        case 'CHANGE_TASK_TITLE': {
            return {
                ...state,
                [action.id]: state[action.id].map(task => task.id === action.taskID ? {
                    ...task,
                    taskTitle: action.taskTitle
                } : task)
            }
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.id] = [];
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