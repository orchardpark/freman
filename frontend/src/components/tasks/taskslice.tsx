import {Task} from './task'
import {getTasks} from "../app/backendapi"
import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import { RootState, store } from '../app/store'
export const SET_TASKS = 'tasks/SET_TASKS'
export const GET_TASKS = 'tasks/GET_TASKS'

interface SetTasksAction {
    type: typeof SET_TASKS
    payload: Task[]
}

interface GetTasksAction {
    type: typeof GET_TASKS
}

export type TaskAction = SetTasksAction | GetTasksAction

type ActionState = {
    tasks: Task[]
}

const initialState: ActionState = {
    tasks: []
}

export const getTasksAsync = (): ThunkAction<void, RootState, unknown, Action<TaskAction>> => async dispatch => {
    const tasks = await getTasks()
    store.dispatch({type: GET_TASKS, payload: tasks})
}

export function taskReducer(state= initialState, action: TaskAction): ActionState {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
        case GET_TASKS:
            getTasksAsync()
            return state
        default:
            return state
    }
}