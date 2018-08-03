<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :isall="true"  @change="getSearchParam" :btnsize="btnsize" />  
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
            sortable
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="customerId"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="orderSn"
            label="订单号"
            width="130">
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            sortable
            label="订单状态"
            width="110">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            sortable
            label="物流公司"
            width="130">
          </el-table-column>
          <el-table-column
            prop="orderEffective"
            sortable
            label="商品名称"
            width="90">
          </el-table-column>
          <el-table-column
            sortable
            prop="orderPickupMethod"
            label="货品总数量（件）"
            width="110">
          </el-table-column>
          <el-table-column
            label="预估总重量（公斤）"
            prop="cargoName"
            sortable
            width="90"
            >
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="预计总体积（方）"
            sortable
            width="80"
            >
          </el-table-column>
          <el-table-column
            sortable
            prop="idcard"
            label="货物类型"
            width="80">
          </el-table-column>
          <el-table-column
            prop="bankName"
            label="预估总运费（元）"
            sortable
            width="80"
            >
          </el-table-column>
          <el-table-column
            prop="bankCardNumber"
            label="出发地"
            sortable
            width="80"
            >
          </el-table-column>
          <el-table-column
            prop="description"
            label="到达地"
            sortable
            width="110"
            >
          </el-table-column>
          <el-table-column
            prop="orderTotalFee"
            label="发货人"
            sortable
            width="80"
            >
          </el-table-column>
          <el-table-column
            prop="detailedAddress"
            label="发货人手机"
            sortable
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="orderSenderId"
            label="收货人"
            sortable
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="senderMobile;"
            label="收货人手机"
            sortable
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="orderReceiverId"
            label="下单时间"
            sortable
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="receiverMobile"
            label="承运时间"
            sortable
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="refuseReason"
            label="提货时间"
            sortable
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="orderRemarks"
            label="发货时间"
            sortable
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="orderFromCityCode"
            label="收货时间"
            sortable
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="orderToCityCode"
            label="操作"
            sortable
            width="110"
          >
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

import orderManageApi from '@/api/operation/orderManage'
import * as ReqApi from '@/api/carrier/create'
import { parseTime } from '@/utils/index'

export default {
  components: {
    SearchForm,
    Pager
  },
  computed: {

  },
  mounted() {
    this.searchQuery.vo.userToken = this.otherinfo.userToken
    /* this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.fetchAllOrder(this.otherinfo.orgid).then(res => {
      this.loading = false
    }) */
  },
  data() {
    return {
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
          queryType: '1',
          wlName: ''
        }
      }
    }
  },
  methods: {
    viewDetails(row) {
      this.$router.push({
        path: '/operation/order/createOrder',
        query: {
          orderid: row.id,
          type: 'view',
          tab: '查看' + row.shipSn
        }
      })
    },
    showDetail(order) {
      this.eventBus.$emit('showOrderDetail', order.id)
    },
    fetchAllOrder() {
      this.loading = true
      return ReqApi.getOrderList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
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
      // 判断是否有选中项
      if (!this.selected.length && type !== 'add') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      console.log('this.selected:', this.selected)

      switch (type) {
          // 添加订单
        case 'add':
          this.isModify = false
          this.selectInfo = {}
          this.$router.push({ path: '/operation/order/createOrder/' })
          break
          // 修改订单信息
        case 'modify':
          this.isModify = true
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
          }
          this.selectInfo = this.selected[0]
          this.$router.push({
            path: '/operation/order/createOrder',
            query: {
              orderid: this.selectInfo.id,
              type: 'modify',
                  // tab: '修改' + this.selectInfo.shipSn
              tab: '改单'
            }
          })
          break
          // 删除订单
        case 'delete':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能操作单条数据~',
              type: 'warning'
            })
          }
          var deleteItem = this.selected.filter(el => el.shipStatus === 59)
          console.log('delete:', deleteItem)
          if (deleteItem.length === 0) {
            this.$message({
              message: '只有已入库状态才能删除~',
              type: 'info'
            })
          } else {
            var id = deleteItem[0].id
            this.$confirm('确定要删除 ' + deleteItem[0].shipSn + '订运单吗？', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              orderManageApi.deleteOrderInfoById(id).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.fetchData()
              }).catch(err => {
                this.$message({
                  type: 'info',
                  message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err
                })
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
          break
          // 作废订单
        case 'cancel':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能操作单条数据~',
              type: 'warning'
            })
          }
              // shipStatus 59 已入库
          var cancelItem = this.selected.filter(el => el.shipStatus === 59)
          if (cancelItem.length === 0) {
            this.$message({
              message: '只有已入库状态才能作废~',
              type: 'info'
            })
          } else {
            var theid = cancelItem[0].id

            this.$confirm('确定要作废 ' + cancelItem[0].shipSn + '订运单吗？', '提示', {
              confirmButtonText: '作废',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              orderManageApi.deleteCancleOrderById(theid).then(res => {
                this.$message({
                  type: 'success',
                  message: '作废成功!'
                })
                this.fetchData()
              }).catch(err => {
                this.$message({
                  type: 'info',
                  message: '作废失败，原因：' + err.errorInfo ? err.errorInfo : err
                })
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消作废'
              })
            })
          }

          break
          // 导出数据
        case 'export':
          var ids2 = this.selected.map(el => {
            return el.customerId
          })
          orderManageApi.getExportExcel(ids2.join(',')).then(res => {
            this.$message({
              type: 'success',
              message: '即将自动下载!'
            })
          })
          break
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
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
