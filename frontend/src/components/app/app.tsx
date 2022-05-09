import React  from 'react';
import TopBar from "./topbar"
import SideNavContainer from "./sidenavcontainer"
import TaskContainer from '../tasks/taskcontainer'
import LoggedContainer from "../logged/loggedcontainer"
import ReportContainer from "../report/reportcontainer";
import DownloadContainer from '../download/downloadcontainer';
import {Route, Switch, Redirect, useHistory} from "react-router-dom"
import AccountContainer from '../account/account';

function App(){
    const history = useHistory()

    return( 
        <div>
            <TopBar/>
            <SideNavContainer history={history}/>
            <Switch>
                <Route path="/account">
                    <AccountContainer/>
                </Route>
                <Route path="/tasks">
                    <TaskContainer/>
                </Route>
                <Route path="/logged">
                    <LoggedContainer/>
                </Route>
                <Route path="/report">
                    <ReportContainer/>
                </Route>
                <Route path="/download">
                    <DownloadContainer/>
                </Route>
                <Route path="/">
                    <Redirect to={{
                        pathname: "/account",
                        state: { referrer: "/" }
                    }} />
                </Route>
            </Switch>
        </div>
    )
}

export default App;
