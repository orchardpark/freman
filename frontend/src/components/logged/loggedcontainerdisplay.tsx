import React from 'react'
import Logged from './logged'
import LoggedComponent from './loggedcomponent'
import "./loggedcomponent.css"

type Props = {
    logged: Logged[],
    setSelected: (application_name: string, window_title: string) => void
}

function LoggedContainerDisplay({logged, setSelected}: Props){

    const loggedList = ()=>{
        const result = []
        for (const [index, value] of logged.entries()){
            result.push(renderItem(index, value['id']))
        }
        return result
    }

    const renderItem = (index: number, key: number) =>{
        return(
            <div key={key}>
                {
                        <LoggedComponent 
                            {...logged[index]}
                            setSelected={setSelected}
                        />
                }
            </div>
        )
    }

    return (
        <div className='container'>
            <div>
                <h1>Logged Items</h1>
            </div>
            <br />
            <div>
                <h2 className={'logged-field-left'}>Application</h2>
                <h2 className={'logged-field-left-2'}>Window</h2>
                <h2 className={'logged-field-right'}>Time (minutes)</h2>
            </div>
            <span>&nbsp;&nbsp;</span>

            <div style={{ overflow: 'auto', maxHeight: '80%' }}>
                {loggedList()}
            </div>
        </div>
    )
}

export default LoggedContainerDisplay