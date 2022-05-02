import {FilterType, TodoListStateType} from "../App";


const initialState: TodoListStateType[] = []
export const todoListReducer = (state: TodoListStateType[] = initialState, action: ActionType) => {
    switch (action.type){
        case "ADD-TODOLIST": {
            let newTodoList = {
                id: action.payload.idTDL,
                title: action.payload.titleTDL,
                filter: 'all'
            }
            return [...state, newTodoList]
        }
        default:
            return state
    }

}

export type ActionType = addTodoListACType

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