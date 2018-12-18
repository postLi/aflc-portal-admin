import fetch from '@/utils/fetch'

const baseUrl = 'aflc-uc' ;


//零担-货主会员中心-评价管理-评价列表
export function listShipperRate(page,pagesize,data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportEvaluation/v1/findShipperMyEvaluation',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }


