import React from "react"
import "./taskcomponent.css"

type Props = {
    is_finished: boolean,
    toggleCompleteTask: (id: number) => void,
    title: string,
    id: number
}

function TaskComponent({is_finished, toggleCompleteTask, title, id}: Props){

    const isCompleted = is_finished
    const todoClass = (isCompleted) ? 'completed-task': 'task'

    return (
        <div className={todoClass} >
            <div className={'task-field-left'}>
            </div>
            <p className={'task-field-left-2'}>{title}</p>
            <button style={{ float: "right", color: "green" }} className={'fa  fa-check'}
                onClick={e => toggleCompleteTask(id)} />
            <button style={{ float: 'right', color: "red" }} className={'fa fa-times'} />
        </div>
    )
}

export default TaskComponent