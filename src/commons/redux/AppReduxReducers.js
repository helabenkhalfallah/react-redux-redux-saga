import { combineReducers } from 'redux'
import AppLogger from '../logger/AppLogger'

const AppReduxReducers = (reducers) => {
  AppLogger.info('AppReduxReducers reducers : ', reducers)
  return combineReducers({
    ...reducers,
  })
}

export default AppReduxReducers
