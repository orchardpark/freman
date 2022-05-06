import React, { useEffect, useState } from "react"
import config from "../app/config"
import "../container.css"
import Logged from "../logged/logged"
import Task from "../tasks/task"
import ReportContainerDisplay from "./reportcontainerdisplay"
import Booked from "./booked"


function ReportContainer() {
    const [logged, setLogged] = useState<Logged[]>([])
    const [tasks, setTasks] = useState<Task[]>([])
    const [booked, setBooked] = useState<Booked[]>([])
    const [loading, setLoading] = useState(true)
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
        const request = config.protocol+'://'+config.serverURL+":"+config.serverPort+"/logged"
        fetch(request)
        .then(res => res.json())
        .then((logged)=>{
            setLogged(logged.map((loggedItem:Logged)=> {
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
        const request = config.protocol+'://'+config.serverURL + ':' + config.serverPort + '/tasks'
        fetch(request)
            .then(res => res.json())
            .then((tasks) => {
                setTasks(tasks)
            })
            .catch(console.log)
    }

    const getBooked = () => {
        const request = config.protocol+ '://'+config.serverURL + ':' + config.serverPort + '/bookedtime'
        fetch(request)
        .then(res=>res.json())
        .then((booked)=>setBooked(booked))
        .catch(console.log)
    }

    useEffect(getData, [loading])
    
    return (
        <ReportContainerDisplay logged={logged} tasks={tasks} booked={booked}/>
    )
}

export default ReportContainer
