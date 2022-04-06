import React, {ChangeEvent, useState} from 'react';


type EditableSpanType = {
    callBack: (newTitle:string) => void
    title: string
}


export const EditableSpan = (props:EditableSpanType) => {

    const [newTitle, setNewTitle] = useState(props.title)
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value)
    }


    const [edit, setEdit] = useState(false)
    const onBlurHandler = () => {
        setEdit(false)
        props.callBack(newTitle)
    }
    const onDblclickHandler = () => {
        setEdit(true)

    }
    return (
        <span>
            {edit ?
            <input onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>:
            <span onDoubleClick={onDblclickHandler}>{props.title}</span>}
        </span>
    );
};

