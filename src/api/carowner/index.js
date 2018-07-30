import fetch from '@/utils/fetch'

const baseUrl = 'aflcusercenterservice'

/**
 * 查询car信息
 * @param {*} id car id
 */
export function getCarInfo(id) {
  return fetch.get('/aflcusercenterservice/usercenter/aflcCarInfo/v1/getDetails/' + id)
}
/**
 * 新增车源信息
 * @param {*} data 车源信息
{
  "beginTime": "2018-07-16T11:51:14.433Z",
  "belongDriver": "string",
  "browseNumber": 0,
  "carFile": "string",
  "carHeight": 0,
  "carLength": 0,
  "carLoad": 0,
  "carNum": "string",
  "carSourceType": "string",
  "carSpec": "string",
  "carTag": "string",
  "carType": "string",
  "carVolume": 0,
  "carWidth": 0,
  "createTime": "2018-07-16T11:51:14.434Z",
  "creater": "string",
  "driverId": "string",
  "endAddress": "string",
  "endAddressCoordinate": "string",
  "endAddressName": "string",
  "endTime": "2018-07-16T11:51:14.434Z",
  "expectPrice": 0,
  "id": "string",
  "isLongCar": "string",
  "phone": "string",
  "remark": "string",
  "startTime": "2018-07-16T11:51:14.434Z",
  "strartAddress": "string",
  "strartAddressCoordinate": "string",
  "strartAddressName": "string",
  "title": "string",
  "updateTime": "2018-07-16T11:51:14.434Z",
  "updater": "string",
  "usualPlace": "string",
  "viaAddress": "string",
  "viaAddressCoordinate": "string",
  "viaAddressName": "string"
}
 */
export function postCarInfo(data) {
  return fetch.post('/aflcusercenterservice/usercenter/aflcCarInfo/v1/add', data)
}
/**
 * 删除car
 * @param {*} id car id
 */
export function deleteCarInfo(id) {
  return fetch.delete('/aflcusercenterservice/usercenter/aflcCarInfo/v1/delete/' + id)
}
/**
 * 根据条件获取车源信息列表
 * @param {*} data 搜索参数
{
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "beginTime": "2018-07-16T12:19:36.337Z",
    "belongDriver": "string",
    "browseNumber": 0,
    "carFile": "string",
    "carHeight": 0,
    "carLength": 0,
    "carLoad": 0,
    "carNum": "string",
    "carSourceType": "string",
    "carSpec": "string",
    "carTag": "string",
    "carType": "string",
    "carVolume": 0,
    "carWidth": 0,
    "createTime": "2018-07-16T12:19:36.337Z",
    "creater": "string",
    "driverId": "string",
    "endAddress": "string",
    "endAddressCoordinate": "string",
    "endAddressName": "string",
    "endTime": "2018-07-16T12:19:36.337Z",
    "expectPrice": 0,
    "id": "string",
    "isLongCar": "string",
    "phone": "string",
    "remark": "string",
    "startTime": "2018-07-16T12:19:36.337Z",
    "strartAddress": "string",
    "strartAddressCoordinate": "string",
    "strartAddressName": "string",
    "title": "string",
    "updateTime": "2018-07-16T12:19:36.337Z",
    "updater": "string",
    "usualPlace": "string",
    "viaAddress": "string",
    "viaAddressCoordinate": "string",
    "viaAddressName": "string"
  }
}
 */
export function getCarList(data) {
  return fetch.post('/aflcusercenterservice/usercenter/aflcCarInfo/v1/list', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 根据id修改车源信息
 * @param {*} data 修改数据
{
  "beginTime": "2018-07-16T12:20:54.746Z",
  "belongDriver": "string",
  "browseNumber": 0,
  "carFile": "string",
  "carHeight": 0,
  "carLength": 0,
  "carLoad": 0,
  "carNum": "string",
  "carSourceType": "string",
  "carSpec": "string",
  "carTag": "string",
  "carType": "string",
  "carVolume": 0,
  "carWidth": 0,
  "createTime": "2018-07-16T12:20:54.746Z",
  "creater": "string",
  "driverId": "string",
  "endAddress": "string",
  "endAddressCoordinate": "string",
  "endAddressName": "string",
  "endTime": "2018-07-16T12:20:54.746Z",
  "expectPrice": 0,
  "id": "string",
  "isLongCar": "string",
  "phone": "string",
  "remark": "string",
  "startTime": "2018-07-16T12:20:54.746Z",
  "strartAddress": "string",
  "strartAddressCoordinate": "string",
  "strartAddressName": "string",
  "title": "string",
  "updateTime": "2018-07-16T12:20:54.746Z",
  "updater": "string",
  "usualPlace": "string",
  "viaAddress": "string",
  "viaAddressCoordinate": "string",
  "viaAddressName": "string"
}
 */
export function putChangeCarInfo(data) {
  return fetch.put('/aflcusercenterservice/usercenter/aflcCarInfo/v1/update', data)
}
/**
 * 设置启用路线
 * @param {*} id car id
 * @param {*} type 启用标志，0为禁用，1为启用
 */
export function putEnableType(id, type) {
  return fetch.put('/aflcusercenterservice/usercenter/aflcCarInfo/v1/setEnableType/' + id + '/' + type)
}
/**
 * 设置常用路线
 * @param {*} id car id
 * @param {*} type 启用标志，0为取消长跑，1为设置长跑
 */
export function putSetRouteType(id, type) {
  return fetch.put('/aflcusercenterservice/usercenter/aflcCarInfo/v1/setRouteType/' + id + '/' + type)
}

// 认证车主
export function identifyOwner(data) {
  return fetch.axios({
    url: '/aflcusercenterservice/usercenter/aflcDriver/v1/authAflcDriver',
    method: 'post',
    data: data
  })
}
