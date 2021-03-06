import {TodoListDomainType, TodoListType} from "../types/types";
import {todolistApi} from "../Api/todolist-api";
import {Dispatch} from "redux";


export type TodoListActionType = setTodoListACType
    | addTodoListACType
    | deleteTodoListACType
    | putTodoListACType


const initialState: TodoListDomainType[] = []

export const todolistReducer = (state = initialState, action: TodoListActionType):TodoListDomainType[] => {
    switch (action.type)  {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        case "ADD-TODOLIST": {
            return [{...action.todoList, filter: 'all'}, ...state]
        }
        case "DELETE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.todolistId)
        }
        case "PUT-TODOLIST": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title}: tl)
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

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todoList:TodoListType) => {
    return {
        type: 'ADD-TODOLIST',
        todoList
    } as const
}
export type deleteTodoListACType = ReturnType<typeof deleteTodoListAC>
export const deleteTodoListAC = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        todolistId
    } as const
}

export type putTodoListACType = ReturnType<typeof putTodoListAC>
export const putTodoListAC = (title:string, todolistId:string) => {
    return {
        type: 'PUT-TODOLIST',
        title,
        todolistId
    } as const
}

export const addTodoListTC = (title:string) => {
    return (dispatch:Dispatch<TodoListActionType>) => {
        todolistApi.postTodoList(title)
            .then((res) => {
                dispatch(addTodoListAC(res.data.data.item))
            })
    }
}
export const fetchTodoListsTC = () => {
    return (dispatch:Dispatch<TodoListActionType>) => {
        todolistApi.getTodolists()
            .then((res) => {
                dispatch(setTodoListAC(res.data))
            })
    }
}

export const deleteTodoListTC = (todolistId:string) => {
    return (dispatch:Dispatch<TodoListActionType>) => {
        todolistApi.deleteTodoList(todolistId)
            .then((res) => {
                dispatch(deleteTodoListAC(todolistId))
            })
    }
}

export const putTodoListTC = (title: string, todolistId:string) => {
    return (dispatch:Dispatch<TodoListActionType>) => {
        todolistApi.putTodoList(title,todolistId)
            .then((res) => {
                dispatch(putTodoListAC(title, todolistId))
            })
    }
}

