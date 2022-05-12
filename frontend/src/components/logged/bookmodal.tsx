import React from 'react';
import Task from '../tasks/task';
import {UNPRODUCTIVE} from '../app/constants';
import {Modal, Container, Row, Form} from 'react-bootstrap'

type Props = {
    modalIsOpen: boolean
    application_name: string,
    number_minutes: number,
    date_logged: Date,
    tasks: Task[]
    closeModal: () => void
    bookTime: (application_name: string, task_id: number) => void
}

function BookModal({ modalIsOpen, application_name, number_minutes, date_logged, tasks, closeModal, bookTime }: Props) {
    const [task, setTask] = React.useState(-1)

    const handleChange = (event: any) => {
        setTask(event.target.value)
    }

    const getTaskMenuItems = () => {
        const menuItems = tasks.map(t => {
            return (<option key={t.id} value={t.id}>{t.title}</option>)
        })
        const menuItemsWithNonProductive =
            menuItems.concat(<option key={UNPRODUCTIVE} value={UNPRODUCTIVE}>{"Unproductive"}</option>)
        return (
            menuItemsWithNonProductive
        )
    }

    return (
        <div>
            <Modal
                show={modalIsOpen}
                onHide={closeModal}
                >
                <Modal.Title>Book Time</Modal.Title>
                <form>
                    <label>Logged Detail</label>
                        <Container>
                            <Row item xs={8}>Application:</Row>
                            <Row item xs={4}>{application_name}</Row>
                            <Row item xs={8}>Number of minutes logged</Row>
                            <Row item xs={4}>{Math.round(number_minutes)}</Row>
                            <Row item xs={8}>Date logged</Row>
                            <Row item xs={4}>{date_logged.toUTCString()}</Row>
                        </Container>
                    <br/>
                </form>
                <Form.Select aria-label='Task' onChange={handleChange} value={task}>
                    {getTaskMenuItems()}
                </Form.Select>
                <br/>
                <br/>
                <div>
                    <button style={{ float: 'left' }} onClick={closeModal}>Cancel</button>
                    <button style={{ float: 'right' }} onClick={e => bookTime(application_name, task)}>Book Time</button>
                </div>
                
            </Modal>
        </div>
    )
}

export default BookModal