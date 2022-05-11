type Logged = {
    id: number,
    created_at: Date,
    updated_at: Date,
    last_updated_by: string,
    application_name: string,
    logged_time_seconds: number,
    selected: boolean
}

export default Logged