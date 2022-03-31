import {v1} from 'uuid';
import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {TasksFilterValueType} from "../api/todolists-api";

let todolistID1: string;
let todolistID2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startState = [
        {    id: todolistID1,
            addedDate: '',
            order: 0,
            title: 'What to learn',
            tasksFilterValue: 'all',
            appStatus: "idle",

        },
        {    id: todolistID2,
            addedDate: '',
            order: 0,
            title: 'What to buy',
            tasksFilterValue: 'all',
            appStatus: "idle",
        },
    ]
});
test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC({todolistID: todolistID1}));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});
test('correct todolist should be added', () => {
    let newTodolist = {
        id: v1(),
        addedDate: '',
        order: 0,
        title: 'string',
    };

    const endState = todolistsReducer(startState, addTodolistAC({todolist: newTodolist}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolist.title);
    expect(endState[0].title).toBe('string');
    expect(endState[1].title).toBe("What to learn");
    expect(endState[2].title).toBe("What to buy");
    expect(endState[0].tasksFilterValue).toBe('all');
    expect(endState[1].tasksFilterValue).toBe('all');
    expect(endState[2].tasksFilterValue).toBe('all');
});
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistTitleAC({todolistID: todolistID2, newTodolistTitle}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(endState[1].tasksFilterValue).toBe('all');
});
test('correct filter of todolist should be changed', () => {

    let newFilter: TasksFilterValueType = "completed";

    const endState = todolistsReducer(startState, changeTodolistFilterAC({todolistID: todolistID2, changeTaskStatus: newFilter}));

    expect(endState[0].tasksFilterValue).toBe("all");
    expect(endState[1].tasksFilterValue).toBe(newFilter);
    expect(endState[1].title).toBe("What to buy");
    expect(endState[0].title).toBe("What to learn");
});
test('todolists should be added', () => {

    const action = setTodolistsAC({todolists: startState});

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});
test('correct appStatus of todolist should be changed', () => {

    const action = changeTodolistEntityStatusAC({todolistID: todolistID1, appStatus: 'failed'});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].appStatus).toBe('failed');
    expect(endState[1].appStatus).toBe('idle');
});
