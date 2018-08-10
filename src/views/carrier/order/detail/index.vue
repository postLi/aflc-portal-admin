<template>
  <div class="manage-orderdetail page-main" v-loading="loading">
    <div class="tab-info-title">
      <h2><span>订单跟踪</span></h2>
    </div>
    <div class="rate-status-bar" v-if="!iscancel">
        <el-steps v-if="inited" :active="active" finish-status="success">
            <el-step v-for="(item, index) in flows" :key="index" :title="item.done ? item.donetext :item.text " :description="item.time"></el-step>
        </el-steps>
    </div>
    <div class="order-info-wrapper">
        <div class="rate_content rate_orderInfo">
            <h2>订单信息</h2>       
            <div class="orderInfo">
                <ul>
                    <li>订单号：{{orderForm.orderSerial}}</li>
                    <li>货品名称：{{orderForm.goodsName}}</li>
                    <li>货品预估总体积（方）：{{orderForm.goodsVolume}}</li>
                    <li>出发地：{{orderForm.consignorAddress}}</li>
                    <li>发货人：{{orderForm.consignor}}</li>
                    <li>收货人：{{orderForm.consignee}}</li>
                </ul>
                <ul>
                    <li>下单时间：{{orderForm.placeOrderTimne}} 
                        <el-popover
                        width="100%"
                        trigger="hover"
                        >
                        <p style="margin:5px;">提货时间：{{ orderForm.carrierTime | parseTime }}</p>
                        <p style="margin:5px;">发货时间：{{ orderForm.deliveryTime | parseTime }}</p>
                        <p style="margin:5px;">收货时间：{{ orderForm.receiveTime | parseTime }}</p>
                        <span slot="reference" class="reference" icon="el-icon-caret-bottom">更多<i icon="el-icon-caret-bottom"></i></span>
                        </el-popover>
                    </li>
                    <li>货品总数量（件）：{{orderForm.goodsNum}}</li>
                    <li>货物类型：{{orderForm.goodsTypeName}}</li>
                    <li>到达地：{{orderForm.consigneeAddress}}</li>
                    <li>发货人手机：{{orderForm.consignorPhone}}</li>
                    <li>收货人手机：{{orderForm.consigneePhone}}</li>
                </ul>
                <ul>
                    <li>物流公司：{{orderForm.wlName}}</li>
                    <li>货品预估总重量（公斤）：{{orderForm.goodsWeight}}</li>
                    <li>预估总费用（元）：{{orderForm.totalAmount}}</li>
                </ul>
            </div>
        </div>
        <div class="order-control-pannel">
            <div v-if="active === 1" class="order-step-1 order-control-info">
                <div class="status-txt" >
                    订单状态：货主已下单，等待物流公司承运。
                </div>
                <!-- <div class="next-step">
                    物流：预计2018月12月06 日送达湖北省武汉市江夏区
                </div> -->
                <div class="order-id">
                    订单号：{{ orderForm.orderSerial }}
                </div>
                <div class="order-button" v-if="iscarrier">
                    <el-button  type="primary" :size="btnsize"  plain @click="confirmCarrier(orderForm)">确定承运</el-button>
                    <el-button type="primary" :size="btnsize"  plain @click="cancelOrder(orderForm)">取消订单</el-button>
                </div>
            </div>
            <div v-if="active === 2" class="order-step-2 order-control-info">
                <div class="status-txt" v-if="!iscarrier">
                    订单状态：物流公司已接单，等待提货。
                </div>
                <div class="status-txt" v-if="iscarrier">
                    订单状态：货主已下单，等待物流公司尽快提货。
                </div>
                <!-- <div class="next-step">
                    物流：预计2018月12月06 日送达湖北省武汉市江夏区
                </div> -->
                <div class="order-id">
                    订单号：{{ orderForm.orderSerial }}
                </div>
                <div class="order-button" v-if="iscarrier">
                    <el-button type="primary" :size="btnsize"  plain @click="confirmPickUp(orderForm)">确认提货</el-button>
                </div>
            </div>
            <div v-if="active === 3" class="order-step-3 order-control-info">
                <div class="status-txt" v-if="!iscarrier">
                    订单状态：物流公司已提货，等待发货网点派车前往目的地。
                </div>
                <div class="status-txt" v-if="iscarrier">
                    订单状态：货物已提，等待发货前往目的地。
                </div>
                <!-- <div class="next-step">
                    物流：预计2018月12月06 日送达湖北省武汉市江夏区
                </div> -->
                <div class="order-id">
                    订单号：{{ orderForm.orderSerial }}
                </div>
                <div class="order-button" v-if="iscarrier">
                    <el-button type="primary" :size="btnsize"  plain @click="confirmDelivery(orderForm)">确认发货</el-button>
                </div>
            </div>
            <div v-if="active === 4" class="order-step-4 order-control-info">
                <div class="status-txt" v-if="!iscarrier">
                    订单状态：物流公司已经发货，等待签收网点进行确认收货！
                </div>
                <div class="status-txt" v-if="iscarrier">
                    订单状态：货主货物已经发出，等待收货！
                </div>
                <!-- <div class="next-step">
                    物流：预计2018月12月06 日送达湖北省武汉市江夏区
                </div> -->
                <div class="order-id">
                    订单号：{{ orderForm.orderSerial }}
                </div>
                <div class="order-button" v-if="iscarrier">
                    <el-button type="primary" :size="btnsize"  plain v-if="orderForm.complainWorkSerial && !orderForm.complainId" @click="replyComplain(orderForm)">投诉回复</el-button>
                    <el-button type="primary" :size="btnsize"  plain v-if="orderForm.complainWorkSerial && orderForm.complainId" @click="viewComplain(orderForm)">投诉详情</el-button>
                    <el-button type="primary" :size="btnsize"  plain @click="confirmEvaluate(orderForm)">确认收货</el-button>
                </div>
            </div>
            <div v-if="active === 6" class="order-step-5 order-control-info">
                <div class="status-txt"  v-if="!iscarrier">
                    订单状态：货物已到达签收！
                </div>
                <div class="status-txt" v-if="iscarrier">
                    订单状态：已评价！
                </div>
                <div class="next-step">
                    {{ orderForm.receiveTime }}货物已送达签收，感谢您使用安发平台，期待下次继续为您服务。
                </div>
                <div class="order-id">
                    订单号：{{ orderForm.orderSerial }}
                </div>
                <div class="order-button" v-if="iscarrier">
                    您可以 <el-button type="primary" :size="btnsize"  plain v-if="orderForm.complainWorkSerial && !orderForm.complainId" @click="replyComplain(orderForm)">投诉回复</el-button>
                    <el-button type="primary" :size="btnsize"  plain v-if="orderForm.complainWorkSerial && orderForm.complainId" @click="viewComplain(orderForm)">投诉详情</el-button>
                    <el-button type="primary" v-if="!orderForm.transportEvaluationId" :size="btnsize"  plain @click="addReview(orderForm)">评价</el-button>
                    <el-button type="primary" v-if="orderForm.transportEvaluationId || orderForm.shipperEvaluationId" :size="btnsize"  plain @click="viewReview(orderForm)">评价详情</el-button>
                </div>
            </div>
            <div v-if="active === 7" class="order-step-5 order-control-info">
                <div class="status-txt">
                    订单状态：订单已取消/物流公司取消订单
                </div>
                <div class="order-id">
                    订单号：{{ orderForm.orderSerial }}
                </div>
            </div>
        </div>
    </div>
    
  </div>
