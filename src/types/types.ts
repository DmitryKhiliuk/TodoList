

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {filter: FilterValuesType}

export type ResponseType<D = {}> = {
    data: D
    resultCode: number
    fieldsErrors: string[]
    messages: [string]
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}



export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TasksStateType = {
    [key:string]:TaskType[]
}

export type TaskResponseType = {
    totalCount: number
    error: string
    items:TaskType[]
}

export type TaskRequestType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}