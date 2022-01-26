import {v1} from "uuid";
import {TaskStatusType, TodolistType} from "../Todolist";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string;
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    id: string,
    todolistTitle: string,
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    todolistTitle: string,
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    changeTaskStatus: TaskStatusType,
}
type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistID,
    }
}
export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        id: v1(),
        todolistTitle: newTodolistTitle,
    }
}
export const changeTodolistTitleAC = (todolistID: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistID,
        todolistTitle: newTodolistTitle,
    }
}
export const changeTodolistFilterAC = (todolistID: string, changeTaskStatus: TaskStatusType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistID,
        changeTaskStatus: changeTaskStatus,
    }
}

const initialState: Array<TodolistType> = [];

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.id,
                todolistTitle: action.todolistTitle,
                taskStatus: 'all',
            }];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.todolistTitle = action.todolistTitle;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.taskStatus = action.changeTaskStatus;
            }
            return [...state]
        }
        default: return state;
        // default:
        //     throw new Error("I don't understand this type")
    }
}