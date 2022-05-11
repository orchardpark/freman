import React from 'react'
import "./loggedcomponent.css"

type Props = {
    application_name: string,
    logged_time_seconds: number, 
    selected: boolean,
    setSelected: (application_name: string) => void
}


function LoggedComponent({application_name, logged_time_seconds, selected, setSelected}: Props){

    return (
        <div className={selected ? 'logged-selected' : 'logged'} onClick={(event: React.MouseEvent<HTMLElement>) => {
            if (selected === false) {
                setSelected(application_name)
            }
        }}>
            <p className={'logged-field-left'}>{application_name}</p>
            <p className={'logged-field-right'}>{Math.round(logged_time_seconds/60)}</p>
        </div>
    )
}

export default LoggedComponent