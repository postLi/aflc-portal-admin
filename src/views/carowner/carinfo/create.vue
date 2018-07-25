<template>
  <div class="create-carinfo page-main">
    <div class="tab-info-title">
      <h2><span>管理车源信息</span></h2>
    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h3>基本信息</h3>
      <div class="car-base-info clearfix">
      <el-form-item required  label="车牌号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item required label="车辆类型" prop="name">
        <selectType v-model="ruleForm.apportionTypeId" type="AF018" clearable size="mini"></selectType>
      </el-form-item>
      <el-form-item class="carvinfo" required label="车长" prop="name">
        长 <el-input v-model="ruleForm.name"></el-input>
        宽 <el-input v-model="ruleForm.name"></el-input>
        高 <el-input v-model="ruleForm.name"></el-input>（米）
      </el-form-item>

      <el-form-item required label="车辆载重" prop="name">
        <el-input v-model="ruleForm.name"></el-input>（吨）
      </el-form-item>
      <el-form-item required label="车辆体积" prop="name">
        <el-input v-model="ruleForm.name"></el-input>（立方米）
      </el-form-item>
      <el-form-item label="车辆规格" prop="name">
        <selectType v-model="ruleForm.apportionTypeId" type="AF009" clearable size="mini"></selectType>
      </el-form-item>
      <el-form-item required label="车辆常驻地" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="车源类型" prop="name">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="回程车"></el-radio>
          <el-radio label="本地车"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item required label="出发地" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item required label="到达地" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="途径点" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="发车时间" prop="name">
        <el-date-picker
            v-model="ruleForm.contractStarttime"
            type="date"
            placeholder="选择日期"
            value-format="timestamp"
            >
          </el-date-picker>
      </el-form-item>
      
      <el-form-item label="期望运价" prop="name">
        <el-input v-model="ruleForm.name"></el-input>元/车（运价不填自动为面议）
      </el-form-item>

      </div>

      <el-form-item label="即时/长期" prop="name">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="即时车源"></el-radio>
          <el-radio label="长期车源"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="name">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="ruleForm.textarea">
        </el-input>
        请填写备注（0-30字）。<span class="important-info">提供“原创”说明有利于提升线路效果</span>
      </el-form-item>


      <h3>车辆照片上传</h3>
      <el-form-item label="联系电话" prop="name">
        <span class="require">上传车辆45°招聘</span>
        <upload listtype="picture-card" :title="'身份证'" :showFileList="true" v-model="ruleForm.idcardPicture" />
        
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
  
    </el-form>
  </div>
</template>
<script>
import selectType from '@/components/selectType/index'
import upload from '@/components/Upload/singleImage2'

export default {
  components: {
    selectType,
    upload
  },
  data() {
    return {
      ifDisable: false,
      rules: {},
      ruleForm: {

      }
    }
  }
}
</script>
<style lang="scss">
.create-carinfo{
  padding: 10px;
  height: 100%;
  .car-base-info{
    .el-form-item{
      float: left;
      width: 50%;
    }
    .el-input{
      width: 80%;
    }
  }
  .carvinfo{
    .el-input{
      width: 50px;
    }
  }
}
</style>
