import React, {ChangeEvent} from 'react';
import {TaskStatuses, TaskType} from "../types/types";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ActionType, AppDispatch, AppRootStateType} from "../App/store";
import {deleteTaskTC, putTaskTC} from "../Reducers/tasks-reducer";

export type TaskListType = {
    task: TaskType
    todolistId: string

}

export const TaskList = (props: TaskListType) => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,ActionType> & AppDispatch>();

    const onChangeTaskTitle = (title:string) => {
      dispatch(putTaskTC(props.task.todoListId, props.task.id, {title}))
    }

    const onChangeTaskStatus = (todoListId:string, id:string, status:TaskStatuses) => {
        dispatch(putTaskTC(props.task.todoListId, props.task.id, {status}))
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        onChangeTaskStatus(props.task.todoListId, props.task.id, e.currentTarget.checked?TaskStatuses.Completed:TaskStatuses.New)
    }

    const onClickHandler = () => {
        dispatch(deleteTaskTC(props.task.todoListId, props.task.id))
    }
    return (
        <div key={props.task.id}>

            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={props.task.title} onChange={onChangeTaskTitle}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
};


