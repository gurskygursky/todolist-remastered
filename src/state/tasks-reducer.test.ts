import {RemoveTaskActionCreator, tasksReducer} from './tasks-reducer';
import {TasksStateType} from "../Todolist";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        "todolistID1": [
            {id: "1", taskTitle: "HTML & CSS", isDone: true},
            {id: "2", taskTitle: "Javascript", isDone: false},
            {id: "3", taskTitle: "Typescript", isDone: true},
            {id: "4", taskTitle: "React", isDone: true},
            {id: "5", taskTitle: "Rest API", isDone: true},
            {id: "6", taskTitle: "Redux", isDone: true},
        ],
        "todolistID2": [
            {id: "1", taskTitle: "1984", isDone: true},
            {id: "2", taskTitle: "The Financier", isDone: true},
            {id: "3", taskTitle: "The Stoic", isDone: true},
            {id: "4", taskTitle: "The Titan", isDone: true},
            {id: "5", taskTitle: "The Double", isDone: true},
            {id: "6", taskTitle: "The Master and Margarita", isDone: false},
        ],
    };

    const action = RemoveTaskActionCreator("todolistID2", "2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistID1": [
            {id: "1", taskTitle: "HTML & CSS", isDone: true},
            {id: "2", taskTitle: "Javascript", isDone: false},
            {id: "3", taskTitle: "Typescript", isDone: true},
            {id: "4", taskTitle: "React", isDone: true},
            {id: "5", taskTitle: "Rest API", isDone: true},
            {id: "6", taskTitle: "Redux", isDone: true},
        ],
        "todolistID2": [
            {id: "1", taskTitle: "1984", isDone: true},
            {id: "3", taskTitle: "The Stoic", isDone: true},
            {id: "4", taskTitle: "The Titan", isDone: true},
            {id: "5", taskTitle: "The Double", isDone: true},
            {id: "6", taskTitle: "The Master and Margarita", isDone: false},
        ]
    });

});
