<template>

  <el-container class="check_box">
    <el-header>
      <el-button @click="reback" class="reback">返回</el-button>
    </el-header>
    <el-main>
      <ul class="check_head">
        <li class="check_title">
          <div class="baoxian1"><span style="font-weight: 600;font-size: 16px">{{usersArr1.insuranceName}}</span><span
            class="baoxiandan">{{usersArr1.insuranceType}}</span></div>
          <div class="baoxian2">投保日期：<span>{{usersArr1.createTime}}</span></div>
        </li>
        <li>
          <div class="baoxiandanhao">
            <div>投保单号：{{usersArr1.insuranceNum}}</div>
            <div>投保金额：<span class="money">{{usersArr1.insuranceFee ? usersArr1.insuranceFee + '元' : ''}}</span></div>
            <div><span class="payment"
                       style="padding-right:20px">{{usersArr1.paymentState === 0 ? '未支付' : '已支付'}}</span>
              <el-button type="primary" @click="gotoPayment" size="small">前往支付</el-button>
            </div>
            <div><span>{{usersArr1.paymentTime ? '支付时间：' + usersArr1.paymentTime : ''}}</span></div>

          </div>
        </li>
      </ul>
      <ul class="check_form">
        <div class="info_tab">
          <h4>保险信息</h4>
          <el-table
            ref="multipleTable"
            :data="usersArr"
            stripe
            border
            @row-click="clickDetails"
            @selection-change="getSelection"
            tooltip-effect="dark"
            style="width: 100%;">
            <el-table-column prop="insuranceName" label="保险名称"></el-table-column>
            <el-table-column prop="insuranceType" label="险种"></el-table-column>
          </el-table>
        </div>
        <div class="info_tab">
          <h4>投保人信息</h4>
          <el-table
            ref="multipleTable"
            :data="usersArr"
            stripe
            border
            @row-click="clickDetails"
            @selection-change="getSelection"
            tooltip-effect="dark"
            style="width: 100%;">
            <el-table-column prop="policyHolderType" label="类型">
              <template slot-scope="scope">
                {{scope.row.policyHolderType === 0 ? '个人' : '团体'}}
              </template>
            </el-table-column>
            <el-table-column prop="policyHolderName" label="投保人"></el-table-column>
            <el-table-column prop="policyHolderNum" label="证件号"></el-table-column>
          </el-table>
        </div>
        <div class="info_tab">
          <h4>被保人信息</h4>
          <el-table
            ref="multipleTable"
            :data="usersArr"
            stripe
            border
            @row-click="clickDetails"
            @selection-change="getSelection"
            tooltip-effect="dark"
            style="width: 100%;">
            <el-table-column prop="theInsuredType" label="类型">
              <template slot-scope="scope">
                {{scope.row.theInsuredType === 0 ? '个人' : '团体'}}
              </template>
            </el-table-column>
            <el-table-column prop="theInsuredName" label="被保人"></el-table-column>
            <el-table-column prop="theInsuredNum" label="证件号"></el-table-column>
          </el-table>
        </div>
        <div class="info_tab">
          <h4>货物信息</h4>
          <el-table
            ref="multipleTable"
            :data="usersArr"
            stripe
            border
            @row-click="clickDetails"
            @selection-change="getSelection"
            tooltip-effect="dark"
            style="width: 100%;">
            <el-table-column prop="goodsType" label="货物类型"></el-table-column>
            <el-table-column prop="goodsName" label="货物名称"></el-table-column>
            <el-table-column prop="goodsPack" label="货物包装"></el-table-column>
            <el-table-column prop="goodsNumber" label="货物数量"></el-table-column>
            <el-table-column prop="goodsValue" label="货物价值"></el-table-column>
          </el-table>
        </div>
        <div class="info_tab">
          <h4>运输信息</h4>
          <el-table
            ref="multipleTable"
            :data="usersArr"
            stripe
            border
            @row-click="clickDetails"
            @selection-change="getSelection"
            tooltip-effect="dark"
            style="width: 100%;">
            <el-table-column prop="orderNum" label="运单号"></el-table-column>

            <el-table-column prop="carNum" label="车牌号"></el-table-column>
            <el-table-column prop="" label="起运地">
              <template slot-scope="scope">
                {{scope.row.startProvince ? scope.row.startProvince : ''}}{{ scope.row.startCity ? scope.row.startCity :
                ''}}
              </template>
            </el-table-column>
            <el-table-column prop="" label="目的地">
              <template slot-scope="scope">
                {{scope.row.endProvince ? scope.row.endProvince : ''}}{{ scope.row.endCity ? scope.row.endCity : ''}}
              </template>
            </el-table-column>
