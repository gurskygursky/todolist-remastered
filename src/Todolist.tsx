import React, {ChangeEvent, useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodolistPropsType = {
    id: string,
    todolistTitle: string;
    tasks: Array<TaskType>;
    removeTask: (todolistID: string, taskID: string) => void;/**/
    removeTodolist: (todolistID: string) => void;
    addTask: (todolistID: string, newTaskTitle: string) => void;
    tasksFilter: (todolistID: string, tasksFilterValue: TasksFilterValueType) => void;
    taskStatusIsChecked: (todolistID: string, taskID: string, isDone: boolean) => void;
    onChangeTaskTitle: (todolistID: string, taskID: string, newTaskTitle: string) => void;
    onChangeTodolistTitle: (todolistID: string, newTodolistTitle: string) => void;
    tasksFilterValue: TasksFilterValueType;
}
export type TodolistType = {
    id: string;
    todolistTitle: string;
    tasksFilterValue: TasksFilterValueType;
}
export type TasksFilterValueType = 'all' | 'active' | 'completed';

export type TaskType = {
    id: string;
    taskTitle: string;
    isDone: boolean;
}
export type TasksStateType = {
    [key: string]: Array<TaskType>;
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log("Todolist is called")
    // const addTask = (title: string) => {
    //     props.addTask(props.id, title)
    // }
    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title);
    }, [props.addTask, props.id]);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const onChangeTodolistTitleHandler = useCallback((newTodolistTitle: string) => {
        props.onChangeTodolistTitle(props.id, newTodolistTitle)
    }, [props.onChangeTodolistTitle, props.id]);

    let tasksForTodolist = props.tasks;
    if (props.tasksFilterValue === 'active') {
        tasksForTodolist = props.tasks.filter(task => !task.isDone);
    }
    if (props.tasksFilterValue === 'completed') {
        tasksForTodolist = props.tasks.filter(task => task.isDone);
    }

    return (
        <div>
            <EditableSpan value={props.todolistTitle}
                          onChange={onChangeTodolistTitleHandler}
            />
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksForTodolist.map(task => <Tasks task={task}
                                                     todolistID={props.id}
                                                     removeTask={props.removeTask}
                                                     taskStatusIsChecked={props.taskStatusIsChecked}
                                                     onChangeTaskTitle={props.onChangeTaskTitle}
                    />
                    // const removeTask = () => {
                    //     props.removeTask(props.id, task.id)
                    // }
                    // const onChangeTaskIsChecked = (event: ChangeEvent<HTMLInputElement>) => {
                    //     const newIsDoneValue = event.currentTarget.checked;
                    //     props.taskStatusIsChecked(props.id, task.id, newIsDoneValue);
                    // }
                    // const onChangeTaskTitleHandler = (newInputValue: string) => {
                    //     props.onChangeTaskTitle(props.id, task.id, newInputValue);
                    // }
                    // return (
                    //     <li key={task.id} className={task.isDone ? "is-done" : ""}>
                    //         <Checkbox color={"primary"}
                    //                   checked={task.isDone}
                    //                   onChange={onChangeTaskIsChecked}
                    //         />
                    //         <EditableSpan value={task.taskTitle}
                    //                       onChange={onChangeTaskTitleHandler}
                    //         />
                    //         <IconButton onClick={removeTask}>
                    //             <Delete/>
                    //         </IconButton>
                    //     </li>
                    // )

                )}
            </ul>
            <div>
                <Button className={props.tasksFilterValue === 'all' ? "active-filter" : ""}
                        onClick={() => props.tasksFilter(props.id, 'all')}
                        color={props.tasksFilterValue === "all" ? "primary" : "default"}
                        variant={"outlined"}>All</Button>
                <Button className={props.tasksFilterValue === 'active' ? "active-filter" : ""}
                        onClick={() => props.tasksFilter(props.id, 'active')}
                        color={props.tasksFilterValue === "active" ? "primary" : "default"}
                        variant={"outlined"}>Active</Button>
                <Button className={props.tasksFilterValue === 'completed' ? "active-filter" : ""}
                        onClick={() => props.tasksFilter(props.id, 'completed')}
                        color={props.tasksFilterValue === "completed" ? "primary" : "default"}
                        variant={"outlined"}>Completed</Button>
            </div>
        </div>
    );
})

type TasksPropsType = {
    removeTask: (todolistID: string, taskID: string) => void;
    taskStatusIsChecked: (todolistID: string, taskID: string, isDone: boolean) => void;
    onChangeTaskTitle: (todolistID: string, taskID: string, newTaskTitle: string) => void;
    task: TaskType;
    todolistID: string;
}

export const Tasks = React.memo((props: TasksPropsType) => {
    const removeTask = () => {
        props.removeTask(props.todolistID, props.task.id)
    }
    const onChangeTaskIsChecked = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = event.currentTarget.checked;
        props.taskStatusIsChecked(props.todolistID, props.task.id, newIsDoneValue);
    }, [props.taskStatusIsChecked, props.todolistID, props.task.id]);
    const onChangeTaskTitleHandler = useCallback((newInputValue: string) => {
        props.onChangeTaskTitle(props.todolistID, props.task.id, newInputValue);
    }, [props.onChangeTaskTitle, props.todolistID, props.task.id]);
    return (
        <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox color={"primary"}
                      checked={props.task.isDone}
                      onChange={onChangeTaskIsChecked}
            />
            <EditableSpan value={props.task.taskTitle}
                          onChange={onChangeTaskTitleHandler}
            />
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})