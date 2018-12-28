<template>
  <div class="tab-content lll-list" v-loading="loading">
    <SearchForm :isAllSupplyl="isAllSupplyl" :isSpacialLine="isSpacialLine" :isPhysicalDis="isPhysicalDis"
                :isCarSoure="isCarSoure" @change="getSearchParam"></SearchForm>
    <div class="tab_info">
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          @row-click="clickDetails"
          @selection-change="getSelection"
          tooltip-effect="dark"
          height="600"
          style="width: 100%;">
          <el-table-column
            fixed
            label="序号"
            width="80"
            type="index">
          </el-table-column>

          <div v-if="/(allSupplyl)/.test(listtype)===true">
            <el-table-column prop="orderStartAddress" label="出发地" width="150"></el-table-column>
            <el-table-column prop="orderEndAddress" label="到达地" width="150"></el-table-column>
            <el-table-column prop="goodsName" label="货物名称" width="150"></el-table-column>
            <el-table-column prop="goodsNum" label="总数量" width="120"></el-table-column>
            <el-table-column prop="goodsWeight" label="预估总重量（公斤）" width="150"></el-table-column>
            <el-table-column prop="goodsVolume" label="预估总体积（方）" width="150"></el-table-column>
            <el-table-column prop="orderClassName" label="货源类型" width="150"></el-table-column>
            <el-table-column prop="companyName" label="公司名称" width="150">
              <!--<template slot-scope="scope">{{scope.row.companyName===null?'普通货主':scope.row.companyName}}</template>-->
            </el-table-column>
            <el-table-column prop="orderContacts" label="发货人" width="150"></el-table-column>
            <el-table-column prop="orderMobile" label="发货人手机" width="150"></el-table-column>
            <el-table-column prop="collectTime" label="收藏时间" width="160"></el-table-column>
            <el-table-column prop="consignor" label="操作" width="250">
              <template slot-scope="scope">
                <el-button type="info" size="small" plain @click="viewDetail(scope.row,'allSupplyl')">查看详情</el-button>
                <el-button type="danger" size="small" plain @click="remDetail(scope.row,'allSupplyl')">删除</el-button>
              </template>
            </el-table-column>
          </div>
          <div v-if="/(spacialLine)/.test(listtype)===true">
            <el-table-column prop="rangeStartLocation" label="出发地" width="150"></el-table-column>
            <el-table-column prop="rangeEndLocation" label="到达地" width="150"></el-table-column>
            <el-table-column prop="companyName" label="公司名称" width="150"></el-table-column>
            <el-table-column prop="zhPrice" label="重货价" width="150"></el-table-column>
            <el-table-column prop="qhPrice" label="轻货价" width="150"></el-table-column>
            <el-table-column prop="transportAging" label="时效" width="150"></el-table-column>
            <el-table-column prop="hz" label="发车频率" width="150"></el-table-column>
            <el-table-column prop="rangeContacts" label="联系人" width="150"></el-table-column>
            <el-table-column prop="rangeMobile" label="手机号" width="150"></el-table-column>
            <el-table-column prop="collectTime" label="收藏时间" width="160"></el-table-column>
            <el-table-column prop="consignor" label="操作" width="350">
              <template slot-scope="scope">
                <el-button type="info" size="small" plain @click="viewDetail(scope.row,'spacialLine')">查看详情</el-button>
                <el-button type="success" size="small" plain @click="createDetail(scope.row)">下单
                </el-button>
                <el-button type="danger" size="small" plain @click="remDetail(scope.row,'spacialLine')">删除</el-button>
              </template>
            </el-table-column>
          </div>
          <div v-if="/(physicalDis)/.test(listtype)===true">
            <el-table-column prop="companyName" label="公司名称" width="250"></el-table-column>
            <el-table-column prop="contactsName" label="联系人" width="150"></el-table-column>
            <el-table-column prop="mobile" label="手机号" width="150"></el-table-column>
            <el-table-column prop="belongCityName" label="公司所在地" width="288"></el-table-column>
            <el-table-column prop="address" label="详细地址" width="350"></el-table-column>
            <el-table-column prop="collectTime" label="收藏时间" width="160"></el-table-column>
            <el-table-column prop="consignor" label="操作" width="250">
              <template slot-scope="scope">
                <el-button type="info" size="small" plain @click="viewDetail(scope.row,'physicalDis')">查看详情</el-button>
                <el-button type="danger" size="small" plain @click="remDetail(scope.row,'physicalDis')">删除</el-button>
              </template>
            </el-table-column>
          </div>
          <div v-if="/(carSoure)/.test(listtype)===true">
            <el-table-column prop="carStrartAddress" label="出发地" width="150"></el-table-column>
            <el-table-column prop="carEndAddress" label="到达地" width="150"></el-table-column>
            <el-table-column prop="carTypeName" label="车辆类型" width="150"></el-table-column>
            <el-table-column prop="carSourceTypeName" label="车源类型" width="150"></el-table-column>
            <el-table-column prop="carLoad" label="车辆载重" width="150"></el-table-column>
            <el-table-column prop="carVolume" label="车辆体积" width="150"></el-table-column>
            <el-table-column prop="usualPlace" label="车辆常驻地" width="150"></el-table-column>
            <el-table-column prop="isLongCar" label="即时/长期" width="150"></el-table-column>
            <el-table-column prop="carBelongDriver" label="联系人" width="150"></el-table-column>
            <el-table-column prop="carPhone" label="手机号" width="160"></el-table-column>
            <el-table-column prop="collectTime" label="收藏时间" width="250"></el-table-column>
            <el-table-column prop="consignor" label="操作" width="250">
              <template slot-scope="scope">
                <el-button type="info" size="small" plain @click="viewDetail(scope.row,'carSoure')">查看详情</el-button>
                <el-button type="danger" size="small" plain @click="remDetail(scope.row,'carSoure')">删除</el-button>
              </template>
            </el-table-column>
          </div>

        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" ></Pager>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchForm from './components/search'
  import Pager from '@/components/Pagination/index'
  import * as collApi from '@/api/carrier/collection'
  import {getOrgId, getLogin} from '@/utils/auth'

  export default {
    name: 'supply',

    props: {
      listtype: {
        type: String,
        default: 'allSupplyl'
      },
      collListNum: {
        type: Object,
        // default: false
      }
    },
    components: {
      SearchForm,
      Pager
    },
    data() {
      return {
        loading: false,
        isAllSupplyl: false,
        isSpacialLine: false,
        isPhysicalDis: false,
        isCarSoure: false,
        total: 0,
        btnsize: 'small',
        usersArr: [],
        searchQuery: {
          'currentPage': 1,
          'pageSize': 20,
          'vo': {
            userId: '',
            userType: '',
            collectType: 1,
          }
        }
      }
    },
    mounted() {
      this.userTypeFn(this.searchQuery.vo)
      this.listtypeFn()
    },
    methods: {
      createDetail(row, type) {
        this.$router.push({path: '/order/create', query: {id: row.rangeId}})
      },
      viewDetail(row, type) {

        let isApi = 'http://192.168.1.157:89'
        // const isApi = 'http://www.28china.cn'
        let isApihttp = '/huoyuan/'
        let isApiDate = '2018/0508'
        let isApinum = '/2'
        // console.log(row,'spacialLine');
        if (window.location.host.indexOf('192.168.1') !== -1) {
          // console.log(window.location.host);
          // console.log(window.location.host.indexOf('192.168.1.157:89'))
          isApi = 'http://192.168.1.157:89'
        }
        else {
          isApi = 'http://www.28china.cn'
        }
        if (type === 'allSupplyl') {
          if (row.orderId === null || row.shipperId === null) {
            this.$message.info('详情暂无数据~')
            return false
          }
          window.open(isApi + isApihttp + isApiDate + isApinum + '.html?id=' + row.orderId + '&shipperId=' + row.shipperId)
        }
        if (type === 'spacialLine') {
          isApihttp = '/wlzx/'
          isApiDate = '2018/0509'
          isApinum = '/7'

          if (row.rangeId === null || row.publishId === null) {
            this.$message.info('详情暂无数据~')
            return false
          }
          window.open(isApi + isApihttp + isApiDate + isApinum + '.html?id=' + row.rangeId + '&publishId=' + row.publishId)
        }
        if (type === 'physicalDis') {
          if (row.account === null) {
            this.$message.info('详情暂无数据~')
            return false
          }
          isApihttp = '/member/'
          isApiDate = row.account
          window.open(isApi + isApihttp + isApiDate + '.html')
        }
        if (type === 'carSoure') {
          if (row.carId === null || row.driverId === null) {
            this.$message.info('详情暂无数据~')
            return false
          }
          isApihttp = '/cyxx/'
          isApinum = '/5'
          window.open(isApi + isApihttp + isApiDate + isApinum + '.html?id=' + row.carId + '&driverId=' + row.driverId)
        }
      },
      remDetail(row, type) {
        const sendData = {}
        this.userTypeFn(sendData)
        this.collectTypeFn(sendData, type, row)

        this.$set(sendData, 'mobile', getLogin().mobile)
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          collApi.postCancelCollect(sendData).then(data => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchData()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      collectTypeFn(sendData, type, row) {
        if (type === 'allSupplyl') {
          this.$set(sendData, 'collectType', 3)
          this.$set(sendData, 'collectId', row.orderId)
        }
        if (type === 'spacialLine') {
          this.$set(sendData, 'collectType', 4)
          this.$set(sendData, 'collectId', row.rangeId)
        }
        if (type === 'physicalDis') {
          this.$set(sendData, 'collectType', 1)
          this.$set(sendData, 'collectId', row.companyId)
        }
        if (type === 'carSoure') {
          this.$set(sendData, 'collectType', 2)
          this.$set(sendData, 'collectId', row.carId)
        }
      },
      listtypeFn() {
        this.isAllSupplyl = false
        this.isSpacialLine = false
        this.isPhysicalDis = false
        this.isCarSoure = false
        switch (this.listtype) {
          case 'allSupplyl':
            this.isAllSupplyl = true
            this.$set(this.searchQuery.vo, 'collectType', 3)
            this.fetchData()
            break
          case 'spacialLine':
            this.isSpacialLine = true
            this.$set(this.searchQuery.vo, 'collectType', 4)
            this.fetchData()
            break
          case 'physicalDis':
            this.isPhysicalDis = true
            this.$set(this.searchQuery.vo, 'collectType', 1)
            this.fetchData()
            break
          case 'carSoure':
            this.isCarSoure = true
            this.$set(this.searchQuery.vo, 'collectType', 2)
            this.fetchData()
            break
        }
      },
      userTypeFn(item) {


        switch (getOrgId()) {
          case 'aflc-1':
            this.$set(item, 'userType', 2)
            this.$set(item, 'userId', this.otherinfo.driverId)
            // console.log(item,'itemitemitemitem',this.otherinfo.driverId);
            break
          case 'aflc-2':
            this.$set(item, 'userType', 3)
            this.$set(item, 'userId', this.otherinfo.shipperId)
            // console.log(item,'itemitemitemitem',this.otherinfo.driverId);
            break
          case 'aflc-5':
            this.$set(item, 'userType', 1)
            this.$set(item, 'userId', this.otherinfo.id)
            break
        }
      },
      fetchAllCollList() {
        return collApi.getCollectList(this.otherinfo.userToken, this.searchQuery).then(data => {
          this.usersArr = data.list
          this.total = data.totalCount
        })
      },
      fetchData() {
        // 更新顶部总数
        this.eventBus.$emit('updateListCount')
        this.fetchAllCollList()
      },
      handlePageChange(obj) {
        this.searchQuery.currentPage = obj.pageNum
        this.searchQuery.pageSize = obj.pageSize
        this.fetchAllCollList()
      },
      getSearchParam(obj) {
        // console.log('obj::', JSON.stringify(obj), this.searchQuery.vo)
        this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
        this.loading = false

        this.fetchData()
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
