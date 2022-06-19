import axios, {AxiosResponse} from "axios";
import {ResponseType, TaskResponseType, TaskType, TodoListType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c5dc8002-de94-41b3-931d-884560e88891'
    }
})

export const todolistApi = {
    getTodolists() {
        return instance.get<TodoListType[]>('todo-lists');
    },

    postTodoList(title:string) {
        return instance.post<{title: string}, AxiosResponse<ResponseType< {item: TodoListType}>>>('todo-lists', {title})
    },

    getTasks(todolistId:string) {
        return instance.get<TaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },

    postTask(title:string, todolistId:string) {
        return instance.post<{title:string}, AxiosResponse<ResponseType<{ item: TaskType }>>>(`/todo-lists/${todolistId}/tasks`, {title})
    }
}