import React, {useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import Button from "./Button";
import TodoListHeader from "./TodoListHeader";
import TasksList from "./TasksList";

export type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeStatus:(id: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(error)
        }

        setTitle('')
    }


    return (

        <div>
            <TodoListHeader title={props.title}/>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value)
                        setError(false)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            addTask()
                        }
                    }
                    }
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>Title is required!</div>}
            </div>
            <TasksList tasks={props.tasks} removeTasks={props.removeTasks} changeStatus={props.changeStatus}/>
            <div>
                <Button btnClass={props.filter === 'All' ? 'btn-active' : ''}
                        changeFilter={() => props.changeFilter("All")}
                        title={"All"}/>
                <Button btnClass={props.filter === 'Active' ? 'btn-active' : ''}
                        changeFilter={() => props.changeFilter("Active")}
                        title={"Active"}/>
                <Button btnClass={props.filter === 'Completed' ? 'btn-active' : ''}
                        changeFilter={() => props.changeFilter("Completed")}
                        title={"Completed"}/>
            </div>
        </div>

    );
};

export default TodoList;

