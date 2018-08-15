<template>
    <div class="newPointNetwork identification">
        <el-form :model="logisticsForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>发布我的网点</h2>
                </div>
            </div>
            <div class="companyInformation information">
                <h2>基本信息</h2>
                <el-form-item label="网点名称" prop="pointName">
                    <el-input v-model="logisticsForm.pointName">
                        <p slot="append">请填写网点名称</p>
                    </el-input>
                </el-form-item>
                <el-form-item label="网点地址：">
                    <el-input @focus="()=>{showMap('strartAddress')}" v-model="logisticsForm.address"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" maxlength="18"  prop="name">
                    <el-input v-model="logisticsForm.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机：" prop="mobile">
                    <el-input v-model="logisticsForm.mobile" maxlength="11" v-numberOnly>
                    </el-input>
                </el-form-item>
                <el-form-item label="固话：">
                     <el-input v-model="logisticsForm.telNum" maxlength="11" v-numberOnly>
                    </el-input>
                </el-form-item>
                <el-form-item label="QQ：" >
                     <el-input v-model="logisticsForm.contactQq" v-numberOnly>
                            <p slot="append">填写QQ，方便物流公司联系您</p>
                    </el-input>
                </el-form-item>
                <el-form-item label="网点LOGO：">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.pointFile" />
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.pointFile ? true : false" v-showPicture :imgurl="logisticsForm.pointFile">点击预览</el-button>
                </el-form-item>
            </div>
            <el-form-item class="fromfooter">
                <el-button size="medium" type="primary" @click="submitForm('ruleForm')" v-if="logisticsForm.id">保存</el-button>
                <el-button size="medium" type="primary" @click="submitForm('ruleForm')" v-else>立即发布</el-button>
            </el-form-item>
        </el-form>


        <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" />

    </div>

    
</template>

<script>

import '@/styles/identification.scss'
import { getDictionary,getLogisticsCompanyInfoByMobile } from '@/api/common.js'
import { NewPointNetwork,changePointNetwork } from '@/api/carrier/index.js'
import { REGEX } from '@/utils/validate.js'
import upload from '@/components/Upload/singleImage'
import tmsmap from '@/components/map/index'
import { getUserInfo } from '@/utils/auth.js'


export default {
    components:{
        upload,
        tmsmap
    },
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
        // '$route.params': {
        //     handler(newVal){
        //         if(newVal.data){
        //             this.getParams();
        //         }else{
        //            return false
        //         }
        //     },
        //     deep:true,
        // }
    },
    data() {
        var checkMobile = (rule, value, callback) => {
            if(!value){
                return callback(new Error('请输入手机号码'))
            }
            else if(!REGEX.MOBILE.test(value)){
                return callback(new Error('请输入正确的手机号码格式'));
            }else{
                callback()
            }
        };
        var checkCreditCode = (rule, value, callback) => {
            if(value && !REGEX.ENGLISH_AND_NUMBER.test(value)){
                return callback(new Error('仅可输入数字或者英文字母'));
            }else{
                callback()
            }
        };
        var checkServiceTypeArr = (rule, value, callback) => {
            if (this.serviceTypeArr.length == 0) {
                return callback(new Error('请至少选择一项'));
            }else {
              callback();
            }
        };
        var checkProductServiceCodeArr = (rule, value, callback) => {
            if (this.productServiceCodeArr.length == 0) {
                return callback(new Error('请至少选择一项'));
            }else {
              callback();
            }
        };
        return {
            current:'',
            popVisible:false,
            logisticsForm: {
                pointName: '',//网点名称
                address: '',//网点详细地址
                province:'',
                city:'',
                area:'',
                name: '',//联系人
                mobile: '',//手机号
                telNum: '',//固定电话
                contactQq: '',//qq
                pointFile:'',//企业LOGO
                belongCityName:'',
                longitude:'',//经度
                latitude:'',//纬度
                publishName:'',
                publishId:''
            },
            rules: {
                pointName: [
                    { required: true, message: '请输入网点名称', trigger: 'blur' },
                ],
                name:[
                    {required: true, message: '请输入联系人', trigger: 'blur'},
                ],
                mobile:[
                    {required: true,validator: checkMobile, trigger: 'blur' }
                ],
                companyFile: [
                    { required: true, message: '请上传公司LOGO', trigger: 'blur' }
                ],
            }
        };
    },
    mounted(){
        this.getParams() ;
    },  
    methods: {
        getInfo(pos, name, info) {
            // info.name  info.pos
            console.log(pos, name, info)
            let posArr = pos.split(',');
            this.logisticsForm.address = name ;
            this.logisticsForm.longitude = posArr[0];
            this.logisticsForm.latitude = posArr[1];
            this.logisticsForm.province = info.addressComponent.province,
            this.logisticsForm.city = info.addressComponent.city,
            this.logisticsForm.area = info.addressComponent.district,
            this.logisticsForm.belongCityName = info.addressComponent.province + info.addressComponent.city+ info.addressComponent.district;
        },
        showMap(name) {
            this.popVisible = true ;
            this.current = name
        },
        getParams(){
            if(this.$route.params.data){
                let dataObj = this.$route.params.data;//接收数据
                this.logisticsForm = Object.assign({},dataObj);
            }else{
                return 
            }
            console.log(this.logisticsForm)
        },
        submitForm(formName) {

            this.$refs[formName].validate((valid) => {  
                if (valid) {
                    let userInfo = getUserInfo();
                    this.logisticsForm.companyName = userInfo.companyName;
                    this.logisticsForm.companyId = userInfo.id;
                    let commitFunction;
                    if(this.logisticsForm.id){
                        commitFunction = changePointNetwork(this.logisticsForm);
                    }else{
                        commitFunction = NewPointNetwork(this.logisticsForm);
                    }
                    commitFunction.then(res=>{
                        console.log('res',res)
                        if(res.status == 200){
                            this.$alert('操作成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push({name: '管理我的网点'});
                                }
                            });
                        }else{
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + res.errorInfo ? res.errorInfo : res.text
                            })
                        }
                    }).catch(err=>{
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                        })
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
  
}
</script>

<style type="text/css" lang="scss">

    .newPointNetwork .el-form .information > .el-form-item .el-form-item__content {
        line-height: 28px;
        width: 25%;
    }
</style>
