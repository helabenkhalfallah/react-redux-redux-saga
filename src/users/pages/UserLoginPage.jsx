import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserActionTypes from '../redux/actions/UserActionTypes'
import AppLogger from '../../commons/logger/AppLogger'
import UserLogin from '../components/UserLogin'

class UserLoginPage extends Component {
  // propsType (validation)
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    onUserLogin: PropTypes.func,
  }

  // default props
  static defaultProps = {
    loading: false,
    error: null,
    onUserLogin: null,
  }

  // initial state
  state = {

  }

  // did mount staff
  componentDidMount() {

  }

  // on user click action
  onUserLoginClick = (user) => {
    AppLogger.info('UserLoginPage user click item : ', user)
    if (user) {
      // user login
      const {
        onUserLogin,
      } = this.props
      onUserLogin(user)
    }
  }

  render() {
    AppLogger.info('UserLoginPage props : ', this.props)
    const {
      loading,
      error,
    } = this.props
    return (
      <Fragment>
        <UserLogin
          onUserLoginClick={this.onUserLoginClick}
          loading={loading}
          error={error}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  AppLogger.info('UserLoginPage mapStateToProps state : ', state)
  AppLogger.info('UserLoginPage mapStateToProps .loading : ', state[2].loading)
  AppLogger.info('UserLoginPage mapStateToProps .user : ', state[2].user)
  AppLogger.info('UserLoginPage mapStateToProps error : ', state[2].error)

  return {
    loading: (state && state[2]) ? state[2].loading : false,
    user: (state && state[2]) ? state[2].user : null,
    error: (state && state[2]) ? state[2].error : null,
  }
}

const mapDispatchToProps = (dispatch) => {
  AppLogger.info('UserLoginPage mapDispatchToProps dispatch : ', dispatch)
  return {
    onUserLogin: user => dispatch({ type: UserActionTypes.USER_LOGIN_API_CALL_REQUEST, payload: user }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserLoginPage)

