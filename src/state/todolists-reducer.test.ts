import {
    AddtodolistActionCreator,
    ChangeTodlistFilterActionCreator,
    ChangeTodolistTitleActionCreator,
    RemoveTodolistActionCreator,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TaskStatusType, TodolistType} from "../Todolist";

test.skip('correct todolist should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: "What to learn", taskStatus: "all"},
        {id: todolistID2, todolistTitle: "What to buy", taskStatus: "all"},
    ]

    // const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistID1});
    const endState = todolistsReducer(startState, RemoveTodolistActionCreator(todolistID1));

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

    const endState = todolistsReducer(startState, AddtodolistActionCreator(newTodolistTitle))

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

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     id: todolistID2,
    //     todolistTitle: newTodolistTitle,
    // };
    // const action = ChangeTodolistTitleActionCreator(todolistID2, newTodolistTitle);


    const endState = todolistsReducer(startState, ChangeTodolistTitleActionCreator(todolistID2, newTodolistTitle));

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

    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     id: todolistID2,
    //     taskStatus: newFilter,
    // };

    const endState = todolistsReducer(startState, ChangeTodlistFilterActionCreator(todolistID2, newFilter));

    expect(endState[0].taskStatus).toBe("all");
    expect(endState[1].taskStatus).toBe(newFilter);
    expect(endState[1].todolistTitle).toBe("What to buy");
    expect(endState[0].todolistTitle).toBe("What to learn");
});
