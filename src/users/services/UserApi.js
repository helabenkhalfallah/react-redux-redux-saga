import axios from 'axios'
import SessionUtils from '../../commons/utils/SessionUtils'
import AppLogger from '../../commons/logger/AppLogger'

// function that makes the api
// request and returns a Promise for response
const fetchUsers = () => {
  AppLogger.info('fetchUsers workerSaga')
  const url = `${process.env.REACT_APP_USERS_PATH}`
  AppLogger.info('fetchUsers url : ', url)
  const headers = { Authorization: SessionUtils.loadToken() }
  AppLogger.info('fetchUsers headers : ', headers)
  return axios({
    method: 'get',
    url,
    headers,
  })
}

// add user
const addUser = (user) => {
  const addUserUrl = `${process.env.REACT_APP_ADD_USER_PATH}`
  AppLogger.info('addUser workerSaga addUserUrl: ', addUserUrl)
  return axios.post(addUserUrl, user)
}

const UserApi = {
  fetchUsers,
  addUser,
}

export default UserApi
