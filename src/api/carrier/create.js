import fetch from '@/utils/fetch'

/**
 * 创建零担订单
 * @param {*} data 运单参数
 {
  "aflcFCLOrderGoodsDtoList": [
    {
      "goodsName": "string", // 货物名称
      "goodsNum": 0, // 总件数
      "goodsVolume": "string", // 货物体积（方）
      "goodsWeight": "string", // 货物重量（吨）
      // "title": "string" // 标题
    }
  ],
  "aflcOrderAddressWebDtoList": [
    {
      "contacts": "string", // 联系人
      "contactsPhone": "string", // 联系电话
      "isSave": false, // 是否保存常用收发货人
      "type": "string", // 类型（0：发货人，1：收货人）

      "provinceCityArea": "string", // 省市区
      viaAddress": "string", // 途径地
      "viaAddressCoordinate": "string", // 途径地坐标
      //"viaAddressName": "string", // 途径名地址名称
      "viaOrder": 0 // 途径地顺序（0：出发地；1：目的地）
    }
  ],
  "clientIp": "string", // 终端ip
  "memberType": "string", // 会员类型(货主:AF00101,车主:AF00102,物流公司:AF00107)
  "orderClass": "string", // 货源类型(0单次急发货源1长期稳定货源)
  "orderFrom": "string", // 订单来源(APP端:AF0040001;WEB端:AF0040002;微信公众号:AF0040003;小程序:AF004004)
  "shipperId": "string", // 货主id 用户id
  "title": "string", // 标题
  "totalAmount": 0, // 订单总金额
  "wlId": "string", // 物流公司id
  "wlName": "string" // 物流公司名称
  startPointId: '' // 最佳出发网点
  endPointId: '' // 最佳结束网点
  goodsType:0
  forecastPrice: 0
}
 */
export function postCreateOrder(usertoken, data) {
  return fetch.post('/aflcorderservice/order/fclOrder/v1/createOrder?user_token=' + usertoken, data)
}
/**
 * 根据id获取信息
 * @param {*} id 订单id
 */
export function getOrderInfo(id) {
  return fetch.get('/aflcorderservice/order/fclOrder/v1/getDetails/' + id)
}
/**
 * 计算货物价格
 * @param {*} publishId 发布者id（物流公司id）
 * @param {*} weight 货物重量
 * @param {*} volume 货物体积
 * @param {*} startLocation 出发点
 * @param {*} endLocation 目的地
 */
export function getGoodsPrice(publishId, weight, volume, startLocation, endLocation) {
  return fetch.get('/aflcorderservice/order/fclOrder/v1/getGoodsPrice', {
    params: {
      publishId,
      weight,
      volume,
      startLocation,
      endLocation
    }
  })
}
/**
 * 根据条件获取订单信息列表
 * @param {*} data 搜索参数
 {
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "belongCity": "string",
    "claimRule": "string", //理赔规则代码
    "clientIp": "string",
    "companyName": "string", //货主名称
    "createTime": "2018-07-27T02:12:48.766Z", //创建时间
    "creater": "string", // 创建人
    "createrName": "string", // 创建人姓名
    "endAddress": "string", // 目的地
    "endTime": "2018-07-27T02:12:48.766Z",
    "extraName": "string", // 额外服务
    "goodsName": "string", // 货物名称
    "goodsNum": 0, // 货物总件数
    "goodsVolume": "string", // 货物体积（方）
    "goodsWeight": "string", // 货物重量（吨）
    "id": "string", // 编号
    "isFirst": "string", // 我的司机优先接单
    "memberType": "string", // 会员类型(货主:AF00101,车主:AF00102,物流公司:AF00107)
    "orderClass": "string",
    "orderFrom": "string",
    "orderSerial": "string", // 订单流水号
    "orderStatus": "string", // 订单状态 0 创建 未支付 1 支付成功 2 支付失败
    "orderType": "string", // 订单类型
    "outMileage": 0,
    "parentOrderStatus": "string",
    "payStatus": "string",
    "payWay": "string",
    "queryType": "string", // 查询类型（1：订单；2：货源）
    "remark": "string", // 订单备注
    "shipperAddress": "string", // 发货人地址
    "shipperId": "string", // 货主id
    "shipperMobile": "string", // 发货人联系电话
    "shipperName": "string", // 发货人姓名
    "spec": "string",
    "startAddress": "string", // 出发地
    "startMileage": 0,
    "startTime": "2018-07-27T02:12:48.766Z",
    "title": "string", // 标题
    "totalAmount": 0, // 订单总金额
    "updateTime": "2018-07-27T02:12:48.766Z", // 更新时间
    "updater": "string", // 修改人
    "useCarTime": "2018-07-27T02:12:48.766Z", // 用车时间
    "useTime": "2018-07-27T02:12:48.766Z", // 下单时间
    "usedCarType": "string",
    "version": "string", // 版本
    "wlId": "string",
    "wlName": "string"
  }
}
 */
