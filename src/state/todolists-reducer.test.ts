import {v1} from 'uuid';
import {TaskStatusType, TodolistType} from "../Todolist";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';

test.skip('correct todolist should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: "What to learn", taskStatus: "all"},
        {id: todolistID2, todolistTitle: "What to buy", taskStatus: "all"},
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});

test('correct todolist should be added', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: "What to learn", taskStatus: "all"},
        {id: todolistID2, todolistTitle: "What to buy", taskStatus: "all"},
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].todolistTitle).toBe(newTodolistTitle);
    expect(endState[0].todolistTitle).toBe("What to learn");
    expect(endState[1].todolistTitle).toBe("What to buy");
    expect(endState[0].taskStatus).toBe("all");
    expect(endState[1].taskStatus).toBe("all");
    expect(endState[2].taskStatus).toBe("all");
});

test.skip('correct todolist should change its name', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: "What to learn", taskStatus: "all"},
        {id: todolistID2, todolistTitle: "What to buy", taskStatus: "all"},
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistID2, newTodolistTitle));

    expect(endState[0].todolistTitle).toBe("What to learn");
    expect(endState[1].todolistTitle).toBe(newTodolistTitle);
    expect(endState[1].taskStatus).toBe('all');
});

test('correct filter of todolist should be changed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newFilter: TaskStatusType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: "What to learn", taskStatus: "all"},
        {id: todolistID2, todolistTitle: "What to buy", taskStatus: "all"}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID2, newFilter));

    expect(endState[0].taskStatus).toBe("all");
    expect(endState[1].taskStatus).toBe(newFilter);
    expect(endState[1].todolistTitle).toBe("What to buy");
    expect(endState[0].todolistTitle).toBe("What to learn");
});
