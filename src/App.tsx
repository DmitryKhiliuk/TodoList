import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "All" | "Active" | "Completed"

function App() {

    //BLL:
    const todoListTitle_1: string = "What to learn!"

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>("All")

    const removeTasks = (id: string) => {
        const filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title, // когда ключ и значение одинаковые, то можно испльзовать 1 слово
            isDone: false
        }
        setTasks([newTask, ...tasks]);
    }
    const changeStatus = (id: string, isDone: boolean) => {
        const updatedTasks = tasks.map(t => t.id === id ? {...t, isDone} : t) // isDone присваивается новое значение isDone (isDone: isDone), где первый isDone - новое значение
        setTasks(updatedTasks)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForTodoList;
    if (filter === "Active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    } else if (filter === "Completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    } else {
        tasksForTodoList = tasks
    }


    /*const copy = [...tasks]
    copy.unshift(newTask)
    setTasks(copy)*/


    //UI:
    return (
        <div className="App">
            <TodoList title={todoListTitle_1}
                      filter={filter}
                      tasks={tasksForTodoList}
                      removeTasks={removeTasks}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeStatus={changeStatus}/>
        </div>
    );
}

export default App;
