<template>
  <div class="create-range page-main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h3>基本信息</h3>
      <el-form-item label="出发地" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="到达地" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <h3>价格时效</h3>
      <el-form-item label="联系电话" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="天"></el-radio>
          <el-radio label="小时"></el-radio>
          <el-radio label="多天"></el-radio>
        </el-radio-group>
        (多天填写如：2-5，其它只能填写阿拉伯数字)
      </el-form-item>

      <el-form-item label="发车频率" prop="name">
        <el-input v-model="ruleForm.name"></el-input> 天
        <el-input v-model="ruleForm.name"></el-input> 次
      </el-form-item>

       <el-form-item label="最低一票价格" prop="name">
        报价<el-input v-model="ruleForm.name"></el-input> 元
      </el-form-item>

      <el-form-item label="发车时间" prop="name">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="请选择发车时间" value=""></el-option>
          <el-option label="上午发车" value="shanghai"></el-option>
          <el-option label="中午发车" value="shanghai"></el-option>
          <el-option label="下午发车" value="shanghai"></el-option>
          <el-option label="晚上发车" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="线路说明：" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        请对您的线路进行补充说明，尽量使用市场上或物流行业内的常用词。
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
  
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {}
    }
  }
}
</script>
<style lang="scss">
.page-main{
  padding: 10px;
  height: 100%;
}
</style>
