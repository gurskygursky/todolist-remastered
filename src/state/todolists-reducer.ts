import {v1} from "uuid";
import {TodolistType} from "../Todolist";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                todolistTitle: action.todolistTitle,
                taskStatus: 'all',
            }]
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
                todolist.taskStatus = action.taskStatus;
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}