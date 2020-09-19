export type Task = {
    title: string,
    description: string,
    estimated_time_minutes: number,
    is_finished: boolean,
    created_at: string,
    updated_at: string,
    id: number
}

export type TaskMessage = {
    title: string,
    description: string,
    estimated_time_minutes: number,
}

export const CREATE_TASK_ENDPOINT = "/createtask"
export const GET_TASK_ENDPOINT = "/tasks"
export const TOGGLE_COMPLETE_TASK_ENDPOINT = "/togglecompletetask"
export const REMOVE_TASK_ENDPOINT = "/removetask"
