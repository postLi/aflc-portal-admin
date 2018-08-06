<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :isall="isall"  @change="getSearchParam" :btnsize="btnsize" />  
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')">创建订单</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          @row-click="clickDetails"
          @selection-change="getSelection"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            fixed
            
            prop="customerId"
            label="序号"
            width="80">
            <template slot-scope="scope">
              {{ (searchQuery.currentPage - 1)*searchQuery.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            fixed
            
            prop="orderSerial"
            label="订单号"
            width="130">
          </el-table-column>
          <el-table-column
            prop="orderStatusName"
            
            label="订单状态"
            width="110">
          </el-table-column>
          <el-table-column
            prop="wlName"
            
            label="物流公司"
            width="130">
          </el-table-column>
          <el-table-column
            prop="goodsName"
            
            label="商品名称"
            width="90">
          </el-table-column>
          <el-table-column
            
            prop="goodsNum"
            label="货品总数量（件）"
            width="110">
          </el-table-column>
          <el-table-column
            label="预估总重量（公斤）"
            prop="goodsWeight"
            
            width="90"
            >
          </el-table-column>
          <el-table-column
            prop="goodsVolume"
            label="预计总体积（方）"
            
            width="80"
            >
          </el-table-column>
          <el-table-column
            
            prop="goodsTypeName"
            label="货物类型"
            width="80">
          </el-table-column>
          <el-table-column
            prop="totalAmount"
            label="预估总运费（元）"
            
            width="80"
            >
          </el-table-column>
          <el-table-column
            prop="consignorAddress"
            label="出发地"
            
            width="80"
            >
          </el-table-column>
          <el-table-column
            prop="consigneeAddress"
            label="到达地"
            
            width="110"
            >
          </el-table-column>
          <el-table-column
            prop="consignor"
            label="发货人"
            
            width="80"
            >
          </el-table-column>
          <el-table-column
            prop="consignorPhone"
            label="发货人手机"
            
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="consignee"
            label="收货人"
            
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="consigneePhone"
            label="收货人手机"
            
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="下单时间"
            
            width="100"
          >
          </el-table-column>
          <el-table-column
            v-if="this.listtype!=='AF03702'"
            label="承运时间"
            
            width="120"
          >
          <template slot-scope="scope">
            {{ scope.row.carrierTime | parseTime }}
          </template>
          </el-table-column>
          <el-table-column
            label="提货时间"
            
            width="110"
          >
          <template slot-scope="scope">
            {{ scope.row.pickUpGoodsTime | parseTime }}
          </template>
          </el-table-column>
          <el-table-column
            label="发货时间"
            
            width="100"
          >
          <template slot-scope="scope">
            {{ scope.row.deliveryTime | parseTime }}
          </template>
          </el-table-column>
          <el-table-column
            label="收货时间"
            
            width="110"
          >
          <template slot-scope="scope">
            {{ scope.row.receiveTime | parseTime }}
          </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="110"
          >
          <template slot-scope="scope">
            <el-button type="primary" :size="btnsize"  plain @click="viewDetail(scope.row)">查看</el-button>
            <!-- 待承运 -->
            <div v-if="scope.row.orderStatus === 'AF03702'">
              <el-button  type="primary" v-if="isCarrier" :size="btnsize"  plain @click="confirmCarrier(scope.row)">确定承运</el-button>
              <el-button type="primary" :size="btnsize"  plain @click="cancelOrder(scope.row)">取消订单</el-button>
            </div>
            
            <!-- 待提货 -->
            <div v-if="scope.row.orderStatus === 'AF03703'">
              
              <el-button type="primary" v-if="isCarrier" :size="btnsize"  plain @click="confirmPickUp(scope.row)">确认提货</el-button>
            </div>
            <!-- 待发货 -->
            <div v-if="scope.row.orderStatus === 'AF03704'">
              <el-button type="primary" :size="btnsize"  plain @click="confirmDelivery(scope.row)">确认发货</el-button>
            </div>
            <!-- 待收货 -->
            <div v-if="scope.row.orderStatus === 'AF03705'">
              <el-button type="primary" :size="btnsize"  plain v-if="scope.row.complainWorkSerial" @click="replyComplain(scope.row)">投诉回复</el-button>
              <el-button type="primary" :size="btnsize"  v-if="!scope.row.complainWorkSerial" plain @click="addComplain(scope.row)">我要投诉</el-button>
              <el-button type="primary" :size="btnsize"  plain @click="confirmEvaluate(scope.row)">确认收货</el-button>

            </div>
            <!-- 待评价 -->
            <el-button type="primary" :size="btnsize"  v-if="!scope.row.complainWorkSerial" plain @click="addComplain(scope.row)">我要投诉</el-button>
            <div v-if="scope.row.orderStatus === 'AF03706'">
             <el-button type="primary" :size="btnsize"  plain v-if="scope.row.complainWorkSerial" @click="replyComplain(scope.row)">投诉回复</el-button>
              <el-button type="primary" :size="btnsize"  v-if="!scope.row.complainWorkSerial" plain @click="addComplain(scope.row)">我要投诉</el-button>
              <el-button type="primary" v-if="!scope.row.evaluationId" :size="btnsize"  plain @click="addReview(scope.row)">我要评价</el-button>
              <el-button type="primary" v-if="scope.row.evaluationId" :size="btnsize"  plain @click="viewReview(scope.row)">评价详情</el-button>
            </div>
            <!-- 已完成 -->
            <div v-if="scope.row.orderStatus === 'AF03707'">
              <el-button type="primary" :size="btnsize"  plain @click="viewComplain(scope.row)">投诉详情</el-button>
              <el-button type="primary" :size="btnsize"  plain @click="viewReview(scope.row)">评价详情</el-button>

            </div>
            <!-- 已取消 -->
            <div v-if="scope.row.orderStatus === 'AF03708'">
            </div>
          </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>    
    </div>
  </div>
</template>
<script>
import SearchForm from './components/search'
import Pager from '@/components/Pagination/index'

import * as ReqApi from '@/api/carrier/manage'
import { parseTime } from '@/utils/index'

export default {
  props: {
    isCarrier: {
      type: Boolean,
      default: false
    },
    listtype: {
      type: String,
      default: 'all'
    }
  },
  components: {
    SearchForm,
    Pager
  },
  computed: {

  },
  mounted() {
    /* this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.fetchAllOrder(this.otherinfo.orgid).then(res => {
      this.loading = false
    }) */
    const isOwner = this.$route.path.indexOf('owner') !== -1
    this.searchQuery.vo.releaseOrCarrier = isOwner ? '1' : '2'
    switch (this.listtype) {
      case 'all':
        this.isall = true
        this.searchQuery.vo.orderStatus = ''
        break
      case 'chengyun':
        this.searchQuery.vo.orderStatus = 'AF03702'
        break
      case 'tihuo':
        this.searchQuery.vo.orderStatus = 'AF03703'
        break
      case 'fahuo':
        this.searchQuery.vo.orderStatus = 'AF03704'
        break
      case 'shouhuo':
        this.searchQuery.vo.orderStatus = 'AF03705'
        break
      case 'pingjia':
        this.searchQuery.vo.orderStatus = 'AF03706'
        break
      case 'wancheng':
        this.searchQuery.vo.orderStatus = 'AF03707'
        break
      case 'quxiao':
        this.searchQuery.vo.orderStatus = 'AF03708'
        break
    }
  },
  data() {
    return {
      isall: false,
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      // 加载状态
      loading: true,
      setupTableVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 20,
        'vo': {
          'orderSerialOrGoodsName': '', // 订单流水号/货品名称
          orderStatus: '', // 订单状态
          startAddress: '', // 出发地
          endAddress: '', // 目的地
          consignee: '', // 收货人
          consigneePhone: '', // 收货人手机
          consignor: '', // 发货人
          consignorPhone: '', // 发货人手机
          userToken: '',
          queryType: '1', // 1 为订单 2为货源
          releaseOrCarrier: '1', // 订单查询标志（1：我创建的订单；2：我承运的订单）
          wlName: ''
        }
      }
    }
  },
  methods: {
    viewDetail(row) {
      // 查看详情
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
    cancelCarrier(row) {
      this.$confirm('确定要取消承运吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ReqApi.putCancelCarrrier(row.orderSerial).then(res => {
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
      this.$router.push('/complaintsInfo/index?orderSerial=' + row.orderSerial)
    },
    addReview(row) {
      // 添加评价
    },
    viewReview(row) {
      // 查看评价
    },
    viewComplain(row) {
      // 查看投诉
    },
    replyComplain(row) {
      // 回复投诉
    },

    fetchAllOrder() {
      this.loading = true
      return ReqApi.getOrderList(this.otherinfo.userToken, this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.totalCount
        this.loading = false
      })
    },
    fetchData() {
      this.fetchAllOrder()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    },
    getSearchParam(obj) {
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
      this.loading = false
      this.fetchData()
    },
    doAction(type) {
      this.$router.push({ path: '/carrier/order/create' })
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    }
  }
}
</script>
