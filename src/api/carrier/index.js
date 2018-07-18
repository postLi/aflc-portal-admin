import fetch from '@/utils/fetch'

const baseUrl = 'aflcusercenterservice' ;

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
  return fetch.post('/aflcportalservice/portalt/aflcTransportRange/v1/publishAflcTransportRange', data)
}

//认证物流公司
export function identifyCarrier(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcLogisticsCompany/v1/authAflcLogisticsCompany',
      method: 'post',
      data:data
    })
  }
