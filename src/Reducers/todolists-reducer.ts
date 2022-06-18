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
        case 'SET-TODOLIST': {
            return action.todolists.map((tl) => ({...tl, filter: 'all'}))
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

export type setTodoListACType = ReturnType<typeof setTodoListAC>
export const setTodoListAC = (todolists: TodoListType[]) => {
    return {
        type: 'SET-TODOLIST',
        todolists
    } as const
}

export const setTodoListTC = () => {
    return (dispatch:Dispatch) => {
        todolistApi.getTodoList()
            .then((res) => {
                dispatch(setTodoListAC(res.data))
            })
    }
}

export const addTodoListTC = (title:string) => {
    return (dispatch:Dispatch<ActionType>) => {
        todolistApi.createTodoList(title)
            .then((res)=>{
                dispatch(addTodoListAC(res.data.data.item))
            })
    }
}