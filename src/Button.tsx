import React from "react";
import {TaskType} from "./Todolist";

type UniversalButtonType = {
    removeTask: (id: number) => void,
    task: TaskType,
}

export const UniversalButton = (props: UniversalButtonType) => {
    return (
        <>
            <button onClick={() => props.removeTask(props.task.id)}>x</button>
        </>
    )
}