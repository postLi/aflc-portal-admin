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
    url: '/api-uaa/password/token',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    },
    data: form
  })
}

export function getInfo(mobile, memberType) {
  if (memberType === 'AF00102') {
    // 车主
    return getDriverInfo(mobile)
  } else if (memberType === 'AF00101') {
    // 货主
    return getShipperInfo(mobile)
  } else {
    // 物流公司
    return getLogisticsCompanyInfo(mobile)
  }
  return fetch.get('/aflc-common/common/aflcMemberCenter/v1/getUserInfo', {
    params: {
      mobile,
      memberType
    }
  })
}

 // 获取车主信息
export function getDriverInfo(mobile) {
  return fetch.get('/aflc-common/common/aflcMemberCenter/v1/getDriverInfoByMobile', { params: {
    mobile: mobile
  }})
}
// 获取物流商信息
export function getLogisticsCompanyInfo(mobile) {
  return fetch.get('/aflc-common/common/aflcMemberCenter/v1/getLogisticsCompanyInfoByMobile', { params: {
    mobile: mobile
  }})
}
// 获取货主信息
export function getShipperInfo(mobile) {
  return fetch.get('/aflc-common/common/aflcMemberCenter/v1/getShipperInfoByMobile', { params: {
    mobile: mobile
  }})
}

export function getAccessInfo() {
  return fetch.get('/aflc-uc/usercenter/aflcLogisticsCompanyAccout/v1/getAccoutInfo').then(res => {
    return res.data
  })
}

export function logout() {
  return fetch.post('/uaa/app/oauth/logout', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    }
  })
}

export function refreshToken() {
  return fetch.put()
}
