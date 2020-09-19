import React from "react"
import {Circle} from "react-circle";
import "./taskcomponent.css"

type Props = {
    toggleCompleteTask: (id: number) => void,
    removeTask: (id: number) => void
    is_finished: boolean,
    title: string,
    id: number
}

function TaskComponent({toggleCompleteTask, removeTask, is_finished, title, id}: Props){

    const isCompleted = is_finished
    const todoClass = (isCompleted) ? 'completed-task': 'task'

    return (
        <div className={todoClass} >
            <div className={'task-field-left'}>
                <Circle progress={100} size={"50"} progressColor={"blue"} />
            </div>
            <p className={'task-field-left-2'}>{title}</p>
            <button style={{ float: "right", color: "green" }} className={'fa  fa-check'}
                onClick={e => toggleCompleteTask(id)} />
            <button style={{ float: 'right', color: "red" }} className={'fa fa-times'} 
                onClick={e => removeTask(id)}/>
        </div>
    )
}

export default TaskComponent