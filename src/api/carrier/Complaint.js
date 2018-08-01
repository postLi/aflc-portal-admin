import fetch from '@/utils/fetch'

const baseUrl = 'aflcorderservice' ;


//零担-承运商会员中心-投诉管理-投诉列表
export function listCompanyComplain(page,pagesize,data){
    return fetch.axios({
      url: '/'+baseUrl+'/order/aflcOrderComplain/v1/listCompanyComplain',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

// 根据id获取订单投诉建议表
export function getAflcOrderComplain(id) {
    return fetch.axios({
      url:'/'+baseUrl+'/order/aflcOrderComplain/v1/' + id,
      method: 'get'
    })
  }


  // 根据id获取订单表
export function getDetails(id) {
    return fetch.axios({
      url:'/'+baseUrl+'/order/fclOrder/v1/getDetails/' + id,
      method: 'get'
    })
  }

  //新建订单投诉建议
  export function addOrderComplain(data) {
    return fetch.axios({
      url:'/'+baseUrl+'/order/aflcOrderComplain/v1/add',
      method: 'post',
      data:data
    })
  }


    // 根据orderSerial获取订单投诉建议
export function getDetailsByOrderSerial(orderSerial) {
    return fetch.axios({
      url:'/'+baseUrl+'/order/aflcOrderComplain/v1/findAflcOrderComplainByOrderSerial/' + orderSerial,
      method: 'get'
    })
  }

