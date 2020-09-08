import React, { useState } from 'react';
import "../container.css"
import LoggedList from "./loggedlist"
import config from "../app/config"

function LoggedContainer() {

    const [loggedItems, setItems] = useState(()=>{
        const initialItems = getLoggedItems()
        return initialItems
    })

    function getLoggedItems(){
        const request = 'http://' + config.serverURL + ':' + config.serverPort + '/loggedtime'
        fetch(request)
            .then(res => res.json)
            .then(data => console.log(data))
            .catch(console.log)
    }

    return(
        <div className='container'>
            <div>
                <h1>Logged time</h1>
            </div>
            <br/>
            <LoggedList/>
        </div>
    )
}

export default LoggedContainer