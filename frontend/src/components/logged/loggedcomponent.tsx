import React from 'react'
import "./loggedcomponent.css"

type Props = {
    id: number,
    application_name: string,
    window_title: string,
    logged_time_seconds: number
}

function LoggedComponent({id, application_name, window_title, logged_time_seconds}: Props){
    return (
        <div className={'logged'} >
            <p className={'logged-field-left'}>{application_name}</p>
            <p className={'logged-field-left-2'}>{window_title}</p>
            <p className={'logged-field-right'}>{logged_time_seconds}</p>
        </div>
    )
}

export default LoggedComponent