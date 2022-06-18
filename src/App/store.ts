import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {todolistReducer} from "../Reducers/todolists-reducer";
import {tasksReducer} from "../Reducers/tasks-reducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store