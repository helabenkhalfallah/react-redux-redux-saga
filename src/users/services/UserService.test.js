/* global it, describe */
import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import * as matchers from 'redux-saga-test-plan/matchers'
import UserApi from './UserApi'
import UsersService from './UsersService'
import UsersReducer from '../redux/reducers/UsersReducer'

describe('Users Service', () => {
  it('fetches users (success)', () => {
    const fakeUsers = {
      data: [
        {
          firstName: 'hela',
          lastName: 'khalfallah',
          email: 'hela@azerty.com',
          password: 'azerty',
          password_confirmation: 'azerty',
          birthday: '05/09/1982',
          job: 'zzz',
          id: 'Ia~yrxX',
        },
      ],
    }
    const { data } = fakeUsers
    return expectSaga(UsersService)
      .withReducer(UsersReducer)
      .provide([
        [call(UserApi.fetchUsers), fakeUsers],
      ])
      .put({
        type: 'USERS_API_CALL_SUCCESS',
        users: data,
      })
      .hasFinalState({
        loading: false,
        users: data,
        error: null,
      })
      .run()
  })
  it('fetches users (fail)', () => {
    const error = new Error('error')
    return expectSaga(UsersService)
      .withReducer(UsersReducer)
      .provide([
        [matchers.call.fn(UserApi.fetchUsers), throwError(error)],
      ])
      .put({
        type: 'USERS_API_CALL_FAILURE',
        error,
      })
      .hasFinalState({
        loading: false,
        users: null,
        error,
      })
      .run()
  })
})
