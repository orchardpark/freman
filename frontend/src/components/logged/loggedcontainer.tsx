import React, { useEffect, useState } from 'react';
import "../container.css"
import config from "../app/config"
import Logged from './logged'
import LoggedContainerDisplay from './loggedcontainerdisplay'
import Task from '../tasks/task';

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
        const request = 'http://'+config.serverURL+":"+config.serverPort+"/logged"
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
        const request = 'http://'+config.serverURL + ':' + config.serverPort + '/tasks'
        fetch(request)
            .then(res => res.json())
            .then((tasks) => {
                setTasks(tasks)
            })
            .catch(console.log)
    }

    /*
    * Sets the selected item
    */
    const setSelected = (application_name: string, window_title: string) => {
        const newLoggedList = logged.map((loggedItem: Logged)=>{
            return {
                ...loggedItem,
                selected: loggedItem.application_name === application_name && loggedItem.window_title === window_title
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
                closeModal={ deSelectAll}
        />
        </div>
    )
}

export default LoggedContainer