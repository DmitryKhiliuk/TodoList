import {TasksStateType} from "../App";
import {ActionType} from "./TodoList-reducer";

const initialState: TasksStateType = {}
export const TaskReducer = (state:TasksStateType = initialState, action:ActionType) => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return {...state, [action.payload.idTDL]:[]}
        }
    }
}

