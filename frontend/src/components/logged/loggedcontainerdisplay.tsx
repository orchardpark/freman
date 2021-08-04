import React from 'react'
import Logged from './logged'
import LoggedComponent from './loggedcomponent'
import BookModal from './bookmodal'
import "./loggedcomponent.css"
import Task from '../tasks/task'

type Props = {
    logged: Logged[],
    tasks: Task[],
    setSelected: (application_name: string, window_title: string) => void
    closeModal: () => void
    bookTime: (application_name: string, window_title: string, task_id: number) => void

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
                <BookModal modalIsOpen={false} application_name={"none"} window_title={"none"} number_minutes={0} date_logged={new Date()} tasks={tasks} closeModal={() => { }} bookTime={ ()=>{}}/>
            )
        }
        else {
            return(
                <BookModal modalIsOpen={true} application_name={selected_element.application_name}
                    window_title={selected_element.window_title} number_minutes={selected_element.logged_time_seconds / 60}
                    date_logged={selected_element.created_at} tasks={tasks} closeModal={closeModal}
                    bookTime={bookTime}
                />
            )
        }
        
        }

    return (
        <div className='container'>
            <div>
                <h1>Logged Items</h1>
                {getModal()}
            </div>
            <br />
            <div>
                <h2 className={'logged-field-left'}>Application</h2>
                <h2 className={'logged-field-left-2'}>Window</h2>
                <h2 className={'logged-field-right'}>Time (minutes)</h2>
            </div>
            <span>&nbsp;&nbsp;</span>

            <div style={{ overflow: 'auto', maxHeight: '80%' }}>
                {loggedList()}
            </div>
        </div>
    )
}

export default LoggedContainerDisplay