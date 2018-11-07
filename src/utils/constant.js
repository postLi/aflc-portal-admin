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
// otherinfo.companyFacadeFile
export const UPLOAD_CAR_IMAGES = [
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/z4e2jp26KzZG8yEm8wNBpEr6MzEPc4XF.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/8aPkmhaCkxw6n6JQyMxDnM4FjrdJwE2J.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/bFKANtFQRRaM7nKp4r5YBCcdkJKH8abD.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/nwkWpJwxarZjahKpKPrQDDFEpeHmhKKB.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/HDzBBKeiTA5TY7miDnikHRyHc2J7E3EX.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/mwSbawR4MWpdY8Kaw8FMSBBDaDDjAwTC.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/HN6eHaBtAmnBXKQd4ffKaGY6fDckdc24.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/wiiPEPtW76RWaketBn7X3NdYJ8yt2QXs.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/WkhQbGnCXRW5B4BdmcYskEkRCh5hhtzi.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/BbMXHF36iZcAinfFRNmmfDTaz853sty3.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/nBWwx4pAf3FsAJhpz4Ycp4YWyeRz5QCS.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/swBAfjQ4fJsaS6j4KrrCZAMHm58mSCTF.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/b4a5ywnzindfNdRrmzrfPxCNG6fTsih6.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/ti37JRNCYTaGQYkd3M7GZazankN6xG3B.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/2iemNaQAX3bmXHYyHwMakGdXGBScxjFe.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/mZS8WXYwhCQy3Gz4iiDpNKafJ2hPFyda.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/bzGX6pSrr8yXbykrXmBQDTBRYH6Aeik2.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/73y2hZYwaK64dWETiRM3tFsn3a7WCpRY.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/WfCTfPbnbHne2dbmSdP5PdxNA7WaaWkn.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/efy6FeFpPQBPEtJ35HCNz5K7QaXpSJWy.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/jjHdkD765CECei7f6Ck8c8MK45HYCTdr.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/YRPpHXTYsYWQ5n7Dtj4ebpttRjnJtF3i.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/bexisFmWQwBCKj8Eth8AhBSj68AiDbaw.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/iWZhQZTpt8He5Hy8sZjdMbdbHcmsFnai.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/Fe4XsikS6FiJHdjBszpxSzPj3ibrYjH3.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/AACTT2zz7ffyNeFtYamH6DEZbQbeB2Nj.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/k78aR5KYZH43ckbsNwpHsAFY4bnaZxkx.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/pxK8KZikX5SpfcmCMGMzehmCzYnYbAbX.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/QYp6mhjJpejWj7dPcc7RP5dMMyH8r4nC.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/7pxanZsWs2tCdrT7KAE5sGMrGPMFkziX.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/n5NPKXseeZCWSTrk5DtE56Xbs6dwpGNz.jpg',
  'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/20181106/7YRt3K7s3zCTdkiNPtZGi8MTicsFKawn.jpg'
]
/**
 * 库存类型 repertoryType
 */
export const REPERTORY_TYPE = {
  1: '发货库存',
  2: '到货库存'
}

let the56url = 'http://www.56lines.cn'
/* if (process.env.NODE_ENV === 'development') {
  the56url = 'http://192.168.1.170'
} else if (process.env.NODE_ENV === 'test') {
  the56url = 'http://192.168.1.157:89'
} */
// 调整为根据当前链接去判断，不根据打包参数变化
if (window.location.host.indexOf('192.168.1.157') !== -1) {
  the56url = 'http://192.168.1.157:89'
} else if (window.location.host.indexOf('192.168.1') !== -1) {
  the56url = 'http://192.168.1.188:8342'
}

export const INDEXURL = the56url
