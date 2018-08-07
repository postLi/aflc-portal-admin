import fetch from '@/utils/fetch'

const baseUrl = 'aflcusercenterservice'

// 零担-承运商会员中心-评价管理-评价列表
export function CarrierOrderRate(page, pagesize, data) {
  return fetch.axios({
    url: '/' + baseUrl + '/usercenter/aflcTransportEvaluation/v1/findCompanyShipperEvaluation',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 零担-承运商会员中心-评价管理-评价列表
export function TransportRate(page, pagesize, data) {
  return fetch.axios({
    url: '/' + baseUrl + '/usercenter/aflcTransportEvaluation/v1/findCompanyMyEvaluation',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

  // 根据Id获取物流专线
export function TransportInfo(id) {
  return fetch.axios({
    url: '/' + baseUrl + '/usercenter/aflcTransportRange/v1/findMemberAflcTransportRange/' + id,
    method: 'get'
  })
}

  // 根据id获取专线评价
export function TransportEvaluation(id) {
  return fetch.axios({
    url: '/' + baseUrl + '/usercenter/aflcTransportEvaluation/v1/' + id,
    method: 'get'
  })
}

  // 根据orderSerial获取专线评价
export function carrierSerial(orderSerial) {
  return fetch.axios({
    url: '/' + baseUrl + '/usercenter/aflcTransportEvaluation/v1/findByOrderSerial/' + orderSerial,
    method: 'get'
  })
}

// 根据根据orderSerial获取专线评价获取货主评价表
export function consignorSerial(orderSerial) {
  return fetch.axios({
    url: '/' + baseUrl + '/usercenter/aflcShipperEvaluation/v1/findByOrderSerial/' + orderSerial,
    method: 'get'
  })
}

// 根据id修改货主评价表
export function updateShipperRate(data) {
  return fetch.axios({
    url: '/' + baseUrl + '/usercenter/aflcShipperEvaluation/v1/update',
    method: 'put',
    data: data
  })
}

// 根据id修改专线评价表
export function updateRate(data) {
  return fetch.axios({
    url: '/' + baseUrl + '/usercenter/aflcTransportEvaluation/v1/update',
    method: 'put',
    data: data
  })
}
/**
 * 新增评价
{
  "assessLevel": "string", // 评价等级
  "createTime": "2018-08-06T13:34:38.868Z",
  "creater": "string",
  "evaluationDes": "string", // 评价描述
  "evaluationId": "string", // 评价人ID
  "evaluationName": "string", // 评价人姓名
  "evaluationTime": "2018-08-06T13:34:38.868Z",
  "id": "string",
  "orderSerial": "string", // 订单流水号
  "replyDes": "string", // 回复描述
  "replyId": "string", // 回复人ID
  "replyName": "string",
  "replyTime": "2018-08-06T13:34:38.868Z",
  "serverPriceStarLevel": "string", // 服务价格星级
  "serverQualityStarLevel": "string", // 服务质量星级
  "transportAgingStarLevel": "string", // 运输时效星级
  "transportRangeId": "string", // 物流专线ID
  "updateTime": "2018-08-06T13:34:38.868Z",
  "updater": "string",
  "version": "string"
}
 */
export function addReview(data) {
  return fetch.post('/aflcusercenterservice/usercenter/aflcTransportEvaluation/v1/add', data)
}
