import fetch from '@/utils/fetch'

/**
 * 根据条件获取零担订单信息列表
{
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "authStatus": "string", 认证状态
    "consignee": "string", 收货人
    "consigneePhone": "string", 收货人手机
    "consignor": "string", 发货人
    "consignorPhone": "string", 发货人手机
    "createTime": "string",  创建时间
    "endAddress": "string", 目的地
    "goodsName": "string", 货物名称
    "goodsVolume": "string", 货物体积
    "goodsVolumeLower": "string", 货物体积下限
    "goodsVolumeUpper": "string", 货物体积上限
    "goodsWeight": "string", 货物重量
    "goodsWeightLower": "string", 货物重量下限
    "goodsWeightUpper": "string", 货物重量上限
    "id": "string", 订单id
    "idNotInList": [
      "string"
    ], 订单id列表（not In查询）
    "idStrList": "string", 货源id列表，用,分隔
    "isVip": "string", 是否28信用（0 否 1 是）
    "memberType": "string", 会员类型
    "orderClass": "string", 订单分类((同城订单中)1为即时订单，0为预约订单;(零担订单中)0单次急发货源1长期稳定货源)
    "orderSerial": "string", 订单流水号
    "orderSerialOrGoodsName": "string", 订单流水号/货品名称
    "orderStatus": "string", 零担订单状态（所有订单：AF03701;待承运:AF03702;待提货:AF03703;待发货:AF03704;待收货:AF03705;待评价:AF03706;已完成:AF03707;已取消:AF03708）
    "orderType": "string", 订单类型(AF01701:同城;AF01702:零担;AF01703:省际)
    "otherOrderSource": "string", 此路线其他货
    "queryOrderType": "string", 查询排序方式
    "queryType": "string", 查询类型（1：订单；2：货源）
    "shipperId": "string", 货主id
    "shipperName": "string", 货主姓名
    "startAddress": "string", 出发地
    "title": "string", 标题
    "totalAmount": 0, 货物总数量
    "usedCarType": "string", 用车类型（车辆类型）
    "userToken": "string" 用户userToken
  }
}
 */
export function getOrderList(user_token, data) {
  return fetch.post('/aflcorderservice/order/fclOrder/v1/findOderCarrierList', data).then(res => {
    return res.data || { list: [], total: 0 }
  })
}
/**
 * 获取订单各个状态下的数量
 */
export function getOrderListCount(user_token, data = {}) {
  return fetch.post('/aflcorderservice/order/fclOrder/v1/getOrderStatusGroupCountList', data).then(res => {
    return res.data ? (res.data[0] || {}) : {}
  })
}
/**
 * 取消承运
 * @param {*} id 运单id
 */
export function putCancelCarrrier(id) {
  return fetch.put('/aflcorderservice/order/fclOrder/v1/cancelCarrier/' + id)
}
/**
 * 取消订单
 * @param {*} id 运单id
 */
export function putCancelOrder(id) {
  return fetch.put('/aflcorderservice/order/fclOrder/v1/cancelOrder/' + id)
}
/**
 * 确认承运
 * @param {*} id 运单id
 */
export function putConfirmCarrier(id) {
  return fetch.put('/aflcorderservice/order/fclOrder/v1/confirmCarrier/' + id)
}
/**
 * 确认发货
 * @param {*} id 运单id
 */
export function putConfirmDelivery(id) {
  return fetch.put('/aflcorderservice/order/fclOrder/v1/confirmDelivery/' + id)
}
/**
 * 确认收获
 * @param {*} id 运单id
 */
export function putConfirmEvaluate(id) {
  return fetch.put('/aflcorderservice/order/fclOrder/v1/confirmEvaluate/' + id)
}
/**
 * 确认提货
 * @param {*} id 运单id
 */
export function putConfirmPickUp(id) {
  return fetch.put('/aflcorderservice/order/fclOrder/v1/confirmPickUpGoods/' + id)
}

export function getOrderInfo(id) {
  return fetch.get('/aflcorderservice/order/fclOrder/v1/getDetails/' + id).then(res => {
    return res.data || {}
  })
}
/**
 * 新增评论
 * @param {*} data 评论数据
{
  "assessLevel": "string", // 评价等级
  "evaluationDes": "string", // 评价描述
  "evaluationId": "string", // 评价人ID
  "evaluationName": "string", // 评价人姓名
  "orderSerial": "string", // 订单流水号
  "serverPriceStarLevel": "string", // 服务价格星级
  "serverQualityStarLevel": "string", // 服务质量星级
  "transportAgingStarLevel": "string", // 运输时效星级
  "transportRangeId": "string" // 物流专线ID
}
 */
export function postNewReview(data) {
  return fetch.post('/aflc-uc/usercenter/aflcTransportEvaluation/v1/add', data)
}

/**
 * 新增对货主的评论
 * @param {*} data 评论数据
{
  "assessLevel": "string", // 评价等级
  "evaluationDes": "string", // 评价描述
  "evaluationId": "string", // 评价人ID
  "evaluationName": "string", // 评价人姓名
  "orderSerial": "string", // 订单流水号
  "dockStarLevel": "string", // 装卸安排
  "goodsStarLevel": "string", // 货物包装
  "payStarLevel": "string" // 付款及时
  "shipperId": "" // 货主id
}
 */
export function postNewCarrierReview(data) {
  return fetch.post('/aflc-uc/usercenter/aflcShipperEvaluation/v1/add', data)
}
/**
 * 根据id获取回传信息
 * @param {*} id id
 */
export function getOrderDesc(id) {
  return fetch.get('/aflcorderservice/order/fclOrder/v1/getAflcFCLOrder/' + id).then(res => {
    return res.data || {}
  })
}
/**
 * 根据条件获取零担订单信息列表(总后台)
 * @param {*} data data
 {
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "authStatus": "string",
    "consignee": "string",
    "consigneePhone": "string",
    "consignor": "string",
    "consignorPhone": "string",
    "createTime": "string",
    "endAddress": "string",
    "goodsName": "string",
    "goodsVolume": "string",
    "goodsVolumeLower": "string",
    "goodsVolumeUpper": "string",
    "goodsWeight": "string",
    "goodsWeightLower": "string",
    "goodsWeightUpper": "string",
    "id": "string",
    "idNotInList": [
      "string"
    ],
    "idStrList": "string",
    "isVip": "string",
    "memberType": "string",
    "orderClass": "string",
    "orderSerial": "string",
    "orderSerialOrGoodsName": "string",
    "orderStatus": "string",
    "orderType": "string",
    "otherOrderSource": "string",
    "queryOrderType": "string",
    "queryType": "string",
    "releaseOrCarrier": "string",
    "shipperId": "string",
    "shipperName": "string",
    "startAddress": "string",
    "title": "string",
    "totalAmount": 0,
    "usedCarType": "string",
    "wlName": "string"
  }
}
 */
export function getAllOrder(data) {
  return fetch.post('/aflcorderservice/order/fclOrder/v1/findOderCarrierList', data).then(res => {
    return res.data || { list: [], total: 0 }
  })
}
/**
 * 根据Id获取物流专线
 * @param {*} id 专线id
 */
export function getLineInfo(id) {
  return fetch.get('/aflc-uc/usercenter/aflcTransportRange/v1/findMemberAflcTransportRange/' + id).then(res => {
    return res.data || {}
  })
}
