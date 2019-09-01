
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserList from '../components/UserList'
import UserActionTypes from '../redux/actions/UserActionTypes'
import AppLogger from '../../commons/logger/AppLogger'

class UserListPage extends Component {
  // propsType (validation)
  static propTypes = {
    loading: PropTypes.bool,
    users: PropTypes.array,
    error: PropTypes.object,
    onRequestUsers: PropTypes.func,
    history: PropTypes.object.isRequired,
  }

  // default props
  static defaultProps = {
    loading: false,
    users: null,
    error: null,
    onRequestUsers: null,
  }

  // initial state
  state = {

  }

  // did mount staff
  componentDidMount() {
    const {
      onRequestUsers,
    } = this.props
    onRequestUsers()
  }

  // on user click action
  onUserClick = (item) => {
    if (item) {
      AppLogger.info('UserListPage user click item : ', item)
      // fetch user
      const {
        history,
      } = this.props
      history.push({
        pathname: '/user',
        search: `?id=${item.id}`,
        state: { user: item },
      })
    }
  }

  // on user add click action
  onAddUserClick = () => {
    AppLogger.info('UserListPage onAddUserClick')
    const {
      history,
    } = this.props
    history.push({
      pathname: '/add-user',
      search: null,
      state: null,
    })
  }

  // render
  render() {
    AppLogger.info('UserListPage props : ', this.props)
    const {
      users,
      loading,
      error,
      onRequestUsers,
    } = this.props
    return (
      <Fragment>
        <button
          onClick={onRequestUsers}
        >
          Reload users
        </button>
        <UserList
          users={users}
          loading={loading}
          error={error}
          onUserClick={this.onUserClick}
        />
        <button
          onClick={this.onAddUserClick}
        >
          Add new user
        </button>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  AppLogger.info('UserListPage mapStateToProps state : ', state)
  const {
    users,
  } = state || {}
  return {
    loading: users.loading || false,
    users: users.users,
    error: users.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  AppLogger.info('UserListPage mapDispatchToProps dispatch : ', dispatch)
  return {
    onRequestUsers: () => dispatch({ type: UserActionTypes.USERS_API_CALL_REQUEST }),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage)

