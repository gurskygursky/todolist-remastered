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
type ActionsType = RemoveTaskActionType | AddTaskActionType;

export const RemoveTaskActionCreator = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        todolistID,
        taskID,
    }
}
export const AddTaskActionCreator = (todolistID: string, taskTitle: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        todolistID,
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
        default:
            throw new Error("I don't understand this type")
    }
}