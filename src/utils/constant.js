/**
 * 常量
 */

// 运单状态 shipStatus
export const SHIP_STATUS = {
  1: '已入库',
  2: '短驳中',
  3: '已装车',
  4: '已发出',
  5: '已到车',
  6: '已到货',
  7: '已中转',
  8: '送货中',
  9: '已签收'
}

/**
 * 短驳 批次状态
 */
export const SHORT_STATE = {
  1: '短驳中',
  2: '已到车',
  3: '已到货',
  4: '已入库',
  5: '全部',
  6: '已装车'
}
/**
 * 库存类型 repertoryType
 */
export const REPERTORY_TYPE = {
  1: '发货库存',
  2: '到货库存'
}
let the56url = 'http://www.56lines.cn'
if (process.env.NODE_ENV === 'development') {
  the56url = 'http://192.168.1.170'
} else if (process.env.NODE_ENV === 'test') {
  the56url = 'http://192.168.1.157:89'
}

export const INDEXURL = the56url