<<<<<<< HEAD
            <el-table-column prop="transferCitys" label="中转地">
              <!-- <template slot-scope="scope">
                {{scope.row.transferProvince ? scope.row.transferProvince : ''}}{{ scope.row.transferCity ? scope.row.transferCity : ''}}
              </template> -->
=======
            <el-table-column prop="" label="中转地">
              <template slot-scope="scope">
                {{scope.row.transferProvince ? scope.row.transferProvince : ''}}{{ scope.row.transferCity ?
                scope.row.transferCity : ''}}
              </template>
>>>>>>> 613f22a7b0daf76aab9d8261340fca8fc5c88a3c
            </el-table-column>
            <el-table-column prop="startTime" label="起运日期"></el-table-column>

          </el-table>
          <!-- <el-table
            ref="multipleTable"
            :data="usersArr"
            stripe
            border
            @row-click="clickDetails"
            @selection-change="getSelection"
            tooltip-effect="dark"
            style="width: 100%;">
            <el-table-column prop="startTime" label="起运日期"></el-table-column>
            <el-table-column prop="carNum" label="车牌号"></el-table-column>
            <el-table-column prop="orderNum" label="运单号"></el-table-column>
          </el-table> -->
        </div>
      </ul>
    </el-main>
  </el-container>
</template>
<script>
  import {getCheckinsure} from '@/api/carrier/insure.js'

  export default {
    computed: {
      isShow: {
        get() {
          return this.centerDialogVisible
        },
        set() {
        }
      }
    },
    components: {},
    props: {
      centerDialogVisible: {
        type: Boolean,
        default: false
      },
      info: {
        type: Object,
        default: () => {
        }
      }
    },
    watch: {
      info: {
        handler(cval, oval) {
          console.log(666, cval, this.info)
        }
      }
    },
    data() {
      return {
        usersArr: [],
        usersArr1: {}
        // tableKey: 0,
      }
    },
    mounted() {
      // console.log(this.info)
      this.firstblood()
    },
    methods: {
      reback() {
        this.$emit('reback')
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getSelection(selection) {
        this.selected = selection
      },
      // 请求接口刷新页面
      firstblood() {
        getCheckinsure(this.info.id).then(res => {
          this.usersArr = [res]
          this.usersArr1 = res
        }).catch(err => {
          this.$message.warning(err.text || err.errorInfo || '无法获取服务端数据~')
          this.loading = true
        })
      },
      gotoPayment() {
        let isApi = 'http://192.168.1.157:89'
        if (window.location.host.indexOf('192.168.1') !== -1) {
          isApi = 'http://192.168.1.157:89'
        }
        else {
          isApi = 'http://www.28china.cn'
        }
        window.location.href = isApi + '/Insurance/pay.htm?id=' + this.usersArr1.id
      }
    }
  }
</script>

<style lang="scss">
  .check_box {
    background: #fff;
    .reback {
      margin-top: 20px;
    }
    .check_head {
      border: 1px solid #ddd;
      float: left;
      padding: 25px;
      width: 100%;
      .check_title {
        background: rgb(253, 253, 249);
      }
      li {
        border: 1px solid #ddd;
        float: left;
        height: 40px;
        line-height: 40px;
        width: 100%;
        padding: 0 20px;
        .baoxian1 {
          float: left;
          h4, span {
            float: left;
          }
          .baoxiandan {
            margin-left: 20px;
            font-size: 14px;
          }
        }
        .baoxian2 {
          float: right;
          text-align: right;
        }
        .baoxiandanhao {
          font-size: 14px;
          div {
            float: left;
            margin-right: 30px;
            span {

            }
          }
        }
      }
      li:nth-child(1) {
        border-bottom: 0px;
      }
    }
    .check_form {
      float: left;
      padding: 25px 25px 0 25px;
      width: 100%;
      .info_tab {
        h4 {
          height: 41px;
          line-height: 40px;
          padding-left: 25px;
          border-bottom: 1px solid #4a4a9d;
          margin-bottom: 15px;
        }
      }
    }
    .money {
      color: red;
      font-size: 16px;
      margin: 0 5px;
    }
    .payment {
      color: #0e91e9;
      font-weight: bold;
    }
  }

</style>
