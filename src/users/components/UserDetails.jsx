import React from 'react'
import PropTypes from 'prop-types'
import AppLogger from '../../commons/logger/AppLogger'
import AppCoreModule from '../../core/index'

const UserDetails = (props) => {
  // log users props
  AppLogger.info('UserDetails props : ', props)
  const {
    loading,
    user,
    error,
  } = props

  AppLogger.info('UserDetails user : ', user)
  AppLogger.info('UserDetails error : ', error)
  AppLogger.info('UserDetails loading : ', loading)

  // user list loading status
  if (loading) {
    return <AppCoreModule.LoadingPage />
  }

  // user list error status
  if (error) {
    return <AppCoreModule.ErrorPage {...error} />
  }

  // user list emtpy status
  if (!user) {
    return <AppCoreModule.EmptyPage />
  }

  return (
    <div>
      {user.firstName} {user.lastName} {user.birthday}
    </div>
  )
}

// prop type validation
UserDetails.propTypes = {
  user: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

// default prop
UserDetails.defaultProps = {
  user: null,
  error: null,
  loading: false,
}

export default UserDetails
