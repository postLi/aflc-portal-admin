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
      <div class="add-tip">认真填写评价平台会给你推荐最优质的货源</div>
      <h3>您可以对货主进行评价哦！</h3>
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" label-position="right" size="mini">
        <el-form-item label="" prop="carrierAddr">
          <el-form-item label-width="auto" label="货物包装：" >
            <el-rate
              show-text
              v-model="goodsRank"
              :texts="texts"
              :colors="rankColor">
            </el-rate>
          </el-form-item>
          <el-form-item label-width="auto" label="付款及时：" >
            <el-rate
              show-text
              :texts="texts"
              v-model="payRank"
              :colors="rankColor">
            </el-rate>
          </el-form-item>
          <el-form-item label-width="auto" label="装卸安排：" >
            <el-rate
              show-text
              :texts="texts"
              v-model="dockRank"
              :colors="rankColor">
            </el-rate>
          </el-form-item>
        </el-form-item>
        <el-form-item class="carrierRemarks" label="评价说明" prop="carrierRemarks">
          <el-input :rows="10" type="textarea" :maxlength="100" v-model="form.evaluationDes"></el-input>
          <div class="last-input-num">还可输入<span>{{ 100 - form.evaluationDes.length}}</span>字</div>
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
import { postNewCarrierReview } from '@/api/carrier/manage'

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
    shipperId: {
      type: String,
      default: ''
    },
    companyId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        'companyId': '',
        'assessLevel': '', // 评价等级
        'evaluationDes': '', // 评价描述
        'evaluationId': '', // 评价人ID
        'evaluationName': '', // 评价人姓名
        'orderSerial': '', // 订单流水号
        'goodsStarLevel': '', // 货物包装
        'payStarLevel': '', // 付款及时
        'dockStarLevel': '', // 装卸安排
        'shipperId': '' // 货主id
      },
      // 1 2 3 4 5
      // AF03601
      totalRate: ['AF0360203', 'AF0360202', 'AF0360201'],
      // AF03603
      // AF0360301
      priceRate: ['AF036040201', 'AF036040202', 'AF036040203', 'AF036040204', 'AF036040205'],
      // AF0360302
      goodsRate: ['AF036040101', 'AF036040102', 'AF036040103', 'AF036040104', 'AF036040105'],
      // AF0360303
      dockRate: ['AF036040301', 'AF036040302', 'AF036040303', 'AF036040304', 'AF036040305'],
      rules: {},
      // 评分
      rankColor: ['#99A9BF', '#F7BA2A', '#FF9900'],
      texts: ['非常不满意', '不满意', '一般', '满意', '非常满意'],
      goodsRank: 5,
      payRank: 5,
      dockRank: 5,
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
    goodsRank: {
      handler(newVal) {
        this.form.goodsStarLevel = this.goodsRate[newVal - 1]
        this.setTotalRank()
      },
      immediate: true
    },
    payRank: {
      handler(newVal) {
        this.form.payStarLevel = this.priceRate[newVal - 1]
        this.setTotalRank()
      },
      immediate: true
    },
    dockRank: {
      handler(newVal) {
        this.form.dockStarLevel = this.dockRate[newVal - 1]
        this.setTotalRank()
      },
      immediate: true
    }
  },
  mounted() {

  },
  methods: {
    setTotalRank() {
      const total = this.goodsRank + this.payRank + this.dockRank
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
      this.form.shipperId = this.shipperId
      this.form.companyId = this.companyId
    },
    submitFeeSetup() {
      this.$refs['ruleForm'].validate((valid) => {
        this.loading = true
        if (valid) {
          postNewCarrierReview(this.form).then(res => {
            this.$message.success('保存成功！')
            this.loading = false
            this.$emit('success')
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

