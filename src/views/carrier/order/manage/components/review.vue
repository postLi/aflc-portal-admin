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
          <el-form-item label-width="auto" label="服务价格：" >
            <el-rate
              show-text
              v-model="priceRank"
              :texts="texts"
              :colors="rankColor">
            </el-rate>
          </el-form-item>
          <el-form-item label-width="auto" label="服务质量：" >
            <el-rate
              show-text
              :texts="texts"
              v-model="serviceRank"
              :colors="rankColor">
            </el-rate>
          </el-form-item>
          <el-form-item label-width="auto" label="运输时效：" >
            <el-rate
              show-text
              :texts="texts"
              v-model="shipRank"
              :colors="rankColor">
            </el-rate>
          </el-form-item>
        </el-form-item>
        <el-form-item class="carrierRemarks" label="评价说明" prop="carrierRemarks">
          <el-input :rows="10" type="textarea" :maxlength="400" v-model="form.evaluationDes"></el-input>
          <div class="last-input-num">还可输入<span>{{ 400 - form.evaluationDes.length}}</span>字</div>
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
import { postNewReview } from '@/api/carrier/manage'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    orderSerial: {
      type: String,
      default: ''
    },
    transportRangeId: {
      type: String,
      default: ''
    }
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
      // 1 2 3 4 5
      // AF03601
      totalRate: ['AF0360203', 'AF0360202', 'AF0360201'],
      // AF03603
      // AF0360301
      priceRate: ['AF036030101', 'AF036030102', 'AF036030103', 'AF036030104', 'AF036030105'],
      // AF0360302
      serviceRate: ['AF036030201', 'AF036030202', 'AF036030203', 'AF036030204', 'AF036030205'],
      // AF0360303
      shipRate: ['AF036030301', 'AF036030302', 'AF036030303', 'AF036030304', 'AF036030305'],
      rules: {},
      // 评分
      rankColor: ['#99A9BF', '#F7BA2A', '#FF9900'],
      texts: ['非常不满意', '不满意', '一般', '满意', '非常满意'],
      priceRank: 5,
      serviceRank: 5,
      shipRank: 5,
      formLabelWidth: '150px',

      loading: false
    }
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        this.reset()
      }
    },
    priceRank: {
      handler(newVal) {
        this.form.serverPriceStarLevel = this.priceRate[newVal - 1]
        this.setTotalRank()
      },
      immediate: true
    },
    serviceRank: {
      handler(newVal) {
        this.form.serverQualityStarLevel = this.serviceRate[newVal - 1]
        this.setTotalRank()
      },
      immediate: true
    },
    shipRank: {
      handler(newVal) {
        this.form.transportAgingStarLevel = this.shipRate[newVal - 1]
        this.setTotalRank()
      },
      immediate: true
    }
  },
  mounted() {

  },
  methods: {
    setTotalRank() {
      const total = this.priceRank + this.serviceRank + this.shipRank
      if (total < 7) {
        this.form.assessLevel = this.totalRate[0]
      } else if (total < 10) {
        this.form.assessLevel = this.totalRate[1]
      } else {
        this.form.assessLevel = this.totalRate[2]
      }
    },
    close(done) {
      this.$emit('update:dialogVisible', false)
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    reset() {
      this.form = Object.assign({}, this.$data.form)
      this.form.evaluationId = this.otherinfo.id
      this.form.evaluationName = this.otherinfo.contactsName
      this.form.orderSerial = this.orderSerial
      this.form.transportRangeId = this.transportRangeId
    },
    submitFeeSetup() {
      this.$refs['ruleForm'].validate((valid) => {
        this.loading = true
        if (valid) {
          postNewReview(this.form).then(res => {
            this.$message.success('保存成功！')
            this.loading = false
            this.close()
          }).catch(err => {
            this.$message.error('保存失败：' + JSON.stringify(err))
            this.loading = false
          })
        }
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

