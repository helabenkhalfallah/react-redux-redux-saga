// UserAddReducer.js
import UserActionTypes from '../actions/UserActionTypes'
import AppLogger from '../../../commons/logger/AppLogger'

// reducer with initial state
const initialState = {
  loading: false,
  user: null,
  error: null,
}

// user add reducer
const UserAddReducer = (state = initialState, action) => {
  // log parms
  AppLogger.info('UserAddReducer action :', action)
  let newState = state
  switch (action.type) {
    case UserActionTypes.USER_ADD_API_CALL_REQUEST:
      newState = {
        ...state,
        loading: true,
        error: null,
      }
      break
    case UserActionTypes.USER_ADD_API_CALL_SUCCESS:
      newState = {
        ...state,
        loading: false,
        user: action.user,
      }
      break
    case UserActionTypes.USER_ADD_API_CALL_FAILURE:
      newState = {
        ...state,
        loading: false,
        user: null,
        error: action.error,
      }
      break
    default:
      newState = state
  }

  AppLogger.info('UserAddReducer newState :', newState)
  return newState
}

export default UserAddReducer
