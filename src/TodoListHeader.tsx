import React from 'react';
import {EditableSpan} from "./EditableSpan";

type TodoListHeaderPropsType = {
    title: string
    removeTodoList: (tasksListID: string) => void
    tasksListID: string
    updateTitle: (tasksListID:string, newTitle: string) => void
}


const TodoListHeader = (props: TodoListHeaderPropsType) => {

const onClickHandler = () => {
  props.removeTodoList(props.tasksListID)
}
const updateTitleHandler = (newTitle:string) => {
  props.updateTitle(props.tasksListID, newTitle)
}
    return (
        <h3>
            <EditableSpan callBack={updateTitleHandler} title={props.title}/>
            {/*{props.title}*/}
            <button onClick={onClickHandler}>X</button>
        </h3>
    );
};

export default TodoListHeader;