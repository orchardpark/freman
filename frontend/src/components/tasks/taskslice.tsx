import {Task} from './task'
export const SET_TASKS = 'tasks/SET_TASK'

interface SetTasksAction {
    type: typeof SET_TASKS
    payload: Task[]
}

export type TaskAction = SetTasksAction

type ActionState = {
    tasks: Task[]
}

const initialState: ActionState = {
    tasks: []
}

export function taskReducer(state= initialState, action: TaskAction): ActionState {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
        default:
            return state
    }
}