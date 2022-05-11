import React from 'react'
import "./loggedcomponent.css"
import {Row, Col} from 'react-bootstrap'

type Props = {
    application_name: string,
    logged_time_seconds: number, 
    selected: boolean,
    setSelected: (application_name: string) => void
}


function LoggedComponent({application_name, logged_time_seconds, selected, setSelected}: Props){

    return (
        <Row className={selected ? 'logged-selected' : 'logged'} onClick={(event: React.MouseEvent<HTMLElement>) => {
            if (selected === false) {
                setSelected(application_name)
            }
        }}>
            <Col >{application_name}</Col>
            <Col >{Math.round(logged_time_seconds/60)}</Col>
        </Row>
    )
}

export default LoggedComponent