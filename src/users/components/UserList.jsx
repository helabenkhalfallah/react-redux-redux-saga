import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import AppLogger from '../../commons/logger/AppLogger'
import AppCoreModule from '../../core/index'

// display list
const UserList = ({ users, error, loading }) => {
  // log users props
  AppLogger.info('UserList users : ', users)
  AppLogger.info('UserList error : ', error)
  AppLogger.info('UserList loading : ', loading)

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
            {item.firstName} {item.lastName} {item.birthday}
          </li >
        ))
        }
      </ul >
    </Fragment>
  )
}

// prop type validation
UserList.propTypes = {
  users: PropTypes.array,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

// default prop
UserList.defaultProps = {
  users: null,
  error: null,
  loading: false,
}

export default UserList
