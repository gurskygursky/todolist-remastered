import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/editableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";

type TasksPropsType = {
    removeTask: (todolistID: string, taskID: string) => void;
    taskStatusIsChecked: (todolistID: string, taskID: string, status: TaskStatuses) => void;
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
        props.taskStatusIsChecked(props.todolistID, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
    }, [props.taskStatusIsChecked, props.todolistID, props.task.id]);
    const onChangeTaskTitleHandler = useCallback((newInputValue: string) => {
        props.onChangeTaskTitle(props.todolistID, props.task.id, newInputValue);
    }, [props.onChangeTaskTitle, props.todolistID, props.task.id]);

    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox color={"primary"}
                      checked={props.task.status === TaskStatuses.Completed}
                      onChange={onChangeTaskIsChecked}
            />
            <EditableSpan value={props.task.title}
                          onChange={onChangeTaskTitleHandler}
            />
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    );
})