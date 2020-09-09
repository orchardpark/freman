import React, {useState} from 'react';
import TopBar from "./topbar"
import SideNavContainer from "./sidenavcontainer"
import TaskContainer from '../tasks/taskcontainer'
import LoggedContainer from "../logged/loggedcontainer"
import ReportContainer from "../report/reportcontainer";

function App(){

    const [currentSelected, setSelected] = useState("tasks")

    const getContainer = () => {
            if(currentSelected === 'tasks')
                return(<TaskContainer/>)
            if(currentSelected === 'logged')
                return(<LoggedContainer/>)
            if(currentSelected === 'report')
                return(<ReportContainer/>)
        };

    return( 
        <div>
            <TopBar/>
            <SideNavContainer setSelected={setSelected}/>
            {getContainer()}
        </div>
    )
}

export default App;
