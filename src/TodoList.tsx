import React from 'react';
import {FilterValuesType, TaskType} from "./App";
import Button from "./Button";
import TodoListHeader from "./TodoListHeader";
import TasksList from "./TasksList";
import {AddItemForm} from "./AddItemForm";


export type TodoListPropsType = {
    tasksListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTasks:  (tasksListID: string, id: string) => void
    addTask: (tasksListID: string, title: string) => void
    changeFilter: (tasksListID: string, filter: FilterValuesType) => void
    changeStatus:( tasksListID: string, id: string, isDone: boolean) => void
    removeTodoList: (tasksListID: string) => void
    updateTask: (tasksListID:string, taskId:string, newTitle:string) => void
    updateTitle: (tasksListID:string, newTitle: string) => void

}

    const TodoList = (props: TodoListPropsType) => {
    /*const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string|null>(null)
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addTask(props.tasksListID, trimmedTitle)
        } else {
            setError("Title is required")
        }

        setTitle('')
    }*/
        const addTaskHandler = (newTitle:string) => {
          props.addTask(props.tasksListID, newTitle)
        }
    return (

        <div>
            <TodoListHeader title={props.title}
                            removeTodoList={props.removeTodoList}
                            tasksListID={props.tasksListID}
                            updateTitle={props.updateTitle}
            />

            <AddItemForm callBack={addTaskHandler}/>

            {/*<div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value)

                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            addTask()
                        }
                    }
                    }
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>*/}
            <TasksList tasks={props.tasks}
                       removeTasks={props.removeTasks}
                       changeStatus={props.changeStatus}
                       tasksListID={props.tasksListID}
                       updateTask={props.updateTask}
            />
            <div>
                <Button btnClass={props.filter === 'All' ? 'btn-active' : ''}
                        changeFilter={() => props.changeFilter(props.tasksListID,"All")}
                        title={"All"}/>
                <Button btnClass={props.filter === 'Active' ? 'btn-active' : ''}
                        changeFilter={() => props.changeFilter(props.tasksListID,"Active")}
                        title={"Active"}/>
                <Button btnClass={props.filter === 'Completed' ? 'btn-active' : ''}
                        changeFilter={() => props.changeFilter(props.tasksListID,"Completed")}
                        title={"Completed"}/>
            </div>
        </div>

    );
};

export default TodoList;

