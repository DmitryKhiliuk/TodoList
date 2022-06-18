import {TaskType, ActionType} from "../types/types";
import {todolistApi} from "../Api/todolist-api";
import {Dispatch} from "redux";


export type TaskStateType = {
    [key:string]: TaskType[]
}

const initialState:TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]:[]}
        }
        default: {
            return state
        }
    }
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task:TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
}

export type setTaskType = ReturnType<typeof setTaskAC>
export const setTaskAC = (tasks:TaskType[]) => {
    return {
        type: 'SET-TASK',
        tasks
    } as const
}

export const setTaskTC = (todolistId:string) => {
    return (dispatch:Dispatch<ActionType>) => {
        todolistApi.getTask(todolistId)
            .then((res) => {
                dispatch(setTaskAC(res.data))
            })
    }
}

export const addTaskTC = (title:string, todolistId: string) => {
    return (dispatch:Dispatch<ActionType>) => {
        todolistApi.createTask(title, todolistId)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

