<template>
  <div class="manage-orderinfo page-main">
    <div class="list-tab-title clearfix"  v-if="allVisible">
      <span :class="{'active': component === item.name}" @click="changeComponent(item)" v-for="(item,index) in tabs" :key="index">{{item.title + '(' + item.num + ')'}}</span>
    </div>
    <div class="list-tab-content">
      <all :listtype="component"  @showDetail="showDetail" v-if="allVisible"></all>
      <Particulars :info="detailInfo" v-if="centerDialogVisible" @reback="reback"></Particulars>
    </div>
  </div>
</template>
<script>
import all from './all'
import havepaid from './all'
import unpaid from './all'
import * as ReqApi from '@/api/carrier/insure'
import Particulars from '../particulars/index'

export default {
  components: {
    all,
    havepaid,
    unpaid,
    Particulars
  },
  created() {
    this.getCount()
  },
  mounted() {
    this.eventBus.$on('updateListCount', () => {
      this.getCount()
    })
  },
  data() {
    return {
      detailInfo: {},
      allVisible: true,
      centerDialogVisible: false,
      componentKey: 0,
      tabs: [{
        title: '全部投保单',
        name: 'all',
        type: 'AF03701',
        num: 0
      }, {
        title: '已支付投保单',
        name: 'havepaid',
        type: 'AF03702',
        num: 0
      }, {
        title: '未支付投保单',
        name: 'unpaid',
        type: 'AF03703',
        num: 0
      }],
      component: 'all'
    }
  },
  methods: {
    showDetail(row) {
      this.allVisible = false
      this.centerDialogVisible = true
      this.detailInfo = row
    },
    reback() {
      this.allVisible = true
      this.centerDialogVisible = false
    },
    getCount() {
      ReqApi.postGetCountByPaymentState(this.otherinfo.userToken, {
        queryType: '1'
      }).then(data => {
        this.tabs.forEach(el => {
          if (el.name === 'all') {
            el.num = data.totalCount
          } else if (el.name === 'havepaid') {
            el.num = data.paymentCount
          } else if (el.name === 'unpaid') {
            el.num = data.notPaymentCount
          }
        })
      })
    },
    changeComponent(item) {
      this.component = item.name
      // this.componentKey = Math.random()
    }
  }
}
</script>
<style lang="scss">
.list-tab-title{
  height: 74px;
  background: #fff;
  padding: 0 20px;
  span{
    float: left;
    height: 74px;
    line-height: 74px;
    width: 14.2%;
    text-align: center;
    cursor: pointer;
    border-bottom: 2px solid #fff;
    color: #aaa;
    position: relative;

    &.active{
      color: #000;
      border-bottom-color: #0d91e9;

      &:hover{
        background: #fff;
        border-bottom-color: #0d91e9;
      }
    }

  &:before{
    content: "";
    position: absolute;
    width: 2px;
    height: 31px;
    top: 21px;
    right: 0;
    background: #ccc;
  }

  &:last-child{
    &:before{
      display: none;
    }
  }

    &:hover{
      background: #eee;
      border-bottom-color: #eee;
    }
  }
}
.manage-orderinfo{
  .el-table{
    font-size: 12px;
  }
}
</style>
