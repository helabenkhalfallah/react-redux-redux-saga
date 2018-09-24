import { takeEvery, all } from 'redux-saga/effects'
import UserActionTypes from '../redux/actions/UserActionTypes'
import UsersService from './UsersService'
import UserService from './UserService'
import UserAddService from './UserAddService'
import UserLoginService from './UserLoginService'

function* watchAll() {
  yield all([
    takeEvery(UserActionTypes.USERS_API_CALL_REQUEST, UsersService),
    takeEvery(UserActionTypes.USER_API_CALL_REQUEST, UserService),
    takeEvery(UserActionTypes.USER_ADD_API_CALL_REQUEST, UserAddService),
    takeEvery(UserActionTypes.USER_LOGIN_API_CALL_REQUEST, UserLoginService),
  ])
}

export default watchAll
