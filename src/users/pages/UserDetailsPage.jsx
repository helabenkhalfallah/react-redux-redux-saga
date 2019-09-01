import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserActionTypes from '../redux/actions/UserActionTypes'
import AppLogger from '../../commons/logger/AppLogger'
import UserDetails from '../components/UserDetails'

class UserDetailsPage extends Component {
  // propsType (validation)
  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object,
    error: PropTypes.object,
    onRequestUser: PropTypes.func,
    location: PropTypes.object.isRequired,
  }

  // default props
  static defaultProps = {
    loading: false,
    user: null,
    error: null,
    onRequestUser: null,
  }

  // initial state
  state = {

  }

  // did mount staff
  componentDidMount() {
    AppLogger.info('UserDetailsPage componentDidMount')
    AppLogger.info('UserDetailsPage location : ', this.props.location)
    const {
      location,
      onRequestUser,
    } = this.props
    if (location && location.search) {
      const search = location.search.split('?id=')[1]
      onRequestUser(search)
    }
  }

  render() {
    AppLogger.info('UserDetailsPage props : ', this.props)
    const {
      user,
      loading,
      error,
    } = this.props
    return (
      <Fragment>
        <UserDetails
          user={user}
          loading={loading}
          error={error}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  AppLogger.info('UserDetailsPage mapStateToProps state : ', state)
  const {
    user,
  } = state || {}
  return {
    loading: user.loading,
    user: user.user,
    error: user.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  AppLogger.info('UserDetailsPage mapDispatchToProps dispatch : ', dispatch)
  return {
    onRequestUser: id => dispatch({
      type: UserActionTypes.USER_API_CALL_REQUEST,
      payload: id,
    }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage)
