import React  from 'react';
import TopBar from "./topbar"
import SideNavContainer from "./sidenavcontainer"
import TaskContainer from '../tasks/taskcontainer'
import LoggedContainer from "../logged/loggedcontainer"
import ReportContainer from "../report/reportcontainer";
import {Route, Switch, Redirect, useHistory} from "react-router-dom"

function App(){
    const history = useHistory()

    return( 
        <div>
            <TopBar/>
            <SideNavContainer history={history}/>
            <Switch>
                <Route path="/tasks">
                    <TaskContainer/>
                </Route>
                <Route path="/logged">
                    <LoggedContainer/>
                </Route>
                <Route path="/report">
                    <ReportContainer/>
                </Route>
                <Route path="/">
                    <Redirect to={{
                        pathname: "/tasks",
                        state: { referrer: "/" }
                    }} />
                </Route>
            </Switch>
        </div>
    )
}

export default App;
