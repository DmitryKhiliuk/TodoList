import React, {ChangeEvent,KeyboardEvent, useState} from 'react';



type SuperInputType = {
    addItem: (title: string) => void
}


export const SuperInput = (props:SuperInputType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {

            setTitle(e.currentTarget.value)

    }

    const onClickHandler = () => {
        if(title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Error')
        }
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
      e.key === 'Enter' && onClickHandler()
    }





    return (
        <div>
            <input type="text"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
    );
};

