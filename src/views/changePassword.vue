<template>
    <div class="PointNetwork identification">
        <el-form :model="logisticsForm" ref="ruleForm" label-width="90px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>管理我的网点</h2>
                </div>
            </div>
            <div class="searchInformation information">
                <el-form-item label="网点名称">
                    <el-input v-model="logisticsForm.pointName">
                    </el-input>
                </el-form-item>
                <el-form-item label="网点地址：">
                    <el-input v-model="logisticsForm.address">
                    </el-input>
                </el-form-item>
                <el-form-item label="联系人：" maxlength="18" >
                    <el-input v-model="logisticsForm.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机：">
                    <el-input v-model="logisticsForm.mobile" maxlength="11">
                    </el-input>
                </el-form-item>
                <el-form-item label="固话：">
                     <el-input v-model="logisticsForm.telNum" maxlength="11">
                    </el-input>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>

import '@/styles/identification.scss'
import { getDictionary,getLogisticsCompanyInfoByMobile, } from '@/api/common.js'
import { getPointNetwork,PointNetworkStatus,deletePointNetwork } from '@/api/carrier/index.js'
import { REGEX } from '@/utils/validate.js'
import upload from '@/components/Upload/singleImage'

export default {
    components:{
        upload
    },
    data() {
       
        return {
            defaultImg:'/static/default.png',//默认加载失败图片
            totalCount:0,
            page:1,
            pagesize:20,
            logisticsForm: {
                pointName: '',//网点名称
                address: '',//网点详细地址
                name: '',//联系人
                mobile: '',//手机号
                telNum: '',//固定电话
            },
        };
    },
    watch:{

    },
    mounted(){
        this.firstblood();
    },  
    methods: {
        //完善信息
        completeInfo(){

            
        },

        firstblood(){
            getPointNetwork(this.page,this.pagesize,this.logisticsForm).then(res=>{
                console.log(res)
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
            })
        },
    },
  
}
</script>

<style type="text/css" lang="scss">
   
</style>
