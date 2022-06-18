import {TodoListDomainType, TodoListType} from "../types/types";
import {todolistApi} from "../Api/todolist-api";
import {Dispatch} from "redux";


export type TodoListActionType = setTodoListACType


const initialState: TodoListDomainType[] = []

export const todolistReducer = (state = initialState, action: TodoListActionType):TodoListDomainType[] => {
    switch (action.type)  {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state
    }
}

export type setTodoListACType = ReturnType<typeof setTodoListAC>
export const setTodoListAC = (todolists:TodoListType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const
}

export const fetchTodoListsTC = () => {
    return (dispatch:Dispatch<TodoListActionType>) => {
        todolistApi.getTodolists()
            .then((res) => {
                dispatch(setTodoListAC(res.data))
            })
    }
}

