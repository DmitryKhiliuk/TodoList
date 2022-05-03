import React, {ChangeEvent, useState} from 'react';

type InputType = {
    inputCallBack: (title:string) => void
}

export const Input = (props:InputType) => {

    const [title, setTitle] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        if (title.trim() !== '') {
            props.inputCallBack(title.trim())
            setTitle('')
        }

    }
    return (
        <div>
            <input onChange={onChangeHandler} value={title} />
            <button onClick={onClickHandler}>+</button>
        </div>
    );
};

