<template>
    <div class="carrierIdentification identification">
        <el-form :model="logisticsForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>完善实名认证 <span :class="{certified:logisticsForm.authStatusName == '待认证' ,certify:logisticsForm.authStatusName == '认证成功'}">( {{logisticsForm.authStatusName}} )</span> </h2>
                </div>
                <div class="prompt">
                    <p><span class="tishi"><i class="el-icon-warning"></i>小提示： </span>(打<span class="star">*</span>号为必填项)</p>
                    <p>修改完善公司基本信息后，我们将在24小时内进行人工审核，审核通过后，免费赠送您一个<span class="site">企业网站</span></p>
                </div>
            </div>
            <div class="companyInformation information">
                <h2>公司信息</h2>
                <el-form-item label="物流公司名称：" prop="companyName">
                    <el-input v-model="logisticsForm.companyName" @change="limitNum" :disabled="ifDisable === false">
                        <p slot="append">请填写企业在工商局注册的全称，完整的信息让客户更加信赖您。</p>
                    </el-input>
                </el-form-item>
                <el-form-item label="品牌：" >
                    <el-input v-model="logisticsForm.belongBrand" @change="limitNum" disabled v-if="ifDisable === false">
                    </el-input>
                    <el-select v-model="logisticsForm.belongBrandCode" placeholder="请选择" v-else>
                        <el-option
                        v-for="item in optionsBelongBrand"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司成立时间：" >
                    <el-date-picker
                    v-model="logisticsForm.foundTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :disabled="ifDisable === false"
                    value-format="timestamp"
                    :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="法人/负责人：" prop="corporation">
                    <el-input v-model="logisticsForm.corporation"  :disabled="ifDisable === false">
                        <p slot="append">与营业执照上法定代表人姓名保持一致。</p>
                    </el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码（营业执照）：" maxlength="18"  prop="creditCode">
                    <el-input v-model="logisticsForm.creditCode" :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                <el-form-item label="代收货款：" >
                        <el-radio v-model="logisticsForm.isCollection" label="1" :disabled="ifDisable === false">是</el-radio>
                        <el-radio v-model="logisticsForm.isCollection" label="0" :disabled="ifDisable === false">否</el-radio>
                </el-form-item>
                <el-form-item label="企业LOGO：" prop="companyFile">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.companyFile" v-if="ifDisable == 'false'"/>
                    <img class="showPicture" :src="logisticsForm.companyFile ? logisticsForm.companyFile: defaultImg" alt="" v-else>
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.companyFile ? true : false" v-showPicture :imgurl="logisticsForm.companyFile">点击预览</el-button>
                </el-form-item>
                <el-form-item label="公司简介："  class="textarea" prop="companyDes">
                    <el-input
                        type="textarea"
                        :disabled="ifDisable === false"
                        :autosize="{ minRows: 5, maxRows: 10}"
                        placeholder="请输入内容"
                        v-model="logisticsForm.companyDes">
                    </el-input>
                    <span>{{totalNumber}} / {{maxlength}}</span>
                    <p>建议您详细的介绍公司的物流服务，有什么服务优势，能被发货客户搜索到</p>
                </el-form-item>
                <el-form-item label="服务类型："  class="moreWidth" prop="serviceTypeArr">
                    <el-checkbox-group v-model="serviceTypeArr" >
                        <el-checkbox v-for="server in serverClassify" :label="server.code" :disabled="ifDisable === false" :key="server.id">{{server.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="产品与服务：" class="moreWidth" >
                    <el-checkbox-group v-model="productServiceCodeArr" >
                        <el-checkbox v-for="server in optionsProductService" :label="server.code" :disabled="ifDisable === false" :key="server.id">{{server.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="增值服务：" class="moreWidth">
                    <el-checkbox-group v-model="otherServiceCodeArr" >
                        <el-checkbox v-for="server in optionsOtherService" :label="server.code"  :disabled="ifDisable === false" :key="server.id">{{server.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <!-- 联系方式 -->
            <div class="contactInformation information">
                <h2>联系方式</h2>
                <el-form-item label="联系人："  prop="contactsName">
                    <el-input v-model="logisticsForm.contactsName" :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机："  label-width="150px" prop="mobile">
                    <el-input v-model="logisticsForm.mobile" maxlength="11"  v-numberOnly   :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                <el-form-item label="公司所在地：" prop="belongCityName">
                    <el-input v-model="logisticsForm.belongCityName">
                    </el-input>
                </el-form-item> 
                <el-form-item label="详细地址："  label-width="150px" prop="address">
                    <el-input v-model="logisticsForm.address">
                    </el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input v-model="logisticsForm.contactsTel" maxlength="11" :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                <el-form-item label="QQ：" label-width="150px">
                    <el-input v-model="logisticsForm.qq" v-numberOnly :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                <el-form-item label="微信二维码上传：">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.wechatCode" v-if="ifDisable == 'false'"/>
                    <img class="showPicture" :src="logisticsForm.wechatCode ? logisticsForm.wechatCode: defaultImg" alt="" v-else>
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.wechatCode ? true : false" v-showPicture :imgurl="logisticsForm.wechatCode">点击预览</el-button>
                </el-form-item>
            </div>
            <!-- 物流公司认证照片 -->
            <div class="picInformation information" >
                <h2>物流公司认证照片</h2>
                <el-form-item   label-width="50px" prop="businessLicenceFile">
                    <p><span>*</span>上传营业执照照片：</p>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.businessLicenceFile" v-if="ifDisable == 'false'"/>
                    <img class="showPicture" :src="logisticsForm.businessLicenceFile ? logisticsForm.businessLicenceFile: defaultImg" alt="" v-else>
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.businessLicenceFile ? true : false" v-showPicture :imgurl="logisticsForm.businessLicenceFile">点击预览</el-button>
                </el-form-item>
                <el-form-item   label-width="50px" prop="takeIdCardFile">
                    <p><span>*</span>负责人手持身份证正面照片：</p>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.takeIdCardFile" v-if="ifDisable == 'false'"/>
                    <img class="showPicture" :src="logisticsForm.takeIdCardFile? logisticsForm.takeIdCardFile: defaultImg" alt="" v-else>
                    
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.takeIdCardFile ? true : false" v-showPicture :imgurl="logisticsForm.takeIdCardFile">点击预览</el-button>
                </el-form-item>
                <el-form-item  label-width="50px" prop="companyFacadeFile">
                    <p><span>*</span>上传公司或者档口照片：</p>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.companyFacadeFile" v-if="ifDisable == 'false'"/>
                    <img class="showPicture" :src="logisticsForm.companyFacadeFile ? logisticsForm.companyFacadeFile: defaultImg" alt="" v-else>
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.companyFacadeFile ? true : false" v-showPicture :imgurl="logisticsForm.companyFacadeFile">点击预览</el-button>
                </el-form-item>
            </div>
            <el-form-item class="fromfooter">
                <el-button size="medium" @click="resetForm('ruleForm')" v-show="ifDisable">取消</el-button>
                <el-button size="medium" type="primary" @click="submitForm('ruleForm')" v-show="ifDisable">确认提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import '@/styles/identification.scss'
import upload from '@/components/Upload/singleImage'
import { identifyCarrier } from '@/api/carrier/index.js'
import { getDictionary,getLogisticsCompanyInfoByMobile } from '@/api/common.js'
import { REGEX } from '@/utils/validate.js'
import { getUserInfo } from '@/utils/auth.js'

export default {
    components:{
        upload,
    },
    data() {
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
            defaultImg:'/static/default.png',//默认加载失败图片
            ifDisable:false,
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                },{
                    text: '一月前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', date);
                    }
                },{
                    text: '半年前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 182);
                    picker.$emit('pick', date);
                    }
                },{
                    text: '一年前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
                    picker.$emit('pick', date);
                    }
                }]
            },
            totalNumber:0,//當前字數
            maxlength:200,
            serviceType:'AF028',//服务类型
            belongBrand:'AF029',//品牌code
            productServiceCode:'AF027',//产品与服务code
            otherServiceCode:'AF025',//增值服务code
            // belongBrand:'AF028',//品牌code
            optionsBelongBrand:[],//品牌
            optionsProductService:[],//产品与服务
            optionsOtherService:[],//增值服务

            otherServiceCodeArr:[],
            productServiceCodeArr:[],
            serviceTypeArr:[],
            serverClassify:[],
            logisticsForm: {
                companyName: '',//物流公司名称
                belongBrand: '',//品牌
                foundTime: '',//成立时间
                corporation: '',//法人
                creditCode: '',//营业执照
                isCollection: '1',//代收货款
                companyFile: '',//企业LOGO
                companyDes: '',//公司简介
                serviceType:'',//服务类型
                productServiceCode:'',//产品与服务
                otherServiceCode:'',//增值服务
                contactsName:'',//联系人
                mobile:'',//手机
                belongCityName:'',//所在地
                address:'',//详细地址
                contactsTel:'',//电话
                qq:'',
                wechatCode:'',//微信二维码
                businessLicenceFile:'',//营业执照
                takeIdCardFile:'',//身份证
                companyFacadeFile:'',//档口
            },
            rules: {
                companyName: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                ],
                corporation:[
                    {required: true, message: '请输入法人/负责人信息', trigger: 'blur'},
                ],
                creditCode:[
                    {validator: checkCreditCode, trigger: 'blur' }
                ],
                companyFile: [
                    { required: true, message: '请上传公司LOGO', trigger: 'blur' }
                ],
                companyDes: [
                    { required: true, message: '请完善公司简介内容', trigger: 'blur' },
                    { min: 30, message: '公司简介，不能少于30个字', trigger: 'blur' }
                ],
                serviceTypeArr: [
                    {required: true,validator: checkServiceTypeArr, trigger: 'change' }
                ],
                productServiceCodeArr: [
                    {required: true,validator: checkProductServiceCodeArr, trigger: 'change' }
                ],
                contactsName: [
                    { required: true, message: '请输入联系人', trigger: 'change' }
                ],
                mobile: [
                    {required: true, message: '请填写手机号码', trigger: 'blur' }
                ],
                belongCityName: [
                    { required: true, message: '请输入公司所在地', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'change' }
                ],
                businessLicenceFile:[
                    {required: true, message: '请上传上传营业执照照片', trigger: 'blur'}
                ],
                takeIdCardFile:[
                    {required: true, message: '负责人手持身份证正面照片', trigger: 'blur'}
                ],
                companyFacadeFile:[
                    {required: true, message: '上传公司或者档口照片', trigger: 'blur'}
                ],
            }
        };
    },
    computed:{
        totalNum() {
    　　　　return this.logisticsForm.companyDes;
    　　},
        disabled(){
            return this.logisticsForm.authStatusName;
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
    mounted(){
        this.getMoreInformation();
    },  
    methods: {
        getMoreInformation(){
             let res = getUserInfo() ;
            Promise.all([getDictionary(this.belongBrand),getDictionary(this.productServiceCode),getDictionary(this.otherServiceCode),getDictionary(this.serviceType),getLogisticsCompanyInfoByMobile(res.mobile)]).then(resArr => {
                // this.loading = false
                console.log(resArr)
                this.optionsBelongBrand = resArr[0].data;
                this.optionsProductService = resArr[1].data;
                this.optionsOtherService = resArr[2].data;
                this.serverClassify = resArr[3].data;
                this.logisticsForm = resArr[4].data;
                this.serviceTypeArr = JSON.parse(this.logisticsForm.serviceType) || [];
                this.productServiceCodeArr = JSON.parse(this.logisticsForm.productServiceCode)  || [];
                this.otherServiceCodeArr = JSON.parse(this.logisticsForm.otherServiceCode)  || [];

            }).catch(err => {
               
            })
        },
        limitNum(val){

            if(val.length>25){

            }
        },
        //完善信息
        completeInfo(){

            this.logisticsForm.belongBrand = this.optionsBelongBrand.find(item => item.code === this.logisticsForm.belongBrandCode)['name'];

            let serviceTypeName = [];
            let productServiceName = [];
            let otherServiceName =  [];

            this.serviceTypeArr.forEach(el=>{
                this.serverClassify.forEach(item => {
                    if(el == item.code){
                        serviceTypeName.push(item.name)
                    }
                })
            })
            
            this.productServiceCodeArr.forEach(el=>{
                this.optionsProductService.forEach(item => {
                    if(el == item.code){
                        productServiceName.push(item.name)
                    }
                })
            })

            this.otherServiceCodeArr.forEach(el=>{
                this.optionsOtherService.forEach(item => {
                    if(el == item.code){
                        otherServiceName.push(item.name)
                    }
                })
            })



            //服务类型
            this.logisticsForm.serviceType = JSON.stringify(this.serviceTypeArr);                         
            this.logisticsForm.serviceTypeName = JSON.stringify(serviceTypeName);
            //产品与服务
            this.logisticsForm.productServiceCode = JSON.stringify(this.productServiceCodeArr);                         
            this.logisticsForm.productService = JSON.stringify(productServiceName);
            //增值服务
            this.logisticsForm.otherServiceCode = JSON.stringify(this.otherServiceCodeArr);                         
            this.logisticsForm.otherService = JSON.stringify(otherServiceName);
        },
        submitForm(formName) {

            this.$refs[formName].validate((valid) => {  
                this.completeInfo();
                let form = Object.assign({},this.logisticsForm,{authStatus:'AF0010402',authStatusName:'待认证'});
                console.log(form)
                if (valid) {
                    // this.logisticsForm.
                    identifyCarrier(form).then(res=>{
                        console.log(res)
                        this.getMoreInformation();
                        this.clear();
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        clear(){
            this.optionsBelongBrand = [];//品牌
            this.optionsProductService = [];//产品与服务
            this.optionsOtherService = [];//增值服务
            this.otherServiceCodeArr = [];
            this.productServiceCodeArr = [];
            this.serviceTypeArr = [];
            this.serverClassify = [];
        },


    },
  
}
</script>

<style type="text/css" lang="scss">

        .carrierIdentification {
           
        }
        
         .carrierIdentification .el-form .information .textarea .el-form-item__content {
            .el-textarea{
                .el-textarea__inner{
                    padding-bottom: 15px;
                }
            }
        }

        .carrierIdentification .el-form .information .textarea .el-form-item__content span {
            bottom: 22px;
        }
</style>
