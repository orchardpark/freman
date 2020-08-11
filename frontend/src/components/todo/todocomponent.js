import React from "react"
import {Circle} from "react-circle";
import "./todocomponent.css"

function TodoComponent(props){

    const isSelected = props['selected']
    const isCompleted = props['is_finished']
    const todoClass = (isCompleted) ? 'completed-todo-item': 'todo-item'

    function componentContent(){
        return (
            <div className={todoClass} onClick={e => props.setSelected(props['id'])}>
                <div className={'todo-field-left'}>
                    <Circle progress={100} size={50} progressColor={"blue"}/>
                </div>
                <p  className={'todo-field-left-2'}>{props['title']}</p>
                <button style={{float: "right", color: "green"}} className={'fa  fa-check'}
                        onClick={e => props.toggleCompleteTask(props['id'])}/>
                <button style={{float: 'right', color: "red"}} className={'fa fa-times'}/>

            </div>
        )
    }

    return (
        componentContent()
    )
}

export default TodoComponent