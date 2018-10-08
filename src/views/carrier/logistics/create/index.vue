<template>
  <div class="create-range page-main identification">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
        <div class="carrierTitle">
            <div class="realname">
                <h2>发布专线</h2>
            </div>
            <div class="prompt">
                <p><span class="tishi"><i class="el-icon-warning"></i>小提示： </span>(打<span class="star">*</span>号为必填项)</p>
            </div>
        </div>
        <div class="searchInformation information">
            <h2>基本信息</h2>
            <el-form-item label="出发地：" prop="startLocation">
                <!-- <el-input @focus="()=>{showMap('strartAddress')}"  v-model="ruleForm.startLocation"></el-input> -->
                <el-input v-model="ruleForm.startLocation" v-if="unable" :disabled="unable"></el-input>

                <vregion :ui="true" @values="regionChangeStart" :ifAera = 'true' class="form-control" @testCity="ifProvice('startLocation')" v-else>
                    <el-input v-model="ruleForm.startLocation" placeholder="请选择出发地" ></el-input>
                </vregion>
            </el-form-item>
            <el-form-item label="联系人：" prop="startLocationContacts" label-width="150px">
                <el-input v-model="ruleForm.startLocationContacts" :disabled="unable"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="startLocationContactsMobile" label-width="150px">
                <el-input v-model="ruleForm.startLocationContactsMobile" :disabled="unable" v-numberOnly maxlength="11"></el-input>
            </el-form-item><br>
            <el-form-item label="到达地：" prop="endLocation">
                <!-- <el-input @focus="()=>{showMap('endAddress')}" v-model="ruleForm.endLocation"></el-input> -->
                <el-input v-model="ruleForm.endLocation" v-if="unable" :disabled="unable"></el-input>

                <vregion :ui="true" @values="regionChangeEnd" :ifAera = 'true' class="form-control"  @testCity="ifProvice('endLocation')" v-else>
                    <el-input v-model="ruleForm.endLocation"  placeholder="请选择到达地"></el-input>
                </vregion>
            </el-form-item>
            <el-form-item label="联系人：" prop="endLocationContacts" label-width="150px">
                <el-input v-model="ruleForm.endLocationContacts" :disabled="unable"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="endLocationContactsMobile" label-width="150px">
                <el-input v-model="ruleForm.endLocationContactsMobile" :disabled="unable" v-numberOnly maxlength="11"></el-input>
            </el-form-item>
        </div>
        <div class="information priceTime">
            <h2>价格时效</h2>
            <el-form-item label="运输时效：" prop="transportAging">
                <el-input v-model="ruleForm.transportAging" :disabled="unable" @keyup.native='handlerChoose' ></el-input>
                <el-radio-group v-model="ruleForm.transportAgingUnit" :disabled="unable">
                    <el-radio label="天"></el-radio>
                    <el-radio label="小时"></el-radio>
                    <el-radio label="多天"></el-radio>
                </el-radio-group>
                <span class="supplement">(多天填写如：2-5，其它只能填写阿拉伯数字)</span>
            </el-form-item>

            <el-form-item label="发车频率：" prop="departureHzData">
                <el-input placeholder="请输入" v-numberOnly v-model="ruleForm.departureHzData" :disabled="unable">
                    <template slot="append">天</template>
                </el-input>
                <el-input placeholder="请输入" v-numberOnly v-model="ruleForm.departureHzTime" :disabled="unable">
                    <template slot="append">次</template>
                </el-input>
            </el-form-item>
            <el-form-item label="重货价格：" prop="weigthPriceForms">
                <p>(阶梯价格最大值不填，代表无穷大，例如：500-，代表500公斤以上)</p>
                <div class="goodsPriceChoose">
                    <p>
                        <span>运量</span>
                        <span>原报价 <strong>(必填)</strong></span>
                        <span>折后价</span>
                    </p>
                    <ul v-for="(form,keys) in weigthPriceForms" :key="keys">
                        <li>
                            <el-input v-model.number="form.startVolume" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <el-input v-model.number="form.endVolume" :disabled="unable" v-numberOnly placeholder="不包含" maxlength="7" @change="ifWrong(weigthPriceForms,keys)"></el-input>
                            公斤
                        </li>
                        <li>
                            <el-input v-model="form.primeryPrice" :disabled="unable" v-number-only:point maxlength="7"></el-input>
                            元/公斤
                        </li>
                        <li>
                            <el-input v-model="form.discountPrice" :disabled="unable"  v-number-only:point maxlength="7"></el-input>
                            元/公斤
                        </li>
                        <li class="buttons">
                            <span  @click="addItem('weight',keys,form)" class="addItem" v-if="keys == weigthPriceForms.length-1 && keys != 4">
                            </span>
                            <span  @click="reduceItem(keys,'weight')" class="reduceItem" v-if="keys == weigthPriceForms.length-1 && weigthPriceForms.length !=1 " >
                            </span>
                        </li>
                    </ul>
                </div>
            </el-form-item>

            <el-form-item label="轻货价格：" prop="ligthPriceForms">
                <p>(阶梯价格最大值不填，代表无穷大，例如：10-，代表10立方以上)</p>
                <div class="goodsPriceChoose">
                    <p>
                        <span>运量</span>
                        <span>原报价 <strong>(必填)</strong></span>
                        <span>折后价</span>
                    </p>
                    <ul v-for="(form,keys) in ligthPriceForms" :key="keys">
                        <li>
                            <el-input v-model.number="form.startVolume" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <el-input v-model.number="form.endVolume" :disabled="unable" v-numberOnly placeholder="不包含"  maxlength="7" @change="ifWrong(ligthPriceForms,keys)"></el-input>
                            立方
                        </li>
                        <li>
                            <!-- <el-form-item prop="primeryPrice" style="display:inline-block;"> -->
                                <el-input v-model="form.primeryPrice" :disabled="unable" v-number-only:point maxlength="7"></el-input>
                                元/立方
                            <!-- </el-form-item> -->
                        </li>
                        <li>
                            <el-input v-model="form.discountPrice" :disabled="unable" v-number-only:point maxlength="7"></el-input>
                            元/立方
                        </li>
                        <li class="buttons">
                            <span  @click="addItem('light',keys,form)" class="addItem" v-if="keys == ligthPriceForms.length-1 && keys != 4">
                            </span>
                            <span  @click="reduceItem(keys,'light')" class="reduceItem" v-if="keys == ligthPriceForms.length-1 && ligthPriceForms.length !=1">
                            </span>
                        </li>
                    </ul>
                </div>
            </el-form-item>

            <el-form-item label="最低一票价格：" prop="lowerPrice">
                <el-input v-model="ruleForm.lowerPrice" placeholder="报价" :disabled="unable" v-number-only:point></el-input> 元
            </el-form-item>
            <el-form-item label="专线类型：" prop="rangeType" v-if="ifShowRangeType != '0'">
                <el-radio-group v-model="ruleForm.rangeType" :disabled="unable">
                     <el-radio v-for="range in rangeTypeClassfy" :label="range.code" :key="range.id">{{range.name}}</el-radio>
                </el-radio-group>
            </el-form-item> 
            <el-form-item label="发车时间："  class="departureTime" prop="departureTimeCode">
                <div>
                    <el-select v-model="ruleForm.departureTimeCode" :disabled="unable" clearable placeholder="请选择发车时间">
                        <el-option v-for="time in departClassfy" 
                        :key="time.id"
                        :label="time.name"
                        :value="time.code">
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="线路说明：" class="textarea" prop="transportRemark" >
                <el-input type="textarea" 
                    :disabled="unable"
                    v-model="ruleForm.transportRemark" 
                    :autosize="{ minRows: 3, maxRows: 10}"
                    :maxlength="maxlength" 
                    placeholder="请填写备注30-2000个字。提供原创说明有助于提升线路效果。">
                </el-input>
                <span>{{ruleForm.transportRemark.length}} / {{maxlength}}</span>
                <p class="supplement">请对您的线路进行补充说明，尽量使用市场上或物流行业内的常用词。</p>
            </el-form-item>
            <el-form-item label="专线照片：" prop="rangeLogo">
                <upload class="licensePicture" v-if=" !unable" tip="（必须为jpg/png并且小于5M）" :disabled="unable" :limit="3" listtype="picture-card" :showFileList = 'true'  v-model="ruleForm.rangeLogo"/>
                <div v-for="item in rangeLogo" :key="item" class="imgBox" v-else>
                    <img :src='item' alt="">
                    <el-button  class="preview" type="primary" plain v-showPicture :imgurl="item">点击预览</el-button>
                </div>
            </el-form-item> 
        </div>
        <el-form-item class="fromfooter" v-show="ifShowRangeType != 2">
            <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" v-if="ifShowRangeType == '1'">修改</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" v-else>立即发布</el-button>
        </el-form-item>
    </el-form>
    <!-- <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" /> -->

  </div>
