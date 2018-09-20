
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
    this.props.onRequestUsers()
  }

  // force refetch
  // mapStateToProps
  componentWillReceiveProps(nextProps) {
    AppLogger.info('UserListPage nextProps : ', nextProps)
  }

  // on user click action
  onUserClick = (item) => {
    if (item) {
      AppLogger.info('UserListPage user click item : ', item)
      // fetch user
      this.props.history.push({
        pathname: '/user',
        search: `'?id=${item.id}'`,
        state: { user: item },
      })
    }
  }

  // on user add click action
  onAddUserClick = () => {
    AppLogger.info('UserListPage onAddUserClick')
    this.props.history.push({
      pathname: '/add-user',
      search: null,
      state: null,
    })
  }

  // render
  render() {
    AppLogger.info('UserListPage props : ', this.props)
    return (
      <Fragment>
        <button onClick={this.props.onRequestUsers}>Reload users</button>
        <UserList
          users={this.props.users}
          loading={this.props.loading}
          error={this.props.error}
          onUserClick={this.onUserClick}
        />
        <button onClick={this.onAddUserClick}>Add new user</button>
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

