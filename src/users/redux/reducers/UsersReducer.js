// UsersReducer.js
import UserActionTypes from '../actions/UserActionTypes'
import AppLogger from '../../../commons/logger/AppLogger'

// reducer with initial state
const initialState = {
  loading: false,
  users: null,
  error: null,
}

// user reducer
const UsersReducer = (state = initialState, action) => {
  // log parms
  AppLogger.info('UsersReducer action :', action)
  let newState = state
  switch (action.type) {
    case UserActionTypes.USERS_API_CALL_REQUEST:
      newState = {
        ...state,
        loading: true,
        error: null,
      }
      break
    case UserActionTypes.USERS_API_CALL_SUCCESS:
      newState = {
        ...state,
        loading: false,
        users: action.users,
      }
      break
    case UserActionTypes.USERS_API_CALL_FAILURE:
      newState = {
        ...state,
        loading: false,
        users: null,
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
