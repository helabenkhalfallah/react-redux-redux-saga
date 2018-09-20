// UsersService.js
import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import UserActionTypes from '../../redux/actions/UserActionTypes'
import AppLogger from '../../../commons/logger/AppLogger'
import SessionUtils from '../../../commons/utils/SessionUtils'

// user login
function login(email, password) {
  AppLogger.info('login email : ', email)
  AppLogger.info('login password : ', password)
  return axios({
    method: 'post',
    url: process.env.REACT_APP_LOGIN_PATH,
    data: {
      email,
      password,
    },
  })
}

// worker saga: makes the api call
// when watcher saga sees the action
export default function* loginWorker(action) {
  AppLogger.info('loginWorker workerSaga : ', action)
  if (action && action.payload) {
    AppLogger.info('loginWorker workerSaga')
    try {
      const response = yield call(login, action.payload.email, action.payload.password)
      AppLogger.info('loginWorker response : ', response)

      // get the auth response
      const authResponse = response.data
      AppLogger.info('loginWorker authResponse : ', authResponse)

      // check if we have success or fail auth
      const { success, user, token } = authResponse
      if (success && token && user) {
        AppLogger.info('loginWorker authResponse user : ', user)

        // save token on cookie
        SessionUtils.saveToken(token)

        // dispatch a success action to the store
        // with the logged user
        yield put({ type: UserActionTypes.USER_ADD_API_CALL_SUCCESS, user })
      } else {
        const error = new Error('An error occured when authenticate user, please try again !')
        yield put({ type: UserActionTypes.USER_ADD_CALL_FAILURE, error })
      }
    } catch (error) {
      // dispatch a failure action to the store with the error
      AppLogger.info('loginWorker error : ', error)
      yield put({ type: UserActionTypes.USER_LOGIN_API_CALL_FAILURE, error })
    }
  } else {
    const error = new Error('An error occured when authenticate user, please try again !')
    yield put({ type: UserActionTypes.USER_ADD_CALL_FAILURE, error })
  }
}
