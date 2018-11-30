import fetch from '@/utils/fetch'
// /usercenter/aflcCollect/v1/collectList
// 会员中心_收藏列表
export function getCollectList(user_token, data) {
  return fetch.post('/aflc-uc/usercenter/aflcCollect/v1/collectList', data).then(res => {
    return res.data || { list: [], total: 0 }
  })
}
export function getCollectListNum(user_token, data = {}) {
  return fetch.post('/aflc-uc/usercenter/aflcCollect/v1/getCollectNum', data).then(res => {
    return res.data ? (res.data || {}) : {}
    // return res.data ? (res.data[0] || {}) : {}
  })
}
///usercenter/aflcCollect/v1/cancelCollect
export function postCancelCollect(data) {
  return fetch.post('/aflc-uc/usercenter/aflcCollect/v1/cancelCollect/' ,data)
}
