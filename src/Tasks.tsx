import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TasksPropsType = {
    removeTask: (todolistID: string, taskID: string) => void;
    taskStatusIsChecked: (todolistID: string, taskID: string, isDone: boolean) => void;
    onChangeTaskTitle: (todolistID: string, taskID: string, newTaskTitle: string) => void;
    task: TaskType;
    todolistID: string;
}
export const Tasks = React.memo((props: TasksPropsType) => {
    const removeTask = useCallback(() => {
        props.removeTask(props.todolistID, props.task.id)
    }, [props.removeTask, props.todolistID, props.task.id]);
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