/* export function getOrderList(data) {
  return fetch.post('/aflcorderservice/order/fclOrder/v1/list', data)
} */
/**
 * 设置启用
 * @param {*} id 订单id
 * @param {*} type 启用标志，0：禁用；1启用
 */
export function putEnableOrder(id, type) {
  return fetch.put('/aflcorderservice/order/fclOrder/v1/setEnableType/' + id + '/' + type)
}
/**
 * 专线详情网点列表
 * @param {*} data 参数
 {
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "companyId": "string", // 物流公司id
    "endLocation": "string", // 目的地
    "startLocation": "string" // 出发地
  }
}
 */
export function getListDetailPoint(data) {
  return fetch.post('/aflcusercenterservice/usercenter/aflcPointNetwork/v1/listDetailPointNetwork', data)
}
/**
 * 新增常用收发货人
 * @param {*} data 联系人信息
{
  "address": "string", 详细地址
  "contacts": "string", 联系人
  "contactsPhone": "string", 联系电话
  "coordinate": "string", 发货地坐标
  "createTime": "2018-07-27T06:28:38.733Z", 创建时间
  "creater": "string", 创建人
  "delFlag": "string", 删除状态
  "floorHousenum": "string", 楼层及门牌号
  "id": "string", 编号
  "isDefault": "string", 是否默默常用联系人（0：否；1：是）
  "shipperId": "string", 货主ID
  "summary": "string", 简称
  "type": "string", 类型（0：常用发货人，1：常用收货人）
  "updateTime": "2018-07-27T06:28:38.733Z", 更新时间
  "updater": "string", 修改人
  "version": "string" 版本
}
 */
export function postAddContact(data) {
  return fetch.post('/aflcusercenterservice/usercenter/aflcShipperContacts/v1/add', data)
}
/**
 * 根据条件获取常用收发货人列表
 * @param {*} data 查询参数
{
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "address": "string",
    "contacts": "string",
    "contactsPhone": "string",
    "coordinate": "string",
    "createTime": "2018-07-27T06:27:35.388Z",
    "creater": "string",
    "delFlag": "string",
    "floorHousenum": "string",
    "id": "string",
    "isDefault": "string",
    "queryKeyword": "string",
    "shipperId": "string",
    "summary": "string",
    "type": "string",
    "updateTime": "2018-07-27T06:27:35.388Z",
    "updater": "string",
    "version": "string"
  }
}
 */
