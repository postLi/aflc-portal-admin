<template>
    <div class="ComplaintInfo identification">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>投诉跟踪</h2>
                </div>
            </div>
            <div :class="[stepname,step]">
            </div>
            <div class="ComplaintInfomation">
                <div class="" v-if="stepname == 'step-one'">
                    <div class="complaint_content complaint_orderInfo">
                        <h2>订单信息</h2>       
                        <div class="orderInfo">
                            <ul>
                                <li>订单号：{{orderForm.orderSerial}}</li>
                                <li>货品名称：{{orderForm.goodsName}}</li>
                                <li>货品预估总体积（方）：{{orderForm.goodsVolume}}</li>
                                <li>出发地：{{orderForm.startAddress}}</li>
                                <li>发货人：{{orderForm.consignor}}</li>
                                <li>收货人：{{orderForm.consignee}}</li>
                            </ul>
                            <ul>
                                <li>下单时间：{{orderForm.orderSerial}} 
                                    <el-popover
                                    width="100%"
                                    trigger="hover"
                                    >
                                    <p style="margin:5px;">提货时间：{{orderForm.goodsNum}}</p>
                                    <p style="margin:5px;">发货时间：{{orderForm.goodsNum}}</p>
                                    <p style="margin:5px;">收货时间：{{orderForm.goodsNum}}</p>
                                    <span slot="reference" class="reference" icon="el-icon-caret-bottom">更多<i icon="el-icon-caret-bottom"></i></span>
                                    </el-popover>
                                </li>
                                <li>货品总数量（件）：{{orderForm.goodsNum}}</li>
                                <li>货物类型：{{orderForm.orderSerial}}</li>
                                <li>到达地：{{orderForm.endAddress}}</li>
                                <li>发货人手机：{{orderForm.consignorPhone}}</li>
                                <li>收货人手机：{{orderForm.consigneePhone}}</li>
                            </ul>
                            <ul>
                                <li>物流公司：{{orderForm.wlName}}</li>
                                <li>货品预估总重量（公斤）：{{orderForm.goodsWeight}}</li>
                                <li>预估总费用（元）：{{orderForm.totalAmount}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="complaint_content complaint_Reason">
                        <h2>我要投诉</h2>
                            <el-form ref="ruleForm" :model="ruleForm"  label-width="80px" center>
                                <el-form-item label="投诉原因">
                                    <el-select v-model="ruleForm.complainType" clearable placeholder="请选择">
                                        <el-option
                                        v-for="item in optionsReason"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="投诉说明" class="ReasonInfo">
                                    <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 3, maxRows: 10}"
                                        placeholder="请输入内容"
                                        v-model="ruleForm.complainDes" :maxlength="Reasonmaxlength">
                                    </el-input>
                                    <p class="count"><span>{{ruleForm.complainDes.length}}</span>/{{Reasonmaxlength}}</p>
                                </el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')">提交投诉</el-button>
                            </el-form>
                        </div>
                    </div>
                <div v-else>    
                    <div class="complaint_content complaint_info">
                            <h2>投诉</h2>
                            <div>
                                <p>投诉原因</p>
                                <p><span>{{complaintForm.complainTypeName}}</span></p>
                                <p>控诉说明</p>
                                <p>{{complaintForm.complainDes}}</p>
                                <p>工单编号</p>
                                <p><span>{{complaintForm.workSerial}}</span></p>
                                <p>投诉时间</p>
                                <p>{{complaintForm.complainTime}}</p>
                            </div>  
                        </div>
                        <div class="complaint_content" v-if="stepname == 'step-tow'">
                            <h2> <i class="tishi"></i> 等待物流公司处理</h2>
                            <p style="text-align:center;">物流公司会尽快处理，请耐心等待！</p>
                        </div>
                        <div class="complaint_content complaint_reply">
                            <h2>{{UserInfo.companyName}}物流公司回复</h2>
                            <div v-if="stepname == 'step-tow'" class="replyInfo">
                                <div class="replyInfo">
                                    <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 3, maxRows: 10}"
                                        placeholder="请输入内容"
                                        v-model="reply" :maxlength="maxlength">
                                    </el-input>
                                    <p class="count"><span>{{textarea.length}}</span>/{{maxlength}}</p>
                                </div>
                                <el-button type="primary" :disabled="!reply" @click="handlerReply">回复</el-button>
                            </div>
                            <div class="complaint_replyinfo" v-else>
                                {{complaintForm.reply}}
                            </div>
                        </div>
                </div>
            </div>
    </div>
</template>

<script>

import '@/styles/identification.scss'
import './complaint.scss'
import { getUserInfo } from '@/utils/auth.js'
import { addOrderComplain,getDetails,changeOrderComplain } from '@/api/carrier/Complaint.js'
import { getDictionary,getDetailsByOrderSerial } from '@/api/common.js'
 
export default {
    components:{
    },
    data() {
        return {
            complainType:"AF041",//投诉原因
            Reasonmaxlength:200,//投诉原因说明字体字数
            maxlength:100,
            step:'step',
            stepname:'',
            textarea:'',
            complaintForm:{},
            UserInfo:{},
            ruleForm:{
                complainType:'',//投诉类型
                complainDes:'',//投诉描述
                platformOrderType:'1',

            },
            orderForm:{

            },
            optionsReason:[],
            reply:'',//回复内容
        };
    },  
    mounted(){
        this.firstblood();
    },  
    methods: {
        firstblood(){
            let orderSerial = this.$route.query.orderSerial;
            getDetails(orderSerial).then(res => {
                console.log('判断第几步',res)
                if(res.status == 200){
                    this.complaintForm = res.data ;
                    this.stepname = this.complaintForm.complainStatus == 'AF04002' ? 'step-three' : 'step-tow' ;
                }else{
                    this.stepname = 'step-one';
                    Promise.all([getDetailsByOrderSerial(orderSerial), getDictionary(this.complainType)]).then(resArr => {
                        console.log(this.orderForm)
                        this.orderForm = resArr[0].data;
                        this.optionsReason = resArr[1].data;
                        this.orderForm.complainType = this.optionsReason[0].code; 
                        this.UserInfo = getUserInfo();
                    })
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                console.log()
                if (valid) {
                    this.$confirm('确认要投诉该物流公司吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        this.ruleForm.complainTypeName = this.optionsReason.find(item => item.code === this.ruleForm.complainType)['name'];
                        this.ruleForm.complainName = this.UserInfo.contactsName;
                        this.ruleForm.complainId = this.UserInfo.id;
                        this.ruleForm.orderSerial = '24c0f4218e1d4bf099d185b3c6964441';
                        // console.log(this.ruleForm)
                        addOrderComplain(this.ruleForm).then(res => {
                            console.log(res)
                            this.stepname = 'step-tow';
                            this.firstblood();
                        })
                        
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //投诉回复
        handlerReply(){
            let replyForm = Object.assign({},{reply:this.reply},{id:this.complaintForm.id})
            changeOrderComplain(replyForm).then(res =>{
                console.log(res)
                this.firstblood();
            })
        }
    },
  
}
</script>

<style type="text/css" lang="scss">
   
</style>
