import {TaskResponseType, TasksStateType, TaskType} from "../types/types";
import {Dispatch} from "redux";
import {todolistApi} from "../Api/todolist-api";
import {setTodoListACType} from "./todolists-reducer";


export type TaskActionType = setTasksACType | setTodoListACType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
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

export const fetchTasksTC = (todolistId:string) => {
    return (dispatch:Dispatch<TaskActionType>) => {
        todolistApi.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.data.items))
            })

    }
}