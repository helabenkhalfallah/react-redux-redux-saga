// UsersService.js
import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import UserActionTypes from '../../redux/actions/UserActionTypes'
import AppLogger from '../../../commons/logger/AppLogger'
import SessionUtils from '../../../commons/utils/SessionUtils'

// function that makes the api
// request and returns a Promise for response
function fetchUsers() {
  AppLogger.info('fetchUsers workerSaga')
  return axios({
    method: 'get',
    url: process.env.REACT_APP_USERS_PATH,
    headers: { Authorization: SessionUtils.loadToken() },
  })
}

// worker saga: makes the api call
// when watcher saga sees the action
export default function* fetchUsersWorker() {
  AppLogger.info('fetchUsersWorker workerSaga')
  try {
    const response = yield call(fetchUsers)
    AppLogger.info('fetchUsersWorker response : ', response)

    const users = response.data
    AppLogger.info('fetchUsersWorker users : ', users)

    // dispatch a success action to the store
    // with the new users
    yield put({ type: UserActionTypes.USERS_API_CALL_SUCCESS, users })
  } catch (error) {
    // dispatch a failure action to the store with the error
    AppLogger.info('fetchUsersWorker error : ', error)
    yield put({ type: UserActionTypes.USERS_API_CALL_FAILURE, error })
  }
}
