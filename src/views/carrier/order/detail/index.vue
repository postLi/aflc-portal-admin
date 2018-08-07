<template>
  <div class="manage-orderdetail page-main" v-loading="loading">
    <div class="tab-info-title">
      <h2><span>订单跟踪</span></h2>
    </div>
    <div class="rate-status-bar" v-if="!iscancel">
        <ul class="status-flow">
            <li v-for="(item, index) in flows" :key="index" :class="['step'+index,{'active':currentStatus === index}]">
                <span class="status-line"></span>
                <span class="status-info">
                    <span class="status-txt">{{ item.done ? item.donetext :item.text }}</span>
                    <span class="status-circle">{{ index+1 }}</span>
                    <span class="status-time">{{ item.time }}</span>
                </span>
            </li>
            <!-- <li class="step1 active">
                <span class="status-txt">下单</span>
                <span class="status-time"></span>
            </li> -->

        </ul>
    </div>
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
      currentStatus: 0,
      flows: [{
        done: true,
        text: '下单',
        donetext: '下单',
        time: '2018-12-04 13:24:21',
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
        text: '待评价',
        donetext: '货主已评价',
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
      iscancel: false
    }
  },
  mounted() {
    this.firstblood()
  },
  methods: {
    init() {
        // 格式化数据
      switch (this.orderForm.orderStatus) {
        case 'AF03708':
          this.iscancel = true
        case 'AF03707':


      }
        // 加载相应的版块
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
  .rate_orderInfo{
            h2{
                border-bottom: 1px solid #ccc;
                text-align: left;
                text-indent: 67px;
            }
            .orderInfo{
                display: flex;
                justify-content:space-between;
                padding: 20px 234px 60px;
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
