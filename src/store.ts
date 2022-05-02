
import {todoListReducer} from "./Reducers/TodoList-reducer";
import {TaskReducer} from "./Reducers/Task-reducer";
import {combineReducers, createStore} from "redux";

export const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: TaskReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;