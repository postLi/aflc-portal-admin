<template>
  <div class="TransportRange identification" v-loading="loading">
    <el-form :model="logisticsForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <div class="carrierTitle">
        <div class="realname">
          <h2>管理我的专线</h2>
        </div>
      </div>
      <div class="searchInformation information">
        <el-form-item label="出发地：" prop="startLocation">
          <el-input v-model="logisticsForm.startLocation">
          </el-input>
        </el-form-item>
        <el-form-item label="到达地：" prop="endLocation">
          <el-input v-model="logisticsForm.endLocation">
          </el-input>
        </el-form-item>
        <el-form-item class="btnChoose" style="margin-left:20px;">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="primary" @click="clearSearch">重置</el-button>
        </el-form-item>
      </div>

      <div class="information syStyle">
        <div class="created">
          <el-button type="primary" @click="handleNew">发布专线</el-button>
        </div>
        <div class="btns_box">
          <el-button size="small" round type="success" icon="" @click="doAction('use')">启用</el-button>
          <el-button size="small" round type="info" icon="" @click="doAction('disable')">禁用</el-button>
          <el-button size="small" round type="danger" icon="" @click="doAction('remove')">删除</el-button>
        </div>
        <div class="tableStyle" style="height:92%">
          <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="getSelection"
            @row-click="clickDetails"
            stripe
            border
            height="100%"
            style="width: 100%">
            <el-table-column fixed sortable type="selection" width="50"></el-table-column>
            <el-table-column

              label="序号"
              type="index"
              width="80">
            </el-table-column>
            <el-table-column

              label="出发地"
              width="180">
              <template slot-scope="scope">
                <span class="moreInfo" @click="handleInfo(scope.row)">{{scope.row.startLocation}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="endLocation"
              label="到达地"
              width="250">
            </el-table-column>
            <el-table-column
              label="运输时效"
              width="180">
              <template slot-scope="scope">
                {{scope.row.transportAging}} {{scope.row.transportAgingUnit}}
              </template>
            </el-table-column>
            <el-table-column
              label="发车频率"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.departureHzData}}天/{{scope.row.departureHzTime}}次</span>
              </template>
            </el-table-column>
            <el-table-column
              label="重货价格"
              width="220">
              <template slot-scope="scope">
                <p v-if="scope.row.weightcargo.length == 0">
                  <span class="interview">面谈</span>
                </p>
                <p class="cargo" v-for="(item,idx) in scope.row.weightcargo" :key="item.id" v-else>
                  <span v-if="idx == 0">{{item.endVolume}}公斤以下,{{item.discountPrice ? item.discountPrice :item.primeryPrice}}元/公斤</span>
                  <span v-else-if="idx == scope.row.weightcargo.length-1 &&  item.endVolume == ''">{{item.startVolume}}公斤以上,{{item.discountPrice ? item.discountPrice :item.primeryPrice}}元/公斤</span>
                  <span v-else>{{item.startVolume}}-{{item.endVolume}}公斤,{{item.discountPrice ? item.discountPrice :item.primeryPrice}}元/公斤</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="轻货价格"
              width="220">
              <template slot-scope="scope">
                <p v-if="scope.row.lightcargo.length == 0">
                  <span class="interview">面谈</span>
                </p>
                <p class="cargo" v-for="(item,idx) in scope.row.lightcargo" :key="idx" v-else>
                  <span v-if="idx == 0">{{item.endVolume}}立方以下,{{item.discountPrice ? item.discountPrice :item.primeryPrice}}元/立方</span>
                  <span v-else-if="idx == scope.row.lightcargo.length-1 && item.endVolume == ''">{{item.startVolume}}立方以上,{{item.discountPrice ? item.discountPrice :item.primeryPrice}}元/立方</span>
                  <span v-else>{{item.startVolume}}-{{item.endVolume}}立方,{{item.discountPrice ? item.discountPrice :item.primeryPrice}}元/立方</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="lowerPrice"
              label="最低一票价格（元）"
              width="180">
            </el-table-column>
            <el-table-column
              prop="publishName"
              label="创建人"
              width="180">
            </el-table-column>
            <el-table-column
              prop="Time"
              label="创建时间"
              width="220">
            </el-table-column>
            <el-table-column
              label="专线类型"
              width="180">
              <template slot-scope="scope">
                <span class="rangeTypeName">{{scope.row.rangeTypeName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作"

              width="320"
            >
              <template slot-scope="scope">
                <!-- <el-button-group> -->
                <el-button @click="handleDetail(scope.row)" type="test" size="mini">查看详情</el-button>
                <el-button @click="handleEdit(scope.row)" type="primary" size="mini">修改</el-button>
                <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
                <el-button @click="handleStatus(scope.row)" :type="scope.row.rangeStatus == 0 ? 'primary' : 'info'"
                           size="mini">{{scope.row.rangeStatus == 0 ? '启用' : '禁用'}}
                </el-button>
                <!-- </el-button-group> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="info_tab_footer">共计:{{ totalCount }}
        <div class="show_pager">
          <Pager :total="totalCount" @change="handlePageChange"/>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>

  import '@/styles/identification.scss'
  import {
    getTransportRangeList,
    TransportRangeStatus,
    deleteTransportRange,
    deleteBatch,
    putBatch,
    putEnable
  } from '@/api/carrier/TransportRange.js'
  import {parseTime} from '@/utils/index.js'
  import Pager from '@/components/Pagination/index'

  export default {
    components: {
      Pager,
    },
    data() {

      return {
        loading: true,
        defaultImg: '/static/default.png',//默认加载失败图片
        totalCount: 0,
        page: 1,
        pagesize: 20,
        logisticsForm: {
          startLocation: '',//出发地
          endLocation: '',//到达地
        },
        tableData: [],
        selected: [],
      };
    },
    watch: {},
    mounted() {
      this.firstblood();
    },
    methods: {
      doAction(type) {
        if (!this.selected.length) {
          this.$message({
            message: '请选择专线~',
            type: 'warning'
          })
          return false
        }
        let ids
        switch (type) {
          case 'use':
            ids = this.selected.map(el => {
              return el.id
            })
            if (!ids.length) {
              this.$message({
                type: 'info',
                message: '请先禁用~'
              })
              return false
            } else {
              // console.log(ids,typeof ids,typeof ids[1],'idsidsidsids');
              putEnable(ids).then(res => {
                this.$message({
                  type: 'success',
                  message: '启用成功~'
                })
                this.firstblood()
              }).catch(err => {
                // console.log(err, 'errrr')
              })
            }
            break
          case 'disable':
            ids = this.selected.map(el => {
              return el.id
            })
            if (!ids.length) {
              this.$message({
                type: 'info',
                message: '请先启用~'
              })
              return false
            } else {
              // console.log(ids,typeof ids,typeof ids[1],'idsidsidsids');
              putBatch(ids).then(res => {
                this.$message({
                  type: 'success',
                  message: '禁用成功~'
                })
                this.firstblood()
              }).catch(err => {
                // console.log(err, 'errrr')
              })
            }
            break
          case 'remove':
            ids = this.selected.map(el => {
              return el.id
            })
            this.$confirm('确定删除项吗？', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteBatch(ids).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.firstblood()
              }).catch(err => {
                // console.log(err, 'errrr')
                // this._handlerCatchMsg(err)
              })
            })
            break
        }

      },
      firstblood() {
        this.loading = true;
        getTransportRangeList(this.page, this.pagesize, this.logisticsForm).then(res => {
          this.tableData = res.data.list;
          this.totalCount = res.data.totalCount;
          this.tableData.forEach(el => {
            el.Time = parseTime(el.createTime);
            el.weightcargo = [];
            el.lightcargo = [];
            el.rangePrices.forEach(item => {
              switch (item.type) {
                case '0':
                  el.lightcargo.push(item);
                  break;
                case '1':
                  el.weightcargo.push(item)
                  break;
              }
            })
            el.lightcargo.sort(function (a, b) {
              return a.startVolume - b.startVolume;
            })
            el.weightcargo.sort(function (a, b) {
              return a.startVolume - b.startVolume;
            })
          })
          this.loading = false;
          // console.log(this.tableData)
        })
      },
      handlePageChange(obj) {
        this.page = obj.pageNum
        this.pagesize = obj.pageSize
        this.firstblood()
      },
      getSelection(selection) {
        this.selected = selection
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      clearSearch() {
        this.$refs.ruleForm.resetFields();
        this.firstblood();
      },
      //搜索
      handleSearch() {
        this.firstblood()
      },
      //查看详情
      handleInfo(row) {
        this.$router.push({name: '发布物流专线', query: {data: JSON.stringify(row), ifrevise: '2'}});
      },
      //新增网点
      handleNew() {
        this.$router.push({name: '发布物流专线'});
      },
      handleDetail(row){
        let isApi = 'http://192.168.1.157:89'
        // const isApi = 'http://www.28china.cn'
        const isApihttp = '/wlzx/2018/0509/7'
        if (window.location.host.indexOf('192.168.1') !== -1) {
          isApi = 'http://192.168.1.157:89'
        }
        else {
          isApi = 'http://www.28china.cn'
        }
        window.open(isApi + isApihttp + '.html?id=' + row.id + '&publishId=' + row.publishId)
      },
      //修改
      handleEdit(row) {
        this.$router.push({name: '发布物流专线', query: {data: JSON.stringify(row), ifrevise: '1'}});
      },
      //删除网点
      handleDelete(row) {
        this.$confirm('确定要删除 ' + row.startLocation + '-' + row.endLocation + ' 该条专线吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTransportRange(row.id).then(res => {
            this.firstblood();
          }).catch(err => {
            this.$message({
              type: 'info',
              message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      //更改状态
      handleStatus(row) {
        TransportRangeStatus(row.id).then(res => {
          this.firstblood();
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '操作失败，原因：' + err.text ? err.text : err
          })
        })
      },
    },

  }
</script>

<style type="text/css" lang="scss">
  .TransportRange {
    .el-form {
      .syStyle {
        height: 76%;
      }
      .tableStyle {
        height: 80%;
        .cargo {
          text-align: left;
          text-indent: 20px;
        }
        .rangeTypeName {
          padding: 5px 15px;
          border-radius: 20%  / 50%;
          background: #eca438;
          color: #fff;
        }
        .interview {
          padding: 5px 15px;
          border-radius: 5px;
          background: #eb0a0a;
          color: #fff;
        }
        .moreInfo {
          cursor: pointer;
          display: inline-block;
          color: #169BD5;
        }
      }

    }
    .el-table{
      .el-table__body-wrapper {
        max-height: 500px !important;
        min-height: 500px !important;
      }
    }
  }
</style>
