import {TaskResponseType, TasksStateType, TaskType} from "../types/types";
import {Dispatch} from "redux";
import {todolistApi} from "../Api/todolist-api";


export type TaskActionType = setTasksACType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
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
    }
}

export const fetchTasksTC = (todolistId:string) => {
    return (dispatch:Dispatch<TaskActionType>) => {
        todolistApi.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.data.items))
            })

    }
}