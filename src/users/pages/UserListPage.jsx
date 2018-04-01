
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import UserList from '../components/UserList'
import UserActionTypes from '../redux/actions/UserActionTypes'
import AppLogger from '../../commons/logger/AppLogger'

class UserListPage extends Component {
  // default props
  static defaultProps = {
    fetching: false,
    dog: null,
    error: null,
    onRequestDog: null,
  }

  // propsType (validation)
  static propTypes = {
    fetching: PropTypes.bool,
    dog: PropTypes.string,
    error: PropTypes.object,
    onRequestDog: PropTypes.func,
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
      fetching,
      dog,
      onRequestDog,
      error,
    } = this.props
    AppLogger.info('UserListPage fetching : ', fetching)
    AppLogger.info('UserListPage onRequestDog : ', onRequestDog)
    AppLogger.info('UserListPage error : ', error)
    AppLogger.info('UserListPage dog : ', dog)

    return (
      <Fragment>
        <header className="App-header">
          <img src={dog || 'https://cdn-images-1.medium.com/max/1200/1*Vko_9kRNbjQGCqyBM9OnVw.jpeg'} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dog Saga</h1>
        </header>

        {dog ? (
          <p className="App-intro">Keep clicking for new dogs</p>
        ) : (
            <p className="App-intro">Replace the React icon with a dog!</p>
          )}

        {fetching ? (
          <button disabled>Fetching...</button>
        ) : (
            <button onClick={onRequestDog}>Request a Dog</button>
          )}

        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  AppLogger.info('UserListPage mapStateToProps state : ', state)
  AppLogger.info('UserListPage mapStateToProps .fetching : ', state[0].fetching)
  AppLogger.info('UserListPage mapStateToProps .dog : ', state[0].dog)
  AppLogger.info('UserListPage mapStateToProps error : ', state[0].error)

  return {
    fetching: (state && state[0]) ? state[0].fetching : false,
    dog: (state && state[0]) ? state[0].dog : null,
    error: (state && state[0]) ? state[0].error : null,
  }
}

const mapDispatchToProps = (dispatch) => {
  AppLogger.info('UserListPage mapDispatchToProps dispatch : ', dispatch)
  return {
    onRequestDog: () => dispatch({ type: UserActionTypes.USER_API_CALL_REQUEST }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage)

