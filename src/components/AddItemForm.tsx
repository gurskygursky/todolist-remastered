import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void;
    disabled?: boolean;
}
export const AddItemForm = React.memo((props: AddItemFormType) => {
    console.log("AddItemForm is called");
    let [inputValue, setInputValue] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        setInputValue(event.currentTarget.value);
    }

    const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (event.key === 'Enter') {
            if (inputValue.trim() !== '') {
                props.addItem(inputValue.trim());
                setInputValue('');
            } else {
                setError("Title is required!")
            }
        }
    }

    const addItem = () => {
        if (inputValue.trim() !== '') {
            props.addItem(inputValue.trim());
            setInputValue('');
        } else {
            setError("Title is required!")
        }
    }

    return (
        <div>
            <TextField variant={"outlined"}
                       size={"small"}
                       value={inputValue}
                       onChange={onChangeInputValueHandler}
                       onKeyPress={keyPressHandler}
                       error={!!error}
                       label={"Title"}
                       helperText={error}
            />
            <IconButton color={"primary"} onClick={addItem} disabled={props.disabled}>
                <AddBox/>
            </IconButton>
        </div>
    )
})