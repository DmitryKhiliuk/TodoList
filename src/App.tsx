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

    const removeTasks = (tasksListID: string, id: string) => {
        setTasks({...tasks, [tasksListID]:tasks[tasksListID].filter((el) => el.id !== id)})
    }

    const addTask = (tasksListID: string, title: string) => {

    }

    const changeFilter = (tasksListID: string, filter: FilterValuesType) => {

    }

    const changeStatus = (tasksListID: string, id: string, isDone: boolean) => {

    }









    return (
        <div className="App">

            {todoLists.map((el) => {
                return (
                    <TodoList
                        tasksListID={el.id}
                        title={el.titleT}
                        filter={el.filterT}
                        tasks={tasks[el.id]}
                        removeTasks={removeTasks}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                    />
                )
            })}



        </div>
    );
}

export default App;
