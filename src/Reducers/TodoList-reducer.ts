import {FilterType, TodoListStateType} from "../App";


const initialState: TodoListStateType[] = []
export const todoListReducer = (state: TodoListStateType[] = initialState, action: ActionType) => {
    switch (action.type){
        case "ADD-TODOLIST": {
            let newTodoList = {
                idTDL: action.payload.idTDL,
                titleTDL: action.payload.titleTDL,
                filter: 'all'
            }
            return [...state, newTodoList]
        }
        case "FILTERED-TASK": {
            debugger
            return state.map(el => el.idTDL === action.payload.idTDL ? {...el, filter: action.payload.filter}: el)
        }
        /*case "REMOVE-TODOLIST": {

        }*/
        default:
            return state
    }

}

type ActionType = addTodoListACType | filteredTaskACType |  removeTodoListACType

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (idTDL:string, titleTDL:string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            idTDL,
            titleTDL,
        }
    }as const
}

export type filteredTaskACType = ReturnType<typeof filteredTaskAC>
export const filteredTaskAC = (idTDL: string, filter: FilterType) => {
    return {
        type: 'FILTERED-TASK',
        payload: {
            idTDL,
            filter
        }
    }as const
}

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = () => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {

        }
    }as const
}