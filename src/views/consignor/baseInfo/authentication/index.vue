
<template>
    <div class="consignorIdentification identification">
        <el-form :model="logisticsForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>完善实名认证 <span >( {{logisticsForm.shipperStatusName}} )</span> </h2>
                </div>
                <div class="prompt">
                    <p><span class="tishi"><i class="el-icon-warning"></i>小提示： </span>(打<span class="star">*</span>号为必填项)</p>
                    <p>修改完善公司基本信息后，我们将在24小时内进行人工审核，审核通过后，免费赠送您一个<span class="site">企业网站</span></p>
                </div>
            </div>
            <div class="companyInformation information">
                <h2>基本信息</h2>
                <el-form-item label="货主类型：" prop="shipperType">
                    <el-input v-model="logisticsForm.shipperTypeName" disabled  v-if="ifDisable === false">
                    </el-input>
                    <el-select v-model="logisticsForm.shipperType" placeholder="请选择" v-else>
                        <el-option
                        v-for="item in optionsShipperType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="公司名称：" prop="companyName">
                     <el-input v-model="logisticsForm.companyName"  :disabled="ifDisable === false">
                        <p slot="append">请填写企业在工商局注册的全称，完整的信息让客户更加信赖您</p>
                    </el-input>
                </el-form-item>
                <el-form-item label="法人/负责人：" prop="legalPerson"> 
                     <el-input v-model="logisticsForm.legalPerson" :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                 <el-form-item label="统一社会信用代码（营业执照）："  prop="creditCode">
                    <el-input v-model="logisticsForm.creditCode" :disabled="ifDisable === false" maxlength="18">
                    </el-input>
                </el-form-item>
                <el-form-item label="身份证号：" prop="legalPersonIdno">             
                    <el-input v-model="logisticsForm.legalPersonIdno" :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                <el-form-item label="公司成立时间：" >
                    <el-date-picker
                    v-model="logisticsForm.companyEstablishDate"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    value-format="timestamp"
                    :disabled="ifDisable === false"
                    :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="企业LOGO：" prop="companyLogo" class="minHeight">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.companyLogo" v-if="ifDisable == 'false'"/>
                    <img class="showPicture" :src="logisticsForm.companyLogo" alt="LOGO" >
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.companyLogo ? true : false" v-showPicture :imgurl="logisticsForm.companyLogo">点击预览</el-button>
                </el-form-item>
                <el-form-item label="公司简介："  class="textarea"  prop="driverDesc">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 10}"
                        placeholder="请输入内容"
                        :disabled="ifDisable === false"
                        v-model="logisticsForm.driverDesc" :maxlength="maxlength">
                    </el-input>
                    <span>{{totalNumber}} / {{maxlength}}</span>
                    <p>如果您是企业，必须填写完整细致的企业简介；</p>
                    <p> 如果您是个人，必须填写详细的个体经营范围，不得出现违法词语，字数不低于30字。</p>
                </el-form-item>
            </div>
            <!-- 联系方式 -->
            <div class="contactInformation information">
                <h2>联系方式</h2>
                <el-form-item label="联系人："  prop="contacts" >
                    <el-input v-model="logisticsForm.contacts" :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机："  label-width="150px" prop="mobile" >
                    <el-input v-model="logisticsForm.mobile" maxlength="11"  v-numberOnly :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                <el-form-item label="公司所在地：" prop="belongCityName">
                    <el-input v-model="logisticsForm.belongCity">
                    </el-input>
                </el-form-item> 
                <el-form-item label="详细地址："  label-width="150px" prop="address">
                    <el-input v-model="logisticsForm.address">
                    </el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input v-model="logisticsForm.contactsTel" maxlength="12"  :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
                <el-form-item label="QQ：" label-width="150px">
                    <el-input v-model="logisticsForm.qq" v-numberOnly placeholder="填写QQ，方便物流公司联系您" :disabled="ifDisable === false">
                    </el-input>
                </el-form-item>
            </div>
            
                <!-- 物流公司认证照片 -->
            <div class="picInformation information" v-if="logisticsForm.shipperType == 'AF0010202'"><!-- 企业货主code -->
                <h2>物流公司认证照片</h2>
                <el-form-item   label-width="50px">
                    <p><span>*</span>上传营业执照照片：</p>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.businessLicenceFile" v-if="ifDisable == 'false'"/>
                    <img class="showPicture" :src="logisticsForm.businessLicenceFile" alt="营业执照" v-else>
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.businessLicenceFile ? true : false" v-showPicture :imgurl="logisticsForm.businessLicenceFile">点击预览</el-button>
                </el-form-item>
                <el-form-item   label-width="50px" prop="companyFacadeFile" >
                    <p><span>*</span>上传公司或者档口照片：</p>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.companyFacadeFile" v-if="ifDisable == 'false'" />
                    <img class="showPicture" :src="logisticsForm.companyFacadeFile" alt="公司或者档口照片" v-else>
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.companyFacadeFile ? true : false" v-showPicture :imgurl="logisticsForm.companyFacadeFile">点击预览</el-button>
                </el-form-item>
                <el-form-item  label-width="50px" prop="shipperCardFile">
                    <p><span>*</span>上传发货人名片照片：</p>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.shipperCardFile" v-if="ifDisable == 'false'"/>
                    <img class="showPicture" :src="logisticsForm.shipperCardFile" alt="" v-else>
                    <el-button  class="preview" type="primary" plain v-show="logisticsForm.shipperCardFile ? true : false" v-showPicture :imgurl="logisticsForm.shipperCardFile">点击预览</el-button>
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
import { identifyCarrier } from '@/api/carrier/index.js'
import { getDictionary,getShipperInfoByMobile } from '@/api/common.js'
import { getUserInfo } from '@/utils/auth.js'
import { identifyShipper } from '@/api/shipper/index.js'
import { REGEX } from '@/utils/validate.js'
export default {
    components:{
        upload,
    },
    computed: {
        totalNum() {
    　　　　return this.logisticsForm.driverDesc;
    　　},
        disabled(){
            return this.logisticsForm.shipperStatusName;
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
                console.log(newVal)
                if(newVal == '待认证' || newVal == '认证成功'){
                    this.ifDisable = false;
                }else{
                    this.ifDisable = true;
                }

                console.log(this.ifDisable)
            },
            deep:true
        }
    },
    data() {
        var checkcreditCode = (rule, value, callback) => {
            if(value && !REGEX.ENGLISH_AND_NUMBER.test(value)){
                return callback(new Error('仅可输入数字或者英文字母'));
            }else{
                callback()
            }
        };
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
        var checkMoblie = (rule, value, callback) => {
            if(!value){
                return callback(new Error('请输入手机号码'))
            }
            else if(!REGEX.MOBILE.test(value)){
                return callback(new Error('请输入正确的手机号码格式'));
            }else{
                callback()
            }
        };
        return {
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
            ifDisable:true,
            driverPhone:'',//货主电话（账户）
            totalNumber:0,//當前字數
            maxlength:200,
            shipperType:'AF00101',//数据字典类型
            optionsShipperType:[],//货主类型
            logisticsForm: {
                shipperType: "AF0010101",//货主名称
                companyName: '',//公司名称
                legalPerson: '',//法人
                legalPersonIdno: '',//身份证号
                companyEstablishDate:'',//公司成立时间
                companyLogo:'',//企业logo
                driverDesc: '',//车主描述
                contacts:'',//联系人
                mobile:'',//手机
                belongCity:'',//所在地
                address:'',//详细地址
                contactsTel:'',//联系电话
                qq:'',//qq
                businessLicenceFile:'',//营业执照
                companyFacadeFile:'',//公司或者档口照片
                shipperCardFile:'',//身份证
            },
            rules: {
                shipperType:[
                    { required: true, message: '请选择货主类型', trigger: 'blur' },
                ],
                companyName: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                ],
                legalPerson:[
                    {required: true, message: '请输入法人/负责人信息', trigger: 'blur'},
                ],
                creditCode:[
                    {validator: checkcreditCode, trigger: 'blur'},
                ],
                legalPersonIdno:[
                    {required: true, validator: checkDriverCardid, trigger: 'blur'},
                ],
                driverDesc: [
                    { required: true, message: '请完善公司简介内容', trigger: 'blur' },
                    { min: 30, message: '公司简介，不能少于30个字', trigger: 'blur' }
                ],
                contacts:[
                    { required: true, message: '请输入联系人信息，以方便物流公司和您联系', trigger: 'blur' },
                ],
                mobile: [
                    {required: true,  validator: checkMoblie,  trigger: 'blur' }
                ],
                companyFacadeFile:[
                    {required: true, message: '请上传公司或者档口照片', trigger: 'blur'}
                ],
                shipperCardFile:[
                    {required: true, message: '请上传发货人名片', trigger: 'blur'}
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
            Promise.all([getDictionary(this.shipperType),getShipperInfoByMobile(res.mobile)]).then(resArr => {
                // this.loading = false
                console.log(resArr)
                this.optionsShipperType = resArr[0].data;
                this.logisticsForm = Object.assign({},resArr[1].data);
                console.log(this.logisticsForm)
            }).catch(err => {
                
            })

        },
        limitNum(val){

            if(val.length>25){

            }
        },
        submitForm(formName) {

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let form = Object.assign({},this.logisticsForm,{'shipperStatus':"AF0010402"})
                    // console.log(form)
                    identifyShipper(form).then(res=>{
                        console.log(res)
                        this.getMoreInformation();
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
        .consignorIdentification .el-form .information .textarea .el-form-item__content {
            .el-textarea{
                .el-textarea__inner{
                    padding-bottom: 15px;
                }
            }
        }
        .consignorIdentification .el-form .information .textarea .el-form-item__content span {
            bottom: 50px;
        }

</style>

