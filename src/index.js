import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import dotenv from 'dotenv'
import registerServiceWorker from './registerServiceWorker'

import './index.css'
import Routes from './routes/Routes'
import AppLogger from './commons/logger/AppLogger'
import AppReduxStore from './commons/redux/AppReduxStore'
import UsersReducer from './users/redux/reducers/UsersReducer'
import UserReducer from './users/redux/reducers/UserReducer'
import UserAddReducer from './users/redux/reducers/UserAddReducer'
import UserRootSaga from './users/services/users/UserRootSaga'

// configure env vars
dotenv.config()

// redux & saga

// create redux reducers
const reducers = [UsersReducer, UserReducer, UserAddReducer]
AppLogger.info('redux reducers : ', reducers)

// create redux store and saga middleware
const { store, middleware } = AppReduxStore(reducers)
AppLogger.info('redux store : ', store)

// start saga middleware
middleware.run(UserRootSaga)
AppLogger.info('redux middleware : ', middleware)


// render
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
