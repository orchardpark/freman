import React, { useCallback } from "react"
import Logged from "../logged/logged"
import Task from "../tasks/task"
import ReportContainerDisplay from "./reportcontainerdisplay"
import Booked from "./booked"
import { getEndPoint, getGetRequestOptions } from "../app/util"

type Props = {
    token: string,
    handleFetchError: (error: Error) => void
}

function ReportContainer({ token, handleFetchError }: Props) {
    const [logged, setLogged] = React.useState<Logged[]>([])
    const [tasks, setTasks] = React.useState<Task[]>([])
    const [booked, setBooked] = React.useState<Booked[]>([])

    /**
     * Gets the logged items and tasks from the backend
     */
    const getLogged = useCallback(() => {
        const request = getEndPoint('logged')
        const requestOptions = getGetRequestOptions(token)
        fetch(request, requestOptions)
            .then(res => res.json())
            .then((logged) => {
                setLogged(logged.map((loggedItem: Logged) => {
                    return {
                        ...loggedItem,
                        selected: false,
                        created_at: new Date(loggedItem.created_at)
                    }
                }))
            })
            .catch(handleFetchError)
    }, [token, handleFetchError])

    /**
     * Retrieves the tasks from the backend
     * sets the `task` variable.
     */
    const getTasks = useCallback(() => {
        const request = getEndPoint('tasks')
        const requestOptions = getGetRequestOptions(token)
        fetch(request, requestOptions)
            .then(res => res.json())
            .then((tasks) => {
                setTasks(tasks)
            })
            .catch(handleFetchError)
    }, [token, handleFetchError])

    const getBooked = useCallback(() => {
        const request = getEndPoint('bookedtime')
        const requestOptions = getGetRequestOptions(token)
        fetch(request, requestOptions)
            .then(res => res.json())
            .then((booked) => setBooked(booked))
            .catch(handleFetchError)
    }, [token, handleFetchError])

    React.useEffect(() => {
        getLogged()
        getTasks()
        getBooked()
    }, [getLogged, getTasks, getBooked])

    return (
        <ReportContainerDisplay logged={logged} tasks={tasks} booked={booked} />
    )
}

export default ReportContainer
