import fetch from '@/utils/fetch'
import { getRefreshToken } from '../utils/auth'

export function login(username, password, orgid) {
  var grant_type = 'password'
  var scope = 'webApp'
/*   return fetch.post('/uaa/oauth/token', {
    username,
    password,
    grant_type,
    orgid
    // scope,
  }, {
    headers: {
      // 'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    }
  }) */
  console.log('login:', arguments, fetch.axios)
  const form = new FormData()
  form.append('username', username)
  form.append('password', password)
  form.append('grant_type', grant_type)
  return fetch.request({
    url: '/uaa/oauth/token',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    },
    data: form
  })
}

export function getInfo(mobile, memberType) {
  return fetch.get('/aflccommonservice/common/aflcMemberCenter/v1/getUserInfo', {
    params: {
      mobile,
      memberType
    }
  })
}

export function getAccessInfo() {
  return fetch.get('/aflcusercenterservice/usercenter/aflcLogisticsCompanyAccout/v1/getAccoutInfo').then(res => {
    return res.data
  })
}

export function logout() {
  return fetch.delete('/uaa/oauth/token', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    }
  })
}

export function refreshToken() {
  return fetch.put()
}
