import fetch from '@/utils/fetch'

const baseUrl = 'aflccommonservice'

/**
 * 获取城市数据
 */
export function getCityInfo(name = '') {
  return fetch.get('/api-order/order/region/v1/name', {
    params: {
      name: name || ''
    }
  }).then(res => {
    return res.data || []
  })
}
/**
 * 获取后台时间
 */
export function getSystemTime() {
  return fetch.get('/api-order/order/v1/orderCreateDate/').then(res => {
    return res.data
  })
}

/**
 * 获取图片上传的policy
 * callback
 *"data": {
        "accessid": "LTAIFj5nQSIxEZ8H",
        "policy": "eyJleHBpcmF0aW9uIjoiMjAxOC0wNS0yMlQxNjowNTowMC4yNThaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0bXMvIl1dfQ==",
        "signature": "NJ8HhMX9ZpLfNy7ojaA95O0jFxY=",
        "dir": "tms/",
        "host": "http://aflc.oss-cn-shenzhen.aliyuncs.com",
        "expire": "1527005100"
    }
 */
let UPLOADPOLICYDATA // 用来缓存上传policy
export function getUploadPolicy() {
  // 后期可添加是否过期的验证
  if (UPLOADPOLICYDATA) {
    return new Promise((resolve) => {
      resolve(UPLOADPOLICYDATA)
    })
  } else {
    return fetch.get('/anfacommonservice/common/oss/v1/policy').then(res => {
      UPLOADPOLICYDATA = res.data || {}
      // 定时清除旧数据
      setTimeout(() => {
        UPLOADPOLICYDATA = ''
      }, 3 * 60 * 1000)
      return UPLOADPOLICYDATA
    })
  }
}

/**
 * 获取下拉框类型
 * @param {*} type 下拉类型
 * @param {*} orgid 网点id
 */
export function getSelectType(type = '') {
  return fetch.get('/aflccommonservice/sysDict/getSysDictByCodeGet/' + type).then(res => {
    return res.data || []
  })
}

// 通过数据字典查询
/**
 * @export
 * @param {*} code 数据字典code值
 * @returns
 */
export function getDictionary(code) {
  return fetch.axios({
    url: '/' + baseUrl + '/sysDict/getSysDictByCodeGet/' + code,
    method: 'get'
  })
}

// 根据手机号码获取货主信息
export function getShipperInfoByMobile(phone) {
  return fetch.axios({
    url: '/' + baseUrl + '/common/aflcMemberCenter/v1/getShipperInfoByMobile?' + 'mobile=' + phone,
    method: 'get'
  })
}

// 根据手机号码获取车主信息
export function getDriverInfoByMobile(phone) {
  return fetch.axios({
    url: '/' + baseUrl + '/common/aflcMemberCenter/v1/getDriverInfoByMobile?' + 'mobile=' + phone,
    method: 'get'
  })
}

// 根据手机号码获取物流公司信息
export function getLogisticsCompanyInfoByMobile(phone) {
  return fetch.axios({
    url: '/' + baseUrl + '/common/aflcMemberCenter/v1/getLogisticsCompanyInfoByMobile?' + 'mobile=' + phone,
    method: 'get'
  })
}

/**
 * 修改密码
{
  mobile,
  oldPassword,
  newPassword,
  surePassword
}
 */
export function putChangeMyPassword(memberType, obj) {
  const form = new FormData()
  for (const i in obj) {
    form.append(i, obj[i])
  }

  let str = ''
  for (const i in obj) {
    str += '&' + i + '=' + obj[i]
  }

  return fetch.request({
    url: '/aflccommonservice/common/aflcMemberCenter/v1/updatePassword' + '?memberType=' + memberType,
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: str
  })

  // let str = ''
  // for (const i in obj) {
  //   str += '&' + i + '=' + obj[i]
  // }
  // return fetch.put('/aflccommonservice/common/aflcMemberCenter/v1/updatePassword' + '?memberType=' + memberType + str)
}
