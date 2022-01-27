import {v1} from "uuid";
import {TasksStateType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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
    isDone: boolean,
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
    | RemoveTodolistActionType;

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
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        id: todolistID,
        taskID,
        isDone,
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
            const task = {id: v1(), taskTitle: action.taskTitle, isDone: false};
            stateCopy[action.todolistID] = [task, ...state[action.todolistID]];
            return stateCopy;
        }
        case 'CHANGE_TASK_STATUS': {
            return {
                ...state,
                [action.id]: state[action.id].map(task => task.id === action.taskID ? {
                    ...task,
                    isDone: action.isDone
                } : task)
                // let task = state[action.id].find(task => task.id === action.taskID);
                // if (task) {
                //     task.isDone = action.isDone;
                // }
                // return {...state}
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
            // let task = state[action.id].find(task => task.id === action.taskID);
            // if (task) {
            //     task.taskTitle = action.taskTitle;
            // }
            // return {...state}
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
        default:
            return state;
        // default:
        //     throw new Error("I don't understand this type")
    }
}