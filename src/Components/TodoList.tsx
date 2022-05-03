import React from 'react';
import {Input} from "./Input";
import {TasksStateType, TaskType} from "../App";

type TodoListType = {
    idTDL: string
    tasks: TaskType[]
    titleTDL: string
    addTask: (idTDL: string, titleTask: string) => void
}



export const TodoList = (props:TodoListType) => {

const addTaskHandler = (idTDL: string, title: string) => {
    props.addTask(props.idTDL,title)
}

    return (
        <div>
            <span>{props.titleTDL}</span>
            <button>Delete</button>
            <Input inputCallBack={(title) => addTaskHandler(props.idTDL, title)}/>
            {props.tasks?.map(el => {
                return <div key={el.idTask}>
                    <input type="checkbox"/>
                    <span>{el.titleTask}</span>
                    <button>Delete</button>

                </div>
            })}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Complete</button>
            </div>

        </div>
    );
};

