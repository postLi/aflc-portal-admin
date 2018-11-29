<template>
  <el-form label-width="140px" :inline="true" size="mini" label-position="right" :model="searchForm"
           class="orderlist-search staff_searchinfo clearfix">
    <div class="search_warrper" v-if="isAllSupplyl">
      <el-form-item label="出发地：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="到达地：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="货源类型：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="货物名称：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="公司名：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="发货人：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="发货人手机：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
    </div>
    <div class="search_warrper" v-if="isSpacialLine">
      <el-form-item label="出发地：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="到达地：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="公司名：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
    </div>
    <div class="search_warrper" v-if="isPhysicalDis">
      <el-form-item label="公司名：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所在地：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
    </div>
    <div class="search_warrper" v-if="isCarSoure">
      <el-form-item label="出发地：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="到达地：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="车辆类型：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="车源类型：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="常驻地：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="即时/长期：">
        <el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
    </div>
    <el-form-item class="staff_searchinfo--btn">
      <el-button size="mini" icon="el-icon-search" type="primary" @click="onSubmit">搜索</el-button>
      <el-button size="mini" icon="el-icon-close" type="info" @click="clearForm" plain>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "search",
    props:{
      isall: {
        type: Boolean,
        default: false
      },
      isAllSupplyl: {
        type: Boolean,
        default: false
      },
      isSpacialLine: {
        type: Boolean,
        default: false
      },
      isPhysicalDis: {
        type: Boolean,
        default: false
      },
      isCarSoure: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        searchForm: {
          'orderSerialOrGoodsName': '1111', // 订单流水号/货品名称
          orderStatus: 'AF03701', // 订单状态
          startAddress: '', // 出发地
          endAddress: '', // 目的地
          consignee: '', // 收货人
          consigneePhone: '', // 收货人手机
          consignor: '', // 发货人
          consignorPhone: '' // 发货人手机
        }
      }
    },
    methods: {
      onSubmit() {
        const searchObj = Object.assign({}, this.searchForm)
        if (!this.isall) {
          delete searchObj.orderStatus
        }
        console.log('this.searchForm2:', this.searchForm, JSON.stringify(searchObj))
        this.$emit('change', searchObj)
      },
      clearForm() {
        this.searchForm = {
          'orderSerialOrGoodsName': '', // 订单流水号/货品名称
          orderStatus: 'AF03701', // 订单状态
          startAddress: '', // 出发地
          endAddress: '', // 目的地
          consignee: '', // 收货人
          consigneePhone: '', // 收货人手机
          consignor: '', // 发货人
          consignorPhone: '', // 发货人手机
          wlName: ''
        }
      }
    }
  }
</script>

<style lang="scss">
  .orderlist-search {
    display: flex;

    .staff_searchinfo--btn {
      flex: 0 0 170px;
      align-self: flex-end;
      display: flex;

    }

    .el-form-item {
      margin-right: 0;
      margin-bottom: 10px;
    }

    .el-input--suffix .el-input__inner {
      padding-right: 15px;
    }
  }
</style>
