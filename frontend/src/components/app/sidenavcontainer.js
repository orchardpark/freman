import React from "react"
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './sidenavcontainer.css'
import 'font-awesome/css/font-awesome.min.css';


function SideNavContainer(props) {
    return (
        <SideNav
            onSelect={(selected) => {
                props.history("/" + selected)
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav>
                <NavItem eventKey="account">
                    <NavIcon>
                        <i className="fa fa-fw fa-user-circle" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>Account</NavText>
                </NavItem>
                <NavItem eventKey="tasks">
                    <NavIcon>
                        <i className="fa fa-fw fa-tasks" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>Tasks</NavText>
                </NavItem>
                <NavItem eventKey="logged">
                    <NavIcon>
                        <i className="fa fa-fw fa-clock-o" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>Logged Time</NavText>
                </NavItem>
                <NavItem eventKey="report">
                    <NavIcon>
                        <i className="fa fa-fw fa-bar-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>Reports</NavText>
                </NavItem>
                <NavItem eventKey="download">
                    <NavIcon>
                        <i className="fa fa-fw fa-desktop" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>Logging Software</NavText>
                </NavItem>
            </SideNav.Nav>


        </SideNav>
    )
}

export default SideNavContainer