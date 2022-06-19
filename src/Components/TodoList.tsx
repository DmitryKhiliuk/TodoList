import React, {useEffect} from 'react';
import {TaskList} from "./TaskList";
import {SuperInput} from "./SuperInput";
import {addTaskTC, fetchTasksTC} from "../Reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ActionType, AppDispatch, AppRootStateType} from "../App/store";
import {TasksStateType, TaskType} from "../types/types";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";

export type TodoListType = {
    TDLid: string
    tasks: TaskType[]
    title: string
}

export const TodoList = (props: TodoListType) => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,ActionType> & AppDispatch>();

    useEffect(() => {
        dispatch(fetchTasksTC(props.TDLid))
    }, [])

    const addItem = (title: string) => {
        dispatch(addTaskTC(title,props.TDLid))
    }
    
    const onClickHandler = () => {
      
    }

    return (
        <div>

            <h3>
                <EditableSpan value={props.title}/>
                <IconButton onClick={onClickHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <SuperInput addItem={addItem}/>

            {props.tasks.map((t) => {

                return <TaskList key={t.id}
                                 task={t}
                                 todolistId={props.TDLid}/>
            })}

        </div>
    );
};


