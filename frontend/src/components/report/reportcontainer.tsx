import React from "react"
import Logged from "../logged/logged"
import Task from "../tasks/task"
import ReportContainerDisplay from "./reportcontainerdisplay"
import Booked from "./booked"
import { getEndPoint } from "../app/util"


function ReportContainer() {
    const [logged, setLogged] = React.useState<Logged[]>([])
    const [tasks, setTasks] = React.useState<Task[]>([])
    const [booked, setBooked] = React.useState<Booked[]>([])
    const [loading, setLoading] = React.useState(true)
    /**
     * Gets the logged items & tasks from the backend
     */
    const getData = () => {
        getLogged()
        getTasks()
        getBooked()
        setLoading(false)
    }

    /**
     * Gets the logged items and tasks from the backend
     */
    const getLogged = () => {
        const request = getEndPoint('logged')
        fetch(request)
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
            .catch(console.log)
    }

    /**
     * Retrieves the tasks from the backend
     * sets the `task` variable.
     */
    const getTasks = () => {
        const request = getEndPoint('tasks')
        fetch(request)
            .then(res => res.json())
            .then((tasks) => {
                setTasks(tasks)
            })
            .catch(console.log)
    }

    const getBooked = () => {
        const request = getEndPoint('bookedtime')
        fetch(request)
            .then(res => res.json())
            .then((booked) => setBooked(booked))
            .catch(console.log)
    }

    React.useEffect(getData, [loading])

    return (
        <ReportContainerDisplay logged={logged} tasks={tasks} booked={booked} />
    )
}

export default ReportContainer
