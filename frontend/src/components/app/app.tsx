import React from 'react';
import TopBar from "./topbar"
import SideNavContainer from "./sidenavcontainer"
import TaskContainer from '../tasks/taskcontainer'
import LoggedContainer from "../logged/loggedcontainer"
import ReportContainer from "../report/reportcontainer";
import DownloadContainer from '../download/downloadcontainer';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import AccountContainer from '../account/account';
import Login from '../login/login';
import { GithubRedirect } from '../login/github';

function App() {
    const history = useNavigate()
    const [token, setToken] = React.useState<String>("")

    if (!token) {
        return (
            <>
                <Login />
                <Routes>
                    <Route path='/login/github' element={<GithubRedirect />} />
                </Routes>
            </>
        )
    }

    return (
        <div>
            <TopBar />
            <SideNavContainer history={history} />
            <Routes>
                <Route path="/account" element={<AccountContainer />} />
                <Route path="/tasks" element={<TaskContainer />} />
                <Route path="/logged" element={<LoggedContainer />} />
                <Route path="/report" element={<ReportContainer />} />
                <Route path="/download" element={<DownloadContainer />} />
                <Route path="*" element={<Navigate to='/account' replace />}
                />
            </Routes>
        </div>
    )
}

export default App;
