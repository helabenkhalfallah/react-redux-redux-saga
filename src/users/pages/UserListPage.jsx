
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserList from '../components/UserList'
import UserActionTypes from '../redux/actions/UserActionTypes'
import AppLogger from '../../commons/logger/AppLogger'

class UserListPage extends Component {
  // default props
  static defaultProps = {
    loading: false,
    users: null,
    error: null,
    onRequestUsers: null,
  }

  // propsType (validation)
  static propTypes = {
    loading: PropTypes.bool,
    users: PropTypes.array,
    error: PropTypes.object,
    onRequestUsers: PropTypes.func,
  }

  // initial state
  state = {

  }

  // did mount staff
  componentDidMount() {
  }

  // force refetch
  // mapStateToProps
  componentWillReceiveProps(nextProps) {
    AppLogger.info('UserListPage nextProps : ', nextProps)
  }

  render() {
    AppLogger.info('UserListPage props : ', this.props)

    const {
      loading,
      users,
      onRequestUsers,
      error,
    } = this.props
    AppLogger.info('UserListPage loading : ', loading)
    AppLogger.info('UserListPage onRequestUsers : ', onRequestUsers)
    AppLogger.info('UserListPage error : ', error)
    AppLogger.info('UserListPage users : ', users)

    return (
      <Fragment>
        <button onClick={onRequestUsers}>Request users</button>
        <UserList {...this.props} />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  AppLogger.info('UserListPage mapStateToProps state : ', state)
  AppLogger.info('UserListPage mapStateToProps .loading : ', state[0].loading)
  AppLogger.info('UserListPage mapStateToProps .users : ', state[0].users)
  AppLogger.info('UserListPage mapStateToProps error : ', state[0].error)

  return {
    loading: (state && state[0]) ? state[0].loading : false,
    users: (state && state[0]) ? state[0].users : null,
    error: (state && state[0]) ? state[0].error : null,
  }
}

const mapDispatchToProps = (dispatch) => {
  AppLogger.info('UserListPage mapDispatchToProps dispatch : ', dispatch)
  return {
    onRequestUsers: () => dispatch({ type: UserActionTypes.USERS_API_CALL_REQUEST }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage)

