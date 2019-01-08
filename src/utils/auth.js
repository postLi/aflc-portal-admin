import Cookies from 'js-cookie'

const TokenKey = 'access_token'
const UsernameKey = 'lastloginUsername'
const OrgIdKey = 'OrganizationId'
const RefreshTokenKey = 'TMS-refreshtoken'
const UserinfoKey = 'TMS-userinfo'
const LoginKey = 'LOGINFO'

export function getLogin() {
  return JSON.parse(localStorage.getItem(LoginKey))
}

export function setLogin(Login) {
  return localStorage.setItem(LoginKey, JSON.stringify(Login))
}

export function removeLogin() {
  return localStorage.removeItem(LoginKey)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  var domain = location.hostname
  if (domain.indexOf('28china.cn') !== -1) {
    domain = '.28china.cn'
  }
  return Cookies.set(TokenKey, token, {expires: 7, domain: domain, path: '/'})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUsername() {
  let user = Cookies.get('login_mobile')
  let type = Cookies.get('login_type')
  return user + '|' + type
  // return localStorage.getItem(UsernameKey)
}

export function setUsername(name) {
  var domain = location.hostname
  if (domain.indexOf('28china.cn') !== -1) {
    domain = '.28china.cn'
  }
  let nameArr = name.split('|')
  let user = Cookies.set('login_mobile',nameArr[0], {expires: 7, domain: domain, path: '/'})
  let type = Cookies.set('login_type',nameArr[1], {expires: 7, domain: domain, path: '/'})
  // return user + '|' + type
  // return localStorage.setItem(UsernameKey, name)
}

export function removeUsername() {
  let user = Cookies.remove('login_mobile')
  let type = Cookies.remove('login_type')
  // return user + '|' + type
  // return localStorage.removeItem(UsernameKey)
}

export function getOrgId() {
  return localStorage.getItem(OrgIdKey)
}

export function setOrgId(name) {
  return localStorage.setItem(OrgIdKey, name)
}

export function removeOrgId() {
  return localStorage.removeItem(OrgIdKey)
}

export function getRefreshToken() {
  return localStorage.getItem(RefreshTokenKey)
}

export function setRefreshToken(name) {
  return localStorage.setItem(RefreshTokenKey, name)
}

export function removeRefreshToken() {
  return localStorage.removeItem(RefreshTokenKey)
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(UserinfoKey))
}

export function setUserInfo(obj) {
  return localStorage.setItem(UserinfoKey, JSON.stringify(obj))
}

export function removeUserInfo() {
  return localStorage.removeItem(UserinfoKey)
}
