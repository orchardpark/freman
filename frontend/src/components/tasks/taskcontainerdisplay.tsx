import React from 'react'
import NewTaskModal from "./newtaskmodal";
import CheckBox from "./checkbox"
import TaskComponent from "./taskcomponent"
import "../container.css"
import {Task} from './task'

type Props = {
    tasks: Task[],
    loading: boolean,
    toggleCompleteTask: (id: number) => void,
    isCompletedChecked: boolean,
    toggleCompletedFilter: () => void,
    addNewTask: (title: string, description: string, estimated_time_minutes: number) => void,
    removeTask: (id: number) => void
}

function TaskContainerDisplay({tasks, loading, toggleCompleteTask, isCompletedChecked, toggleCompletedFilter, addNewTask, removeTask}: Props){

    const taskList = (filter_completed: boolean)=>{
        const result = []
        for (const [index, value] of tasks.entries()){
            if(!filter_completed || !value['is_finished'])
            {
                result.push(renderItem(index, value['id']))
            }
        }
        return result
    }

    const renderItem = (index: number, key: number) =>{
        return(
            <div key={key}>
                {
                    loading ? 'loading' :
                        <TaskComponent {...tasks[index]}
                                       toggleCompleteTask={toggleCompleteTask}
                                       removeTask={removeTask}
                        />
                }
            </div>
        )
    }

    return(
        <div className='container'>
            <div>
                <h1>Tasks</h1>
                <NewTaskModal addNewTask={addNewTask} />
                <CheckBox isChecked={isCompletedChecked} toggleChecked={toggleCompletedFilter} />
            </div>
            <br />
            <div style={{ overflow: 'auto', maxHeight: '80%' }}>
                {taskList(isCompletedChecked)}
            </div>
        </div>
    )

}

export default TaskContainerDisplay