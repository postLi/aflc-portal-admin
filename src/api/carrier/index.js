import fetch from '@/utils/fetch'

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
  return fetch.post('/aflcusercenterservice/   /aflcTransportRange/v1/add', data)
}
