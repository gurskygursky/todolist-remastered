import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Tasks} from "./Tasks";
import {TasksFilterValueType, TaskStatuses, TaskType} from "./api/todolists-api";
import {fetchTodolistsThunkCreator} from "./state/todolists-reducer";
import {fetchTasksTC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";

type TodolistPropsType = {
    id: string,
    todolistTitle: string;
    tasks: Array<TaskType>;
    removeTask: (todolistID: string, taskID: string) => void;/**/
    removeTodolist: (todolistID: string) => void;
    addTask: (todolistID: string, newTaskTitle: string) => void;
    tasksFilter: (todolistID: string, tasksFilterValue: TasksFilterValueType) => void;
    taskStatusIsChecked: (todolistID: string, taskID: string, status: TaskStatuses) => void;
    onChangeTaskTitle: (todolistID: string, taskID: string, newTaskTitle: string) => void;
    onChangeTodolistTitle: (todolistID: string, newTodolistTitle: string) => void;
    tasksFilterValue: TasksFilterValueType;
}
// export type TodolistType = {
//     id: string;
//     todolistTitle: string;
//     tasksFilterValue: TasksFilterValueType;
// }
// export type TasksFilterValueType = 'all' | 'active' | 'completed';

// export type TaskType = {
//     id: string;
//     taskTitle: string;
//     isDone: boolean;
// }
export type TasksStateType = {
    [key: string]: Array<TaskType>;
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, []);

    console.log("Todolist is called")
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
        tasksForTodolist = props.tasks.filter(task => task.status = TaskStatuses.InProgress);
    }
    if (props.tasksFilterValue === 'completed') {
        tasksForTodolist = props.tasks.filter(task => task.status = TaskStatuses.Completed);
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
                {tasksForTodolist.map(task => <Tasks key={task.id}
                                                     task={task}
                                                     todolistID={props.id}
                                                     removeTask={props.removeTask}
                                                     taskStatusIsChecked={props.taskStatusIsChecked}
                                                     onChangeTaskTitle={props.onChangeTaskTitle}
                    />
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

