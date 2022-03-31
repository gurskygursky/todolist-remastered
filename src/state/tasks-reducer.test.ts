import {TasksStateType} from "../features/todolists/todolist/Todolist";
import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


let startState: TasksStateType = {};

beforeEach(() => {
    startState = {
        'todolistID1': [
            {
                id: "1", title: "HTML & CSS", status: TaskStatuses.New, todoListId: 'todolistID1',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, description: ''
            },
            {
                id: "2", title: "Javascript", status: TaskStatuses.New, todoListId: 'todolistID1',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, description: ''
            },
            {
                id: "3", title: "Typescript", status: TaskStatuses.New, todoListId: 'todolistID1',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, description: ''
            },
            {
                id: "4", title: "React", status: TaskStatuses.New, todoListId: 'todolistID1',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, description: ''
            },
            {
                id: "5", title: "Rest API", status: TaskStatuses.New, todoListId: 'todolistID1',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, description: ''
            },
            {
                id: "6", title: "Redux", status: TaskStatuses.New, todoListId: 'todolistID1',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, description: ''
            },
        ],
        'todolistID2': [
            {
                id: "1", title: "1984", status: TaskStatuses.New, todoListId: 'todolistID2',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, description: ''
            },
            {
                id: "2", title: "The Financier", status: TaskStatuses.New, todoListId: 'todolistID2',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, description: ''
            },
            {
                id: "3", title: "The Stoic", status: TaskStatuses.New, todoListId: 'todolistID2',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, description: ''
            },
            {
                id: "4", title: "The Titan", status: TaskStatuses.New, todoListId: 'todolistID2',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, description: ''
            },
            {
                id: "5", title: "The Double", status: TaskStatuses.New, todoListId: 'todolistID2',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, description: ''
            },
            {
                id: "6", title: "The Master and Margarita", status: TaskStatuses.New, todoListId: 'todolistID2',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, description: ''
            },
        ],
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC({todolistID: "todolistID2", taskID: "2"});
    const endState = tasksReducer(startState, action);

    expect(endState['todolistID1'].length).toBe(6);
    expect(endState['todolistID2'].length).toBe(5);
    expect(endState['todolistID1'].every(t => t.id !== '2')).toBeTruthy();

});
test('correct task should be added to correct array', () => {
    const task = {
        id: "1",
        title: "juice",
        status: TaskStatuses.New,
        todoListId: 'todolistID2',
        priority: TaskPriorities.Low,
        deadline: '',
        startDate: '',
        addedDate: '',
        order: 0,
        description: '',
    }
    const action = addTaskAC({task: task});
    const endState = tasksReducer(startState, action);

    expect(endState["todolistID1"].length).toBe(6);
    expect(endState["todolistID2"].length).toBe(7);
    expect(endState["todolistID2"][0].title).toBe("juice");
    expect(endState["todolistID2"][0].status).toBe(TaskStatuses.New);
    expect(endState["todolistID2"][1].title).toBe("1984");
    expect(endState["todolistID2"][6].title).toBe("The Master and Margarita");

});
test('status of specified task should be changed', () => {
    const action = updateTaskAC({todolistID: "todolistID2", taskID: "2", domainModel: {status: TaskStatuses.Completed}});
    const endState = tasksReducer(startState, action);

    expect(endState["todolistID2"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistID1"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistID2"][1].title).toBe("The Financier");
});
test('title of specified task should be changed', () => {
    const action = updateTaskAC({todolistID: "todolistID2", taskID: "2", domainModel: {title: "Crime and Punishment"}});

    const endState = tasksReducer(startState, action);

    expect(endState["todolistID2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistID1"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistID2"][1].title).toBe("Crime and Punishment");
});
test('new array should be added when new todolist is added', () => {
    const todolist = {
        id: '2',
        addedDate: '',
        order: 0,
        title: 'todolistID3',
    }
    const action = addTodolistAC({todolist: todolist});
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistID1" && k !== "todolistID2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[keys[3]]).toEqual(undefined)
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC({todolistID: "todolistID2"});
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistID2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC({todolists: [
            {    id: 'todolistID1',
                addedDate: '',
                order: 0,
                title: 'What to buy',
            },
            {    id: 'todolistID2',
                addedDate: '',
                order: 0,
                title: 'What to read',
            },
        ]})

    const endState = tasksReducer({}, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['todolistID1']).toBeDefined();
    expect(endState['todolistID2']).toBeDefined();
});

test('tasks should be added for todolist', () => {

    const action = setTasksAC({tasks: startState['todolistID1'], todolistID: 'todolistID1'});

    const endState = tasksReducer({
        'todolistID1': [],
        'todolistID2': [],
    }, action);

    expect(endState['todolistID1'].length).toBe(6);
    expect(endState['todolistID2'].length).toBe(0);
})


