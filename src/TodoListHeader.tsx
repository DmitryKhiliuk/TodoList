import React from 'react';

type TodoListHeaderPropsType = {
    title: string
    removeTodoList: (tasksListID: string) => void
    tasksListID: string
}


const TodoListHeader = (props: TodoListHeaderPropsType) => {

const onClickHandler = () => {
  props.removeTodoList(props.tasksListID)
}
    return (
        <h3>
            {props.title}
            <button onClick={onClickHandler}>X</button>
        </h3>
    );
};

export default TodoListHeader;