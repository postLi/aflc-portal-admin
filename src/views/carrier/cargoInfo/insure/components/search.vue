<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :model="searchForm"  class="orderlist-search staff_searchinfo clearfix">
     <div class="search_warrper">
        <el-form-item label="投保：">
            <el-input v-model="searchForm.insuranceName" placeholder="保险公司/产品名称/被保险人" :maxlength="50" auto-complete="off"></el-input>
        </el-form-item>
      </div>
      <el-form-item class="staff_searchinfo--btn">
        <el-button size="mini" icon="el-icon-search" type="primary" @click="onSubmit">搜索</el-button>
        <el-button size="mini" icon="el-icon-close" type="info" @click="clearForm" plain>重置</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
// import { pickerOptions2, parseTime } from '@/utils/'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'

export default {
  name: 'cargoInfo-insure-search',
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
    isall: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchForm: {
        insuranceName: ''
      }
    }
  },
  watch: {
    orgid(newVal) {
    }
  },
  mounted() {
    // if (this.$route.query.orderSerial) {
    //   this.searchForm.insuranceName = this.$route.query.orderSerial
    // }
    this.onSubmit()
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
        insuranceName: '' 
      }
    }
  }
}
</script>


<style lang="scss">
.orderlist-search{
  display: flex;

  .staff_searchinfo--btn{
    flex: 0 0 170px;
    align-self: flex-end;
    display: flex;

  }

  .el-form-item{
    margin-right: 0;
    margin-bottom: 10px;
  }

  .el-input--suffix .el-input__inner{
    padding-right: 15px;
  }
  .el-input--mini .el-input__inner{
    width:200px;

  }
  .el-form-item{
    margin-right: 30px !important;
  }
  
}
</style>

