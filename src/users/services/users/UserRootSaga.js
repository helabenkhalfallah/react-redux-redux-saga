import { takeEvery, all } from 'redux-saga/effects'
import UserActionTypes from '../../redux/actions/UserActionTypes'
import UsersService from './UsersService'
import UserService from './UserService'

function* watchAll() {
  yield all([
    takeEvery(UserActionTypes.USERS_API_CALL_REQUEST, UsersService),
    takeEvery(UserActionTypes.USER_API_CALL_REQUEST, UserService),
  ])
}

export default watchAll
