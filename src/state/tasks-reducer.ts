import {v1} from "uuid";
import {TasksStateType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    id: string,
    taskID: string,
}
type AddTaskActionType = {
    type: 'ADD_TASK',
    todolistID: string,
    taskTitle: string,
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
type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType;

export const removeTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        id: todolistID,
        taskID,
    }
}
export const addTaskAC = (todolistID: string, taskTitle: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        todolistID,
        taskTitle,
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
            const task: TaskType = {
                id: v1(),
                title: action.taskTitle,
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: action.todolistID
            };
            stateCopy[action.todolistID] = [task, ...state[action.todolistID]];
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
        
        default:
            return state;
    }
}