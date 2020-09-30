import config from "./config"
import {Task} from '../tasks/task'

export const ROOT_ENDPOINT = 'http://' + config.serverURL + ':' + config.serverPort
export const CREATE_TASK_ENDPOINT = "/createtask"
export const GET_TASK_ENDPOINT = "/tasks"
export const TOGGLE_COMPLETE_TASK_ENDPOINT = "/togglecompletetask"
export const REMOVE_TASK_ENDPOINT = "/removetask"


function addNewTask(title: string, description: string, estimatedTimeMinutes: number): void {
    const newTask = {
        'title': title,
        'description': description,
        'estimated_time_minutes': estimatedTimeMinutes,
    }
    const request = ROOT_ENDPOINT + CREATE_TASK_ENDPOINT
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: { 'Content-Type': 'application/json' }
    }
    fetch(request, requestOptions)
        .catch(console.log)
}

export function getTasks(): Promise<void | Task[]>{
    const request = ROOT_ENDPOINT + GET_TASK_ENDPOINT
    return fetch(request)
        .then(res => res.json())
        .then((tasks: Task[]) => {
            return tasks
        })
        .catch(console.log)
}

function toggleCompleteTask(id: number): void  {
    const request = ROOT_ENDPOINT + TOGGLE_COMPLETE_TASK_ENDPOINT
    const id_object = {
        id: id
    }
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(id_object),
        headers: { 'Content-Type': 'application/json' }
    }
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
        .catch(console.log)
}

function removeTask (id: number): Promise<Boolean | void>  {
    const request = ROOT_ENDPOINT + REMOVE_TASK_ENDPOINT
    const id_object = {
        id: id
    }
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(id_object),
        headers: { 'Content-Type': 'application/json' }
    }
    return fetch(request, requestOptions)
        .then((response) => {
            return response.ok
        })
        .catch(console.log)
}

