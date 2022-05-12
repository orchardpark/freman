import React from 'react';
import Task from '../tasks/task';
import {UNPRODUCTIVE} from '../app/constants';
import {Modal, Container, Row, Form, Col} from 'react-bootstrap'

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
        <Modal
            show={modalIsOpen}
            onHide={closeModal}
            size="lg"
        >
            <Modal.Header>

                <Modal.Title>Book Time</Modal.Title>
            </Modal.Header>
            <Modal.Body className='show-grid'>
                <Container fluid>
                    <Row>
                        <label>Logged Detail</label>
                    </Row>
                    <Row>
                        <Col xs={8}>Application:</Col>
                        <Col xs={4}>{application_name}</Col>
                    </Row>
                    <Row>
                        <Col xs={8}>Number of minutes logged</Col>
                        <Col xs={4}>{Math.round(number_minutes)}</Col>
                    </Row>
                    <Row>
                        <Col xs={8}>Date logged</Col>
                        <Col xs={4}>{date_logged.toUTCString()}</Col>
                    </Row>
                    <Row>
                        <Form.Select aria-label='Task' onChange={handleChange} value={task}>
                            {getTaskMenuItems()}
                        </Form.Select>

                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <button style={{ float: 'left' }} onClick={closeModal}>Cancel</button>
                <button style={{ float: 'right' }} onClick={e => bookTime(application_name, task)}>Book Time</button>
            </Modal.Footer>

        </Modal>
    )
}

export default BookModal