import React from 'react';
import './App.tsx';
import {TaskType} from "./App";


type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    changeStatus:(id: string, isDone: boolean) => void

}


const TasksList = (props: TasksListPropsType) => {


    const tasksJSXElements = props.tasks.map((elem) => {
        return (
            <li key={elem.id} className={elem.isDone ? "isDone" : ''}>
                <input type="checkbox"
                       checked={elem.isDone}
                       onChange={(e) => props.changeStatus(elem.id,e.currentTarget.checked)}/>
                <span>{elem.title}</span>
                <button onClick={() => props.removeTasks(elem.id)}>X</button>
            </li>
        )
    })

    return (
        <ul>
            {tasksJSXElements}
        </ul>
    );
};

export default TasksList;