import React from 'react';
import './App.css';
import {TodoList} from "../Components/TodoList";
import {SuperInput} from "../Components/SuperInput";
import {AppDispatch, AppRootStateType} from "./store";
import {ThunkDispatch} from "redux-thunk";
import {useDispatch, useSelector} from "react-redux";
import {ActionType, TodoListDomainType} from "../types/types";
import {addTodoListTC} from "../Reducers/todolists-reducer";
import {TaskStateType} from "../Reducers/tasks-reducer";


function App() {
    const todolist = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,ActionType> & AppDispatch>();
    
    const addTodoList = (title:string) => {
        dispatch(addTodoListTC(title))
    }
    
    return <div>
        <SuperInput addItem={addTodoList}/>
        <TodoList/>
    </div>
}

export default App;
