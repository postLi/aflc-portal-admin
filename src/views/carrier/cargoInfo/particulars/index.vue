<template>

  <el-container  class="check_box">
    <el-header>
      <el-button @click="reback" class="reback">返回</el-button>
    </el-header>
    <el-main>
      <ul class="check_head" v-for="(item,index) in usersArr" :key="index">
        <li class="check_title">
          <div class="baoxian1"><h4>中国平安全国运输保险{item.insuranceName}</h4><span class="baoxiandan">保险单</span></div>
          <div class="baoxian2">投保日期：<span>2018-11-14 15:23:45</span></div>
        </li>
        <li>
          <div class="baoxiandanhao">
            <div>投保单号：afd45623465555555534</div>
            <div>投保金额:<span>100元</span></div>
            <div><span>已支付</span></div>
            <div>支付时间：<span>2018-11-14 15:23:45</span></div>
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
                {{scope.row.policyHolderType === 0 ? '个人' : '公司'}}
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
                {{scope.row.theInsuredType === 0 ? '个人' : '公司'}}
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
            <el-table-column prop="" label="起运地">
              <template slot-scope="scope">
                {{scope.row.startProvince ? scope.row.startProvince : ''}}{{ scope.row.startCity ? scope.row.startCity : ''}}
              </template>
            </el-table-column>
            <el-table-column prop="insuranceCompany" label="目的地">
              <template slot-scope="scope">
                {{scope.row.endProvince ? scope.row.endProvince : ''}}{{ scope.row.endCity ? scope.row.endCity : ''}}
              </template>
            </el-table-column>
            <el-table-column prop="insuranceCompany" label="中转地">
              <template slot-scope="scope">
                {{scope.row.transferProvince ? scope.row.transferProvince : ''}}{{ scope.row.transferCity ? scope.row.transferCity : ''}}
              </template>
            </el-table-column>
            
          </el-table>
          <el-table
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
            
          </el-table>
          
        </div>
      </ul>
    </el-main>
    
    <!-- {{info}} -->
  </el-container>
</template>
<script>
 import { getCheckinsure } from '@/api/carrier/insure.js'
export default {
  computed: {
    isShow: {
      get() {
        return this.centerDialogVisible
      },
      set() {}
    }
  },
  components: {
   
  },
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    info: {
      handler (cval, oval) {
        console.log(666,cval,this.info)
      }
    }
  },
  data(){
    return{
    usersArr: [],
    usersArr1: [],
      // tableKey: 0,
    }
  },
  mounted() {
    // this.usersArr = [this.info]
    console.log(this.usersArr)
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
      // this.loading = false
      // this.formAllData.recommendPrescription = this.options4[0].value

      getCheckinsure(this.info.id).then(res => {
        // this.dataTotal = res.data.total
        // this.dataset = res.data.list
        this.usersArr = [res.data]
        this.userArr1 = Object.assign({},res.data)
        console.log(res)
      }).catch(err => {
        this.$message.warning(err.text || err.errorInfo || '无法获取服务端数据~')
        this.loading = true
      })
    },
  },
}
</script>

<style lang="scss">
.check_box{
  background:#fff;
  .reback{
    margin-top: 20px;
  }
  .check_head{
    border:1px solid #ddd;
    float:left;
    padding:25px;
    width: 100%;
    .check_title{
      background:rgb(253, 253, 249);
    }
    li{
      border:1px solid #ddd;
      float:left;
      height: 40px;
      line-height: 40px;
      width:100%;
      padding: 0 20px;
      .baoxian1{
        float:left;
        h4,span{
          float:left;
        }
        .baoxiandan{
          margin-left:20px;
          font-size: 14px;
        }
      }
      .baoxian2{
        float:right;
        text-align: right;
      }
      .baoxiandanhao{
        font-size:14px;
        div{
          float:left;
           margin-right:30px;
          span{
           
          }
        }
      }
    }
    li:nth-child(1){
      border-bottom:0px;
    }
  }
  .check_form{
    float:left;
    padding:25px;
    width: 100%;
    .info_tab{
      h4{
        height: 41px;
        line-height: 40px;
        padding-left: 25px;
        border-bottom: 1px solid #4a4a9d;
        margin-bottom: 15px;
      }
    }
  }
}
  
</style>
