import React from 'react'
import "./loggedcomponent.css"

type Props = {
    id: number,
    application_name: string,
    window_title: string,
    logged_time_minutes: number
}

function LoggedComponent({id, application_name, window_title, logged_time_minutes}: Props){
    return (
        <div className={'logged'} >
            <p className={'logged-field-left-2'}>{application_name}</p>
            <p className={'logged-field-left'}>{window_title}</p>
        </div>
    )
}

export default LoggedComponent