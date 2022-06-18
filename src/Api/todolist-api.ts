import axios from "axios";
import {TaskResponseType, TodoListDomainType, TodoListType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c5dc8002-de94-41b3-931d-884560e88891'
    }
})

export const todolistApi = {
    getTodolists() {
        return instance.get<TodoListDomainType[]>('todo-lists');
    },

    getTasks(todolistId:string) {
        return instance.get<TaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    }
}