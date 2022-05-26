import React from "react"
import TaskContainerDisplay from './taskcontainerdisplay'
import Task from "./task"
import { getEndPoint, getGetRequestOptions, getPostRequestOptions } from "../app/util"

type Props = {
    token: string,
    handleFetchError: (error: Error) => void
}

function TaskContainer({ token, handleFetchError }: Props) {

    /// STATE -------------------------
    const [tasks, setTasks] = React.useState<Task[]>([])
    const [loading, setLoading] = React.useState(true)
    const [isCompletedChecked, setCompleteChecked] = React.useState(false)


    /// FUNCTIONALITY -----------------
    /**
     * Adds a new task and sends it to the backend
     * @param title The title of the task
     * @param description Description of the task
     * @param estimatedTimeMinutes Number of minutes the task is expected to take to complete
     */
    const addNewTask = (title: string, description: string, estimatedTimeMinutes: number, deadline: Date) => {
        if (title.length >= 1 && estimatedTimeMinutes > 0) {
            const newTask = {
                'title': title,
                'description': description,
                'estimated_time_minutes': estimatedTimeMinutes,
                'deadline': deadline
            }

            const request = getEndPoint('create_task')
            const requestOptions = getPostRequestOptions(token, JSON.stringify(newTask))
            fetch(request, requestOptions)
                .then(() => setLoading(true))
                .catch(handleFetchError)
        }
    }

    /**
     * Retrieves the tasks from the backend
     * sets the `task` variable.
     */
    const getTasks = () => {
        const request = getEndPoint('tasks')
        const requestOptions = getGetRequestOptions(token)
        fetch(request, requestOptions)
            .then(res => res.json())
            .then((tasks) => {
                setTasks(tasks.map((task: Task) => {
                    return {
                        ...task,
                        deadline: new Date(task.deadline)
                    }
                }))
                setLoading(false)
            })
            .catch(handleFetchError)
    }

    const deleteTask = (id: number) => {
        const request = getEndPoint('remove_task')
        const id_object = {
            id: id
        }
        const requestOptions = getPostRequestOptions(token, JSON.stringify(id_object))
        fetch(request, requestOptions)
            .then(() => {
                const newTasks = tasks.filter(task => task.id !== id)
                setTasks(newTasks)
            })
            .catch(handleFetchError)
    }


    /**
     * Toggles the selected task between completed and to-do status
     * and sends this update back to the backend.
     * @param id The id of the task
     */
    const toggleCompleteTask = (id: number) => {
        const request = getEndPoint('toggle_complete_task')
        const id_object = {
            id: id
        }
        const requestOptions = getPostRequestOptions(token, JSON.stringify(id_object))
        fetch(request, requestOptions)
            .then((data) => {
                const newTasks = tasks.map((task) => {
                    if (task.id === id) {
                        return {
                            ...task,
                            is_finished: !task.is_finished
                        }
                    } else {
                        return task
                    }
                })
                setTasks(newTasks)
            })
            .catch(handleFetchError)
    }

    /**
     * Toggles the completed filter on or off
     */
    const toggleCompletedFilter = () => {
        setCompleteChecked(isCompletedChecked => !isCompletedChecked)
    }

    /// LIFECYCLE
    /**
     * Call `getTasks` upon a change in the loading state
     */
    React.useEffect(getTasks, [token, loading, handleFetchError])

    /// RENDER


    /**
     * Returns the JSX of this page
     */
    return (
        <TaskContainerDisplay
            addNewTask={addNewTask}
            tasks={tasks}
            loading={loading}
            toggleCompleteTask={toggleCompleteTask}
            deleteTask={deleteTask}
            isCompletedChecked={isCompletedChecked}
            toggleCompletedFilter={toggleCompletedFilter}
        />
    );
}

export default TaskContainer