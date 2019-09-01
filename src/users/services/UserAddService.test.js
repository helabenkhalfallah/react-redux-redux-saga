/* global it, describe */
import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import * as matchers from 'redux-saga-test-plan/matchers'
import UserApi from './UserApi'
import UserAddService from './UserAddService'
import UserAddReducer from '../redux/reducers/UserAddReducer'

describe('Users Service', () => {
  const fakeAction = {
    payload: {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'test@azerty.com',
      password: 'test',
      password_confirmation: 'test',
      birthday: '05/09/1982',
      job: 'test',
    },
  }
  const fakeAddResponse = {
    data: {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'test@azerty.com',
      password: 'test',
      password_confirmation: 'test',
      birthday: '05/09/1982',
      job: 'test',
    },
  }
  it('add user (success)', () => expectSaga(UserAddService, fakeAction)
    .withReducer(UserAddReducer)
    .provide([
      [call(UserApi.addUser, fakeAction), fakeAddResponse],
    ])
    .put({
      type: 'USER_ADD_API_CALL_SUCCESS',
      user: fakeAddResponse.data,
    })
    .hasFinalState({
      loading: false,
      user: fakeAddResponse.data,
      error: null,
    })
    .run())
  it('add user (fail)', () => {
    const error = new Error('error')
    return expectSaga(UserAddService, fakeAction)
      .withReducer(UserAddReducer)
      .provide([
        [matchers.call.fn(UserApi.addUser), throwError(error)],
      ])
      .put({
        type: 'USER_ADD_API_CALL_FAILURE',
        error,
      })
      .hasFinalState({
        loading: false,
        user: null,
        error,
      })
      .run()
  })
})

