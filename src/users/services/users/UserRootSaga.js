import { takeEvery, all } from 'redux-saga/effects'
import UserActionTypes from '../../redux/actions/UserActionTypes'
import UsersService from './UsersService'
import UserService from './UserService'
import UserAddService from './UserAddService'

function* watchAll() {
  yield all([
    takeEvery(UserActionTypes.USERS_API_CALL_REQUEST, UsersService),
    takeEvery(UserActionTypes.USER_API_CALL_REQUEST, UserService),
    takeEvery(UserActionTypes.USER_ADD_API_CALL_REQUEST, UserAddService),
  ])
}

export default watchAll
