import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoListACType} from "./TodoList-reducer";




const initialState: TasksStateType = {}
export const TaskReducer = (state:TasksStateType = initialState, action:ActionType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.idTDL]:[]}
        }
        case 'ADD-TASK': {
            let newTask = {idTask: v1(), titleTask: action.payload.titleTask, isDone:false}
            return {...state, [action.payload.idTDL]: [newTask, ...state[action.payload.idTDL]]}
        }
        case 'REMOVE-TASK' : {
            return {...state, [action.payload.idTDL]: state[action.payload.idTDL].filter(el => el.idTask !== action.payload.idTask )}
        }
        case 'CHECKED-TASK' : {
            return {...state, [action.payload.idTDL]: state[action.payload.idTDL].map(el => el.idTask === action.payload.idTask ? {...el, isDone: action.payload.isDone} : el)}
        }

        default:
            return state
    }
}

type ActionType = addTaskACType | addTodoListACType | removeTaskType | checkedTaskACType

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (titleTask: string, idTDL: string ) => {
    return {
        type: 'ADD-TASK',
        payload: {
            titleTask,
            idTDL,
        }
    } as const
}
export type removeTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (idTDL: string, idTask: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            idTDL,
            idTask,
        }
    }as const
}

export type checkedTaskACType = ReturnType<typeof checkedTaskAC>
export const checkedTaskAC = (idTDL: string, idTask: string, isDone: boolean) => {
    return {
        type: 'CHECKED-TASK',
        payload: {
            idTDL,
            idTask,
            isDone,
        }
    }as const
}


