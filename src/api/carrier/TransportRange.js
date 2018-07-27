import fetch from '@/utils/fetch'

const baseUrl = 'aflcusercenterservice'

//根据条件获取专线列表
export function getTransportRangeList(page,pagesize,data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/getMemberAflcTransportRangeList',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//根据条件获取专线列表
export function newTransportRangeList(data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/add',
      method: 'post',
      data:data
    })
  }

  

//根据Id获取物流专线
export function TransportRangeInfo(id){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/findMemberAflcTransportRange/'+id,
      method: 'get',
    })
  }


//根据id修改物流专线
export function changeTransportRange(data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/update',
      method: 'put',
      data:data
    })
  }


  //更改物流公司网点状态
export function TransportRangeStatus(id){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/updateAflcTransportRangeStatus/'+id,
      method: 'PUT',
    })
  }


  //更改物流公司网点状态
export function deleteTransportRange(id){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/delete/'+id,
      method: 'delete',
    })
  }