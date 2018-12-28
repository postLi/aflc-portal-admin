import fetch from '@/utils/fetch'

/** 保险单列表
 */
export function postInsurelist(user_token, data) {
  return fetch.post('/aflcusercenterservice/usercenter/aflcinsurancepolicy/v1/list', data).then(res => {
    return res.data || { list: [], total: 0 }
  })
}
/**
 * /usercenter/aflcinsurancepolicy/v1/{id}
根据ID查询保险单信息
 */
export function getCheckinsure(id) {
  return fetch.get('/aflc-uc/usercenter/aflcinsurancepolicy/v1/' + id).then(res => {
    return res.data
  })
}
/**
 * /usercenter/aflcinsurancepolicy/v1/{id}
根据ID修改保险单信息
 */
export function putAmendinsure(id) {
  return fetch.put('/aflcusercenterservice/usercenter/aflcinsurancepolicy/v1/' + id)
}
/**
 *
/usercenter/aflcinsurancepolicy/v1/{id}
根据ID删除保险单信息
 */
export function deleteInsure(id) {
  return fetch.delete('/aflcusercenterservice/usercenter/aflcinsurancepolicy/v1/' + id)
}
/**
 * /aflc-uc/usercenter/aflcinsurancepolicy/v1/getCountByPaymentState
 */
export function postGetCountByPaymentState(user_token, data) {
  return fetch.post('/aflc-uc/usercenter/aflcinsurancepolicy/v1/getCountByPaymentState', data).then(res => {
    return res.data ? (res.data || {}) : {}
  })
}
