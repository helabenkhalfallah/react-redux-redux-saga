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