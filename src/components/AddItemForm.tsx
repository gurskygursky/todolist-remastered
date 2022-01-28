import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void;
}
export const AddItemForm = (props: AddItemFormType) => {

    let [inputValue, setInputValue] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setInputValue(event.currentTarget.value);
    }

    const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
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
                       // className={error ? "error" : ""}
            />
            <IconButton color={"primary"} onClick={addItem}>
                <AddBox/>
            </IconButton>
            {/*<Button variant={"contained"} color={"primary"} size={"medium"} onClick={addItem}>+</Button>*/}
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    )
}