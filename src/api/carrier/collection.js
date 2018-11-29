import fetch from '@/utils/fetch'
// /usercenter/aflcCollect/v1/collectList
// 会员中心_收藏列表
export function getCollectList(user_token, data) {
  return fetch.post('/aflc-uc/usercenter/aflcCollect/v1/collectList', data).then(res => {
    return res.data || { list: [], total: 0 }
  })
}
