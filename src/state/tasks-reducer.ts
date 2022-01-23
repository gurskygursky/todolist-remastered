import {TasksStateType} from "../Todolist";

type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    todolistID: string,
    taskID: string,
}
type ActionsType = RemoveTaskActionType;

export const RemoveTaskActionCreator = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        todolistID,
        taskID,
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
        default:
            throw new Error("I don't understand this type")
    }
}