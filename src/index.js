import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import dotenv from 'dotenv'
import registerServiceWorker from './registerServiceWorker'

import './index.css'
import Routes from './routes/Routes'
import AppLogger from './commons/logger/AppLogger'
import UsersReducer from './users/redux/reducers/UsersReducer'
import AppReduxStore from './commons/redux/AppReduxStore'
import UsersService from './users/services/users/UsersService'

// configure env vars
dotenv.config()
AppLogger.info('REACT_APP_DEBUG_ENABLE: ', process.env.REACT_APP_DEBUG_ENABLE)
AppLogger.info('REACT_APP_USERS_PATH: ', process.env.REACT_APP_USERS_PATH)

// saga

// create the saga middleware
const reducers = [UsersReducer]
AppLogger.info('Start reducers : ', reducers)

const { store, middleware } = AppReduxStore(reducers)
AppLogger.info('Start store : ', store)

// run the saga
middleware.run(UsersService)
AppLogger.info('Start middleware : ', middleware)


// render
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
