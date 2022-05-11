import React, { useEffect } from 'react'
import NewTaskModal from "./newtaskmodal"
import CheckBox from "./checkbox"
import TaskComponent from "./taskcomponent"
import Task from './task'
import { Container, Row, Col} from 'react-bootstrap'
import "../container.css"
import './taskrow.css'

type Props = {
    tasks: Task[],
    loading: boolean,
    toggleCompleteTask: (id: number) => void,
    deleteTask: (id: number) => void,
    isCompletedChecked: boolean,
    toggleCompletedFilter: () => void,
    addNewTask: (title: string, description: string, estimated_time_minutes: number, dealine: Date) => void,
}

function TaskContainerDisplay({tasks, loading, toggleCompleteTask, deleteTask, isCompletedChecked, toggleCompletedFilter, addNewTask}: Props){

    const target = React.useRef<HTMLDivElement>(null)
    const [taskModalOpen,setTaskModalOpen] = React.useState(false)

    /**
     * 
     * @param filter_completed Filter completed tasks?
     * @returns An array of TaskComponent
     */
    const taskList = (filter_completed: boolean)=>{
        tasks.sort((a,b)=>a.deadline.getUTCMilliseconds()-b.deadline.getUTCMilliseconds())
        const result = []
        for (const [index, value] of tasks.entries()){
            if(filter_completed || !value['is_finished'])
            {
                result.push(renderItem(index, value['id']))
            }
        }
        return result
    }

    /**
     * 
     * @param index Index of the task in the task array
     * @param key Unique identifief for this component (the id of the task)
     * @returns Render of an individual task component
     */
    const renderItem = (index: number, key: number) =>{
        return(
            <div key={key}>
                {
                    loading ? 'loading' :
                        <TaskComponent {...tasks[index]}
                                       toggleCompleteTask={toggleCompleteTask}
                                       deleteTask={deleteTask}
                        />
                }
            </div>
        )
    }

    /**
     * Handle keypresses on the screen
     * @param e 
     */
    const onKeyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === '+') {
            setTaskModalOpen(true)
        }
    }

    /**
     * Focus on the main div after loading the
     * component.
     */
    useEffect(()=>{
        target.current?.focus()
    })


    return (
        <div onKeyDown={onKeyPressed} ref={target} tabIndex={0}>
            <Container>
                <Row>
                    <h1>Tasks</h1>
                </Row>
                <Row className="taskrow">
                    <div>
                        <Container>
                            <Row>
                                <Col>
                                    <h3>Filters:</h3>
                                </Col>
                                <Col>
                                    <CheckBox isChecked={isCompletedChecked} toggleChecked={toggleCompletedFilter} text="Completed" />
                                </Col>
                                <Col></Col>
                                <Col></Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>
                        </Container>
                    </div>
                </Row>
                <Row className='taskrow'>
                    <div style={{ overflow: 'auto', maxHeight: '80%', minWidth: '1200px' }}>
                        {taskList(isCompletedChecked)}
                    </div>
                </Row>
                <Row className='taskrow'>
                    <Col></Col>
                    <Col>
                        <NewTaskModal addNewTask={addNewTask} taskModalOpen={taskModalOpen} setTaskModalOpen={(isOpen: boolean) => setTaskModalOpen(isOpen)} />
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )

}

export default TaskContainerDisplay