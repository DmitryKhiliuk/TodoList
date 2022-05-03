import React from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {Input} from "./Components/Input";
import {AppRootStateType} from "./store";
import {useDispatch, useSelector} from "react-redux";
import {addTodoListAC} from "./Reducers/TodoList-reducer";
import {v1} from "uuid";
import {addTaskAC} from "./Reducers/Task-reducer";

export type FilterType = 'all' | 'active' | 'complete'

export type TodoListStateType = {
    idTDL: string
    titleTDL: string
    filter: FilterType
}

export type TaskType = {
    idTask: string
    titleTask: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string] : TaskType[]
}


function App() {
    const todolists = useSelector<AppRootStateType, TodoListStateType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()
    
    const addTodoList = (titleTDL:string) => {
        const idTDL = v1();
        dispatch(addTodoListAC(idTDL, titleTDL))
    }



    const addTask = (idTDL: string, title: string) => {
        dispatch(addTaskAC(idTDL, title))
    }


    return (
        <div>
            <Input inputCallBack={addTodoList}/>
            {todolists.map(el => {
                if (el.filter === 'active') {
                    tasks[el.idTDL].filter(t => !t.isDone)
                }
                if (el.filter === 'complete') {
                    tasks[el.idTDL].filter(t => t.isDone)
                }
                return <TodoList key={el.idTDL}
                                 idTDL={el.idTDL}
                                 tasks={tasks[el.idTDL]}
                                 titleTDL={el.titleTDL}
                                 addTask={addTask}/>

            })}
        </div>
    )
}

export default App;
