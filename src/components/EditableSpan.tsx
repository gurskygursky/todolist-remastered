import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    value: string;
    onChange: (newInputValue: string) => void;
}
export const EditableSpan = (props: EditableSpanType) => {

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

    return (
        editMode
            ? <input value={inputValue}
                     onChange={onChangeInputHandler}
                     onBlur={deactivateEditMode}
                     autoFocus={true}/>
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    );
}