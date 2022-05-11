import React from 'react'
import Logged from './logged'
import LoggedComponent from './loggedcomponent'
import BookModal from './bookmodal'
import "./loggedcomponent.css"
import Task from '../tasks/task'
import {Container, Row, Col} from 'react-bootstrap'

type Props = {
    logged: Logged[],
    tasks: Task[],
    setSelected: (application_name: string) => void
    closeModal: () => void
    bookTime: (application_name: string, task_id: number) => void

}

function LoggedContainerDisplay({logged, tasks, setSelected, closeModal, bookTime}: Props){

    const loggedList = ()=>{
        const result = []
        logged.sort((a,b)=>b.logged_time_seconds-a.logged_time_seconds)
        for (const [index, value] of logged.entries()){
            result.push(renderItem(index, value['id']))
        }
        return result
    }

    const renderItem = (index: number, key: number) =>{
        return(
            <div key={key}>
                {
                    <LoggedComponent
                        {...logged[index]}
                        setSelected={setSelected}
                    />
                }
            </div>
        )
    }

    const getModal = () => {
        const selected_element = logged.find(s => s.selected === true)
        console.log(selected_element?.application_name)
        if (selected_element === undefined) {
            return (
                <BookModal modalIsOpen={false} application_name={"none"} 
                number_minutes={0} date_logged={new Date()} 
                tasks={tasks} closeModal={() => { }} bookTime={ ()=>{}}/>
            )
        }
        else {
            return(
                <BookModal modalIsOpen={true} application_name={selected_element.application_name}
                    number_minutes={selected_element.logged_time_seconds / 60}
                    date_logged={selected_element.created_at} tasks={tasks} closeModal={closeModal}
                    bookTime={bookTime}
                />
            )
        }
        
        }

    /**
     * Render the logged items list.
     */
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Logged Items</h1>
                    {getModal()}
                </Col>
            </Row>
            <br />
            <Row>
                <Col><h3>Application</h3></Col>
                <Col><h3>Time (minutes)</h3></Col>
            </Row>
            {loggedList()}
        </Container>
    )
}

export default LoggedContainerDisplay