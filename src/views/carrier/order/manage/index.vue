<template>
  <div class="manage-orderinfo page-main">
    <div class="list-tab-title">
      <span @click="component = item.name" v-for="(item,index) in tabs" :key="index">{{item.title}}</span>
    </div>
    <div class="list-tab-content">
      <keep-alive>
        <component v-bind:is="component"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import all from './all'
import chengyun from './chengyun'
import tihuo from './tihuo'
import fahuo from './fahuo'
import shouhuo from './shouhuo'
import pingjia from './pingjia'
import wancheng from './wancheng'
import quxiao from './quxiao'

export default {
  components: {
    all,
    chengyun,
    tihuo,
    fahuo,
    shouhuo,
    pingjia,
    wancheng,
    quxiao
  },
  data() {
    return {
      tabs: [{
        title: '所有订单',
        name: 'all'
      }, {
        title: '待承运',
        name: 'chengyun'
      }, {
        title: '待提货',
        name: 'tihuo'
      }, {
        title: '待发货',
        name: 'fahuo'
      }, {
        title: '待收货',
        name: 'shouhuo'
      }, {
        title: '待评价',
        name: 'pingjia'
      }, {
        title: '已完成',
        name: 'wancheng'
      }, {
        title: '已取消',
        name: 'quxiao'
      }],
      component: 'all'
    }
  }
}
</script>
