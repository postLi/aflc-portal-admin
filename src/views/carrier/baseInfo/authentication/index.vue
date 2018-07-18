<template>
    <div class="carrierIdentification">
        <el-form :model="logisticsForm" :rules="rules" ref="ruleForm" label-width="400px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>完善实名认证 <span >( 未认证 )</span> </h2>
                </div>
                <div class="prompt">
                    <p><span class="tishi"><i class="el-icon-warning"></i>小提示： </span>(打<span class="star">*</span>号为必填项)</p>
                    <p>修改完善公司基本信息后，我们将在24小时内进行人工审核，审核通过后，免费赠送您一个<span class="site">企业网站</span></p>
                </div>
            </div>
            <div class="companyInformation information">
                <h2>公司信息</h2>
                <el-form-item label="物流公司名称：" >
                    <el-input v-model="logisticsForm.companyName">
                        <p slot="append">请填写企业在工商局注册的全称，完整的信息让客户更加信赖您。</p>
                    </el-input>
                </el-form-item>
                <el-form-item label="品牌：" >
                    <el-select v-model="logisticsForm.belongBrand" placeholder="请选择">
                        <el-option
                        v-for="item in optionsBelongBrand"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司成立时间：" >
                    <el-input v-model="logisticsForm.foundTime">
                    </el-input>
                </el-form-item>
                <el-form-item label="法人/负责人：" >
                    <el-input v-model="logisticsForm.corporation">
                        <p slot="append">与营业执照上法定代表人姓名保持一致。</p>
                    </el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码（营业执照）：" >
                    <el-input v-model="logisticsForm.creditCode">
                    </el-input>
                </el-form-item>
                <el-form-item label="代收货款：" >
                        <el-radio v-model="logisticsForm.isCollection" label="1">是</el-radio>
                        <el-radio v-model="logisticsForm.isCollection" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="企业LOGO：" >
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.companyFile" />
                </el-form-item>
                <el-form-item label="公司简介："  class="textarea">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 10}"
                        placeholder="请输入内容"
                        v-model="logisticsForm.companyDes">
                    </el-input>
                    <p>建议您详细的介绍公司的物流服务，有什么服务优势，能被发货客户搜索到</p>
                </el-form-item>
                <el-form-item label="服务类型："  class="moreWidth">
                    <el-checkbox-group v-model="serviceTypeArr" >
                        <el-checkbox v-for="server in serverClassify" :label="server.label" :key="server.label">{{server.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="产品与服务：" class="moreWidth">
                    <el-checkbox-group v-model="productServiceCodeArr" >
                        <el-checkbox v-for="server in optionsProductService" :label="server.code" :key="server.id">{{server.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="增值服务：" class="moreWidth">
                    <el-checkbox-group v-model="otherServiceCodeArr" >
                        <el-checkbox v-for="server in optionsOtherService" :label="server.code" :key="server.id">{{server.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <!-- 联系方式 -->
            <div class="contactInformation information">
                <h2>联系方式</h2>
                <el-form-item label="联系人："  >
                    <el-input v-model="logisticsForm.contactsName">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机："  label-width="200px">
                    <el-input v-model="logisticsForm.mobile" maxlength="11" v-numberOnly>
                    </el-input>
                </el-form-item>
                <el-form-item label="公司所在地：" >
                    <el-input v-model="logisticsForm.belongCityName">
                    </el-input>
                </el-form-item>
                <el-form-item label="详细地址："  label-width="200px">
                    <el-input v-model="logisticsForm.address">
                    </el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input v-model="logisticsForm.contactsTel" maxlength="11" v-numberOnly>
                    </el-input>
                </el-form-item>
                <el-form-item label="QQ：" label-width="200px" v-numberOnly>
                    <el-input v-model="logisticsForm.qq" >
                    </el-input>
                </el-form-item>
                <el-form-item label="微信二维码上传:">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.wechatCode" />
                </el-form-item>
            </div>
            <!-- 物流公司认证照片 -->
            <div class="picInformation information">
                <h2>物流公司认证照片</h2>
                <el-form-item   label-width="200px">
                    <p><span>*</span>上传营业执照照片：</p>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.businessLicenceFile" />
                </el-form-item>
                <el-form-item   label-width="100px">
                    <p><span>*</span>负责人手持身份证正面照片：</p>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.takeIdCardFile" />
                </el-form-item>
                <el-form-item  label-width="100px">
                    <p><span>*</span>上传公司或者档口照片：</p>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.companyFacadeFile" />
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import './identification.scss'
import upload from '@/components/Upload/singleImage'
import { identifyCarrier } from '@/api/carrier/index.js'
import { getDictionary } from '@/api/common.js'

export default {
    components:{
        upload,
    },
    data() {
        return {

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
            
            serverClassify:[
                {
                    label:'整车运输',
                    name:'整车运输'
                },
                {
                    label:'零担货运',
                    name:'零担货运'
                }
            ],
            logisticsForm: {
                companyName: '',//物流公司名称
                belongBrand: '',//品牌
                foundTime: '',//成立时间
                corporation: '',//法人
                creditCode: '',//营业执照
                isCollection: '',//代收货款
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
            name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
                { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
            }
        };
    },
    mounted(){
        this.getMoreInformation();
    },  
    methods: {
        getMoreInformation(){
            Promise.all([getDictionary(this.belongBrand),getDictionary(this.productServiceCode),getDictionary(this.otherServiceCode),]).then(resArr => {
                // this.loading = false
                console.log(resArr)
                this.optionsBelongBrand = resArr[0].data;
                this.optionsProductService = resArr[1].data;
                this.optionsOtherService = resArr[2].data;

            }).catch(err => {
               
            })
        },
        submitForm(formName) {
            identifyCarrier(this.logisticsForm).then(res=>{
                console.log(res)
            })
            // this.$refs[formName].validate((valid) => {
            //   if (valid) {
            //     alert('submit!');
            //   } else {
            //     console.log('error submit!!');
            //     return false;
            //   }
            // });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
  
}
</script>

