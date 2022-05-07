import React from 'react'
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
    isCompletedChecked: boolean,
    toggleCompletedFilter: () => void,
    addNewTask: (title: string, description: string, estimated_time_minutes: number, dealine: Date) => void,
}

function TaskContainerDisplay({tasks, loading, toggleCompleteTask, isCompletedChecked, toggleCompletedFilter, addNewTask}: Props){

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

    const renderItem = (index: number, key: number) =>{
        return(
            <div key={key}>
                {
                    loading ? 'loading' :
                        <TaskComponent {...tasks[index]}
                                       toggleCompleteTask={toggleCompleteTask}
                        />
                }
            </div>
        )
    }

    return (
        <div className='container'>
            <div>
                <h1>Tasks</h1>
                <Container>
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
                        <div style={{ overflow: 'auto', maxHeight: '80%', minWidth: '1200px'}}>
                        {taskList(isCompletedChecked)}
                        </div>
                    </Row>
                    <Row className='taskrow'>
                        <Col></Col>
                        <Col>
                        <NewTaskModal addNewTask={addNewTask} />
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        </div>
    )

}

export default TaskContainerDisplay