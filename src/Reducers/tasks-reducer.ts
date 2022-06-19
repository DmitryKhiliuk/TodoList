import {TaskResponseType, TasksStateType, TaskType, TodoListType} from "../types/types";
import {Dispatch} from "redux";
import {todolistApi} from "../Api/todolist-api";
import {addTodoListACType, setTodoListACType} from "./todolists-reducer";


export type TaskActionType = setTasksACType
    | setTodoListACType
    | addTodoListACType
    | addTaskACType

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