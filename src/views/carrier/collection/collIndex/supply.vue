<template>
  <div class="tab-content lll-list" v-loading="loading">
    <SearchForm :isAllSupplyl="isAllSupplyl" :isSpacialLine="isSpacialLine" :isPhysicalDis="isPhysicalDis" :isCarSoure="isCarSoure"></SearchForm>
    <div class="tab_info">
      <!--<div class="btns_box">-->
      <!--<el-button type="primary" size="large" icon="el-icon-circle-plus" @click="doAction('add')">创建订单</el-button>-->
      <!--</div>-->
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
            prop="customerId"
            label="序号"
            width="80">
            <template slot-scope="scope">
              {{ (searchQuery.currentPage - 1)*searchQuery.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column fixed prop="consignor" label="出发地" width="180" v-if="/(physicalDis)/.test(listtype)===false"></el-table-column>
          <el-table-column prop="consignor" label="到达地" width="180" v-if="/(physicalDis)/.test(listtype)===false"></el-table-column>
          <el-table-column prop="consignor" label="货物名称" width="150" v-if="/(spacialLine|physicalDis|carSoure)/.test(listtype)===false"></el-table-column>
          <el-table-column prop="consignor" label="总数量" width="100" v-if="/(spacialLine|physicalDis|carSoure)/.test(listtype)===false"></el-table-column>
          <el-table-column prop="consignor" label="预估总重量（公斤）" width="150" v-if="/(spacialLine|physicalDis|carSoure)/.test(listtype)===false"></el-table-column>
          <el-table-column prop="consignor" label="预估总体积（方）" width="150" v-if="/(spacialLine|physicalDis|carSoure)/.test(listtype)===false"></el-table-column>
          <el-table-column prop="consignor" label="货源类型" width="150" v-if="/(spacialLine|physicalDis|carSoure)/.test(listtype)===false"></el-table-column>
          <el-table-column prop="consignor" label="公司名称" width="150"></el-table-column>
          <el-table-column prop="consignor" label="发货人" width="150"></el-table-column>
          <el-table-column prop="consignor" label="发货人手机" width="150"></el-table-column>
          <el-table-column prop="consignor" label="收藏时间" width="160"></el-table-column>
          <el-table-column prop="consignor" label="操作" width="230">
            <template slot-scope="scope">
              <el-button type="info" size="small" plain @click="viewDetail(scope.row)">查看详情</el-button>
              <el-button type="danger" size="small" plain @click="viewDetail(scope.row)">删除</el-button>
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

  export default {
    name: 'supply',

    props: {
      listtype: {
        type: String,
        default: 'allSupplyl'
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
        usersArr: [{}, {}],
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
    mounted() {
      this.isAllSupplyl = false
      this.isSpacialLine = false
      this.isPhysicalDis = false
      this.isCarSoure = false
      switch (this.listtype) {

        case 'allSupplyl':
          this.isAllSupplyl = true
          break
        case 'spacialLine':
          this.isSpacialLine = true
          break
        case 'physicalDis':
          this.isPhysicalDis = true
          break
        case 'carSoure':
          this.isCarSoure = true
          break
      }
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
