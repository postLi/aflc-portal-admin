<template>
    <div class="ChangePassword identification">
        <el-form :model="logisticsForm" ref="ruleForm" label-width="200px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>修改登录密码</h2>
                </div>
            </div>
            <div class="searchInformation information">
                <div class="current-name">
                    <span>您的会员登录名是：</span>{{ otherinfo.contactsName }}
                </div>
                <el-form-item required  label="旧密码">
                    <el-input type="password" v-model="logisticsForm.pointName">
                    </el-input>
                </el-form-item>
                <el-form-item required  label="新密码">
                    <el-input type="password" v-model="logisticsForm.pointName">
                    </el-input>
                </el-form-item>
                <el-form-item required  label="确认新密码">
                    <el-input type="password" v-model="logisticsForm.pointName">
                    </el-input>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>

import '@/styles/identification.scss'
import { getDictichangegetLogisticsCompanyInfoByMobile } from '@/api/common.js'
import { getPointNetwork, PointNetworkStatus, deletePointNetwork } from '@/api/carrier/index.js'
import { REGEX } from '@/utils/validate.js'
import upload from '@/components/Upload/singleImage'

export default {
  components: {
    upload
  },
  data() {
    return {
      defaultImg: '/static/default.png', // 默认加载失败图片
      totalCount: 0,
      page: 1,
      pagesize: 20,
      logisticsForm: {
        pointName: '', // 网点名称
        address: '', // 网点详细地址
        name: '', // 联系人
        mobile: '', // 手机号
        telNum: '' // 固定电话
      }
    }
  },
  watch: {

  },
  mounted() {
    this.firstblood()
  },
  methods: {
        // 完善信息
    completeInfo() {

    },

    firstblood() {
      getPointNetwork(this.page, this.pagesize, this.logisticsForm).then(res => {
        console.log(res)
        this.tableData = res.data.list
        this.totalCount = res.data.totalCount
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
}
</style>
