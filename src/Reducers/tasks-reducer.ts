import {TaskResponseType, TasksStateType, TaskType, TodoListType} from "../types/types";
import {Dispatch} from "redux";
import {todolistApi} from "../Api/todolist-api";
import {addTodoListACType, deleteTodoListACType, setTodoListACType} from "./todolists-reducer";


export type TaskActionType = setTasksACType
    | setTodoListACType
    | addTodoListACType
    | addTaskACType
    | deleteTaskACType
    |deleteTodoListACType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            /*const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy*/
            return {...state, [action.todolistId]: state[action.todolistId] = action.tasks}
        }
        case 'SET-TODOLISTS': {
            /*const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;*/
            /*action.todolists.forEach((tl) => ({...state[tl.id] = []}))*/
            action.todolists.forEach((tl) => ({[tl.id]: state[tl.id] = []}))
            return {...state}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todoList.id]: []}
        }
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'DELETE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.todolistId]
            return {...state}
        }
        case "DELETE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.id)}
        }
        default:
            return state
    }
}
export type setTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId:string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        todolistId,
        tasks
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
}

export type deleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todolistId:string, id: string) => {
    return {
        type: 'DELETE-TASK',
        todolistId,
        id
    } as const
}

export const fetchTasksTC = (todolistId:string) => {
    return (dispatch:Dispatch<TaskActionType>) => {
        todolistApi.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.data.items))
            })

    }
}

export const addTaskTC = (title:string, todolistId:string) => {
    return (dispatch:Dispatch<TaskActionType>) => {
        todolistApi.postTask(title, todolistId)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const deleteTaskTC = (todolistId:string, id: string) => {
    return (dispatch:Dispatch<TaskActionType>) => {
        todolistApi.deleteTask(todolistId,id)
            .then((res) => {
                dispatch(deleteTaskAC(todolistId,id))
            })
    }
}