import React from "react"
import "./taskcomponent.css"
import {Overlay, Tooltip} from 'react-bootstrap'

type Props = {
    is_finished: boolean,
    toggleCompleteTask: (id: number) => void,
    title: string,
    id: number
}

function TaskComponent({is_finished, toggleCompleteTask, title, id}: Props){

    const [showTooltip, setShowTooltip] = React.useState(false)
    const [toolTipText, setToolTipText] = React.useState("")
    const isCompleted = is_finished
    const todoClass = (isCompleted) ? 'completed-task': 'task'
    const target = React.useRef(null)

    return (
        <div className={todoClass} ref={target}>
            <Overlay target={target.current} show={showTooltip} placement='right'>
                {(props) => (
                    <Tooltip id="overlay-tooltip" {...props}>
                        {toolTipText}
                    </Tooltip>
                )}
            </Overlay>
            <div className={'task-field-left'}>
            </div>
            <p className={'task-field-left-2'}>{title}</p>
            <button style={{ float: "right", color: "green" }} className={'fa  fa-check'}
                onClick={e => toggleCompleteTask(id)}
                onMouseEnter={() => { setToolTipText("Mark task as completed"); setShowTooltip(true) }}
                onMouseLeave={() => { setShowTooltip(false) }}
            />
            <button style={{ float: 'right', color: "red" }} className={'fa fa-times'}
                onMouseEnter={() => { setToolTipText("Delete task"); setShowTooltip(true) }}
                onMouseLeave={() => { setShowTooltip(false) }}
            />
        </div>
    )
}

export default TaskComponent