import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from "../Components/TodoList";
import {useDispatch, useSelector} from "react-redux";
import {ActionType, AppDispatch, AppRootStateType} from "./store";
import {fetchTodoListsTC} from "../Reducers/todolists-reducer";
import {ThunkDispatch} from "redux-thunk";
import {TasksStateType, TodoListDomainType} from "../types/types";
import {SuperInput} from "../Components/SuperInput";



function App() {
    const todolists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,ActionType> & AppDispatch>();

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    },[])

    const addItemHandler = () => {

    }

    return (
        <div>
            <SuperInput addItem={addItemHandler}/>
            {todolists.map((tl) => {
                return <TodoList key={tl.id}
                                 TDLid={tl.id}
                                 tasks={tasks[tl.id]}/>
            })}
        </div>
    )
}

export default App;
