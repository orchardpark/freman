import React, { useEffect, useState } from 'react';
import "../container.css"
import config from "../app/config"
import Logged from './logged'
import LoggedContainerDisplay from './loggedcontainerdisplay'

function LoggedContainer() {
    /// STATE ---------------------------------
    const [logged, setLogged] = useState<Logged[]>([])
    const [loading, setLoading] = useState(true)

    /// FUNCTIONALITY -------------------------
    /**
     * Gets the logged items from the backend
     */
    const getLogged = () => {
        const request = 'http://'+config.serverURL+":"+config.serverPort+"/logged"
        fetch(request)
        .then(res => res.json())
        .then((logged)=>{
            setLogged(logged.map((loggedItem:Logged)=> {
                return {
                    ...loggedItem, 
                    selected: false
                }
            }))
            setLoading(true)
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

    const onKeyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            const newLoggedList = logged.map((loggedItem: Logged) => {
                return {
                    ...loggedItem,
                    selected: false
                }
            })
            setLogged(newLoggedList)

        }
    }

    /**
     * Call `getLogged` upon a change in the loading state
     */
    useEffect(getLogged, [loading])

    /**
     * Returns the JSX of this page
     */
    return(
        <div onKeyDown={onKeyPressed} tabIndex={0}>
        <LoggedContainerDisplay
            logged={logged}
            setSelected={setSelected}
        />
        </div>
    )
}

export default LoggedContainer