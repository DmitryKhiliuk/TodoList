import {
    TaskRequestType,
    TaskResponseType,
    TasksStateType,
    TaskType,
    TodoListType,
    UpdateDomainTaskModelType
} from "../types/types";
import {Dispatch} from "redux";
import {todolistApi} from "../Api/todolist-api";
import {addTodoListACType, deleteTodoListACType, setTodoListACType} from "./todolists-reducer";
import {AppRootStateType} from "../App/store";


export type TaskActionType = setTasksACType
    | setTodoListACType
    | addTodoListACType
    | addTaskACType
    | deleteTaskACType
    | deleteTodoListACType
    | putTaskACType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            /*const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy*/
            return {...state, [action.todolistId]: state[action.todolistId] = action.tasks}
        }
        case 'SET-TODOLISTS': {
            /*const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;*/
            /*action.todolists.forEach((tl) => ({...state[tl.id] = []}))*/
            action.todolists.forEach((tl) => ({[tl.id]: state[tl.id] = []}))
            return {...state}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todoList.id]: []}
        }
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'DELETE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.todolistId]
            return {...state}
        }
        case "DELETE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.id)}
        }
        case "PUT-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].map((t) => t.id === action.id ? {...t, ...action.domainModel} : t)}
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
        tasks,
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
}

export type deleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todolistId:string, id: string) => {
    return {
        type: 'DELETE-TASK',
        todolistId,
        id
    } as const
}

export type putTaskACType = ReturnType<typeof putTaskAC>
export const putTaskAC = (todolistId: string, id: string, domainModel: UpdateDomainTaskModelType) => {
    return {
        type: 'PUT-TASK',
        todolistId,
        id,
        domainModel
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

export const addTaskTC = (title:string, todolistId:string) => {
    return (dispatch:Dispatch<TaskActionType>) => {
        todolistApi.postTask(title, todolistId)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const deleteTaskTC = (todolistId:string, id: string) => {
    return (dispatch:Dispatch<TaskActionType>) => {
        todolistApi.deleteTask(todolistId,id)
            .then((res) => {
                dispatch(deleteTaskAC(todolistId,id))
            })
    }
}

export const putTaskTC = (todolistId: string, id: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch:Dispatch<TaskActionType>, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === id)
        if (!task) {
            return
        }

        const apiModel: TaskRequestType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }




        todolistApi.putTask(todolistId,id,apiModel)
            .then((res) => {
                dispatch(putTaskAC(todolistId,id,domainModel))
            })
    }
}