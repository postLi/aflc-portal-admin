<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm"  class="carrier_searchinfo clearfix">
      <el-form-item label="出发地：">
          <el-input
              placeholder=""
              v-model="searchForm.strartAddress"
              maxlength="15"
              clearable>
          </el-input>
      </el-form-item>
      <el-form-item label="到达地：">
          <el-input
              placeholder=""
              v-model="searchForm.endAddress"
              maxlength="15"
              clearable>
          </el-input>
      </el-form-item>
      <el-form-item class="carrier_searchinfo--btn">
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="info" @click="clearForm" plain>重置</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { REGEX } from '@/utils/validate'

export default {
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    orgid: {
      type: Number
    }
  },
  data() {
    const _this = this
    const validateFormMobile = function(rule, value, callback) {
      if (validateMobile(value)) {
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateFormEmployeer = function(rule, value, callback) {
      callback()
    }

    const validateFormNumber = function(rule, value, callback) {
      _this.searchForm.mobile = value.replace(REGEX.NO_NUMBER, '')
      callback()
    }

    return {
      searchForm: {
        strartAddress: '',
        endAddress: ''
      },
      rules: {
        mobile: [{
          // validator: validateFormMobile, trigger: 'blur'
          validator: validateFormNumber, trigger: 'change'
        }]
      }
    }
  },
  watch: {
    orgid(newVal) {
    }
  },
  mounted() {
  },
  methods: {
    getOrgid(id) {
    },
    onSubmit() {
      this.$emit('change', this.searchForm)
    },
    clearForm() {
      this.searchForm.strartAddress = ''
      this.searchForm.endAddress = ''
    }
  }
}
</script> 


<style lang="scss">
    .carrier_searchinfo{
        padding:10px 0 10px;
        margin: 0 10px;
        border-bottom:1px dashed #999;
        .el-form-item{
            margin-bottom: 0;
        }
        .carrier_searchinfo--btn{
          float: right;
          margin-right: 0;
        }
    }
    
@media screen and (max-width:1308px){
      .carrier_searchinfo{
          .el-form-item{
              margin-bottom: 10px;
          }
      }
      .carrier_searchinfo--btn{
          float: none;
      }
  }
</style>

