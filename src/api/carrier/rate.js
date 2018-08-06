import fetch from '@/utils/fetch'

const baseUrl = 'aflcusercenterservice-lyc' ;


//零担-承运商会员中心-评价管理-评价列表
export function CarrierOrderRate(page,pagesize,data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportEvaluation/v1/findCompanyShipperEvaluation',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//零担-承运商会员中心-评价管理-评价列表
export function TransportRate(page,pagesize,data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportEvaluation/v1/findCompanyMyEvaluation',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }


  //根据Id获取物流专线
  export function TransportInfo(id){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/findMemberAflcTransportRange/'+id,
      method: 'get',
    })
  }
  
  //根据id获取专线评价
  export function TransportEvaluation(id){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportEvaluation/v1/'+id,
      method: 'get',
    })
  }

  //根据orderSerial获取专线评价
  export function carrierSerial(orderSerial){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportEvaluation/v1/findByOrderSerial/'+orderSerial ,
      method: 'get',
    })
  }

//根据根据orderSerial获取专线评价获取货主评价表
export function consignorSerial(orderSerial){
    return fetch.axios({
        url: '/'+baseUrl+'/usercenter/aflcShipperEvaluation/v1/findByOrderSerial/'+orderSerial ,
        method: 'get',
    })
}

//根据id修改货主评价表
export function updateShipperRate(data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcShipperEvaluation/v1/update',
      method: 'put',
      data:data
    })
  }

//根据id修改专线评价表
export function updateRate(data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportEvaluation/v1/update',
      method: 'put',
      data:data
    })
  }