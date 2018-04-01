// UserActions.js
import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import UserActionTypes from '../actions/UserActionTypes'
import AppLogger from '../../../commons/logger/AppLogger'

// function that makes the api request and returns a Promise for response
function fetchDog() {
  AppLogger.info('workerSaga fetchDog')
  return axios({
    method: 'get',
    url: 'https://dog.ceo/api/breeds/image/random',
  })
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  AppLogger.info('workerSaga workerSaga')
  try {
    const response = yield call(fetchDog)
    AppLogger.info('workerSaga response : ', response)

    const dog = response.data.message
    AppLogger.info('workerSaga dog : ', dog)

    // dispatch a success action to the store with the new dog
    yield put({ type: UserActionTypes.USER_API_CALL_SUCCESS, dog })
  } catch (error) {
    // dispatch a failure action to the store with the error
    AppLogger.info('workerSaga error : ', error)
    yield put({ type: UserActionTypes.USER_API_CALL_FAILURE, error })
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  AppLogger.info('workerSaga start')
  yield takeLatest(UserActionTypes.USER_API_CALL_REQUEST, workerSaga)
}
