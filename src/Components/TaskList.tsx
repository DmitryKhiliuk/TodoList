import React from 'react';
import {SuperInput} from "./SuperInput";
import {TaskStatuses, TaskType} from "../types/types";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ActionType, AppDispatch, AppRootStateType} from "../App/store";
import {deleteTaskTC} from "../Reducers/tasks-reducer";

export type TaskListType = {
    task: TaskType
    todolistId: string

}

export const TaskList = (props: TaskListType) => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,ActionType> & AppDispatch>();

    const onChangeHandler = () => {

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

            <EditableSpan value={props.task.title}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
};


