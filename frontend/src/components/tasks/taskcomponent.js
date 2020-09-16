import React from "react"
import {Circle} from "react-circle";
import "./taskcomponent.css"

function TaskComponent(props){

    const isCompleted = props['is_finished']
    const todoClass = (isCompleted) ? 'completed-task': 'task'

    return (
        <div className={todoClass} >
            <div className={'task-field-left'}>
                <Circle progress={100} size={50} progressColor={"blue"} />
            </div>
            <p className={'task-field-left-2'}>{props['title']}</p>
            <button style={{ float: "right", color: "green" }} className={'fa  fa-check'}
                onClick={e => props.toggleCompleteTask(props['id'])} />
            <button style={{ float: 'right', color: "red" }} className={'fa fa-times'} />
        </div>
    )
}

export default TaskComponent