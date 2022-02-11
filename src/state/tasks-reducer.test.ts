export {};
// import {v1} from "uuid";
// import {TasksStateType, TaskType, TodolistType} from "../Todolist";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
// import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
//
// // let todolistID1: string;
// // let todolistID2: string;
// let startState: TasksStateType = {};
//
// beforeEach(() => {
//     // todolistID1: v1();
//     // todolistID2: v1();
//
//     startState = {
//         todolistID1: [
//             {id: "1", taskTitle: "HTML & CSS", isDone: true},
//             {id: "2", taskTitle: "Javascript", isDone: false},
//             {id: "3", taskTitle: "Typescript", isDone: true},
//             {id: "4", taskTitle: "React", isDone: true},
//             {id: "5", taskTitle: "Rest API", isDone: true},
//             {id: "6", taskTitle: "Redux", isDone: true},
//         ],
//         todolistID2: [
//             {id: "1", taskTitle: "1984", isDone: true},
//             {id: "2", taskTitle: "The Financier", isDone: true},
//             {id: "3", taskTitle: "The Stoic", isDone: true},
//             {id: "4", taskTitle: "The Titan", isDone: true},
//             {id: "5", taskTitle: "The Double", isDone: true},
//             {id: "6", taskTitle: "The Master and Margarita", isDone: false},
//         ],
//     }
// })
//
// test('correct task should be deleted from correct array', () => {
//     // const startState: TasksStateType = {
//     //     "todolistID1": [
//     //         {id: "1", taskTitle: "HTML & CSS", isDone: true},
//     //         {id: "2", taskTitle: "Javascript", isDone: false},
//     //         {id: "3", taskTitle: "Typescript", isDone: true},
//     //         {id: "4", taskTitle: "React", isDone: true},
//     //         {id: "5", taskTitle: "Rest API", isDone: true},
//     //         {id: "6", taskTitle: "Redux", isDone: true},
//     //     ],
//     //     "todolistID2": [
//     //         {id: "1", taskTitle: "1984", isDone: true},
//     //         {id: "2", taskTitle: "The Financier", isDone: true},
//     //         {id: "3", taskTitle: "The Stoic", isDone: true},
//     //         {id: "4", taskTitle: "The Titan", isDone: true},
//     //         {id: "5", taskTitle: "The Double", isDone: true},
//     //         {id: "6", taskTitle: "The Master and Margarita", isDone: false},
//     //     ],
//     // };
//
//     const action = removeTaskAC("todolistID2", "2");
//     const endState = tasksReducer(startState, action);
//
//     expect(endState).toEqual({
//         todolistID1: [
//             {id: "1", taskTitle: "HTML & CSS", isDone: true},
//             {id: "2", taskTitle: "Javascript", isDone: false},
//             {id: "3", taskTitle: "Typescript", isDone: true},
//             {id: "4", taskTitle: "React", isDone: true},
//             {id: "5", taskTitle: "Rest API", isDone: true},
//             {id: "6", taskTitle: "Redux", isDone: true},
//         ],
//         todolistID2: [
//             {id: "1", taskTitle: "1984", isDone: true},
//             {id: "3", taskTitle: "The Stoic", isDone: true},
//             {id: "4", taskTitle: "The Titan", isDone: true},
//             {id: "5", taskTitle: "The Double", isDone: true},
//             {id: "6", taskTitle: "The Master and Margarita", isDone: false},
//         ]
//     });
//
// });
// test('correct task should be added to correct array', () => {
//     // const startState: TasksStateType = {
//     //     "todolistID1": [
//     //         {id: "1", taskTitle: "HTML & CSS", isDone: true},
//     //         {id: "2", taskTitle: "Javascript", isDone: false},
//     //         {id: "3", taskTitle: "Typescript", isDone: true},
//     //         {id: "4", taskTitle: "React", isDone: true},
//     //         {id: "5", taskTitle: "Rest API", isDone: true},
//     //         {id: "6", taskTitle: "Redux", isDone: true},
//     //     ],
//     //     "todolistID2": [
//     //         {id: "1", taskTitle: "1984", isDone: true},
//     //         {id: "2", taskTitle: "The Financier", isDone: true},
//     //         {id: "3", taskTitle: "The Stoic", isDone: true},
//     //         {id: "4", taskTitle: "The Titan", isDone: true},
//     //         {id: "5", taskTitle: "The Double", isDone: true},
//     //         {id: "6", taskTitle: "The Master and Margarita", isDone: false},
//     //     ],
//     // };
//     const action = addTaskAC("todolistID2", "juice");
//     const endState = tasksReducer(startState, action);
//
//     expect(endState["todolistID1"].length).toBe(6);
//     expect(endState["todolistID2"].length).toBe(7);
//     // expect(endState["todolistID2"][0].id).toBe();
//     expect(endState["todolistID2"][0].taskTitle).toBe("juice");
//     expect(endState["todolistID2"][0].isDone).toBe(false);
//     expect(endState["todolistID2"][1].taskTitle).toBe("1984");
//
// });
// test('status of specified task should be changed', () => {
//     // const startState: TasksStateType = {
//     //     "todolistID1": [
//     //         {id: "1", taskTitle: "HTML & CSS", isDone: true},
//     //         {id: "2", taskTitle: "Javascript", isDone: false},
//     //         {id: "3", taskTitle: "Typescript", isDone: true},
//     //         {id: "4", taskTitle: "React", isDone: true},
//     //         {id: "5", taskTitle: "Rest API", isDone: true},
//     //         {id: "6", taskTitle: "Redux", isDone: true},
//     //     ],
//     //     "todolistID2": [
//     //         {id: "1", taskTitle: "1984", isDone: true},
//     //         {id: "2", taskTitle: "The Financier", isDone: true},
//     //         {id: "3", taskTitle: "The Stoic", isDone: true},
//     //         {id: "4", taskTitle: "The Titan", isDone: true},
//     //         {id: "5", taskTitle: "The Double", isDone: true},
//     //         {id: "6", taskTitle: "The Master and Margarita", isDone: false},
//     //     ],
//     // };
//
//     const action = changeTaskStatusAC("todolistID2", "2", false,);
//     const endState = tasksReducer(startState, action);
//
//     expect(endState["todolistID2"][1].isDone).toBe(false);
//     expect(endState["todolistID1"][1].isDone).toBe(false);
//     expect(endState["todolistID2"][1].taskTitle).toBe("The Financier");
// });
// test('title of specified task should be changed', () => {
//     // const startState: TasksStateType = {
//     //     "todolistID1": [
//     //         {id: "1", taskTitle: "HTML & CSS", isDone: true},
//     //         {id: "2", taskTitle: "Javascript", isDone: false},
//     //         {id: "3", taskTitle: "Typescript", isDone: true},
//     //         {id: "4", taskTitle: "React", isDone: true},
//     //         {id: "5", taskTitle: "Rest API", isDone: true},
//     //         {id: "6", taskTitle: "Redux", isDone: true},
//     //     ],
//     //     "todolistID2": [
//     //         {id: "1", taskTitle: "1984", isDone: true},
//     //         {id: "2", taskTitle: "The Financier", isDone: true},
//     //         {id: "3", taskTitle: "The Stoic", isDone: true},
//     //         {id: "4", taskTitle: "The Titan", isDone: true},
//     //         {id: "5", taskTitle: "The Double", isDone: true},
//     //         {id: "6", taskTitle: "The Master and Margarita", isDone: false},
//     //     ],
//     // };
//
//     const action = changeTaskTitleAC("todolistID2", "2", "Crime and Punishment",);
//
//     const endState = tasksReducer(startState, action);
//
//     expect(endState["todolistID2"][1].isDone).toBe(true);
//     expect(endState["todolistID1"][1].isDone).toBe(false);
//     expect(endState["todolistID2"][1].taskTitle).toBe("Crime and Punishment");
// });
// test('new array should be added when new todolist is added', () => {
//     // const startState: TasksStateType = {
//     //     "todolistID1": [
//     //         {id: "1", taskTitle: "HTML & CSS", isDone: true},
//     //         {id: "2", taskTitle: "Javascript", isDone: false},
//     //         {id: "3", taskTitle: "Typescript", isDone: true},
//     //         {id: "4", taskTitle: "React", isDone: true},
//     //         {id: "5", taskTitle: "Rest API", isDone: true},
//     //         {id: "6", taskTitle: "Redux", isDone: true},
//     //     ],
//     //     "todolistID2": [
//     //         {id: "1", taskTitle: "1984", isDone: true},
//     //         {id: "2", taskTitle: "The Financier", isDone: true},
//     //         {id: "3", taskTitle: "The Stoic", isDone: true},
//     //         {id: "4", taskTitle: "The Titan", isDone: true},
//     //         {id: "5", taskTitle: "The Double", isDone: true},
//     //         {id: "6", taskTitle: "The Master and Margarita", isDone: false},
//     //     ],
//     // };
//
//     const action = addTodolistAC("new todolist");
//     const endState = tasksReducer(startState, action);
//
//     const keys = Object.keys(endState);
//     const newKey = keys.find(k => k !== "todolistID1" && k !== "todolistID2");
//     if (!newKey) {
//         throw Error("new key should be added")
//     }
//
//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toEqual([]);
// });
// test('property with todolistId should be deleted', () => {
//     // const startState: TasksStateType = {
//     //     "todolistID1": [
//     //         {id: "1", taskTitle: "HTML & CSS", isDone: true},
//     //         {id: "2", taskTitle: "Javascript", isDone: false},
//     //         {id: "3", taskTitle: "Typescript", isDone: true},
//     //         {id: "4", taskTitle: "React", isDone: true},
//     //         {id: "5", taskTitle: "Rest API", isDone: true},
//     //         {id: "6", taskTitle: "Redux", isDone: true},
//     //     ],
//     //     "todolistID2": [
//     //         {id: "1", taskTitle: "1984", isDone: true},
//     //         {id: "2", taskTitle: "The Financier", isDone: true},
//     //         {id: "3", taskTitle: "The Stoic", isDone: true},
//     //         {id: "4", taskTitle: "The Titan", isDone: true},
//     //         {id: "5", taskTitle: "The Double", isDone: true},
//     //         {id: "6", taskTitle: "The Master and Margarita", isDone: false},
//     //     ],
//     // };
//
//     const action = removeTodolistAC("todolistID2");
//     const endState = tasksReducer(startState, action);
//
//     const keys = Object.keys(endState);
//
//     expect(keys.length).toBe(1);
//     expect(endState["todolistID2"]).not.toBeDefined();
// });
//
//
