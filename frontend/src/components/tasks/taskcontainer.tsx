import React, {useState, useEffect} from "react"
import config from "../app/config"
import TaskContainerDisplay from './taskcontainerdisplay'
import Task from "./task"

function TaskContainer() {

    /// STATE -------------------------
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [isCompletedChecked, setCompleteChecked] = useState(false)

    
    /// FUNCTIONALITY -----------------
    /**
     * Adds a new task and sends it to the backend
     * @param title The title of the task
     * @param description Description of the task
     * @param estimatedTimeMinutes Number of minutes the task is expected to take to complete
     */
    const addNewTask = (title: string, description: string, estimatedTimeMinutes: number) =>{
        const newTask = {
                'title': title,
                'description': description,
                'estimated_time_minutes': estimatedTimeMinutes,
            }
        const request = 'http://'+config.serverURL + ':' + config.serverPort + '/createtask'
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {'Content-Type': 'application/json'}
        }
        fetch(request, requestOptions)
            .then(()=>setLoading(true))
            .catch(console.log)
    }

    /**
     * Retrieves the tasks from the backend
     * sets the `task` variable.
     */
    const getTasks = () => {
        const request = 'http://'+config.serverURL + ':' + config.serverPort + '/tasks'
        fetch(request)
            .then(res => res.json())
            .then((tasks) => {
                setTasks(tasks)
                setLoading(false)
            })
            .catch(console.log)
    }

    /**
     * Call `getTasks` upon a change in the loading state
     */
    useEffect(getTasks, [loading])

    /**
     * Toggles the selected task between completed and to-do status
     * and sends this update back to the backend.
     * @param id The id of the task
     */
    const toggleCompleteTask = (id: number) =>{
        const request = 'http://'+config.serverURL + ':' + config.serverPort + '/togglecompletetask'
        const id_object = {
            id: id
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(id_object),
            headers: {'Content-Type': 'application/json'}
        }
        fetch(request, requestOptions)
            .then((data)=>{
                const newTasks = tasks.map((task)=> {
                    if(task.id === id){
                        return {
                            ...task,
                            is_finished: !task.is_finished
                        }
                    } else{
                        return task
                    }
                })
                setTasks(newTasks)
            })
            .catch(console.log)
    }
    
    /**
     * Toggles the completed filter on or off
     */
    const toggleCompletedFilter = () => {
        setCompleteChecked(isCompletedChecked => !isCompletedChecked)
    }

    /**
     * Returns the JSX of this page
     */
    return (
        <TaskContainerDisplay 
            addNewTask={addNewTask}
            tasks={tasks}
            loading={loading}
            toggleCompleteTask={toggleCompleteTask}
            isCompletedChecked={isCompletedChecked}
            toggleCompletedFilter={toggleCompletedFilter}
        />
    );
}

export default TaskContainer