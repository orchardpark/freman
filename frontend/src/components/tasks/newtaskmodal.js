import React from 'react';
import Modal from 'react-modal';
import modalStyle from "./modalstyle"

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'))

function NewTaskModal(props){
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false)
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [estimatedTimeMinutes, setEstimatedTimeMinutes] = React.useState(0)

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal(){
        setIsOpen(false);
    }

    function confirmNewTodoItem(){
        props.AddTodoItem(title, description, estimatedTimeMinutes)
        closeModal()
    }

    function changeHandler(event){
        const name = event.target.name
        const value = event.target.value
        if(name === "title"){
            setTitle(value)
        }
        if(name === "description"){
            setDescription(value)
        }
        if(name === "estimatedtimeminutes"){
            setEstimatedTimeMinutes(value)
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
                contentLabel="New Todo Modal">

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
                </form>
                <br/>
                <div>
                    <button style={{float: 'left'}}  onClick={closeModal}>Cancel</button>
                    <button style={{float: 'right'}} onClick={confirmNewTodoItem}>Confirm</button>
                </div>
            </Modal>
        </div>
    );
}

export default NewTaskModal