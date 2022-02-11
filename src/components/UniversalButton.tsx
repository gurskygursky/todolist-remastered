import React from "react";
import {TaskType} from "../api/todolists-api";

type UniversalButtonType = {
    removeTask: (id: string) => void,
    task: TaskType,
    buttonTitle: string,
}

export const UniversalButton = (props: UniversalButtonType) => {
    return (
        <>
            <button onClick={() => props.removeTask(props.task.id)}>{props.buttonTitle}</button>
        </>
    )
}