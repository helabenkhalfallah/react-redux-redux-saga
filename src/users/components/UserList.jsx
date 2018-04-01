import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import AppLogger from '../../commons/logger/AppLogger'

const UserList = ({ users }) => {
  AppLogger.info('UserList users : ', users)
  return (
    <Fragment>
      UserList
    </Fragment>
  )
}

// prop type validation
UserList.propTypes = {
  users: PropTypes.array,
}

// default prop
UserList.defaultProps = {
  users: null,
}

export default UserList
