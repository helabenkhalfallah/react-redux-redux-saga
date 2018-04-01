// UsersReducer.js
import UserActionTypes from '../actions/UserActionTypes'
import AppLogger from '../../../commons/logger/AppLogger'

// reducer with initial state
const initialState = {
  fetching: false,
  dog: null,
  error: null,
}

// user reducer
const UsersReducer = (state = initialState, action) => {
  // log parms
  AppLogger.info('UsersReducer action :', action)
  let newState = state
  switch (action.type) {
    case UserActionTypes.USER_API_CALL_REQUEST:
      newState = {
        ...state,
        fetching: true,
        error: null,
      }
      break
    case UserActionTypes.USER_API_CALL_SUCCESS:
      newState = {
        ...state,
        fetching: false,
        dog: action.dog,
      }
      break
    case UserActionTypes.USER_API_CALL_FAILURE:
      newState = {
        ...state,
        fetching: false,
        dog: null,
        error: action.error,
      }
      break
    default:
      newState = state
  }

  AppLogger.info('UsersReducer newState :', newState)
  return newState
}

export default UsersReducer
