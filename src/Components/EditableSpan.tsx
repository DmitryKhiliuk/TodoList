import React, {ChangeEvent, useState} from 'react';

export type EditableSpanType = {
    value: string
    onChange: (newTitle:string) => void
}

export const EditableSpan = (props:EditableSpanType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }
    
    const onClickHandler = () => {
      setEditMode(true)
      setTitle(props.value)
    }

    const onBlurHandler = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return (
        <>
            {editMode ?
                <input type="text" onChange={onChangeHandler} value={title} onBlur={onBlurHandler} /> :
                <span onClick={onClickHandler}>{props.value}</span>}


        </>
    );
};

