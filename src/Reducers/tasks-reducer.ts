import {TaskType, ActionType} from "../types/types";


export type TaskStateType = {
    [key:string]: TaskType[]
}

const initialState:TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]:[]}
        }
        default: {
            return state
        }
    }
}

