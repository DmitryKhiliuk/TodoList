import React from 'react';
import {SuperInput} from "./SuperInput";
import {TaskStatuses, TaskType} from "../types/types";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";

export type TaskListType = {
    task: TaskType
    todolistId: string

}

export const TaskList = (props: TaskListType) => {

    const onChangeHandler = () => {

    }

    const onClickHandler = () => {

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


