import React from 'react';
import {SuperInput} from "./SuperInput";
import {TaskStatuses, TaskType} from "../types/types";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
            <h3>aaaaaaaaaaa!!!!!!!!!!!!1111</h3>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
};


