import React, {useState} from 'react';

type AddItemForm ={
    callBack: (trimmedTitle:string) => void
}


export const AddItemForm = (props:AddItemForm) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string|null>(null)
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.callBack(trimmedTitle)
        } else {
            setError("Title is required")
        }

        setTitle('')
    }



    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)

                }}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        addTask()
                    }
                }
                }
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

