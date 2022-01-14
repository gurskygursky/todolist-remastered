import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";

type TodolistPropsType = {
    id: string,
    todolistTitle: string;
    tasks: Array<TaskType>;
    removeTask: (todolistID: string, taskID: string) => void;
    tasksStatusFilter: (todolistID: string, taskStatus: TaskStatusType) => void;
    taskStatusIsChecked: (todolistID: string, taskID: string, isDone: boolean) => void;
    addTask: (todolistID: string, newTaskTitle: string) => void;
    changeTaskTitle: (todolistID: string, taskID: string, newTaskTitle: string) => void;
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

type EditableSpanType = {
    value: string;
    onChange: (newInputValue: string) => void
}
export const EditableSpan = (props: EditableSpanType) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [inputValue, setInputValue] = useState<string>('');

    const activateEditMode = () => {
        setEditMode(true);
        setInputValue(props.value);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.onChange(inputValue);
    }
    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }

    return (
        editMode
            ? <input value={inputValue}
                     onChange={onChangeInputValueHandler}
                     onBlur={deactivateEditMode}
                     autoFocus={true}
            />
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    )
}

export const Todolist = (props: TodolistPropsType) => {

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
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
                        const onChangeTaskTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(props.id, task.id, newValue);
                        }
                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeTaskIsChecked}/>
                                {/*<span>{task.taskTitle}</span>*/}
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