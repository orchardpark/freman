import React, {ChangeEvent} from 'react';
import Modal from 'react-modal';
import modalStyle from "./modalstyle"
import DatePicker from "react-datepicker";
import "./datepicker.css"
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement(document?.getElementById('root') ?? "root")

type Props = {
    addNewTask: (title: string, description: string, estimatedTimeMinutes: number, dealine: Date) => void
}

function NewTaskModal({addNewTask}: Props){
    var subtitle: HTMLHeadingElement | null;
    const [modalIsOpen,setIsOpen] = React.useState(false)
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [estimatedTimeMinutes, setEstimatedTimeMinutes] = React.useState(0)
    const [deadline, setDeadline] = React.useState(new Date())

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        if(subtitle != null)
            subtitle.style.color = '#f00';
    }

    function closeModal(){
        setIsOpen(false);
    }

    function confirmNewTask() {
        addNewTask(title, description, estimatedTimeMinutes, deadline)
        closeModal()
    }

    function changeHandler(event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>){
        const name = event.target.name
        const value = event.target.value
        if(name === "title"){
            setTitle(value)
        }
        if(name === "description"){
            setDescription(value)
        }
        if(name === "estimatedtimeminutes"){
            setEstimatedTimeMinutes(Number.parseInt(value))
        }
    }

    return (
        <div>
            <div>
                <button onClick={openModal} style={{fontSize: '20px'}}><i className={'fa fa-fw fa-plus'}/></button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyle}
                contentLabel="New Task Modal">

                <h2 ref={_subtitle => (subtitle = _subtitle)}>Add new Task</h2>
                <form>
                    <label>
                        Task Name:
                        <input type="text" name="title" value={title} onChange={changeHandler}/>
                    </label>
                    <br/>
                    <br/>
                    <label >
                        Description:
                        <textarea name="description" rows={5} value={description} onChange={changeHandler}/>
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Estimated time (minutes):
                        <input type="number" name="estimatedtimeminutes" value={estimatedTimeMinutes} onChange={changeHandler}/>
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Deadline
                        <DatePicker selected={deadline} onSelect={date => setDeadline(date)} onChange={date => date} popperPlacement='top' />
                    </label>
                </form>
                <br/>
                <div>
                    <button style={{float: 'left'}}  onClick={closeModal}>Cancel</button>
                    <button style={{float: 'right'}} onClick={confirmNewTask}>Confirm</button>
                </div>
            </Modal>
        </div>
    );
}

export default NewTaskModal