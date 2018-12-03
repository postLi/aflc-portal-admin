<template>
  <div class="tab-content lll-list" v-loading="loading">
    <SearchForm></SearchForm>
    <div class="tab_info">
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          :key="tableKey"
          @row-click="clickDetails"
          @selection-change="getSelection"
          tooltip-effect="dark"
          height="600"
          style="width: 100%;">
          <el-table-column
            fixed
            prop="customerId"
            label="序号"
            width="80">
            <template slot-scope="scope">
              {{ (searchQuery.currentPage - 1)*searchQuery.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="insuranceNum" label="投保单号"></el-table-column>
          <el-table-column prop="insuranceCompany" label="保险公司"></el-table-column>
          <el-table-column prop="insuranceFee" label="保险金额"></el-table-column>
          <el-table-column prop="createTime" label="投保日期"></el-table-column>
          <el-table-column prop="orderNum" label="运单号"></el-table-column>
          <el-table-column prop="paymentStateName" label="状态"></el-table-column>
          <!-- <el-table-column prop="delFlag" label="状态">
            <template slot-scope="scope">
               {{ scope.row.delFlag === 0 ? "正常" : "已删除" }}
            </template>
          </el-table-column> -->
          <el-table-column prop="consignor" label="操作" width="400">
            <template slot-scope="scope">
              <el-button type="warning" size="small" plain @click="handleEdit(scope.$index, scope.row,'check')">查看详情</el-button> 
              <el-button type="info" size="small" plain @click="handleEdit(scope.$index, scope.row,'amend')"
              v-if="/(all|unpaid)/.test(listtype)">修改</el-button>
              
              <el-button type="danger" size="small" plain @click="handleEdit(scope.$index, scope.row,'delete')">删除</el-button> 
              <el-button type="primary" size="small" plain @click="handleEdit(scope.$index, scope.row,'payment')"  
              v-if="/(all|unpaid)/.test(listtype)">{{scope.row.paymentState === 0 ? '支付' : '未支付'}}</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
     
      <div class="info_tab_footer">共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchForm from './components/search'
  import Pager from '@/components/Pagination/index'
  import { postInsurelist ,deleteInsure} from '@/api/carrier/insure.js'
  // import * as ReqApi from '@/api/carrier/manage'
  export default {
    name: 'all',

    props: {
      listtype: {
        type: String,
        default: 'all'
      }
    },
    components: {
      SearchForm,
      Pager
    },
    watch: {
      listtype: {
        handler(cval, oval) {
          if (cval) {
            this.fetchData()
          }
        },
        deep: true
      }
    },
    data() {
      return {
        tableKey: 0,
        loading: false,
        isAll: false,
        isHavePaid: false,
        isUnpaid: false,
        // isCarSoure: false,
        total: 0,
        btnsize: 'small',
        usersArr: [],
        searchQuery: {
          'currentPage': 1,
          'pageSize': 20,
          'vo': {
            'orderSerialOrGoodsName': '', // 订单流水号/货品名称
            paymentState: '', // 支付状态 （0-未支付 1-已支付）
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
    mounted() {
      this.fetchData()
    },
    methods: {
      handlePageChange(obj) {
        this.searchQuery.currentPage = obj.pageNum
        this.searchQuery.pageSize = obj.pageSize
        this.fetchData()
      },
      getSearchParam(obj) {
        console.log('obj::', JSON.stringify(obj), this.searchQuery.vo)
        this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
        this.loading = false

        this.fetchData()
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getSelection(selection) {
        this.selected = selection
      },
      fetchData() {
        this.loading = true
        return postInsurelist(this.otherinfo.userToken, this.searchQuery).then(data => {
          this.usersArr = []
          const type = this.listtype === 'all' ? '' : (this.listtype === 'havepaid' ? 1 : 0)
          // console.warn('listtype', this.listtype)
          // console.log('sdfsdfsdf', this.listtype === 'havepaid' ? 1 : 0)
          data.list.forEach((e, index) => {
            if (e.paymentState === type) {
              this.usersArr.push(e)
            } else if (type === '') {
              this.usersArr.push(e)
            }
          })
          this.tableKey = new Date().getTime()
          this.total = data.total
          this.loading = false
          // console.log('保险单列表', data)
        })
      },
      handleEdit(index, row, type) {
        switch (type) {
          case 'check':
            this.$emit('showDetail', row)
            break
          case 'payment':
            
            break
          case 'delete':
            console.log(index, row, row.id)
            deleteInsure(row.id).then(res => {
              this.$confirm('确定要删除此投保单吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.fetchData()
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                })
              })
            }).catch(err => {
              this.$message({
                type: 'error',
                message: err.errorInfo || err.text || '未知错误，请重试~'
              })
            })
          break
          default:
            break
        }
      }
    }
  }
</script>

<style lang="scss">
  .lll-list {
    background: #fff;
    padding: 20px 20px 200px;
    margin-top: 20px;
    .table-link {
      color: blue;
      cursor: pointer;
    }
    .cell {
      .el-button {
        margin: 0;
        margin-bottom: 5px;
        width: 80px;
        /*display: block;*/
      }
    }
    .info_tab_footer {
      padding-left: 20px;
      background: #eee;
      height: 40px;
      line-height: 40px;
      box-shadow: 0 -2px 2px rgba(0, 0, 0, .1);
      position: relative;
      z-index: 10;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    .show_pager {
      float: right;
      line-height: 40px;
      height: 40px;
      overflow: hidden;
    }
  }
</style>
