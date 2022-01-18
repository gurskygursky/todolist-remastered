import {todolistsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../Todolist";

test('correct todolist should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: "What to learn", taskStatus: "all"},
        {id: todolistID2, todolistTitle: "What to buy", taskStatus: "all"}
    ]

    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistID1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});
