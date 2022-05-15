import React, { useEffect, useState } from 'react';
import config from "../app/config"
import Logged from './logged'
import LoggedContainerDisplay from './loggedcontainerdisplay'
import Task from '../tasks/task';
import { UNKNOWN } from '../app/constants';
import { getEndPoint } from '../app/util'

function LoggedContainer() {
    /// STATE ---------------------------------
    const [logged, setLogged] = useState<Logged[]>([])
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)


    /// FUNCTIONALITY -------------------------

    /**
     * Gets the logged items & tasks from the backend
     */
    const getData = () => {
        getLogged()
        getTasks()
        setLoading(false)
    }

    /**
     * Gets the logged items and tasks from the backend
     */
    const getLogged = () => {
        const request = getEndPoint('logged')
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
        const request = getEndPoint('tasks')
        fetch(request)
            .then(res => res.json())
            .then((tasks) => {
                setTasks(tasks)
            })
            .catch(console.log)
    }

    const bookTime = (application_name: string, task_id: number) => {
        if (task_id !== UNKNOWN) {
            const request = getEndPoint('booktime')
            const payload_object = {
                application_name: application_name,
                task_id: task_id
            }
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(payload_object),
                headers: { 'Content-Type': 'application/json' }
            }
            fetch(request, requestOptions).catch(console.log).then(()=>getLogged())
            deSelectAll()
        }
    }

    /*
    * Sets the selected item
    */
    const setSelected = (application_name: string ) => {
        const newLoggedList = logged.map((loggedItem: Logged)=>{
            return {
                ...loggedItem,
                selected: loggedItem.application_name === application_name 
            }
        })
        setLogged(newLoggedList)
    }

    const deSelectAll = () => {
        const newLoggedList = logged.map((loggedItem: Logged) => {
            return {
                ...loggedItem,
                selected: false
            }
        })
        setLogged(newLoggedList)
    }

    /**
     * Handle keypresses on the screen
     * @param e 
     */
    const onKeyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            deSelectAll()
        }
    }

    /**
     * Call `getData` upon a change in the loading state
     */
    useEffect(getData, [loading])

    /**
     * Returns the JSX of this page
     */
    return(
        <div onKeyDown={onKeyPressed} tabIndex={0}>
        <LoggedContainerDisplay
                logged={logged}
                tasks={tasks}
                setSelected={setSelected}
                closeModal={deSelectAll}
                bookTime={bookTime}
        />
        </div>
    )
}

export default LoggedContainer