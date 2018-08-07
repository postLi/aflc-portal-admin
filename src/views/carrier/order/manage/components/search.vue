<template>
  <el-form label-width="140px" :inline="true" :size="btnsize" label-position="right" :model="searchForm"  class="staff_searchinfo clearfix">
      <el-form-item label="订单号/商品名称：">
          <el-input v-model="searchForm.orderSerialOrGoodsName" maxlength="20" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="isall" label="订单状态：">
        <select-type v-model="searchForm.orderStatus" type="AF037" >
          <el-option slot="head" label="全部" value=""></el-option>
        </select-type>
        
      </el-form-item>
      <el-form-item label="出发地：">
          <el-input v-model="searchForm.startAddress" maxlength="20" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="到达地：">
          <el-input v-model="searchForm.endAddress" maxlength="20" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="发货人：">
          <el-input v-model="searchForm.consignee" maxlength="20" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="发货人手机：">
          <el-input v-model="searchForm.consigneePhone" maxlength="20" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="收货人：">
          <el-input v-model="searchForm.consignor" maxlength="20" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="收货人手机：">
          <el-input v-model="searchForm.shiconsignorPhonepSn" maxlength="20" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="staff_searchinfo--btn">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { pickerOptions2, parseTime } from '@/utils/'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'

export default {
  name: 'order-manage-search',
  components: {
    SelectTree,
    SelectType
  },
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    orgid: {
      type: Number
    },
    issender: {
      type: Boolean,
      dafault: false
    },
    isall: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchForm: {
        'orderSerialOrGoodsName': '', // 订单流水号/货品名称
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
  watch: {
    orgid(newVal) {
    }
  },
  mounted() {
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (!this.isall) {
        delete searchObj.orderStatus
      }
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

</style>

