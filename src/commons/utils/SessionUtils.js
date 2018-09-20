// user session utils : token, cookies, session ...
import cookie from 'react-cookies'

const saveToken = token => cookie.save('access_token', token, { path: '/' })
const removeToken = () => cookie.remove('access_token', { path: '/' })
const loadToken = () => cookie.load('access_token')

const SessionUtils = {
  saveToken,
  loadToken,
  removeToken,
}

export default SessionUtils
