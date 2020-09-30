import React, {useState, useEffect} from "react"
import TaskContainerDisplay from './taskcontainerdisplay'
import {Task} from "./task"
import { store } from "../app/store"
import {ROOT_ENDPOINT} from '../app/backendapi'
import { SET_TASKS } from "./taskslice"

function TaskContainer() {

    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [isCompletedChecked, setCompleteChecked] = useState(false)

    const toggleCompletedFilter = () => {
        setCompleteChecked(isCompletedChecked => !isCompletedChecked)
    }

    useEffect(getTasks, [loading])

    return (
        <TaskContainerDisplay
            addNewTask={addNewTask}
            tasks={tasks}
            loading={loading}
            toggleCompleteTask={toggleCompleteTask}
            isCompletedChecked={isCompletedChecked}
            toggleCompletedFilter={toggleCompletedFilter}
            removeTask={removeTask}
        />
    );
}

export default TaskContainer