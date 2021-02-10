import React, { useEffect, useState } from 'react';
import "../container.css"
import config from "../app/config"
import Logged from './logged'

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
            setLogged(logged)
            setLoading(true)
        })
        .catch(console.log)
    }

    /**
     * Call `getLogged` upon a change in the loading state
     */
    useEffect(getLogged, [loading])

    /**
     * Returns the JSX of this page
     */
    return(
        <div className='container'>
            <div>
                <h1>Logged time</h1>
            </div>
            <br/>
        </div>
    )
}

export default LoggedContainer