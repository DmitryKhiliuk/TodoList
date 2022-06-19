import React, {useEffect} from 'react';
import {TaskList} from "./TaskList";
import {SuperInput} from "./SuperInput";
import {fetchTasksTC} from "../Reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ActionType, AppDispatch, AppRootStateType} from "../App/store";
import {TasksStateType, TaskType} from "../types/types";

export type TodoListType = {
    TDLid: string
    tasks: TaskType[]
}

export const TodoList = (props: TodoListType) => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,ActionType> & AppDispatch>();

    useEffect(() => {
        dispatch(fetchTasksTC(props.TDLid))
    }, [])

    const addItem = (title: string) => {

    }

    return (
        <div>
            <SuperInput addItem={addItem}/>

            {props.tasks.map((t) => <TaskList key={t.id}
                                                        task={t}
                                                        todolistId={props.TDLid}/>
            )}

        </div>
    );
};


