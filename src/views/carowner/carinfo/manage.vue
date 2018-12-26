<template>
  <div class="carrier-manager" v-loading="loading">
    <div class="tab-info-title">
      <h2><span>管理车源信息</span></h2>
    </div>

    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize"/>
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" size="mini" @click="createNew">发布车源</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          @row-click="clickDetails"
          @selection-change="getSelection"
          height="100%"
          tooltip-effect="dark"
          :default-sort="{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            fixed
            label="序号"
            width="80">
            <template slot-scope="scope">
              {{ (searchQuery.currentPage - 1)*searchQuery.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="strartAddress"
            width="200"
            label="出发地">
          </el-table-column>
          <el-table-column
            prop="endAddress"
            width="200"
            label="到达地">
          </el-table-column>
          <el-table-column
            prop="startTime"
            width="200"
            label="发车时间">
            <template slot-scope="scope">
              {{ scope.row.startTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column
            prop="expectPrice"
            width="200"
            label="期望运价">
          </el-table-column>
          <el-table-column
            prop="carSourceTypeName"
            width="158"
            label="车源类型">
          </el-table-column>
          <el-table-column
            prop="isLongCar"
            width="160"
            label="即时/长期">
            <template slot-scope="scope">
              {{scope.row.isLongCar=="0"?'长期车源':'即时车源'}}
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            label="创建时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column
            width="330"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="changeItem(scope.row.id)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
              <el-button size="mini" :type="scope.row.isEnable==='1'?'info':'success'" @click="enableBtn(scope.row)">
                {{scope.row.isEnable==='1'?"禁用":'启用'}}
              </el-button>
              <el-button size="mini" :type="scope.row.isCommonRoute === '0'?'primary':'warning'"
                         @click="setRunBtn(scope.row)">{{scope.row.isCommonRoute === '0'?'设置常跑':'取消常跑'}}
              </el-button>
            </template>
            <!--{{ scope.row.contractEndtime | parseTime('{y}{m}{d}') }}-->
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }}
        <div class="show_pager">
          <Pager :sizes="sizes" :total="total" @change="handlePageChange"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getAllCarrier, deleteSomeCarrierInfo, getExportExcel} from '@/api/company/carrierManage'

  import * as carApi from '@/api/carowner/index'
  import SearchForm from './components/search'
  import Pager from '@/components/Pagination/index'

  export default {
    components: {
      SearchForm,
      Pager
    },
    computed: {
    },
    mounted() {
      this.searchQuery.vo.orgid = this.otherinfo.orgid
      this.fetchAllCustomer(this.otherinfo.orgid).then(res => {
        this.loading = false
      })
    },
    data() {
      return {
        btnsize: 'mini',
        usersArr: [],
        total: 0,
        // 加载状态
        loading: true,
        setupTableVisible: false,
        AddCustomerVisible: false,
        isModify: false,
        selectInfo: {},
        // 选中的行
        selected: [],
        sizes: [20, 50, 100],
        searchQuery: {
          'currentPage': 1,
          'pageSize': 20,
          'vo': {
            endAddress: '',
            strartAddress: ''
          }
        }
      }
    },
    methods: {
      createNew() {
        this.$router.push('/carinfo/create')
      },
      fetchAllCustomer() {
        this.loading = true
        return carApi.getCarList(this.searchQuery).then(data => {
          this.usersArr = data.list
          this.total = data.totalCount
          this.loading = false
        })
      },
      fetchData() {
        this.fetchAllCustomer()
      },
      handlePageChange(obj) {
        this.searchQuery.currentPage = obj.pageNum
        this.searchQuery.pageSize = obj.pageSize
        this.fetchAllCustomer()
      },
      getSearchParam(obj) {
        this.searchQuery.currentPage = 1
        this.searchQuery.vo = obj
        this.fetchAllCustomer()
      },
      setRemote(id, type) {
        return carApi.putSetRouteType(id, type).then((res) => {
          this.$message.success(res.text ? res.text : res.errInfo)
          this.fetchData()
        }).catch(err => {
          this.$message.error('操作出错了： ' + JSON.stringify(err))
        })
      },
      enableItem(id, type) {
        return carApi.putEnableType(id, type).then((res) => {
          this.$message.success(res.text ? res.text : res.errInfo)
          this.fetchData()
        }).catch(err => {
          this.$message.error('操作出错了： ' + JSON.stringify(err))
        })
      },
      enableBtn(row) {
        let type
        if (row.isEnable === '0') {
          type = 1
          this.enableItem(row.id, type)
        } else {
          type = 0
          this.enableItem(row.id, type)
        }
      },
      setRunBtn(row) {
        let type
        if (row.isCommonRoute === "0") {
          type = '1'
          this.setRemote(row.id, type)
        } else {
          type = '0'
          this.setRemote(row.id, type)
        }
      },
      deleteItem(id) {
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          carApi.deleteCarInfo(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          }).catch(err => {
            this.$message({
              type: 'info',
              message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : JSON.stringify(err)
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      changeItem(id) {
        this.$router.push('/carinfo/create?id=' + id)
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
<style lang="scss" scoped>
  .carrier-manager {
    width: 100%;
    padding: 0 0 40px;
  }
</style>
<style lang="scss">
  .carrier-manager {
    position: relative;

    .tab_info {
      padding: 10px;

      .info_tab {
        width: 100%;
        height: 600px;

        .cell {
          position: relative;
          padding: 5px 0;
          line-height: 28px;
        }
        .vipline {
          position: absolute;
          width: 0;
          height: 0;
          top: 0;
          left: 0;
          border: 10px solid #f0f;
          border-color: gold transparent transparent gold;
        }

        .el-table {
          table {
            th, td {
              text-align: center;
            }
          }
          .unauth {
            color: #f00;
          }
        }
        .el-table td, .el-table th {
          padding: 0 0;
        }
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
      position: absolute;
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
