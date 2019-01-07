<!--<template>-->
<!--<router-view></router-view>-->
<!--</template>-->

<template>
  <div class="manage-orderinfo page-main">
    <div class="list-tab-title clearfix">
      <span :class="{'active': component === item.name}" @click="component = item.name" v-for="(item,index) in tabs"
            :key="index">{{item.title + '(' + item.num + ')'}}</span>
    </div>
    <div class="list-tab-content">
      <keep-alive>
        <component :key="component" :listtype="component" v-bind:is="component" :collListNum="collListNum"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  import allSupplyl from './collIndex/supply'
  import spacialLine from './collIndex/supply'
  import physicalDis from './collIndex/supply'
  import carSoure from './collIndex/supply'
  import * as ReqApi from '@/api/carrier/manage'
  import * as collApi from '@/api/carrier/collection'
  import {getOrgId} from '@/utils/auth'
  import {objectMerge2} from '@/utils/'

  export default {
    components: {
      allSupplyl,
      spacialLine,
      physicalDis,
      carSoure
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
        //物流公司(2) 车源(2) 货源(1) 专线(3)

        tabs: [{
          title: '货源收藏',
          name: 'allSupplyl',
          type: '3',
          num: 0
        }, {
          title: '专线收藏',
          name: 'spacialLine',
          type: '4',
          num: 0
        }, {
          title: '物流公司收藏',
          name: 'physicalDis',
          type: '1',
          num: 0
        }, {
          title: '车源收藏',
          name: 'carSoure',
          type: '2',
          num: 0
        }],
        component: 'allSupplyl',
        isCarrier: false,
        collListNum: {},
        isdata: {},
      }
    },

    methods: {
      userTypeFn() {

        switch (getOrgId()) {
          case 'aflc-1':
            this.$set(this.collListNum, 'userType', 2)
            this.$set(this.collListNum, 'userId', this.otherinfo.driverId)
            break
          case 'aflc-2':
            this.$set(this.collListNum, 'userType', 3)
            this.$set(this.collListNum, 'userId', this.otherinfo.shipperId)
            break
          case 'aflc-5':
            this.$set(this.collListNum, 'userType', 1)
            this.$set(this.collListNum, 'userId', this.otherinfo.id)
            break
        }
      },
      getCount() {
        if (this.$route.path.indexOf('/carrier/collection') !== -1) {
          this.isCarrier = true
          // console.log(this.isCarrier,' this.isCarrier');
        }
        this.userTypeFn()
        let data = objectMerge2({}, this.collListNum)
        // console.log(this.otherinfo,'this.otherinfothis.otherinfothis.otherinfothis.otherinfothis.otherinfo');
        collApi.getCollectListNum(this.otherinfo.userToken, data).then((data, index) => {
          data.forEach((el, index) => {
            el.collectNum = el.collectNum > 99 ? '99+' : el.collectNum
            if (el.collectType === '1') {
              this.tabs[2].num = Object.assign(el.collectNum)
            }
            if (el.collectType === '2') {
              this.tabs[3].num = Object.assign(el.collectNum)
            }
            if (el.collectType === '3') {
              this.tabs[0].num = Object.assign(el.collectNum)
            }
            if (el.collectType === '4') {
              this.tabs[1].num = Object.assign(el.collectNum)
            }
          })
        })

      }
    }
  }
</script>
<style lang="scss">
  .list-tab-title {
    height: 74px;
    background: #fff;
    padding: 0 20px;
    span {
      float: left;
      height: 74px;
      line-height: 74px;
      width: 14.2%;
      text-align: center;
      cursor: pointer;
      border-bottom: 2px solid #fff;
      color: #aaa;
      position: relative;

      &.active {
        color: #000;
        border-bottom-color: #0d91e9;

        &:hover {
          background: #fff;
          border-bottom-color: #0d91e9;
        }
      }

      &:before {
        content: "";
        position: absolute;
        width: 2px;
        height: 31px;
        top: 21px;
        right: 0;
        background: #ccc;
      }

      &:last-child {
        &:before {
          display: none;
        }
      }

      &:hover {
        background: #eee;
        border-bottom-color: #eee;
      }
    }
  }

  .manage-orderinfo {
    .el-table {
      font-size: 12px;
    }
  }
</style>

