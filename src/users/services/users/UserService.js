// UserService.js
import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import UserActionTypes from '../../redux/actions/UserActionTypes'
import AppLogger from '../../../commons/logger/AppLogger'

// function that makes the api
// request and returns a Promise for response
function fetchUser(id) {
  const userDetailsUrl = `${process.env.REACT_APP_USERS_PATH}?id=${id}`
  AppLogger.info('fetchUser workerSaga userDetailsUrl: ', userDetailsUrl)
  return axios({
    method: 'get',
    url: userDetailsUrl,
  })
}

// worker saga: makes the api call
// when watcher saga sees the action
export default function* fetchUserWorker(action) {
  AppLogger.info('fetchUserWorker workerSaga : ', action)
  if (action && action.payload) {
    try {
      const response = yield call(fetchUser, action.payload)
      AppLogger.info('fetchUserWorker response : ', response)

      const users = response.data
      AppLogger.info('fetchUserWorker match users : ', users)
      if (Array.isArray(users) && users.length > 0) {
        // dispatch a success action to the store
        // with the new users
        const user = users[0]
        yield put({ type: UserActionTypes.USER_API_CALL_SUCCESS, user })
      } else {
        const error = new Error('User not found')
        yield put({ type: UserActionTypes.USER_API_CALL_FAILURE, error })
      }
    } catch (error) {
      // dispatch a failure action to the store with the error
      AppLogger.info('fetchUserWorker error : ', error)
      yield put({ type: UserActionTypes.USER_API_CALL_FAILURE, error })
    }
  } else {
    const error = new Error('User not found')
    yield put({ type: UserActionTypes.USER_API_CALL_FAILURE, error })
  }
}

