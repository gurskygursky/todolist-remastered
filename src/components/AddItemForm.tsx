import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input value={inputValue}
                   onChange={onChangeInputValueHandler}
                   onKeyPress={keyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}