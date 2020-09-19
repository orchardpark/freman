import React, {useState, useEffect} from "react"
import config from "../app/config"
import TaskContainerDisplay from './taskcontainerdisplay'
import {Task} from "./task"
import { store } from "../app/store"
import { SET_TASKS } from "./taskslice"

function TaskContainer() {

    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [isCompletedChecked, setCompleteChecked] = useState(false)

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

    const getTasks = () => {
        const request = 'http://'+config.serverURL + ':' + config.serverPort + '/tasks'
        fetch(request)
            .then(res => res.json())
            .then((tasks: Task[]) => {
                setTasks(tasks)
                setLoading(false)
                store.dispatch({type: SET_TASKS, payload: tasks})
            })
            .catch(console.log)
    }

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
                store.dispatch({type: SET_TASKS, payload: newTasks})
            })
            .catch(console.log)
    }
    
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
        />
    );
}

export default TaskContainer