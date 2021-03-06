// UserAddService.js
import { call, put } from 'redux-saga/effects'
import UserActionTypes from '../redux/actions/UserActionTypes'
import AppLogger from '../../commons/logger/AppLogger'
import UserApi from './UserApi'

const {
  addUser,
} = UserApi

// worker saga: makes the api call
// when watcher saga sees the action
export default function* addUserWorker(action) {
  AppLogger.info('addUserWorker workerSaga action : ', action.payload)
  if (action && action.payload) {
    try {
      // call (function, params)
      const response = yield call(addUser, action.payload)
      AppLogger.info('addUserWorker response : ', response)

      const user = response.data
      AppLogger.info('addUserWorker added user : ', user)
      if (user) {
        // dispatch a success action to the store
        // with the new user
        const {
          id,
          ...others
        } = user
        yield put({
          type: UserActionTypes.USER_ADD_API_CALL_SUCCESS,
          user: others,
        })
      } else {
        const error = new Error('An error occured when add user')
        yield put({
          type: UserActionTypes.USER_ADD_API_CALL_FAILURE,
          error,
        })
      }
    } catch (error) {
      // dispatch a failure action to the store with the error
      AppLogger.info('addUserWorker error : ', error)
      yield put({
        type: UserActionTypes.USER_ADD_API_CALL_FAILURE,
        error,
      })
    }
  } else {
    const error = new Error('An error occured when add user')
    yield put({
      type: UserActionTypes.USER_ADD_CALL_FAILURE,
      error,
    })
  }
}
