import React from 'react'
import PropTypes from 'prop-types'

const UserRow = ({ user }) => {
  const {
    firstName,
    lastName,
  } = user
  return (
    <div>
      <span>{firstName}</span>
      <span>{lastName}</span>
    </div>
  )
}

const UserList = ({
  users,
  onUserClick,
}) => (
    <ul>
      {users.map((user) => {
        const {
          firstName,
          lastName,
        } = user
        return (
          <li>
            <div>
              <span>{firstName}</span>
              <span>{lastName}</span>
              <button
                onClick={onUserClick}
              >
                Select User
            </button>
            </div>
          </li>
        )
      })}
    </ul>
  )

// prop types validation
UserList.propTypes = {
  users: PropTypes.arrayof(PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  })),
  onUserClick: PropTypes.func,
}

// default props values
UserList.defaultProps = {
  users: null,
  onUserClick: null,
}

export default UserList
