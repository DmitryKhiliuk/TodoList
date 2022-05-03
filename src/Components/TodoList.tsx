import React, {ChangeEvent} from 'react';
import {Input} from "./Input";
import {FilterType, TaskType} from "../App";

type TodoListType = {
    idTDL: string
    tasks: TaskType[]
    titleTDL: string
    filter: FilterType
    addTask: (idTDL: string, titleTask: string) => void
    removeTask: (idTDL: string, idTask: string) => void
    checkedTask: (idTDL: string, idTask: string, isDone: boolean) => void
    filteredTask: (idTDL: string, filter: FilterType) => void
}



export const TodoList = (props:TodoListType) => {

    const onClickHandlerAll = () => {props.filteredTask(props.idTDL,'all')}
    const onClickHandlerActive = () => {props.filteredTask(props.idTDL,'active')}
    const onClickHandlerComplete = () => {props.filteredTask(props.idTDL,'complete')}

    const addTaskHandler = (idTDL: string, title: string) => {
        props.addTask(props.idTDL,title)
    }

    return (
        <div>
            <span>{props.titleTDL}</span>
            <button>Delete</button>
            <Input inputCallBack={(title) => addTaskHandler(props.idTDL, title)}/>
            {props.tasks?.map(el => {

                const removeTaskHandler = () => {
                    props.removeTask(props.idTDL, el.idTask)
                }
                const checkedTaskHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    props.checkedTask(props.idTDL, el.idTask, e.currentTarget.checked)
                }

                return <div key={el.idTask}>
                    <input type="checkbox" checked={el.isDone} onChange={checkedTaskHandler}/>
                    <span>{el.titleTask}</span>
                    <button onClick={removeTaskHandler}>Delete</button>

                </div>
            })}
            <div>
                <button onClick={onClickHandlerAll}>All</button>
                <button onClick={onClickHandlerActive}>Active</button>
                <button onClick={onClickHandlerComplete}>Complete</button>
            </div>

        </div>
    );
};

