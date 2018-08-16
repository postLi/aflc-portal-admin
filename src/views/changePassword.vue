<template>
    <div class="ChangePassword identification page-main">
        <el-form :rules="rules" :model="logisticsForm" ref="ruleForm" label-width="200px" class="demo-ruleForm">
           <div class="carrierTitle">
                <div class="realname">
                    <h2>修改登录密码</h2>
                </div>
                <div class="prompt">
                    <p><span class="tishi"><i class="el-icon-warning"></i>小提示： </span>(打<span class="star">*</span>号为必填项)</p>
                </div>
            </div>
            <div class="searchInformation information">
                <div class="current-name">
                    <span>您的会员登录名是：</span>{{ otherinfo.contactsName }}
                </div>
                <el-form-item required prop="oldPassword" label="旧密码">
                    <el-input type="password" v-model="logisticsForm.oldPassword">
                    </el-input>
                </el-form-item>
                <el-form-item required prop="newPassword" label="新密码">
                    <el-input type="password" v-model="logisticsForm.newPassword">
                    </el-input>
                </el-form-item>
                <el-form-item required prop="surePassword" label="确认新密码">
                    <el-input type="password" v-model="logisticsForm.surePassword">
                    </el-input>
                </el-form-item>
            </div>
            <div class="button-area">
                <el-button type="success" @click="submitForm">修 改</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>

import '@/styles/identification.scss'
import { putChangeMyPassword } from '@/api/common.js'
import { REGEX } from '@/utils/validate.js'

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.logisticsForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (this.isCheck === 'false') {
        callback(new Error('请输入正确的密码！'))
        this.isCheck = ''
      } else {
        callback()
      }
    }
    return {
      defaultImg: '/static/default.png', // 默认加载失败图片
      totalCount: 0,
      page: 1,
      pagesize: 20,
      logisticsForm: {
        oldPassword: '', // 旧密码
        newPassword: '', // 新密码
        mobile: '', // 手机号
        surePassword: '' // 确认密码
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          {
            validator: validatePass, message: '请输入正确的密码'
          }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        surePassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {

  },
  mounted() {
    this.logisticsForm.mobile = this.otherinfo.mobile
  },
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          putChangeMyPassword(this.otherinfo.rolesIdList[0], this.logisticsForm).then(res => {
            this.$message.success('修改成功！')
            this.$refs['ruleForm'].resetFields()
          }).catch(err => {
            // this.$message.error('修改失败: ' + JSON.stringify(err))
            this.isCheck = 'false'
            this.$refs['ruleForm'].validate()
            this.$message.error('修改失败: ' + err.errorInfo)
          })
        }
      })
    }
  }

}
</script>

<style type="text/css" lang="scss">
.ChangePassword{
    .current-name{
        color: rgb(19,145,206);
        span{
            display: inline-block;
            width: 200px;
            text-align: right;
            margin-bottom: 20px;
            color: #666;
            margin-right: 20px;
        }
    }
.el-form .carrierTitle{
    margin-bottom: 0;
    
}
.el-form  .information{
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    background: #fff;
    padding-right: 40%;
    .el-form-item:last-child{
      margin-bottom: 0;
    }
}
.button-area{
    background: #fff;
    padding: 30px 0 20px;
    padding-left: 330px;

}
}
</style>
