import { combineReducers, createStore} from '@reduxjs/toolkit'
import {taskReducer} from '../tasks/taskslice'

const rootReducer = combineReducers({
  tasks: taskReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)