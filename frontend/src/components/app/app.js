import React from 'react';
import TopBar from "./topbar"
import SideNavContainer from "./sidenavcontainer"
import TaskContainer from '../tasks/taskcontainer'
import LoggedContainer from "../logged/loggedcontainer"
import ReportContainer from "../report/reportcontainer";

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            currentSelected: "tasks"
        }
        this.setSelected = this.setSelected.bind(this)
    }

    setSelected(selected){
        this.setState({
            currentSelected: selected
        })
    }

    render()
    {
        const getContainer = () => {
            if(this.state.currentSelected === 'tasks')
                return(<TaskContainer/>)
            if(this.state.currentSelected === 'logged')
                return(<LoggedContainer/>)
            if(this.state.currentSelected === 'report')
                return(<ReportContainer/>)
        }
        return (
            <div>
                <TopBar/>
                <SideNavContainer setSelected={this.setSelected}/>
                {getContainer()}
            </div>
        );
    }
}

export default App;
