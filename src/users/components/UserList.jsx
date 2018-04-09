import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import AppLogger from '../../commons/logger/AppLogger'
import AppCoreModule from '../../core/index'

// display list
const UserList = (props) => {
  // log users props
  AppLogger.info('UserList props : ', props)
  const {
    loading,
    users,
    onUserClick,
    error,
  } = props
  AppLogger.info('UserList loading : ', loading)
  AppLogger.info('UserList users : ', users)
  AppLogger.info('UserList error : ', error)
  AppLogger.info('UserList onUserClick : ', onUserClick)

  // on user click
  const onUserSelectClicked = (item) => {
    AppLogger.info('UserList item : ', item)
    onUserClick(item)
  }

  // user list loading status
  if (loading) {
    return <AppCoreModule.LoadingPage />
  }

  // user list error status
  if (error) {
    return <AppCoreModule.ErrorPage {...error} />
  }

  // user list emtpy status
  if (!users) {
    return <AppCoreModule.EmptyPage />
  }

  // render only if data
  return (
    <Fragment>
      <ul >
        {users.map(item => (
          <li key={item.id}>
            <button onClick={() => { onUserSelectClicked(item) }}>
              {item.firstName} {item.lastName} {item.birthday}
            </button>
          </li >
        ))
        }
      </ul >
    </Fragment>
  )
}

// prop type validation
UserList.propTypes = {
  onUserClick: PropTypes.func,
  users: PropTypes.array,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

// default prop
UserList.defaultProps = {
  onUserClick: null,
  users: null,
  error: null,
  loading: false,
}

export default UserList
