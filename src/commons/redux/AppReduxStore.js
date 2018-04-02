import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import AppReduxReducers from './AppReduxReducers'


// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const AppReduxStore = (reducers) => {
  // prepare reducer and middle ware
  const reduxReducers = AppReduxReducers(reducers)
  const sagaMiddleware = createSagaMiddleware()

  // create store
  const reduxStore = createStore(
    reduxReducers,
    compose(applyMiddleware(sagaMiddleware)),
  )

  // return middleware & store
  return {
    store: reduxStore,
    middleware: sagaMiddleware,
  }
}

export default AppReduxStore
