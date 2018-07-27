import fetch from '@/utils/fetch'

const baseUrl = 'aflcorderservice' ;


//零担-货主会员中心-投诉管理-投诉列表
export function listShipperComplain(page,pagesize,data){
    return fetch.axios({
      url: '/'+baseUrl+'/order/aflcOrderComplain/v1/listShipperComplain',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }


