import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from "../Components/TodoList";
import {SuperInput} from "../Components/SuperInput";
import {AppDispatch, AppRootStateType} from "./store";
import {ThunkDispatch} from "redux-thunk";
import {useDispatch, useSelector} from "react-redux";
import {ActionType, TodoListDomainType} from "../types/types";
import {addTodoListTC, setTodoListTC,} from "../Reducers/todolists-reducer";
import {TaskStateType} from "../Reducers/tasks-reducer";


function App() {
    const todolists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,ActionType> & AppDispatch>();

    useEffect(() => {
        dispatch(setTodoListTC())
    },[])

    const addTodoList = (title:string) => {
        dispatch(addTodoListTC(title))
    }
    
    return (
        <>
            <SuperInput addItem={addTodoList}/>
            {todolists.map((tl) => {
                const TDLAllTasks = tasks[tl.id]
                return  <TodoList key={tl.id}
                                  todolistId={tl.id}/>
            })}

    </>)
}

export default App;
