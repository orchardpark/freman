import React from "react"
import config from "../app/config"
import './todocontainer.css'
import TodoComponent from "./todocomponent"
import NewTodoModal from "./newtodomodal";
import CheckBox from "./checkbox"

class TodoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoItems: [],
            loading: true,
            isCompletedChecked: false,
        }
        this.renderItem = this.renderItem.bind(this)
        this.AddNewTodoItem = this.AddNewTodoItem.bind(this)
        this.setSelected = this.setSelected.bind(this)
        this.toggleCompleteTask = this.toggleCompleteTask.bind(this)
    }


    // Backend calls

    AddNewTodoItem(title, description, estimatedTimeMinutes){
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
            .then(data=> this.setState((prevState)=>(
                {
                    todoItems: prevState.todoItems.concat([newTodoItem]),
                }
            )))
            .catch(console.log)
    }

    getTasks = () => {
        const request = 'http://'+config.serverURL + ':' + config.serverPort + '/tasks'
        fetch(request)
            .then(res => res.json())
            .then((data) => {
                this.setState({todoItems: data, loading: false})
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.getTasks()
    }

    toggleCompleteTask(id){
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
                const newTodoList = this.state.todoItems.map((todoItem)=> {
                    if(todoItem.id === id){
                        return {
                            ...todoItem,
                            is_finished: !todoItem.is_finished
                        }
                    } else{
                        return todoItem
                    }
                })
                this.setState({todoItems: newTodoList})
            })
            .catch(console.log)
    }

    // Rendering

    isCompletedChecked = () => {
        return this.state.isCompletedChecked
    }

    toggleCompletedFilter = () => {
        this.setState((prevState)=>{
            return {
                ...prevState,
                isCompletedChecked: !prevState.isCompletedChecked
            }
        })
    }

    setSelected(id){
        const newTodoList = this.state.todoItems.map((todoItem)=> {
            return {
                    ...todoItem,
                    selected: todoItem.id === id
                }
            }
        )
        this.setState({
            todoItems: newTodoList
        })
    }

    renderItem(index, key){
        return(
            <div key={key}>
                {
                    this.state.loading ? 'loading' :
                        <TodoComponent {...this.state.todoItems[index]}
                                       setSelected={this.setSelected}
                                       toggleCompleteTask={this.toggleCompleteTask}
                        />
                }
            </div>
        )
    }

    todoList(filter_completed){
        const result = []
        for (const [index, value] of this.state.todoItems.entries()){
            if(!filter_completed || !value['is_finished'])
            {
                result.push(this.renderItem(index, value['id']))
            }
        }
        return result
    }

    render() {
        return(
            <div className='todo-container'>
                <div>
                    <h1>Tasks</h1>
                    <NewTodoModal AddTodoItem={this.AddNewTodoItem}/>
                    <CheckBox isChecked={this.isCompletedChecked} toggleChecked={this.toggleCompletedFilter}/>
                </div>
                <br/>
                <div style={{ overflow: 'auto', maxHeight: '80%' }}>
                    {this.todoList(this.isCompletedChecked())}
                </div>
            </div>
        )
    }
}

export default TodoContainer