</template>
<script>
import { getDictionary } from '@/api/common.js'
import { newTransportRangeList,TransportRangeInfo,changeTransportRange } from '@/api/carrier/TransportRange.js'
import { getUserInfo } from '@/utils/auth.js'
import { REGEX } from '@/utils/validate.js'
import upload from '@/components/Upload/singleImage2'
// import tmsmap from '@/components/map/index'
import vregion from '@/components/vregion/Region.vue'
export default {
    components:{
        upload,
        // tmsmap,
        vregion
    },
    data() {
        var checkStartLocationContactsMobile  = (rule, value, callback) => {
            // console.log(value)
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

        var checkWeigthPriceForms = (rule,value,callback) => {
            if(this.weigthPriceForms[0].endVolume == ''){
                callback(new Error('请补充重货价格区间'));
            }else{
                this.weigthPriceForms.forEach(el => {
                    if(el.primeryPrice === ''){
                        callback(new Error('请补充重货价格区间'));
                    }
                    else{
                        callback();
                    }
                })
            }
        };

        var checkLightPriceForms = (rule,value,callback) => {
            this.ligthPriceForms.forEach(el => {
                if(el.endVolume === ''){
                    callback(new Error('请补充轻货运量'));
                    
                }else if(el.primeryPrice === ''){
                    console.log('123')
                    callback(new Error('请补充轻货价格区间'));
                }
                else{
                    callback();
                }
            })
        };
        return {
            rangeLogo:[],
            unable:false,
            btnText: '请选择',
            current:'',
            popVisible:false,
            ifShowRangeType:'0',
            dedicated:'AF033',
            depart:'AF026',
            totalNumber:0,//當前字數
            maxlength:2000,
            ruleForm: {
                startLocation:'',//出发地
                startProvince:'',
                startCity:'',
                startArea:'',
                startLocationContacts:'',//出发地联系人
                startLocationContactsMobile:'',//出发地联系人电话
                endLocation:'',//到达地
                endProvince:'',
                endCity:'',
                endArea:'',
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
                    { required: true, message: '请输入出发地', trigger: 'change' },
                ],
                endLocation: [
                    { required: true, message: '请输入到达地', trigger: 'change' },
                ],
                startLocationContacts: [
                    { required: true, message: '请输入出发地联系人信息', trigger: 'blur' }
                ],
                endLocationContacts: [
                    { required: true, message: '请输入到达地联系人信息', trigger: 'blur' }
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
                transportRemark:[
                    { min: 30, max: 2000, message: '专线说明请在30-2000字', trigger: 'blur' }
                ],
                weigthPriceForms:[
                    { required:true,validator: checkWeigthPriceForms, trigger: 'blur'},
                ],
                ligthPriceForms:[
                    { required:true,validator: checkLightPriceForms, trigger: 'blur'},
                ],
                primeryPrice:[
                    {required:true,message: '请填写价格', trigger: 'blur' },
                ]
            }
        }
    },
    watch:{
       
    },
    mounted(){
        this.getInformations();
        this.getParams();
    },
    methods:{
        ifWrong(item,idx){
            let flag = item[idx].endVolume < item[idx].startVolume ? true : false;
            if(flag){
                this.$message({
                    type: 'info',
                    message: '终止运量应不小于起始运量' 
                })
                return item[idx].endVolume = ''
            }
            else if(item.length > (idx+1)){
                item[idx+1].startVolume = item[idx].endVolume ;
                if(item[idx+1].endVolume){
                    if(item[idx+1].endVolume < item[idx+1].startVolume){
                        this.$message({
                            type: 'info',
                            message: '终止运量应不小于起始运量' 
                        })
                        return item.splice(idx+1);
                    }
                }
            }
        },
        regionChangeStart(d) {
            // console.log('data:',d)
            this.ruleForm.startLocation = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            console.log(this.ruleForm.startLocation)
            this.ruleForm.startProvince = d.province ? d.province.name : '';
            this.ruleForm.startCity = d.city ? d.city.name : '';
            this.ruleForm.startArea = d.area ? d.area.name : '';
            // let zhixiashi = ['北京市','天津市','重庆市','上海市'];
            // let ifZhixia = false;
            // zhixiashi.forEach(el => {
            //     if(this.ruleForm.startProvince == el){
            //         ifZhixia = true;
            //     }
            // })
            // if(this.ruleForm.startCity == '' && ifZhixia == false){
            //     this.$message({
            //         type: 'info',
            //         message: '至少选择到市级范围'
            //     })
            //     return this.ruleForm.startLocation = '';
            // }
        },
        regionChangeEnd(d) {
            // console.log('data:',d)
            this.ruleForm.endLocation = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            if(this.ruleForm.endLocation == this.ruleForm.startLocation){
                this.$message({
                    type: 'info',
                    message: '出发地不可与到达地重复！' 
                })
                return this.ruleForm.endLocation = ''
            }
            this.ruleForm.endProvince = d.province ? d.province.name : '';
            this.ruleForm.endCity = d.city ? d.city.name : '';
            this.ruleForm.endArea = d.area ? d.area.name : '';
            // let zhixiashi = ['北京市','天津市','重庆市','上海市'];
            // let ifZhixia = false;
            // zhixiashi.forEach(el => {
            //     if(this.ruleForm.endProvince == el){
            //         ifZhixia = true;
            //     }
            // })

            // console.log(ifZhixia,this.ruleForm.endProvince)
            // if(this.ruleForm.endCity == '' && ifZhixia == false){
            //     this.$message({
            //         type: 'info',
            //         message: '至少选择到市级范围'
            //     })
            //     return this.ruleForm.endLocation = '';
            // }
        },
        ifProvice(type){
            console.log('ifProvice',type)
            this.$message({
                type: 'info',
                message: '至少选择到市级范围'
            })
            if(type == 'startLocation'){
                return this.ruleForm.startLocation = '';
            }else{
                return this.ruleForm.endLocation = '';
            }
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        // getInfo(pos, name, info) {
        //     // info.name  info.pos
        //     console.log(pos, name, info)
        //     switch (this.current) {
        //         case 'strartAddress':
        //         this.ruleForm.startLocation = info.addressComponent.province + info.addressComponent.city + info.addressComponent.district;
        //         break;
        //         case 'endAddress':
        //         this.ruleForm.endLocation = info.addressComponent.province + info.addressComponent.city + info.addressComponent.district;
        //         break;
        //     }
        // },
        // showMap(name) {
        //     this.popVisible = true ;
        //     this.current = name;
        // },
        getParams(){
            if(this.$route.query.data){
                this.ifShowRangeType = this.$route.query.ifrevise;//1是修改，2是详情
                
                let dataObj = this.$route.query.data;//接收数据
                this.ligthPriceForms = dataObj.lightcargo;
                this.weigthPriceForms = dataObj.weightcargo;
                console.log('```',dataObj)
                TransportRangeInfo(dataObj.id).then(res=>{
                    this.ruleForm = res.data;
                    this.rangeLogo = this.ruleForm.rangeLogo.split(",");
                    console.log('this.rangeLogo',this.rangeLogo)
                })
                if(this.ifShowRangeType == 2){
                    this.unable = true;
                }
            }
        },
        //判断和限制
        handlerChoose(){
            let type = this.ruleForm.transportAgingUnit;
            let transportAging = this.ruleForm.transportAging;
            if(type != '多天'){
                transportAging = transportAging.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
                transportAging = transportAging.replace(/^\./g,""); //验证第一个字符是数字
                transportAging = transportAging.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
                transportAging = transportAging.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                transportAging = transportAging.replace(/^(\-)*(\d+)\.(\d).*$/,'$1$2.$3'); //只能输入一位小数
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
        addItem(type,idx,item){
            // console.log(type)
            switch(type){
                case 'weight':
                // console.log(item.primeryPrice)
                    if(idx == 0 && item.endVolume == ''){
                        return this.$message({
                            type: 'info',
                            message: '请补充重货运量' 
                        })
                    }
                    else if(item.primeryPrice == ''){
                        return this.$message({
                            type: 'info',
                            message: '请补充重货原报价' 
                        })
                    }else{
                        this.weigthPriceForms.push({
                            startVolume:this.weigthPriceForms[idx].endVolume,
                            endVolume:'',
                            primeryPrice:'',//标准价
                            discountPrice:'',//折后价
                            type:'1'
                        }); 
                    }
                    break;
                case 'light':
                    if(idx == 0 && item.endVolume == ''){
                        return this.$message({
                            type: 'info',
                            message: '请补充轻货运量' 
                        })
                    }
                    else if(item.primeryPrice == ''){
                        return this.$message({
                            type: 'info',
                            message: '请补充轻货原报价' 
                        })
                    }else{
                        this.ligthPriceForms.push({
                            startVolume:this.ligthPriceForms[idx].endVolume,
                            endVolume:'',
                            primeryPrice:'',//标准价
                            discountPrice:'',//折后价
                            type:'0'
                        }); 
                    }
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
            
            if(this.ruleForm.rangeType){
                this.ruleForm.rangeTypeName = this.rangeTypeClassfy.find(item => item.code == this.ruleForm.rangeType)['name'];
            }

            if(this.ruleForm.departureTimeCode){
                this.ruleForm.departureTime = this.departClassfy.find(item => item.code == this.ruleForm.departureTimeCode)['name'];
            }
        },
        //提交按钮
        submitForm(formName) {
            console.log(this.ruleForm)
            let ifNull = true;
            let messageInfo;

            this.ligthPriceForms.forEach(item => {
                if(item.primeryPrice == ''){
                    messageInfo= '请补充轻货原报价' 
                    ifNull = false;
                }
            })
            this.weigthPriceForms.forEach(item => {
                if(item.primeryPrice == ''){
                    messageInfo= '请补充重货原报价' 
                    ifNull = false;
                }
            })

            if(ifNull){
                
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
                                this.$alert('操作成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$router.push({name:'管理物流专线'})
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
                        this.$message({
                            type: 'info',
                            message: '请填写完整信息' 
                        })
                        return false;
                    }
                });
            }else{
                this.$message({
                    type: 'info',
                    message: messageInfo
                })
            }
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.ruleForm.departureHzTime = '';
            this.ligthPriceForms = [
                {
                    startVolume:'0',
                    endVolume:'',
                    primeryPrice:'',//标准价
                    discountPrice:'',//折后价
                    type:'0'
                } 
            ];
            this.weigthPriceForms=[
                {
                    startVolume:'0',
                    endVolume:'',
                    primeryPrice:'',//标准价
                    discountPrice:'',//折后价
                    type:'1'
                }
            ];
        }
    }
}
</script>
<style lang="scss">
    .page-main{
        height: 100%;
        .el-form{
            >.searchInformation{
                .el-form-item{
                    margin-bottom: 20px;
                    .el-form-item__content{
                        .v-region{
                            width: 100%;
                            .caller-container{
                                width: 100%;
                            }
                            .v-dropdown-container{
                                top: 35px !important;
                                left: 0px !important;
                            }
                        }
                    }
                }
                
            }
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
                            width:130px;
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
                        .el-input{
                            width: 50px;
                        }
                        p{
                            font-size: 12px;
                            color:red;
                        }
                        .goodsPriceChoose{  
                            border: 1px solid #ccc;
                            p{
                                padding: 6px 50px;                     
                                background: #eaefff;
                                font-size: 14px;
                                line-height: 17px;
                                color: #333333;
                                span{
                                    strong{
                                        color: red;
                                        font-size: 12px;
                                    }
                                }
                                span:first-child{
                                    margin:0 168px;
                                }
                                span:nth-child(2){
                                    margin:0 140px;
                                }
                                 span:nth-child(3){
                                    margin:0 122px;
                                }
                            }
                            ul{
                                padding: 8px 110px 8px 50px;
                                // display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                                // display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                                // display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                                // display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                                // display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
                                // justify-content:space-around;
                                font-size: 12px;
                                position: relative;
                                overflow: hidden;
                                li{
                                    .el-input{
                                        width: 80px;
                                    }
                                    float: left;
                                }
                                li:first-child{
                                    margin-left: 9%;
                                }
                                li:nth-child(2){
                                    margin-left: 20%;
                                }
                                li:nth-child(3){
                                    margin-left: 21%; 
                                }
                                .buttons{
                                    position: absolute;
                                    right: 0;
                                    top: 0;
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
                    }
                }

                .imgBox{
                    display: inline-block;
                    width: 25%;
                    height: 200px;
                    margin-right: 10px;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
