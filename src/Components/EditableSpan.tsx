import React, {useState} from 'react';

export type EditableSpanType = {
    value: string
}

export const EditableSpan = (props:EditableSpanType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState()



    return (
        <>
            <span>{props.value}</span>
        </>
    );
};

