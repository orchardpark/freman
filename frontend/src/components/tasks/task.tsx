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

