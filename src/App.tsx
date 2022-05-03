import React from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {Input} from "./Components/Input";
import {AppRootStateType} from "./store";
import {useDispatch, useSelector} from "react-redux";
import {addTodoListAC, filteredTaskAC, removeTodoListAC} from "./Reducers/TodoList-reducer";
import {v1} from "uuid";
import {addTaskAC, checkedTaskAC, removeTaskAC} from "./Reducers/Task-reducer";

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

    const removeTodoList = () => {
        dispatch(removeTodoListAC())
    }

    const filteredTask = (idTDL: string, filter: FilterType) => {
        dispatch(filteredTaskAC(idTDL, filter))
    }



    const addTask = (title: string, idTDL: string ) => {
        dispatch(addTaskAC(idTDL, title))
    }

    const removeTask = (idTDL: string, idTask: string) => {
      dispatch(removeTaskAC(idTDL, idTask))
    }

    const checkedTask = (idTDL: string, idTask: string, isDone: boolean) => {
        dispatch(checkedTaskAC(idTDL, idTask, isDone))
    }




    return (
        <div>
            <Input inputCallBack={addTodoList}/>
            {todolists.map(el => {
                let allTodolistTasks = tasks[el.idTDL];

                if (el.filter === 'active') {
                    allTodolistTasks = allTodolistTasks.filter(t => !t.isDone)
                }
                if (el.filter === 'complete') {
                    allTodolistTasks = allTodolistTasks.filter(t => t.isDone)
                }
                return <TodoList key={el.idTDL}
                                 idTDL={el.idTDL}
                                 tasks={allTodolistTasks}
                                 titleTDL={el.titleTDL}
                                 filter={el.filter}
                                 addTask={addTask}
                                 removeTask={removeTask}
                                 checkedTask={checkedTask}
                                 filteredTask={filteredTask}/>

            })}
        </div>
    )
}

export default App;
