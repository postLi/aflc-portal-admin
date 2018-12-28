import fetch from '@/utils/fetch'

const baseUrl = 'aflc-uc' ;

/**
 * 新增物流专线
 * @param {*} data 专线数据
{
  "account": "string",
  "departureHzData": 0,
  "departureHzTime": 0,
  "departureTime": "string",
  "departureTimeCode": "string",
  "endLocation": "string",
  "endLocationContacts": "string",
  "endLocationContactsMobile": "string",
  "id": "string",
  "lowerPrice": 0,
  "publishId": "string",
  "publishName": "string",
  "rangePrice": [
    {
      "discountPrice": 0,
      "endVolume": 0,
      "primeryPrice": 0,
      "startVolume": 0,
      "type": "string"
    }
  ],
  "startLocation": "string",
  "startLocationContacts": "string",
  "startLocationContactsMobile": "string",
  "transportAging": "string",
  "transportAgingUnit": "string"
}
 */
export function postNewRange(data) {
  return fetch.post('/aflc-uc/   /aflcTransportRange/v1/add', data)
}

//认证物流公司
export function identifyCarrier(data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcLogisticsCompany/v1/authAflcLogisticsCompany',
      method: 'post',
      data:data
    })
  }


  //新增物流公司网点
export function NewPointNetwork(data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcPointNetwork/v1/add',
      method: 'post',
      data:data
    })
  }


//更改物流公司网点
export function changePointNetwork(data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcPointNetwork/v1/update',
      method: 'PUT',
      data:data
    })
  }
//根据条件获取物流公司网点列表
export function getPointNetwork(page,pagesize,data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcPointNetwork/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }


//更改物流公司网点状态
export function PointNetworkStatus(id){
    return fetch.axios({
      url: '/aflc-uc/usercenter/aflcPointNetwork/v1/updateAflcPointNetworkStatus/'+id,
      method: 'PUT',
    })
  }

  //删除物流公司网点列表
export function deletePointNetwork(id){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcPointNetwork/v1/delete/'+id,
      method: 'DELETE',
    })
  }

  
  