</template>
<script>
import '@/styles/identification.scss'
import { getDictionary, getDetailsByOrderSerial } from '@/api/common.js'
import { carrierSerial, consignorSerial, updateRate } from '@/api/carrier/rate.js'
import { parseTime } from '@/utils/index.js'
import * as ReqApi from '@/api/carrier/manage'

export default {
  components: {
  },
  data() {
    return {
        active: 1,
        inited: false,
      currentStatus: 0,
      flows: [{
        done: true,
        text: '下单',
        donetext: '下单',
        time: '',
        type: ''
      }, {
        done: false,
        text: '待承运',
        donetext: '物流公司已承运',
        time: '',
        type: ''
      }, {
        done: false,
        text: '待提货',
        donetext: '物流公司已提货',
        time: '',
        type: ''
      }, {
        done: false,
        text: '待发货',
        donetext: '物流公司已发货',
        time: '',
        type: ''
      }, {
        done: false,
        text: '待收货',
        donetext: '货主已收货',
        time: '',
        type: ''
      }, {
        done: false,
        text: '订单结束',
        donetext: '订单结束',
        time: '',
        type: ''
      }],
      textsArr: ['1分  非常不满', '2分  不满意', '3分  一般', '4分  满意', '5分  非常满意'],
      retalength: 200, // 回复字数
      replyDes: '',
      UserInfo: {},
      loading: true,
            // 货主对我的评价
      carrierSerial: {

      },
            // 我对货主的评价
      consignorSerial: {

      },
      orderForm: {},
      optionsReason: [],
      iscancel: false,
      iscarrier: false,
      isOwner: false
    }
  },
  mounted() {
    this.firstblood()
    // 判断是否为承运商进来查看
    this.iscarrier = this.$route.query.type === 'carrier'
    this.isOwner = !this.iscarrier
  },
  methods: {
    init() {
        let active = 0
        // 格式化数据
      switch (this.orderForm.orderStatus) {
        case 'AF03708':
          this.iscancel = true
          active = 7
          break
        case 'AF03707':
          this.flows[5].done = true
          this.flows[5].time = ''
          this.flows[4].done = true
          this.flows[4].time = this.orderForm.receiveTime
          active = 6
        case 'AF03705':
          this.flows[3].done = true
          this.flows[3].time = this.orderForm.deliveryTime
          active = active || 4
        case 'AF03704':
           this.flows[2].done = true
          this.flows[2].time = this.orderForm.pickUpGoodsTime
          active = active || 3
        case 'AF03703':
          this.flows[1].done = true
          this.flows[1].time = this.orderForm.carrierTime
          active = active || 2
        case 'AF03702':
          this.flows[0].done = true
          this.flows[0].time = this.orderForm.createTime
          active = active || 1
        case 'AF03701':
          
          active = active || 0

      }
        // 加载相应的版块
        this.active = active
        this.inited = true
    },
    getValue(val) {
      console.log(val)
    },
    textsArray() {

    },
    firstblood() {
      this.id = this.$route.query.id
      ReqApi.getOrderInfo(this.id).then(data => {
        this.orderForm = data
        this.init()
        this.loading = false
      })
    },
    submitForm() {
      const rata = Object.assign({}, { id: this.carrierSerial.id, replyDes: this.replyDes, replyId: this.UserInfo.id, replyName: this.UserInfo.contactsName })
      updateRate(rata).then(res => {
        this.firstblood()
      })
    },
    confirmCarrier(row) {
      this.$confirm('确定要承运吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ReqApi.putConfirmCarrier(row.orderSerial).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.fetchData()
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    cancelOrder(row) {
      this.$confirm('确定要取消订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ReqApi.putCancelOrder(row.orderSerial).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.fetchData()
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    confirmPickUp(row) {
      this.$confirm('确定要提货吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ReqApi.putConfirmPickUp(row.orderSerial).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.fetchData()
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    confirmDelivery(row) {
      this.$confirm('确定要发货吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ReqApi.putConfirmDelivery(row.orderSerial).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.fetchData()
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    confirmEvaluate(row) {
      this.$confirm('确定收货吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ReqApi.putConfirmEvaluate(row.orderSerial).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.fetchData()
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    addComplain(row) {
      // 添加投诉
      // /complaintsInfo/index?orderSerial=24c0f4218e1d4bf099d185b3c6964441
      this.$router.push({
        path: '/complaintsInfo/index',
        query: {
          orderSerial: row.orderSerial

        }
      })
    },
    addReview(row) {
      // shipperEvaluationId 货主评价id 物流公司拿
      // transportEvaluationId 物流公司评价id 货主拿
      // complainId 为空回复投诉 不为空查看详情
      // complainWorkSerial 有没有投诉
      // 添加评价
      this.orderSerial = row.orderSerial
      this.transportRangeId = row.wlId
      this.shipperId = row.shipperId
      if(this.isOwner){
        this.dialogVisible = true
      } else{
        this.dialogVisible2 = true
      }
    },
    viewReview(row) {
      // 查看评价
      this.$router.push('/order/rateInfo?orderSerial=' + row.orderSerial + (!this.isOwner ? '&type=carrier' : ''))
    },
    viewComplain(row) {
      // 查看投诉
      this.$router.push('/complaintsInfo/index?orderSerial=' + row.orderSerial + (!this.isOwner ? '&type=carrier' : ''))
    },
    replyComplain(row) {
      // 回复投诉
      this.$router.push('/complaintsInfo/index?orderSerial=' + row.orderSerial + (!this.isOwner ? '&type=carrier' : ''))
    },
    // 再次下单
    oneMoreTime() {
      this.$router.push('/order/create')
    }
  }
}
</script>
<style type="text/css" lang="scss">
.manage-orderdetail{
    .rate-status-bar{
        padding: 20px 40px;
        margin: 20px 0;
        background: #fff;
    }
    .step0 .status-line{
        display: none;
    }
  .status-flow{
      display: flex;

      li{
          flex: 1;
          text-align: center;
      }
  }
  .rate_content{
      padding-bottom: 30px;
      background: #fff;
      margin-bottom: 40px;
      h2{
          text-align: center;
          font-size: 16px;
          color: #333333;
          line-height: 22px;
          padding: 21px 0;
      }
      
  }
  
  .rate_info{
      width:47%;
      min-height: 430px;
      h2{
          border-bottom: 2px solid #ccc;
          text-align: left;
          text-indent: 67px;
      }
      .rate_info_content{
          padding: 16px 67px;
          .rate_info_order{
              box-sizing: border-box;
              h4{
                  font-size: 16px;
                  line-height: 20px;
                  margin-bottom: 10px;
              }
              .rateStar{
                  font-size: 14px;
                  color: #666666;
                  padding-left: 20px;
                  p{
                      margin:10px 0;
                      .des{
                          display: inline-block;
                          margin-left: 10px;
                          color: #ed001d;
                      }
                  }
                  .el-rate{
                      display: inline-block;
                      .el-rate__text{
                          margin-left: 10px;
                          color: #ed001d !important;
                      }
                  }
                  p:last-child{
                      margin-top: 20px;
                      font-weight: bold;
                      span{
                          font-weight: normal;
                      }
                  }
              }
              .rateReply{
                  margin-top: 20px;
                  .rateReply_info{
                      padding-left: 20px;
                      p{
                          font-size: 14px;
                          line-height: 20px;
                          color: #333333;
                          span{
                              display: inline-block;
                              margin-top: 10px;
                              font-size: 12px;
                              color: #999999;
                          }
                      }

                      .rateReply_input{
                          position: relative;
                          .el-textarea__inner{
                              padding-bottom: 18px;
                              font-size: 12px;
                          }
                          p{
                              font-size: 12px;
                              color: #999999;
                              position: absolute;
                              right: 15px;
                              bottom: 2px;
                              span{
                                  color: #ed001d;
                              }
                          }
                      }
                      .el-button{
                          display: block;
                          margin: 0 auto;
                          margin-top: 40px;
                      }
                  }
              }
          }
      }
  }
  .order-info-wrapper{
      background: #fff;
      display: flex;
      .rate_content{
          flex: 7;
      }
      .order-control-pannel{
          flex: 4;
      }
  }
  .rate_orderInfo{
            h2{
                border-bottom: 1px solid #ccc;
                text-align: left;
                text-indent: 67px;
            }
            .orderInfo{
                display: flex;
                justify-content:space-between;
                padding: 20px 50px 60px;
                ul{
                    li{
                        font-size: 14px;
                        line-height: 20px;
                        color: #333333;
                        margin-bottom: 10px;
                        .reference{
                            margin-left: 22px;
                            color:#0e91e9;
                            i{
                                margin-left: 3px;
                                display: inline-block;
                                width: 9px;
                                height: 9px;
                                background: url('../../../../assets/png/arrar.png') no-repeat center;
                            }
                        }
                    }
                }
            }
      }
}
</style>
