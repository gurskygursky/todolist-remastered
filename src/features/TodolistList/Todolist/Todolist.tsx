import React, {useCallback, useEffect} from 'react';
import '../../../app/App.css'
import {AddItemForm} from "../../../components/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Tasks} from "./Task/Tasks";
import {TasksFilterValueType, TaskStatuses, TaskType} from "../../../api/todolists-api";
import {getTasksTC} from "../../../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {TodolistDomainType} from "../../../state/todolists-reducer";

type TodolistPropsType = {
    todolist: TodolistDomainType;
    tasks: Array<TaskType>;
    removeTask: (todolistID: string, taskID: string) => void;
    removeTodolist: (todolistID: string) => void;
    addTask: (todolistID: string, newTaskTitle: string) => void;
    tasksFilter: (todolistID: string, tasksFilterValue: TasksFilterValueType) => void;
    taskStatusIsChecked: (todolistID: string, taskID: string, status: TaskStatuses) => void;
    onChangeTaskTitle: (todolistID: string, taskID: string, newTaskTitle: string) => void;
    onChangeTodolistTitle: (todolistID: string, newTodolistTitle: string) => void;
}
export type TasksStateType = {
    [key: string]: Array<TaskType>;
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasksTC(props.todolist.id))
    }, []);

    console.log("Todolist is called")
    const addTask = useCallback((newTaskTitle: string) => {
        props.addTask(props.todolist.id, newTaskTitle);
    }, [props.addTask, props.todolist.id]);
    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id);
    }
    const onChangeTodolistTitleHandler = useCallback((newTodolistTitle: string) => {
        props.onChangeTodolistTitle(props.todolist.id, newTodolistTitle)
    }, [props.onChangeTodolistTitle, props.todolist.id]);

    let tasksForTodolist = props.tasks;
    if (props.todolist.tasksFilterValue === 'active') {
        tasksForTodolist = props.tasks.filter(task => task.status = TaskStatuses.InProgress);
    }
    if (props.todolist.tasksFilterValue === 'completed') {
        tasksForTodolist = props.tasks.filter(task => task.status = TaskStatuses.Completed);
    }

    return (
        <div>
            <EditableSpan value={props.todolist.title}
                          onChange={onChangeTodolistTitleHandler}
            />
            <IconButton onClick={removeTodolist} disabled={props.todolist.appStatus === 'loading'}>
                <Delete/>
            </IconButton>
            <AddItemForm addItem={addTask} disabled={props.todolist.appStatus === 'loading'}/>
            <ul>
                {tasksForTodolist.map(task => <Tasks key={task.id}
                                                     task={task}
                                                     todolistID={props.todolist.id}
                                                     removeTask={props.removeTask}
                                                     taskStatusIsChecked={props.taskStatusIsChecked}
                                                     onChangeTaskTitle={props.onChangeTaskTitle}
                    />
                )}
            </ul>
            <div>
                <Button className={props.todolist.tasksFilterValue === 'all' ? "active-filter" : ""}
                        onClick={() => props.tasksFilter(props.todolist.id, 'all')}
                        color={props.todolist.tasksFilterValue === "all" ? "primary" : "default"}
                        variant={"outlined"}>All</Button>
                <Button className={props.todolist.tasksFilterValue === 'active' ? "active-filter" : ""}
                        onClick={() => props.tasksFilter(props.todolist.id, 'active')}
                        color={props.todolist.tasksFilterValue === "active" ? "primary" : "default"}
                        variant={"outlined"}>Active</Button>
                <Button className={props.todolist.tasksFilterValue === 'completed' ? "active-filter" : ""}
                        onClick={() => props.tasksFilter(props.todolist.id, 'completed')}
                        color={props.todolist.tasksFilterValue === "completed" ? "primary" : "default"}
                        variant={"outlined"}>Completed</Button>
            </div>
        </div>
    );
})