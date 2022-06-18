import React, {useEffect} from 'react';
import {TaskList} from "./TaskList";
import {SuperInput} from "./SuperInput";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../App/store";
import {ActionType, TodoListDomainType} from "../types/types";
import {addTaskTC, setTaskTC, TaskStateType} from "../Reducers/tasks-reducer";

type TodoListType = {
    todolistId: string
}


export const TodoList = (props:TodoListType) => {
    const todolists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,ActionType> & AppDispatch>();

    useEffect(() => {
        dispatch(setTaskTC(props.todolistId))
    },[])

    const addTask = (title:string) => {
      dispatch(addTaskTC(title, props.todolistId))
    }
    
    return (

        <div>
            <SuperInput addItem={addTask}/>
            <TaskList/>
        </div>
    );
};

