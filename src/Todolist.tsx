import React, {ChangeEvent} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

type TodolistPropsType = {
    id: string,
    todolistTitle: string;
    tasks: Array<TaskType>;
    removeTask: (todolistID: string, taskID: string) => void;
    addTask: (todolistID: string, newTaskTitle: string) => void;
    tasksStatusFilter: (todolistID: string, taskStatus: TaskStatusType) => void;
    taskStatusIsChecked: (todolistID: string, taskID: string, isDone: boolean) => void;
    onChangeTaskTitle: (todolistID: string, taskID: string, newTaskTitle: string) => void;
    onChangeTodolistTitle: (todolistID: string, newTodolistTitle: string) => void;
    taskStatus: TaskStatusType;
}
export type TodolistType = {
    id: string;
    todolistTitle: string;
    taskStatus: TaskStatusType;
}
export type TaskStatusType = 'all' | 'active' | 'completed';

export type TaskType = {
    id: string;
    taskTitle: string;
    isDone: boolean;
}
export type TasksStateType = {
    [key: string]: Array<TaskType>;
}

export const Todolist = (props: TodolistPropsType) => {

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const onChangeTodolistTitleHandler = (newTodolistTitle: string) => {
        props.onChangeTodolistTitle(props.id, newTodolistTitle)
    }

    return (
        <div>
            <EditableSpan value={props.todolistTitle}
                          onChange={onChangeTodolistTitleHandler}
            />
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(props.id, task.id)
                        }
                        const onChangeTaskIsChecked = (event: ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = event.currentTarget.checked;
                            props.taskStatusIsChecked(props.id, task.id, newIsDoneValue);
                        }
                        const onChangeTaskTitleHandler = (newInputValue: string) => {
                            props.onChangeTaskTitle(props.id, task.id, newInputValue);
                        }
                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeTaskIsChecked}/>
                                <EditableSpan value={task.taskTitle}
                                              onChange={onChangeTaskTitleHandler}
                                />
                                <button onClick={removeTask}>x</button>
                            </li>

                        )
                    }
                )}
            </ul>
            <div>
                <button className={props.taskStatus === 'all' ? "active-filter" : ""}
                        onClick={() => props.tasksStatusFilter(props.id, 'all')}>All
                </button>
                <button className={props.taskStatus === 'active' ? "active-filter" : ""}
                        onClick={() => props.tasksStatusFilter(props.id, 'active')}>Active
                </button>
                <button className={props.taskStatus === 'completed' ? "active-filter" : ""}
                        onClick={() => props.tasksStatusFilter(props.id, 'completed')}>Completed
                </button>
            </div>
        </div>
    );
}

