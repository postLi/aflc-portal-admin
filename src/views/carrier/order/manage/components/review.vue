<template>
  <el-dialog
    title=""
    class="add-eview"
    :visible="dialogVisible"
    custom-class="add-review"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-loading="loading"
    width="800px"
    :before-close="close">
    <div class="add-review-wrapper">
      <div class="add-tip">认真填写评价平台会给你推荐最优质的物流专线</div>
      <h3>物流公司需要您的建议哦！</h3>
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" label-position="right" size="mini">
        <el-form-item label="" prop="carrierAddr">
          <el-input v-model="form.evaluationDes" maxlength="50" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="carrierRemarks" label="评价说明" prop="carrierRemarks">
          <el-input :rows="10" type="textarea" maxlength="400" v-model="form.evaluationDes"></el-input>
          <div class="last-input-num">还可输入<span>{{ 400 - form.carrierRemarks.length}}</span>字</div>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="large" @click="close">取 消</el-button>
      <el-button size="large" type="primary" @click="submitFeeSetup">提交评价</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addReview } from '@/api/carrier/rate.js'

export default {
  components: {

  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    orderid: {
      type: String,
      default: ''
    }
  },
  computed: {

  },
  data() {
    return {
      form: {
        'assessLevel': '', // 评价等级
        'evaluationDes': '', // 评价描述
        'evaluationId': '', // 评价人ID
        'evaluationName': '', // 评价人姓名
        'orderSerial': '', // 订单流水号
        'serverPriceStarLevel': '', // 服务价格星级
        'serverQualityStarLevel': '', // 服务质量星级
        'transportAgingStarLevel': '', // 运输时效星级
        'transportRangeId': '' // 物流专线ID
      },
      rules: {},
      formLabelWidth: '150px',

      loading: false
    }
  },
  methods: {
    close(done) {
      this.$emit('update:dialogVisible', false)
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },

    submitFeeSetup() {
      this.$refs['ruleForm'].validate((valid) => {
        this.loading = true
        OrderApi.putCargoSetting(this.feeData).then(res => {
          this.loading = false
          if (res.status === 200) {
            this.$message.info('修改成功！')
            this.close()
          } else {

          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
.add-review{
  .el-dialog__header, .el-dialog__footer{
    padding: 10px 10px 20px;
  }
  .el-dialog__headerbtn{
    top: 10px;
    right: 10px;
  }
  .el-dialog__body{
    padding: 60px 50px 0;
    position: relative;

    h3{
      margin-bottom: 30px;
    }
  }
  .el-dialog__footer{
    text-align: center;
  }
  .el-dialog__title{
    font-size: 14px;
  }
  .add-tip{
    position: absolute;
    font-size: 12px;
    top: 20px;
    right: 20px;
  }

  .last-input-num{
    text-align: right;
    span{
      color: #ef0000;
    }
  }
  
}
</style>

