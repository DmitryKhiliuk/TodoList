import {ActionType, TodoListDomainType, TodoListType} from "../types/types";
import {Dispatch} from "redux";
import {todolistApi} from "../Api/todolist-api";



const initialState:TodoListDomainType[] = []

export const todolistReducer = (state:TodoListDomainType[] = initialState, action:ActionType):TodoListDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodo:TodoListDomainType = {...action.todolist, filter: 'all'}
            return [newTodo, ...state]
        }
        default:
            return state
    }
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todolist: TodoListType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    } as const
}

export const addTodoListTC = (title:string) => {
    return (dispatch:Dispatch<ActionType>) => {
        todolistApi.createTodoList(title)
            .then((res)=>{
                dispatch(addTodoListAC(res.data.data.item))
            })
    }
}