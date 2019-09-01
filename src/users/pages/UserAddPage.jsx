import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserActionTypes from '../redux/actions/UserActionTypes'
import AppLogger from '../../commons/logger/AppLogger'
import UserAdd from '../components/UserAdd'

class UserAddPage extends Component {
  // propsType (validation)
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    onAddUser: PropTypes.func,
  }

  // default props
  static defaultProps = {
    loading: false,
    error: null,
    onAddUser: null,
  }

  // initial state
  state = {

  }

  // did mount staff
  componentDidMount() {

  }

  // on user click action
  onAddUserClick = (user) => {
    AppLogger.info('UserAddPage user click item : ', user)
    if (user) {
      // add user
      const {
        onAddUser,
      } = this.props
      onAddUser(user)
    }
  }

  render() {
    AppLogger.info('UserAddPage props : ', this.props)
    const {
      loading,
      error,
    } = this.props
    return (
      <Fragment>
        <UserAdd
          onAddUserClick={this.onAddUserClick}
          loading={loading}
          error={error}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  AppLogger.info('UserAddPage mapStateToProps state : ', state)
  const {
    userAdd,
  } = state || {}
  return {
    loading: userAdd.loading,
    user: userAdd.user,
    error: userAdd.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  AppLogger.info('UserAddPage mapDispatchToProps dispatch : ', dispatch)
  return {
    onAddUser: user => dispatch({ type: UserActionTypes.USER_ADD_API_CALL_REQUEST, payload: user }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAddPage)

