import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    value: string;
    onChange: (newInputValue: string) => void;
    disabled?: boolean;
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log("EditableSpan is called");
    let [editMode, setEditMode] = useState<boolean>(false);
    let [inputValue, setInputValue] = useState<string>("");

    const activateEditMode = () => {
        setEditMode(true);
        setInputValue(props.value);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.onChange(inputValue);
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }
    const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            deactivateEditMode();
        }
    }

    return (
        editMode
            ? <TextField value={inputValue}
                         onChange={onChangeInputHandler}
                         onBlur={deactivateEditMode}
                         autoFocus={true}
                         onKeyPress={keyPressHandler}
                         disabled={props.disabled}
            />
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    );
})