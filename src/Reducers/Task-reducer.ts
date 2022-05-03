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

        default:
            return state
    }
}

type ActionType = addTaskACType | addTodoListACType

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (idTDL: string, titleTask: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            idTDL,
            titleTask,
        }
    } as const
}

