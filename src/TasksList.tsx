import React from 'react';
import './App.tsx';
import {TaskType} from "./App";


type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTasks: (tasksListID: string, id: string) => void
    changeStatus:(tasksListID: string, id: string, isDone: boolean) => void
    tasksListID: string

}


const TasksList = (props: TasksListPropsType) => {


    const tasksJSXElements = props.tasks.map((elem) => {
        return (
            <li key={elem.id} className={elem.isDone ? "isDone" : ''}>
                <input type="checkbox"
                       checked={elem.isDone}
                       onChange={(e) => props.changeStatus(props.tasksListID, elem.id,e.currentTarget.checked)}/>
                <span>{elem.title}</span>
                <button onClick={() => props.removeTasks(props.tasksListID, elem.id)}>X</button>
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