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
export type TodoListType = {
    id: string
    titleT: string
    filterT: FilterValuesType
}



export type TaskObjectType = {
    [key: string]: TaskType[]
}

function App() {

    const tasksListID1 = v1()
    const tasksListID2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: tasksListID1, titleT: 'What to learn', filterT: 'All'},
        {id: tasksListID2, titleT: 'What to buy', filterT: 'All'}
    ])


    const [tasks, setTasks] = useState<TaskObjectType>({
        [tasksListID1]:[
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],

        [tasksListID2]:[
            {id: v1(), title: 'Lemon', isDone: true},
            {id: v1(), title: 'Sugar', isDone: true},
            {id: v1(), title: 'Tequila', isDone: false}
        ]
    })

    const removeTodoList = (tasksListID: string) => {
        setTodoLists(todoLists.filter(el => el.id !== tasksListID))
        delete tasks[tasksListID]
    }

    const removeTasks = (tasksListID: string, id: string) => {
        setTasks({...tasks, [tasksListID]:tasks[tasksListID].filter((el) => el.id !== id)})
    }

    const addTask = (tasksListID: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [tasksListID]:[newTask, ...tasks[tasksListID]]})
    }

    const changeFilter = (tasksListID: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(el => el.id === tasksListID ? {...el, filterT:filter} : el))
    }

    const changeStatus = (tasksListID: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [tasksListID]:tasks[tasksListID].map(el => el.id === id ? {...el, isDone} : el)})
    }

    return (
        <div className="App">



            {todoLists.map((el) => {
                let tasksForTodoList = tasks[el.id]
                if (el.filterT === 'Active') {
                    tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                }
                if (el.filterT === 'Completed') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                }
                return (
                    <TodoList
                        tasksListID={el.id}
                        title={el.titleT}
                        filter={el.filterT}
                        tasks={tasksForTodoList}
                        removeTasks={removeTasks}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        removeTodoList={removeTodoList}
                    />
                )
            })}



        </div>
    );
}

export default App;
