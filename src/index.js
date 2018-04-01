import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import dotenv from 'dotenv'
import createSagaMiddleware from 'redux-saga'
import registerServiceWorker from './registerServiceWorker'

import './index.css'
import Routes from './routes/Routes'
import AppLogger from './commons/logger/AppLogger'
import UsersReducer from './users/redux/reducers/UsersReducer'
import AppReduxReducers from './commons/redux/AppReduxReducers'
import UserActions from './users/redux/actions/UserActions'

// configure env vars
dotenv.config()
AppLogger.info('REACT_APP_DEBUG_ENABLE: ', process.env.REACT_APP_DEBUG_ENABLE)
AppLogger.info('REACT_APP_BASE_URL: ', process.env.REACT_APP_BASE_URL)
AppLogger.info('REACT_APP_USERS_PATH: ', process.env.REACT_APP_USERS_PATH)

// saga

// create the saga middleware
const reducers = [UsersReducer]
const sagaMiddleware = createSagaMiddleware()
const reduxReducers = AppReduxReducers(reducers)
AppLogger.info('Start reduxReducers : ', reduxReducers)

const store = createStore(reduxReducers, compose(applyMiddleware(sagaMiddleware)))

AppLogger.info('Start store : ', store)
AppLogger.info('Start sagaMiddleware : ', sagaMiddleware)
AppLogger.info('Start reducers : ', reducers)

// run the saga
sagaMiddleware.run(UserActions)


// render
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
