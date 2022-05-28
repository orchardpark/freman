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

    // Lifecycle methods

    React.useEffect(() => {
        localStorage.setItem("_tkn", JSON.stringify(token))
    }, [token])

    // Error handling
    const handleFetchError = (error: Error) => {
        console.log(error)
        setToken("")
    }

    const logOut = () => {
        setToken("")
    }

    // Render

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
        <>
            <TopBar />
            <SideNavContainer history={history} />
            <Routes>
                <Route path="/account" element={<AccountContainer token={token} handleFetchError={handleFetchError} logOut={logOut} />} />
                <Route path="/tasks" element={<TaskContainer token={token} handleFetchError={handleFetchError} />} />
                <Route path="/logged" element={<LoggedContainer token={token} handleFetchError={handleFetchError} />} />
                <Route path="/report" element={<ReportContainer token={token} handleFetchError={handleFetchError} />} />
                <Route path="/download" element={<DownloadContainer />} />
                <Route path="*" element={<Navigate to="/account" replace />}
                />
            </Routes>
        </>
    )
}

export default App;
