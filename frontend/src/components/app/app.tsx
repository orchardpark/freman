import React from 'react';
import TopBar from "./topbar"
import SideNavContainer from "./sidenavcontainer"
import TaskContainer from '../tasks/taskcontainer'
import LoggedContainer from "../logged/loggedcontainer"
import ReportContainer from "../report/reportcontainer";
import DownloadContainer from '../download/downloadcontainer';
import { Route, Routes, useNavigate, Navigate } from "react-router-dom"
import AccountContainer from '../account/accountcontainer';
import Login from '../login/login';
import { GithubRedirect } from '../login/github';

function App() {
    const history = useNavigate()
    const [token, setToken] = React.useState<string>(() => {
        const saved = localStorage.getItem("_tkn")
        if (saved) {
            return JSON.parse(saved)
        }
        else
            return ""
    })

    React.useEffect(() => {
        localStorage.setItem("_tkn", JSON.stringify(token))
    }, [token])

    if (!token) {
        return (
            <>
                <Login />
                <Routes>
                    <Route path='/login/github' element={<GithubRedirect setToken={setToken} />} />
                </Routes>
            </>
        )
    }

    return (
        <div>
            <TopBar />
            <SideNavContainer history={history} />
            <Routes>
                <Route path="/account" element={<AccountContainer token={token} setToken={setToken} />} />
                <Route path="/tasks" element={<TaskContainer token={token} />} />
                <Route path="/logged" element={<LoggedContainer token={token} />} />
                <Route path="/report" element={<ReportContainer token={token} />} />
                <Route path="/download" element={<DownloadContainer />} />
                <Route path="*" element={<Navigate to="/account" replace />}
                />
            </Routes>
        </div>
    )
}

export default App;
