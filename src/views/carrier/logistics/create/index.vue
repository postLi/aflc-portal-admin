<template>
  <div class="create-range page-main identification">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
        <div class="carrierTitle">
            <div class="realname">
                <h2>发布专线</h2>
            </div>
        </div>
        <div class="searchInformation information">
            <h2>基本信息</h2>
            <el-form-item label="出发地：" prop="startLocation">
                <el-input @focus="()=>{showMap('strartAddress')}"  v-model="ruleForm.startLocation"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="startLocationContacts" label-width="150px">
                <el-input v-model="ruleForm.startLocationContacts"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="startLocationContactsMobile" label-width="150px">
                <el-input v-model="ruleForm.startLocationContactsMobile" maxlength="11"></el-input>
            </el-form-item><br>
            <el-form-item label="到达地：" prop="endLocation">
                <el-input @focus="()=>{showMap('endAddress')}" v-model="ruleForm.endLocation"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="endLocationContacts" label-width="150px">
                <el-input v-model="ruleForm.endLocationContacts"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="endLocationContactsMobile" label-width="150px">
                <el-input v-model="ruleForm.endLocationContactsMobile" maxlength="11"></el-input>
            </el-form-item>
        </div>
        <div class="information priceTime">
            <h2>价格时效</h2>
            <el-form-item label="运输时效：">
                <el-input v-model="ruleForm.transportAging" @keyup.native='handlerChoose' ></el-input>
                <el-radio-group v-model="ruleForm.transportAgingUnit">
                    <el-radio label="天"></el-radio>
                    <el-radio label="小时"></el-radio>
                    <el-radio label="多天"></el-radio>
                </el-radio-group>
                <span class="supplement">(多天填写如：2-5，其它只能填写阿拉伯数字)</span>
            </el-form-item>

            <el-form-item label="发车频率：">
                <el-input placeholder="请输入内容" v-model="ruleForm.departureHzData">
                    <template slot="append">天</template>
                </el-input>
                <el-input placeholder="请输入内容" v-model="ruleForm.departureHzTime">
                    <template slot="append">次</template>
                </el-input>
            </el-form-item>
            <el-form-item label="重货价格：">
                <div class="goodsPriceChoose">
                    <p>
                        <span>运量</span>
                        <span>原报价</span>
                        <span>折后价</span>
                    </p>
                    <ul v-for="(form,keys) in weigthPriceForms" :key="keys">
                        <li>
                            <el-input v-model="form.startVolume" v-numberOnly placeholder="包含" :disabled="keys != 0"></el-input>
                            <span>----</span>
                            <el-input v-model="form.endVolume" v-numberOnly placeholder="不包含"></el-input>
                            公斤
                        </li>
                        <li>
                            <el-input v-model="form.primeryPrice" v-number-only:point></el-input>
                            元/公斤
                        </li>
                        <li>
                            <el-input v-model="form.discountPrice"  v-number-only:point></el-input>
                            元/公斤
                        </li>
                        <span  @click="addItem('weight')" class="addItem" v-if="keys == weigthPriceForms.length-1 && form.endVolume!= ''">
                        </span>
                        <span  @click="reduceItem(keys,'weight')" class="reduceItem" v-if="keys == weigthPriceForms.length-1 && weigthPriceForms.length !=1 " >
                        </span>
                    </ul>
                </div>
            </el-form-item>

            <el-form-item label="轻货价格：">
                <div class="goodsPriceChoose">
                    <p>
                        <span>运量</span>
                        <span>原报价</span>
                        <span>折后价</span>
                    </p>
                    <ul v-for="(form,keys) in ligthPriceForms" :key="keys">
                        <li>
                            <el-input v-model="form.startVolume" v-numberOnly placeholder="包含" :disabled="keys != 0"></el-input>
                            <span>----</span>
                            <el-input v-model="form.endVolume" v-numberOnly placeholder="不包含"></el-input>
                            立方
                        </li>
                        <li>
                            <el-input v-model="form.primeryPrice" v-numberOnly></el-input>
                            元/立方
                        </li>
                        <li>
                            <el-input v-model="form.discountPrice" v-numberOnly></el-input>
                            元/立方
                        </li>
                         <span  @click="addItem('light')" class="addItem" v-if="keys == ligthPriceForms.length-1 && form.endVolume!= ''">
                        </span>
                        <span  @click="reduceItem(keys,'light')" class="reduceItem" v-if="keys == ligthPriceForms.length-1 && ligthPriceForms.length !=1">
                        </span>
                    </ul>
                </div>
            </el-form-item>

            <el-form-item label="最低一票价格：">
                <el-input v-model="ruleForm.lowerPrice" placeholder="报价"></el-input> 元
            </el-form-item>
            <el-form-item label="专线类型：" prop="rangeType" v-if="ifShowRangeType == '1'">
                <el-radio-group v-model="ruleForm.rangeType">
                     <el-radio v-for="range in rangeTypeClassfy" :label="range.code" :key="range.id">{{range.name}}</el-radio>
                </el-radio-group>
            </el-form-item> 
            <el-form-item label="发车时间："  class="departureTime">
                <div>
                    <el-select v-model="ruleForm.departureTimeCode" clearable placeholder="请选择发车时间">
                        <el-option v-for="time in departClassfy" 
                        :key="time.id"
                        :label="time.name"
                        :value="time.code">
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="线路说明：" class="textarea" >
                <el-input type="textarea" v-model="ruleForm.transportRemark" :maxlength="maxlength" placeholder="请填写备注0-30个字。提供原创说明有助于提升线路效果。"></el-input>
                <span>{{ruleForm.transportRemark.length}} / {{maxlength}}</span>
                <p class="supplement">请对您的线路进行补充说明，尽量使用市场上或物流行业内的常用词。</p>
            </el-form-item>
            <el-form-item label="专线照片：" prop="rangeType">
                <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" :limit="5" listtype="picture-card" :showFileList = 'true' v-model="ruleForm.rangeLogo"/>
            </el-form-item> 
        </div>
        <el-form-item class="fromfooter">
            <el-button type="primary" @click="submitForm('ruleForm')" v-if="ifShowRangeType == '1'">修改</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" v-else>确认提交</el-button>
        </el-form-item>
    </el-form>
    <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" />

  </div>
