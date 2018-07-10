import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserActionTypes from '../redux/actions/UserActionTypes'
import AppLogger from '../../commons/logger/AppLogger'
import UserAdd from '../components/UserAdd'

class UserAddPage extends Component {
  // default props
  static defaultProps = {
    loading: false,
    error: null,
    onAddUser: null,
  }

  // propsType (validation)
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    onAddUser: PropTypes.func,
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
    AppLogger.info('UserAddPage nextProps : ', nextProps)
  }

  // on user click action
  onAddUserClick = (user) => {
    AppLogger.info('UserAddPage user click item : ', user)
    if (user) {
      // add user
      this.props.onAddUser(user)
    }
  }


  render() {
    AppLogger.info('UserAddPage props : ', this.props)
    return (
      <Fragment>
        <UserAdd
          onAddUserClick={this.onAddUserClick}
          loading={this.props.loading}
          error={this.props.error}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  AppLogger.info('UserAddPage mapStateToProps state : ', state)
  AppLogger.info('UserAddPage mapStateToProps .loading : ', state[2].loading)
  AppLogger.info('UserAddPage mapStateToProps .user : ', state[2].user)
  AppLogger.info('UserAddPage mapStateToProps error : ', state[2].error)

  return {
    loading: (state && state[2]) ? state[2].loading : false,
    user: (state && state[2]) ? state[2].user : null,
    error: (state && state[2]) ? state[2].error : null,
  }
}

const mapDispatchToProps = (dispatch) => {
  AppLogger.info('UserAddPage mapDispatchToProps dispatch : ', dispatch)
  return {
    onAddUser: user => dispatch({ type: UserActionTypes.USER_ADD_API_CALL_REQUEST, payload: user }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserAddPage)