export function getContactList(data) {
  return fetch.post('/aflcusercenterservice/usercenter/aflcShipperContacts/v1/list', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 根据id修改常用收发货人
 * @param {*} data 发货人数据
{
  "address": "string",
  "contacts": "string",
  "contactsPhone": "string",
  "coordinate": "string",
  "createTime": "2018-07-27T06:36:32.220Z",
  "creater": "string",
  "delFlag": "string",
  "floorHousenum": "string",
  "id": "string",
  "isDefault": "string",
  "shipperId": "string",
  "summary": "string",
  "type": "string",
  "updateTime": "2018-07-27T06:36:32.220Z",
  "updater": "string",
  "version": "string"
}
 */
export function putChangeContact(data) {
  return fetch.put('/aflcusercenterservice/usercenter/aflcShipperContacts/v1/update', data)
}
/**
 * 获取货品的预估价格
 * @param {*} data 查询参数
{
  transportRangeId: '', // 物流公司专线id
  weight:'', // 货物重量
  volume: '' // 货物体积
}
 */
export function getTotalPrice(data) {
  return fetch.get('/aflcorderservice/order/fclOrder/v1/getEstimateTotalPieces', {
    params: data
  })
}
/**
 * 根据物流公司ID获取最近网点（出发地，到达地）
 * @param {*} cid companyId
 * @param {*} data 查询参数
{
  endLatitude:'', // 到达地上传坐标纬度
  endLocation:'', // 目的地
  endLongitude:'', // 到达地上传坐标经度
  startLatitude:'', // 出发地上传坐标纬度
  startLocation:'', // 出发地
  startLongitude:'' // 出发地上传坐标经度
}
 */
export function getBestNet(cid, data) {
  return fetch.post('/aflcusercenterservice/usercenter/aflcPointNetwork/v1/listPointByCompanyId/' + cid, data)
}
/**
 * 根据物流公司ID获取出发网点、到达网点
 * @param {*} cid companyId
 * @param {*} data 查询参数
{
  endLatitude:'', // 到达地上传坐标纬度
  endLocation:'', // 目的地
  endLongitude:'', // 到达地上传坐标经度
  startLatitude:'', // 出发地上传坐标纬度
  startLocation:'', // 出发地
  startLongitude:'' // 出发地上传坐标经度
}
 */
export function getAllNet(cid, data) {
  return fetch.post('/aflcusercenterservice/usercenter/aflcPointNetwork/v1/listCompanyPointByCompanyId/' + cid, data)
}
/**
 * 承运获取物流专线列表
 * @param {*} data 搜索参数
{
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "assessNumber": 0,
    "browseNumber": 0,
    "createTime": "2018-07-31T11:03:55.118Z",
    "creater": "string",
    "delFlag": "string",
    "departureHzData": 0,
    "departureHzTime": 0,
    "departureTime": "string",
    "departureTimeCode": "string",
    "endLocation": "string",
    "endLocationContacts": "string",
    "endLocationContactsMobile": "string",
    "endLocationCoordinate": "string",
    "id": "string",
    "lowerPrice": 0,
    "orderNumber": 0,
    "otherService": "string",
    "otherServiceCode": "string",
    "publishId": "string",
    "publishName": "string",
    "rangeLogo": "string",
    "rangeStatus": "string",
    "rangeType": "string",
    "rangeTypeName": "string",
    "startLocation": "string",
    "startLocationContacts": "string",
    "startLocationContactsMobile": "string",
    "startLocationCoordinate": "string",
    "transportAging": "string",
    "transportAgingUnit": "string",
    "transportRemark": "string",
    "updateTime": "2018-07-31T11:03:55.150Z",
    "updater": "string"
  }
}
 */
export function getCompany(data) {
  return fetch.post('/aflcusercenterservice/usercenter/aflcTransportRange/v1/getMemberAflcTransportRangeList', data)
}

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
export function getOrderList(data) {
  return fetch.post('/aflcorderservice/order/fclOrder/v1/findOderCarrierList', data).then(res => {
    return res.data || { list: [], total: 0 }
  })
}
/**
 * 获取订单各个状态下的数量
 */
export function getOrderListCount() {
  return fetch.post('/aflcorderservice/order/fclOrder/v1/getOrderStatusGroupCountList').then(res => {
    return res.data ? res.data[0] : {}
  })
}