</template>
<script>
import { getDictionary } from '@/api/common.js'
import { newTransportRangeList,TransportRangeInfo,changeTransportRange } from '@/api/carrier/TransportRange.js'
import { getUserInfo } from '@/utils/auth.js'
import { REGEX } from '@/utils/validate.js'
import upload from '@/components/Upload/singleImage2'
import tmsmap from '@/components/map/index'

export default {
    components:{
        upload,
        tmsmap
    },
    data() {
        var checkaa  = (rule, value, callback) => {
            if (value === '') {
            console.log(value)
            console.log(this.ruleForm.startLocation)
                callback(new Error('请输入手机号码'));
            }else{
                 callback();
            }
        };
        var checkStartLocationContactsMobile  = (rule, value, callback) => {
            
            console.log(value)
            if (value === '') {
                callback(new Error('请输入手机号码'));
            } else {
                if (!REGEX.MOBILE.test(value)) {
                    callback(new Error('请输入正确的手机号码格式'));
                }
                callback();
            }
        };
        var checkEndLocationContactsMobile  = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号码'));
            } else {
                if (!REGEX.MOBILE.test(value)) {
                    callback(new Error('请输入正确的手机号码格式'));
                }
                callback();
            }
        };
        return {
            current:'',
            popVisible:false,
            listtype:'picture-card',
            ifShowRangeType:'0',
            dedicated:'AF033',
            depart:'AF026',
            totalNumber:0,//當前字數
            maxlength:30,
            ruleForm: {
                startLocation:'',//出发地
                startLocationContacts:'',//出发地联系人
                startLocationContactsMobile:'',//出发地联系人电话
                endLocation:'',//到达地
                endLocationContacts:'',//到达地联系人
                endLocationContactsMobile:'',//到达地联系人电话
                transportAging:'',//运输时效
                transportAgingUnit:'天',//运输时效单位
                departureHzData:'',//发车频率天数
                departureHzTime:'',//发车频率车次
                rangePrices:[],
                lowerPrice:'',//最低一票价
                rangeType:'AF03301',
                rangeTypeName:'普通线路',
                departureTimeCode:'',//发车时间code
                departureTime:'',//发车时间
                transportRemark:'',//线路说明
                publishName:'',
                publishId:'',
                rangeLogo:'',//专线图片
            },
            rangeTypeClassfy:[],//专线类型选项
            departClassfy:[],//发车时间选项
            ligthPriceForms:[
                {
                    startVolume:'0',
                    endVolume:'',
                    primeryPrice:'',//标准价
                    discountPrice:'',//折后价
                    type:'0'
                } 
            ],
            weigthPriceForms:[
                {
                    startVolume:'0',
                    endVolume:'',
                    primeryPrice:'',//标准价
                    discountPrice:'',//折后价
                    type:'1'
                }
            ],
            rules: {
                startLocation:[
                    { required: true, validator: checkaa, trigger: 'change' },
                ],
                endLocation: [
                    { required: true, message: '请输入到达地', trigger: 'change' },
                ],
                startLocationContacts: [
                    { required: true, message: '请输入联系人信息', trigger: 'blur' }
                ],
                endLocationContacts: [
                    { required: true, message: '请输入联系人信息', trigger: 'blur' }
                ],
                startLocationContactsMobile: [
                    { required: true, validator: checkStartLocationContactsMobile, trigger: 'change' }
                ],
                endLocationContactsMobile: [
                    { required: true, validator: checkEndLocationContactsMobile, trigger: 'change' }
                ],
                rangeType: [
                    { required: true, message: '请选择专线类型', trigger: 'change' }
                ],
            }
        }
    },
    watch:{
        'ruleForm.rangeType':{
            handler(val, oldVal){
                if(val){
                    this.ruleForm.rangeTypeName = this.rangeTypeClassfy.find(item => item.code === val)['name'];
                }
            },
            deep:true
        },
        'ruleForm.departureTimeCode':{
            handler(val, oldVal){
                if(val){
                    this.ruleForm.departureTime = this.departClassfy.find(item => item.code === val)['name'];
                }
            },
            deep:true
        }

    },
    mounted(){
        this.getInformations();
        this.getParams()
    },
    methods:{
        getInfo(pos, name, info) {
            // info.name  info.pos
            console.log(pos, name, info)
            switch (this.current) {
                case 'strartAddress':
                this.ruleForm.startLocation = info.addressComponent.province+info.addressComponent.cit+info.addressComponent.district;
                break;
                case 'endAddress':
                this.ruleForm.endLocation = info.addressComponent.province+info.addressComponent.cit+info.addressComponent.district;
                break;
            }
        },
        showMap(name) {
            this.popVisible = true ;
            this.current = name;
        },
        getParams(){
            if(this.$route.params.data){
                this.ifShowRangeType = this.$route.params.ifrevise;
                let dataObj = this.$route.params.data;//接收数据
                this.ligthPriceForms = dataObj.lightcargo;
                this.weigthPriceForms = dataObj.weightcargo;
            
                TransportRangeInfo(dataObj.id).then(res=>{
                    this.ruleForm = res.data;
                })

            }
        },
        handlerChoose(){
            let type = this.ruleForm.transportAgingUnit;
            let transportAging = this.ruleForm.transportAging;
            if(type != '多天'){
                transportAging = transportAging.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
                transportAging = transportAging.replace(/^\./g,""); //验证第一个字符是数字
                transportAging = transportAging.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
                transportAging = transportAging.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                transportAging = transportAging.replace(/^(\-)*(\d+)\.(\d).*$/,'$1$2.$3'); //只能输入两个小数
                this.ruleForm.transportAging = transportAging ; 
            }else{
                transportAging = transportAging.replace(/[^0-9\-]+/g,"");
                this.ruleForm.transportAging = transportAging ; 
            }
        },
        getInformations(){
            Promise.all([ getDictionary(this.dedicated), getDictionary(this.depart)]).then(resArr => {
                this.rangeTypeClassfy = resArr[0].data;
                this.departClassfy = resArr[1].data;
            })
            let userInfo = getUserInfo();
            this.ruleForm.publishName = userInfo.companyName;
            this.ruleForm.publishId = userInfo.id;
        },
        //添加子节点新增
        addItem(type){
            console.log(type)
            switch(type){
                case 'weight':
                    this.weigthPriceForms.push({
                        startVolume:this.weigthPriceForms[0].endVolume,
                        endVolume:'',
                        primeryPrice:'',//标准价
                        discountPrice:'',//折后价
                        type:'1'
                    }); 
                    break;
                case 'light':
                    this.ligthPriceForms.push({
                        startVolume:this.ligthPriceForms[0].endVolume,
                        endVolume:'',
                        primeryPrice:'',//标准价
                        discountPrice:'',//折后价
                        type:'0'
                    }); 
                    break;
            }
        },
        //删除子节点新增
        reduceItem(idx,type){
            console.log(idx,type)
            switch(type){
                case 'weight':
                    this.weigthPriceForms.splice(idx,1);
                    break;
                case 'light':
                    this.ligthPriceForms.splice(idx,1);
                    break;
            }
        },  
        completeName(){
            this.ruleForm.rangePrices = [];

            this.ligthPriceForms.forEach(item => {
                this.ruleForm.rangePrices.push(item) 
            })

            this.weigthPriceForms.forEach(item => {
                this.ruleForm.rangePrices.push(item) 
            })
        },
        //提交按钮
        submitForm(formName) {
            console.log(this.ruleForm)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                this.completeName();
                let commitFunction;
                if(this. ifShowRangeType == '1'){
                    commitFunction = changeTransportRange(this.ruleForm);
                }else{
                    commitFunction = newTransportRangeList(this.ruleForm)
                }
                commitFunction.then(res => {
                    console.log('res',res)
                    if(res.status == 200){
                        this.$router.push({name:'管理我的专线'})
                    }else{
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + res.errorInfo ? res.errorInfo : res.text
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>
<style lang="scss">
    .page-main{
        padding: 10px;
        height: 100%;
        .el-form{
            .priceTime{
                .el-input{
                    width: 250px;
                }
                .el-form-item{
                    .el-form-item__content{
                        position: relative;
                        width: 100%;
                        .supplement{
                            font-size: 12px;
                            color: #ccc;
                        }
                    }
                }
                .el-form-item:nth-child(2){
                    .el-form-item__content{
                        .el-input{
                            width: 68px;
                        }
                    }
                }
                .el-form-item:nth-child(3){
                    .el-form-item__content{
                        .el-input{
                            width: 122px;
                            .el-input-group__append{
                                background-color: #f5f7fa;
                                color: #909399;
                                vertical-align: middle;
                                display: table-cell;
                                position: relative;
                                border: 1px solid #dcdfe6;
                                border-left: 0 none;
                                padding: 0 20px;
                                white-space: nowrap;
                                top: 0;
                                right: 0;
                            }
                        }
                    }
                }
                .el-form-item:nth-child(4),.el-form-item:nth-child(5){
                    .el-form-item__content{
                        width: 1165px;
                        border: 1px solid #ccc;
                        .el-input{
                            width: 50px;
                        }
                        .goodsPriceChoose{  
                            p{
                                padding: 6px 50px;                     
                                background: #eaefff;
                                font-size: 12px;
                                line-height: 17px;
                                color: #333333;
                                span:first-child{
                                    margin:0 168px;
                                }
                                span:nth-child(2){
                                    margin:0 146px;
                                }
                                 span:nth-child(3){
                                    margin:0 122px;
                                }
                            }
                            ul{
                                padding: 8px 110px 8px 50px;
                                display: flex;
                                justify-content:space-around;
                                font-size: 12px;
                                position: relative;
                                li{
                                    .el-input{
                                        width: 80px;
                                    }
                                }
                                .addItem{
                                    display:inline-block;
                                    height: 26px;
                                    width:26px;
                                    line-height: 26px;
                                    cursor: pointer;
                                    background:url('../../../../assets/icom/23zengjia.png') no-repeat center;
                                    position: absolute;
                                    top:10px;
                                    right: 80px;
                                    &:hover{
                                        background:url('../../../../assets/icom/24zengjia-b.png') no-repeat center;
                                    }
                                }
                                .reduceItem{
                                    display:inline-block;
                                    height: 26px;
                                    width:26px;
                                    line-height: 26px;
                                    cursor: pointer;
                                    background:url('../../../../assets/icom/21shanchu.png') no-repeat center;
                                    position: absolute;
                                    top:10px;
                                    right:40px;
                                    &:hover{
                                        background:url('../../../../assets/icom/22shanchu-b.png') no-repeat center;
                                    }
                                }
                            }
                        }
                    }
                }
                .el-form-item:nth-child(6),{
                    .el-form-item__content{
                        .el-input{
                            width: 100px;
                        }
                    }
                }
                .departureTime{
                    .el-form-item__content{
                        width: 250px;
                    }
                }
                .el-form-item:nth-last-child(2),{
                    .el-form-item__content{
                        width: 600px;
                        .el-textarea__inner{
                            padding-bottom: 20px;
                        }
                        span{
                            bottom: 22px;
                        }
                        // .countNum{
                        //     position: absolute;
                        //     right: 0;
                        //     bottom: 0;
                        //     font-size: 12px;
                        //     color: #ccc;
                        //     span{

                        //     }
                        // }
                    }
                }
            }
        }
    }
</style>
