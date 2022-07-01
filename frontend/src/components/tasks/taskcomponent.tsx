import React from "react"
import "./taskcomponent.css"
import { Overlay, Tooltip } from 'react-bootstrap'

type Props = {
    is_finished: boolean,
    toggleCompleteTask: (id: number) => void,
    deleteTask: (id: number) => void,
    title: string,
    id: number,
    deadline: Date,
    description: string
}

/**
 * The task component represents a single to-do item in a list. In particular, it has
 * an id, title and deadline.
 * @param param0 
 * @returns The task component
 */
function TaskComponent({ is_finished, toggleCompleteTask, deleteTask, title, id, deadline, description }: Props) {

    const [showButtonTooltip, setShowButtonTooltip] = React.useState(false)
    const [showTaskTooltip, setShowTaskTooltip] = React.useState(false)
    const [toolTipText, setToolTipText] = React.useState("")
    const isCompleted = is_finished
    const todoClass = (isCompleted) ? 'completed-task' : 'task'
    const target = React.useRef(null)

    const DateDiff = {

        inDays: function (d1: Date, d2: Date) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return Math.floor((t2 - t1) / (24 * 3600 * 1000));
        },

        inWeeks: function (d1: Date, d2: Date) {
            const t2 = d2.getTime();
            const t1 = d1.getTime();

            return (t2 - t1) / (24 * 3600 * 1000 * 7);
        },

        inMonths: function (d1: Date, d2: Date) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();

            return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
        },

        inYears: function (d1: Date, d2: Date) {
            return d2.getFullYear() - d1.getFullYear();
        },

        sameDay: function (d1: Date, d2: Date) {
            return (d1.getFullYear() === d2.getFullYear()
                && d1.getMonth() === d2.getMonth()
                && d1.getDate() === d2.getDate())
        }
    }

    /**
     * 
     * @returns Text on the task component describing when the task has to be finished.
     */
    const deadlineText = () => {
        // check if more than a month overdue
        if (DateDiff.inDays(new Date(), deadline) > 30) return <p style={{ color: "#00ff80" }}>Due in 30+ days</p>
        // check if due in more than a month
        else if (DateDiff.inDays(deadline, new Date()) > 30) return <p style={{ color: "#ff0000" }}>Overdue: 30+ days</p>
        // check if on the same day
        else if (DateDiff.sameDay(deadline, new Date())) return <p style={{ color: "#ff8000" }}>Due today</p>
        // diff in days
        else {
            const dayDiff = DateDiff.inDays(deadline, new Date())
            if (dayDiff < 0) return <p style={{ color: "#00ff00" }}>{"Due in " + -dayDiff + " days"}</p>
            else return <p style={{ color: "#ff4000" }}>{"Overdue: " + dayDiff + " days"}</p>
        }
    }

    return (
        <div className={todoClass} ref={target}>
            <Overlay target={target.current} show={showButtonTooltip} placement='right'>
                {(props) => (
                    <Tooltip id="overlay-tooltip" {...props}>
                        {toolTipText}
                    </Tooltip>
                )}
            </Overlay>
            <Overlay target={target} show={!showButtonTooltip && showTaskTooltip} placement='top'>
                {(props) => (
                    <Tooltip id="overlay-tooltip" {...props}>
                        {toolTipText}
                    </Tooltip>
                )}
            </Overlay>
            <div className={'task-field-left'}>
                {deadlineText()}
            </div>
            <p
                className={'task-field-left-2'}
                onMouseEnter={() => { setToolTipText(description); setShowTaskTooltip(true) }}
                onMouseLeave={() => { setShowTaskTooltip(false) }}
            >
                {title}
            </p>
            <button style={{ float: "right", color: "green" }} className={'fa  fa-check'}
                onClick={e => toggleCompleteTask(id)}
                onMouseEnter={() => { setToolTipText("Mark task as completed"); setShowButtonTooltip(true) }}
                onMouseLeave={() => { setShowButtonTooltip(false) }}
            />
            <button style={{ float: 'right', color: "red" }} className={'fa fa-times'}
                onClick={e => deleteTask(id)}
                onMouseEnter={() => { setToolTipText("Delete task"); setShowButtonTooltip(true) }}
                onMouseLeave={() => { setShowButtonTooltip(false) }}
            />
        </div>
    )
}

export default TaskComponent