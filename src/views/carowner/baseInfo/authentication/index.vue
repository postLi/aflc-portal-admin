<template>
    <div class="carownerIdentification identification">
        <el-form :model="logisticsForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>完善实名认证 <span  :class="{certified:logisticsForm.driverStatusName == '待认证' ,certify:logisticsForm.driverStatusName == '认证成功'}">( {{logisticsForm.driverStatusName}} )</span> </h2>
                </div>
                <div class="prompt">
                    <p><span class="tishi"><i class="el-icon-warning"></i>小提示： </span>(打<span class="star">*</span>号为必填项)</p>
                    <p>修改完善公司基本信息后，我们将在24小时内进行人工审核，审核通过后，免费赠送您一个<span class="site">企业网站</span></p>
                </div>
            </div>
            <div class="companyInformation information">
                <h2>基本信息</h2>
                <el-form-item label="车主：" prop="driverName">
                    <el-input v-model="logisticsForm.driverName"  placeholder="请填写车主姓名" :disabled="ifDisable === false">
                    </el-input>
                </el-form-item> 
                <el-form-item label="身份证号：" prop="driverCardid">
                     <el-input v-model="logisticsForm.driverCardid" placeholder="请输入18位身份证号" :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号码：" prop="driverMobile"> 
                     <el-input v-model="logisticsForm.driverMobile" maxlength="11" v-numberOnly :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                <el-form-item label="车主QQ：" prop="QQ">             
                    <el-input v-model="logisticsForm.qq" v-numberOnly :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                <el-form-item label="车主简介："  class="textarea"  prop="driverDesc">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 10}"
                        placeholder="请输入内容"
                        :disabled="ifDisable === false"
                        v-model="logisticsForm.driverDesc" :maxlength="maxlength">
                    </el-input>
                    <p>{{totalNumber}} / {{maxlength}}</p>
                </el-form-item>
            </div>
            <!-- 物流公司认证照片 -->
            <div class="picInformation information" >
                <h2>车主认证照片</h2>
                <el-form-item    prop="drivingLicenceFile">
                    <p><span>*</span>上传驾驶证照片：</p>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.drivingLicenceFile" v-if="ifDisable == 'false'"/>
                    <img class="showPicture" :src="logisticsForm.drivingLicenceFile ? logisticsForm.drivingLicenceFile: defaultImg" alt="驾驶证照片"  v-else/>
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.drivingLicenceFile ? true : false" v-showPicture :imgurl="logisticsForm.drivingLicenceFile">点击预览</el-button>
                </el-form-item>
                <el-form-item    prop="idCardFile">
                    <p><span>*</span>上传车主身份证照片：</p>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.idCardFile" v-if="ifDisable == 'false'"/>
                    <img class="showPicture" :src="logisticsForm.idCardFile ? logisticsForm.idCardFile: defaultImg" alt="车主身份证照片" v-else/>
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.idCardFile ? true : false" v-showPicture :imgurl="logisticsForm.idCardFile">点击预览</el-button>
                </el-form-item>
                <el-form-item   prop="personalImageFile">
                    <p><span>*</span>上传车主个人形象照：</p>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.personalImageFile" v-if="ifDisable == 'false'"/>
                    <img class="showPicture" :src="logisticsForm.personalImageFile ? logisticsForm.personalImageFile: defaultImg" alt="车主个人形象照" v-else/>
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.personalImageFile ? true : false" v-showPicture :imgurl="logisticsForm.personalImageFile">点击预览</el-button>
                </el-form-item>
            </div>
            <el-form-item class="fromfooter">
                <el-button size="medium" @click="resetForm('ruleForm')" v-show="ifDisable">取消</el-button>
                <el-button size="medium" type="primary" @click="submitForm('ruleForm')" v-show="ifDisable">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import '@/styles/identification.scss'

import upload from '@/components/Upload/singleImage'
import { identifyOwner } from '@/api/carowner/index.js'
import { getDictionary,getDriverInfoByMobile } from '@/api/common.js'
import { REGEX } from '@/utils/validate.js'
import { getUserInfo } from '@/utils/auth.js'

export default {
    components:{
        upload,
    },
    computed: {
        totalNum() {
    　　　　return this.logisticsForm.driverDesc
    　　},
        disabled(){
            return this.logisticsForm.driverStatusName;
        }
    },
    watch:{
        totalNum:{
            handler(val, oldVal){
            //    console.log(val.length)
                if(val){

                    this.totalNumber = val.length;
                }
            },
            deep:true
        },
        disabled:{
            handler(newVal){
                if(newVal == '待认证' || newVal == '认证成功'){
                    this.ifDisable = false;
                }else{
                    this.ifDisable = true;
                }
            },
            deep:true
        }
    },
    data() {
        var checkDriverCardid = (rule, value, callback) => {
            if(!value){
                return callback(new Error('请输入身份证号码'))
            }
            else if(!REGEX.ID_CARD.test(value)){
                return callback(new Error('请输入正确的二代身份证号码'));
            }else{
                callback()
            }
        };
        return {
            defaultImg:'/static/default.png',//默认加载失败图片
            ifDisable:false,
            totalNumber:0,//当前字数
            maxlength:200,
            logisticsForm: {
                driverName: '',//车主名称
                driverCardid: '',//生份证号
                driverMobile: '',//手机号码
                qq: '',//qq
                driverDesc: '',//车主描述
                drivingLicenceFile:'',//驾驶证件
                idCardFile:'',//身份证
                personalImageFile:'',//個人形象照
            },
            rules: {
                driverName: [
                    { required: true, message: '请输入车主名称', trigger: 'blur' },
                ],
                driverCardid:[
                    {required: true, validator: checkDriverCardid, trigger: 'blur'},
                ],
                driverDesc: [
                    { required: true, message: '请完善个人内容', trigger: 'blur' },
                    { min: 30, message: '车主简介，不能少于30个字', trigger: 'blur' }
                ],
                driverMobile: [
                    {required: true, message: '请填写手机号码', trigger: 'blur' }
                ],
                drivingLicenceFile:[
                    {required: true, message: '请上传驾驶证照片', trigger: 'blur'}
                ],
                idCardFile:[
                    {required: true, message: '请上传车主身份证照片', trigger: 'blur'}
                ],
                personalImageFile:[
                    {required: true, message: '请上传车主个人形象照', trigger: 'blur'}
                ],
            }
        };
    },
    mounted(){
        this.getMoreInformation();
    },  
    methods: {
        getMoreInformation(){
           let res = getUserInfo() ;
        //    console.log(res)
           getDriverInfoByMobile(res.mobile).then(res=>{
            //    console.log(res)
               this.logisticsForm = res.data;
           })

        },
        submitForm(formName) {

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // this.logisticsForm.
                    let form = Object.assign({},this.logisticsForm,{driverStatus:'AF0010402'})
                    identifyOwner(this.logisticsForm).then(res=>{
                        console.log(res)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
  
}
</script>

<style type="text/css" lang="scss">
        .carownerIdentification .el-form .information .textarea .el-form-item__content {
            .el-textarea{
                position: relative;
                .el-textarea__inner{
                    padding-bottom: 15px;
                }
            }
        }
        
        .carownerIdentification .el-form .information .textarea .el-form-item__content p {
            position: absolute;
            right: 18px;
            bottom: -5px;
        }
        
      

</style>

