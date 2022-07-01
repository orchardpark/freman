import { ChangeEvent, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import { Overlay, Tooltip, Modal } from 'react-bootstrap'
import "./datepicker.css"
import "react-datepicker/dist/react-datepicker.css";


type Props = {
    addNewTask: (title: string, description: string, estimatedTimeMinutes: number, deadline: Date) => void,
    taskModalOpen: boolean,
    setTaskModalOpen: (isOpen: boolean) => void,
}

function NewTaskModal({ addNewTask, taskModalOpen, setTaskModalOpen }: Props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [estimatedTimeMinutes, setEstimatedTimeMinutes] = useState(0)
    const [deadline, setDeadline] = useState(new Date())
    const [showTooltip, setShowTooltip] = useState(false)
    const target = useRef(null);

    function openModal() {
        setTaskModalOpen(true)
    }

    function closeModal() {
        setTaskModalOpen(false);
    }

    function confirmNewTask() {
        addNewTask(title, description, estimatedTimeMinutes, deadline)
        closeModal()
    }

    function changeHandler(event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) {
        const name = event.target.name
        const value = event.target.value
        if (name === "title") {
            setTitle(value)
        }

        if (name === "description") {
            setDescription(value)
        }
        if (name === "estimatedtimeminutes") {
            setEstimatedTimeMinutes(Number.parseInt(value))
        }
    }

    return (
        <div>
            <Overlay target={target.current} show={showTooltip} placement='right'>
                {(props) => (
                    <Tooltip id="overlay-tooltip" {...props}>
                        (+) Add a new task.
                    </Tooltip>
                )}
            </Overlay>
            <div>
                <button ref={target}
                    onClick={openModal} style={{ fontSize: '20px' }}><i
                        className={'fa fa-fw fa-plus'}
                        onMouseEnter={() => { setShowTooltip(true) }} onMouseLeave={() => { setShowTooltip(false) }} /></button>
            </div>
            <Modal
                show={taskModalOpen}
                onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>Add new task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>
                            Task Name:
                            <input type="text" name="title" value={title} onChange={changeHandler} />
                        </label>
                        <br />
                        <br />
                        <label >
                            Description:
                            <textarea name="description" rows={5} value={description} onChange={changeHandler} />
                        </label>
                        <br />
                        <br />
                        <label>
                            Estimated time (minutes):
                            <input type="number" name="estimatedtimeminutes" value={estimatedTimeMinutes} onChange={changeHandler} />
                        </label>
                        <br />
                        <br />
                        <label>
                            Deadline
                            <DatePicker selected={deadline} onSelect={date => setDeadline(date)} onChange={date => date} popperPlacement='top' />
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button style={{ float: 'left' }} onClick={closeModal}>Cancel</button>
                    <button style={{ float: 'right' }} onClick={confirmNewTask}>Confirm</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NewTaskModal