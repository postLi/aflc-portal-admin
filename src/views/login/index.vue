<template>
  <div class="login-container">
    <div class="login-wrapper clearfix">
    <div class="container-left">
      <img src="../../assets/login_images/left.png" alt="">
    </div>
    <div class="container-right">
        <div class="logo">
          <img  class="logo-img" src="../../assets/login_images/logo.png" alt="">
        </div>

      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
               class="card-box login-form">
        <h3 class="title">会员中心</h3>

        <!--<div v-if="errInfo">-->
          <!--<span>{{errInfo}}</span>-->
        <!--</div>-->


        <el-form-item prop="accNum">

          <!--<span class="svg-container svg-container_login">-->
          <!--<icon-svg icon-class="yonghuming" />-->
          <!--</span>-->
          <span class="el-input-group__prepend">角色</span>
          <el-select v-model="loginForm.accNum" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="username">
          <el-input name="username" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.username" :maxlength="11" autoComplete="off"
                    :placeholder="holder.username" @focus='username()' clearable>
                    <template slot="prepend">手机号</template>
         </el-input>


        </el-form-item>

        <el-form-item prop="password">
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off"
                    :placeholder="holder.password" @focus='password()' clearable>
            <template slot="prepend">密　码</template>
          </el-input>
        </el-form-item>

        <el-form-item class="login">
          <el-button class="el-but" type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>

        <div class="rember">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <p class="rember-tit" @click="forgetPsw">忘记密码</p>
        </div>
      </el-form>
    </div>
    </div>
    <div class="button-cont">
      <ul>
        <li>广州安发网络科技有限公司</li>
        <li>地址：天河区天河路石牌桥丰兴广场B座1804</li>
        <li>电话 ：020-38856254 </li>
        <li>网址：www.anfanet.com </li>
      </ul>
      <div class="down">
        <img src="../../assets/login_images/code.png" alt="">
        <p>扫描二维码下载app</p>
      </div>
    </div>

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import md5 from 'js-md5'
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的公司ID'))
      } else {
        callback()
      }
    }
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else if (!value.length) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      holder: {
        accNum: '公司ID',
        username: '账号',
        password: '密码'
      },
      options: [
        {
          label: '车主',
          value: 'aflc-1'
        },
        {
          label: '货主',
          value: 'aflc-2'
        },
        {
          label: '物流公司',
          value: 'aflc-5'
        }
      ],
      loading: false,
      checked: false,
      errInfo: false,
      // 模拟登陆信息
      loginForm: {
        accNum: 'aflc-5',
        // 130888888885 承运商 130888888881
        // 13088888886 123456  可以作为货主、车主、承运商登录
        username: '13001010101',
        // username: '13088888886',
        password: '123456',
        memberType: 'AF00107'
      },
      loginRules: {
        accNum: [{ required: true, trigger: 'blur' }],
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      }

    }
  },
  watch: {
    'loginForm.accNum': {
      handler(newVal) {
        switch (newVal) {
          case 'aflc-1':
            this.loginForm.memberType = 'AF00102'
            break
          case 'aflc-2':
            this.loginForm.memberType = 'AF00101'
            break
          case 'aflc-5':
            this.loginForm.memberType = 'AF00107'
            break
        }
      },
      immidate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.loading = true
          const data = Object.assign({}, this.loginForm)
          data.mobile = data.username
          data.username = data.username + '|' + this.loginForm.accNum
          // console.log('md5',data);
          data.password = md5(data.password)
          this.$store.dispatch('Login', data).then(() => {
            // if (!this.loginForm.accNum) {
            //   this.errInfo = true
            //   this.errInfo = '该公司Id不存在'
            // } else if (!this.loginForm.username) {
            //   this.errInfo = true
            //   this.errInfo = '该用户名不存在'
            // } else if (!this.loginForm.password) {
            //   this.errInfo = true
            //   this.errInfo = '输入的密码错误'
            // }
            this.loading = false
            // 获取登录前的页面地址
            // 有可能会出现前一个页面是现在登录账号没有权限访问的？
            // const nexturl = this.$route.query.tourl
            // this.$router.push({ path: nexturl && nexturl.indexOf('/login') === -1 ? nexturl : '/' })
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    forgetPsw() {
      // this.$router.push({ path: '/' })
    },
    accNum() {
      this.holder = ''
    },
    username() {
      this.holder = ''
    },
    password() {
      this.holder = ''
    }
  },
  mounted(){
    // console.log(getCookie,'2222222222');
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../styles/mixin.scss";
  @import "../../styles/login-index.css";

.login-container{
  .el-form-item__content{
    display: flex;
    &>span{
      width: 65px;
    }
  }
}
</style>
