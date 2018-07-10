# react-redux-redux-saga-formik
**Redux & Saga Workflow :**

1/ connect to redux :
```js
export default connect(mapStateToProps, mapDispatchToProps)(UserAddPage)
```

2/ throw action : 
```js
this.props.onAddUser(user)
```

3/ dispatch action :
```js
const mapDispatchToProps = (dispatch) => { 
  return {
    onAddUser: user => dispatch({ type: UserActionTypes.USER_ADD_API_CALL_REQUEST, payload: user }),
  }
}
```

4/throw the appropriate Saga :
```js
function* watchAll() {
  yield all([
    takeEvery(UserActionTypes.USERS_API_CALL_REQUEST, UsersService),
    takeEvery(UserActionTypes.USER_API_CALL_REQUEST, UserService),
    takeEvery(UserActionTypes.USER_ADD_API_CALL_REQUEST, UserAddService),
  ])
}
```

5/saga worker :
```js
export default function* addUserWorker(action)
```

6/ reduce succes :
```js
yield put({ type: UserActionTypes.USER_ADD_API_CALL_SUCCESS, user })
```

7/ reduce fail :
```js
yield put({ type: UserActionTypes.USER_ADD_API_CALL_FAILURE, error })
```

8/ action state manager, form the appropriate state :
```js
// user add reducer
const UserAddReducer = (state = initialState, action) => {
  let newState = state
  switch (action.type) {
    case UserActionTypes.USER_ADD_API_CALL_REQUEST:
      newState = {
        ...state,
        loading: true,
        error: null,
      }
    break
```

9/convert state to props :
```js
const mapStateToProps = (state) => {
  return {
    loading: (state && state[2]) ? state[2].loading : false,
    user: (state && state[2]) ? state[2].user : null,
    error: (state && state[2]) ? state[2].error : null,
  }
}
```

10/ render component to handle new change :
```js
render() { 
    return (
      <Fragment>
        <UserAdd
          onAddUserClick={this.onAddUserClick}
          loading={this.props.loading}
          error={this.props.error}
        />
      </Fragment>
    )
  }
```

**Redux multiple reducers :**

1/ We create a custom redux reducers that will take an array of reducers :
```js
const AppReduxReducers = (reducers) => { 
  return combineReducers({
    ...reducers,
  })
}
export default AppReduxReducers
```
2/ the keyword is **combineReducers**.

3/ the call is made like this (index.js) :
```js
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
```

4/ AppReduxStore :
```js
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
```

5/ render :
```js
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
)
```

**Redux saga multiple workers :**

1/ create a saga root file : UserRootSaga
```js
function* watchAll() {
  yield all([
    takeEvery(UserActionTypes.USERS_API_CALL_REQUEST, UsersService),
    takeEvery(UserActionTypes.USER_API_CALL_REQUEST, UserService),
    takeEvery(UserActionTypes.USER_ADD_API_CALL_REQUEST, UserAddService),
  ])
}

export default watchAll
```
2/ create your standalone service :
```js
UsersService
UserService
UserAddService
```
