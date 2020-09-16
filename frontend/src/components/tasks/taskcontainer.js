import React, {useState, useEffect} from "react"
import config from "../app/config"
import TaskContainerDisplay from './taskcontainerdisplay'

function TaskContainer() {

    const [todoItems, setTodoItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [isCompletedChecked, setCompleteChecked] = useState(false)

    const addNewTask = (title, description, estimatedTimeMinutes) =>{
        const newTodoItem = {
                'title': title,
                'description': description,
                'estimated_time_minutes': estimatedTimeMinutes
            }
        const request = 'http://'+config.serverURL + ':' + config.serverPort + '/createtask'
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(newTodoItem),
            headers: {'Content-Type': 'application/json'}
        }
        fetch(request, requestOptions)
            .then(data=> this.setTodoItems((prevTodoItems)=>(
                prevTodoItems.concat([newTodoItem])
            )))
            .catch(console.log)
    }


    const getTasks = () => {
        const request = 'http://'+config.serverURL + ':' + config.serverPort + '/tasks'
        fetch(request)
            .then(res => res.json())
            .then((data) => {
                setTodoItems(data)
                setLoading(false)
            })
            .catch(console.log)
    }

    useEffect( () => getTasks())

    const toggleCompleteTask = (id) =>{
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
                const newTodoList = todoItems.map((todoItem)=> {
                    if(todoItem.id === id){
                        return {
                            ...todoItem,
                            is_finished: !todoItem.is_finished
                        }
                    } else{
                        return todoItem
                    }
                })
                setTodoItems(newTodoList)
            })
            .catch(console.log)
    }
    
    const toggleCompletedFilter = () => {
        setCompleteChecked(isCompletedChecked => !isCompletedChecked)
    }

    
    return (
        <TaskContainerDisplay 
            addNewTask={addNewTask}
            todoItems={todoItems}
            loading={loading}
            toggleCompleteTask={toggleCompleteTask}
            isCompletedChecked={isCompletedChecked}
            toggleCompletedFilter={toggleCompletedFilter}
        />
    );
}

export default TaskContainer