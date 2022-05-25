import React, { useCallback } from 'react';
import Logged from './logged'
import LoggedContainerDisplay from './loggedcontainerdisplay'
import Task from '../tasks/task';
import { UNKNOWN } from '../app/constants';
import { getEndPoint, getGetRequestOptions, getPostRequestOptions } from '../app/util'

type Props = {
    token: string,
    handleFetchError: (error: Error) => void
}

function LoggedContainer({ token, handleFetchError }: Props) {
    /// STATE ---------------------------------
    const [logged, setLogged] = React.useState<Logged[]>([])
    const [tasks, setTasks] = React.useState<Task[]>([])

    /// FUNCTIONALITY -------------------------

    const getData = () => {
        getLogged()
        getTasks()
    }

    /**
     * Gets the logged items and tasks from the backend
     */
    const getLogged = useCallback(() => {
        const request = getEndPoint('logged')
        const requestOptions = getGetRequestOptions(token)
        fetch(request, requestOptions)
            .then(res => res.json())
            .then((loggedItems) => {
                setLogged(loggedItems.map((loggedItem: Logged) => {
                    return {
                        ...loggedItem,
                        selected: false,
                        created_at: new Date(loggedItem.created_at)
                    }
                }
                ))
            })
            .catch(handleFetchError)
    }, [token, handleFetchError]
    )


    /**
     * Retrieves the tasks from the backend
     * sets the `task` variable.
     */
    const getTasks = useCallback(() => {
        const request = getEndPoint('tasks')
        const requestOptions = getGetRequestOptions(token)
        fetch(request, requestOptions)
            .then(res => res.json())
            .then((tasks) => {
                setTasks(tasks)
            })
            .catch(handleFetchError)
    }, [token, handleFetchError]
    )

    /**
     * 
     * Books all time logged on application on specified task
     * @param application_name 
     * @param task_id 
     */
    const bookTime = (application_name: string, task_id: number) => {
        if (task_id !== UNKNOWN) {
            const request = getEndPoint('booktime')
            const payload_object = {
                application_name: application_name,
                task_id: task_id
            }
            const requestOptions = getPostRequestOptions(token, JSON.stringify(payload_object))
            fetch(request, requestOptions)
                .then(
                    () => {
                        const newLogged = logged.filter(x => x.application_name !== application_name)
                        setLogged(newLogged)
                    }
                )
                .catch(handleFetchError)
            deSelectAll()
        }
    }

    /*
    * Sets the selected item
    */
    const setSelected = (application_name: string) => {
        const newLoggedList = logged.map((loggedItem: Logged) => {
            return {
                ...loggedItem,
                selected: loggedItem.application_name === application_name
            }
        })
        setLogged(newLoggedList)
    }

    const deSelectAll = () => {
        const newLoggedList = logged.map((loggedItem: Logged) => {
            return {
                ...loggedItem,
                selected: false
            }
        })
        setLogged(newLoggedList)
    }

    /**
     * Handle keypresses on the screen
     * @param e 
     */
    const onKeyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            deSelectAll()
        }
    }

    /**
     * Call `getData` upon a change in the loading state
     */
    React.useEffect(getData, [getLogged, getTasks])

    /**
     * Returns the JSX of this paNL
ge
     */
    return (
        <div onKeyDown={onKeyPressed} tabIndex={0}>
            <LoggedContainerDisplay
                logged={logged}
                tasks={tasks}
                setSelected={setSelected}
                closeModal={deSelectAll}
                bookTime={bookTime}
            />
        </div>
    )
}

export default LoggedContainer