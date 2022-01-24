import {TasksStateType} from "../Todolist";

type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    todolistID: string,
    taskID: string,
}
type AddTaskActionType = {
    type: 'ADD_TASK',
    todolistID: string,
    taskTitle: string,
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS',
    todolistID: string,
    taskID: string,
    isDone: boolean,
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE',
    todolistID: string,
    taskID: string,
    taskTitle: string,
}
type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType;

export const removeTaskActionCreator = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        todolistID,
        taskID,
    }
}
export const addTaskActionCreator = (todolistID: string, taskTitle: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        todolistID,
        taskTitle,
    }
}
export const changeTaskStatusActionCreator = (todolistID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        todolistID,
        taskID,
        isDone,
    }
}
export const changeTaskTitleActionCreator = (todolistID: string, taskID: string, taskTitle: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        todolistID,
        taskID,
        taskTitle,
    }
}

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistID];
            stateCopy[action.todolistID] = tasks.filter(task => task.id !== action.taskID);
            return stateCopy;
        }
        case 'ADD_TASK': {
            const stateCopy = {...state};
            const task = {id: "1", taskTitle: action.taskTitle, isDone: false};
            stateCopy[action.todolistID] = [task, ...state[action.todolistID]];
            return stateCopy;
        }
        case 'CHANGE_TASK_STATUS': {
            let task = state[action.todolistID].find(task => task.id === action.taskID);
            if (task) {
                task.isDone = action.isDone;
            }
            return {...state}
        }
        case 'CHANGE_TASK_TITLE': {
            let task = state[action.todolistID].find(task => task.id === action.taskID);
            if (task) {
                task.taskTitle = action.taskTitle;
            }
            return {...state}
        }
        default:
            throw new Error("I don't understand this type")
    }
}