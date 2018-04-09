import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserActionTypes from '../redux/actions/UserActionTypes'
import AppLogger from '../../commons/logger/AppLogger'
import UserDetails from '../components/UserDetails'

class UserDetailsPage extends Component {
  // default props
  static defaultProps = {
    loading: false,
    user: null,
    error: null,
    onRequestUser: null,
  }

  // propsType (validation)
  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object,
    error: PropTypes.object,
    onRequestUser: PropTypes.func,
    location: PropTypes.object.isRequired,
  }

  // initial state
  state = {

  }

  // did mount staff
  componentDidMount() {
    AppLogger.info('UserDetailsPage componentDidMount')
    AppLogger.info('UserDetailsPage props : ', this.props.location)
    if (this.props.location.state.user) {
      this.props.onRequestUser(this.props.location.state.user.id)
    }
  }

  // force refetch
  // mapStateToProps
  componentWillReceiveProps(nextProps) {
    AppLogger.info('UserDetailsPage nextProps : ', nextProps)
  }

  render() {
    AppLogger.info('UserDetailsPage props : ', this.props)
    return (
      <Fragment>
        <UserDetails
          user={this.props.user}
          loading={this.props.loading}
          error={this.props.error}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  AppLogger.info('UserDetailsPage mapStateToProps state : ', state)
  AppLogger.info('UserDetailsPage mapStateToProps .loading : ', state[1].loading)
  AppLogger.info('UserDetailsPage mapStateToProps .user : ', state[1].user)
  AppLogger.info('UserDetailsPage mapStateToProps error : ', state[1].error)

  return {
    loading: (state && state[1]) ? state[1].loading : false,
    user: (state && state[1]) ? state[1].user : null,
    error: (state && state[1]) ? state[1].error : null,
  }
}

const mapDispatchToProps = (dispatch) => {
  AppLogger.info('UserDetailsPage mapDispatchToProps dispatch : ', dispatch)
  return {
    onRequestUser: id => dispatch({ type: UserActionTypes.USER_API_CALL_REQUEST, payload: id }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage)

