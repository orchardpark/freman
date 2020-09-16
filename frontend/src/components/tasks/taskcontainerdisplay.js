import React from 'react'
import NewTaskModal from "./newtaskmodal";
import CheckBox from "./checkbox"
import TaskComponent from "./taskcomponent"
import "../container.css"


function TaskContainerDisplay(props){

    const taskList = (filter_completed)=>{
        const result = []
        for (const [index, value] of props.todoItems.entries()){
            if(!filter_completed || !value['is_finished'])
            {
                result.push(renderItem(index, value['id']))
            }
        }
        return result
    }

    const renderItem = (index, key) =>{
        return(
            <div key={key}>
                {
                    props.loading ? 'loading' :
                        <TaskComponent {...props.todoItems[index]}
                                       toggleCompleteTask={props.toggleCompleteTask}
                        />
                }
            </div>
        )
    }

    return(
        <div className='container'>
            <div>
                <h1>Tasks</h1>
                <NewTaskModal addNewTask={props.addNewTask} />
                <CheckBox isChecked={props.isCompletedChecked} toggleChecked={props.toggleCompletedFilter} />
            </div>
            <br />
            <div style={{ overflow: 'auto', maxHeight: '80%' }}>
                {taskList(props.isCompletedChecked)}
            </div>
        </div>
    )

}

export default TaskContainerDisplay